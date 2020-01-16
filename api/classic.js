import { Http } from '../utils/http'

class Classic extends Http {
  /**
   * 获取最新期刊
   */
  getLatest () {
    return new Promise((resolve, reject) => {
      this.request({
        url: 'classic/latest'
      }).then(res => {
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
        resolve(res)
      })
    })
  }

  /**
   * 获取当前期刊上一期或下一期
   * @param index 期刊号
   * @param nextOrPrevious 执行上一期还是下一期
   */
  getClassic (index, nextOrPrevious) {
    return new Promise((resolve, reject) => {
      const key = nextOrPrevious === 'next' ?
        this._getKey(index + 1) : this._getKey(index - 1)
      const classic = wx.getStorageSync(key)
      if (!classic) {
        this.request({
          url: `classic/${index}/${nextOrPrevious}`
        }).then(res => {
          wx.setStorageSync(this._getKey(res.index), res)
          resolve(res)
        })
      } else {
        resolve(classic)
      }
    })
  }

  /**
   * 获取我喜欢的期刊
   */
  getMyFavor () {
    return this.request({
      url: 'classic/favor'
    })
  }

  /**
   * 获取某一期详细信息
   * @param cid id号
   * @param type 类型号
   */
  getById (cid, type) {
    return this.request({
      url: `classic/${type}/${cid}`
    })
  }

  isFirst (index) {
    return index === 1
  }

  isLatest (index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex === index
  }

  _setLatestIndex (index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex () {
    return wx.getStorageSync('latest')
  }

  _getKey (index) {
    return 'classic-' + index
  }
}

export { Classic }
