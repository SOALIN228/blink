import { Classic } from '../../api/classic'
import { Book } from '../../api/book'
import { promisic } from '../../utils/common'

const classic = new Classic()
const book = new Book()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.userAuthorized1()
    this.getMyBookCount()
    this.getMyFavor()
  },

  onGetUserInfo (event) {
    console.log(event)
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  userAuthorized1 () {
    promisic(wx.getSetting)().then(data => {
      if (data.authSetting['scope.userInfo']) {
        return promisic(wx.getUserInfo)()
      }
      return false
    }).then(data => {
      if (!data) return
      this.setData({
        authorized: true,
        userInfo: data.userInfo
      })
    })
  },

  getMyBookCount () {
    book.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor () {
    classic.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })
  },

  onJumpToDetail (e) {
    const cid = e.detail.cid
    const type = e.detail.type
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
