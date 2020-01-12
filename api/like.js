import { Http } from "../utils/http"

class Like extends Http {
  /**
   * 点赞
   * @param behavior 点赞还是取消点赞
   * @param artID 点赞id号
   * @param category 点赞类型
   */
  like (behavior, artID, category) {
    const url = behavior === 'like' ? 'like' : 'like/cancel'
    return this.request({
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
   */
  getClassicLikeStatus (category, artID) {
    return this.request({
      url: `classic/${category}/${artID}/favor`
    })
  }
}

export { Like }
