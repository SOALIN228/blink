import { Book } from '../../api/book'
import { Like } from '../../api/like'

const book = new Book()
const like = new Like()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.showLoading()
    const bid = options.bid
    const detail = book.getDetail(bid)
    const comments = book.getComments(bid)
    const likeStatus = book.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
  },

  onLike (e) {
    const like_or_cancel = e.detail.behavior
    like.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost () {
    this.setData({
      posting: true
    })
  },

  onCancel () {
    this.setData({
      posting: false
    })
  },

  onPost (e) {
    const comment = e.detail.text || e.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    book.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
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
