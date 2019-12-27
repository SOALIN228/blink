import { Http } from "../utils/http"

class Classic extends Http {
  /**
   * 获取最新期刊
   * @param sCallback 成功回调
   */
  getLatest (sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }

  /**
   * 获取当前期刊上一期或下一期
   * @param index 期刊号
   * @param nextOrPrevious 执行上一期还是下一期
   * @param sCallback 成功回调
   */
  getClassic (index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious === 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          sCallback(res)
          wx.setStorageSync(this._getKey(res.index), res)
        }
      })
    } else {
      sCallback(classic)
    }
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
