/**
 * @description http 封装
 * @author SOALIN
 * @date 2019/12/21 16:45
 */
import { config } from '../config'

const tips = {
  0: 'OK, 成功',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  1007: '404',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}

class Http {
  request ({ url, method = 'GET', data = {} }) {
    return new Promise((resolve, reject) => {
      this._request(url, method, data, resolve, reject)
    })
  }

  _request (url, method, data, resolve, reject) {
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          this._show_error(res.data.error_code)
          reject()
        }
      },
      fail: (err) => {
        this._show_error(1006)
        reject(err)
      }
    })
  }

  _show_error (error_code = 1003) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export { Http }
