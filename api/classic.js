import { Http } from "../utils/http"

class Classic extends Http {
  getLatest (sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}

export { Classic }
