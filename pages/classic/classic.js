import { Classic } from '../../api/classic'
import { Like } from '../../api/like'

const classic = new Classic()
const like = new Like()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    cid: Number,
    type: Number
  },

  /**
   * 组件的初始数据
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
  attached (options) {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      classic.getLatest().then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
    } else {
      classic.getById(cid, type).then(res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classic.isLatest(res.index),
          first: classic.isFirst(res.index)
        })
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike (e) {
      const behavior = e.detail.behavior
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
      classic.getClassic(index, nextOrPrevious).then(res => {
        this._getLikeStatus(res.type, res.id)
        this.setData({
          classic: res,
          latest: classic.isLatest(res.index),
          first: classic.isFirst(res.index)
        })
      })
    },

    _getLikeStatus (category, artID) {
      like.getClassicLikeStatus(category, artID).then(res => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
    }
  }
})
