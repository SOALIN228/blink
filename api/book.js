import { Http } from '../utils/http'

class Book extends Http {
  /**
   * 获取热门书籍
   */
  getHotList () {
    return this.request({
      url: 'book/hot_list'
    })
  }

  /**
   * 获取书籍详细信息
   * @param bid 书籍id
   */
  getDetail (bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  /**
   * 获取书籍点赞情况
   * @param bid 书籍id
   */
  getLikeStatus (bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  /**
   * 获取书籍短评
   * @param bid 书籍id
   */
  getComments (bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  /**
   * 新增短评
   * @param bid 书籍id
   * @param comment 评论内容
   */
  postComment (bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  /**
   * 书籍搜索
   * @param start 起始值
   * @param q 关键字
   */
  search (start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }

  /**
   * 获取喜欢书籍数量
   */
  getMyBookCount () {
    return this.request({
      url: '/book/favor/count'
    })
  }
}

export { Book }
