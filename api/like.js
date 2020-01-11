import { Http } from "../utils/http"

class Like extends Http {
  /**
   * 点赞
   * @param behavior 点赞还是取消点赞
   * @param artID 点赞id号
   * @param category 点赞类型
   */
  like (behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  /**
   * 获取点赞信息
   * @param category 点赞类型
   * @param artID 点赞id
   * @param sCallback 成功回调
   */
  getClassicLikeStatus (category, artID, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}

export { Like }
