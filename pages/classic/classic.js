import { Classic } from "../../api/classic"
import { Like } from "../../api/like"

const classic = new Classic()
const like = new Like()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    classic.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike (e) {
    let behavior = e.detail.behavior
    like.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext () {
    this._updateClassic('next')
  },

  onPrevious () {
    this._updateClassic('previous')
  },

  _updateClassic (nextOrPrevious) {
    const index = this.data.classic.index
    classic.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.type, res.id)
      this.setData({
        classic: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },

  _getLikeStatus (category, artID) {
    like.getClassicLikeStatus(category, artID, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
