import { Keyword } from '../../api/keyword'
import { Book } from '../../api/book'
import { paginationBev } from '../behaviors/pagination'

const keyword = new Keyword()
const book = new Book()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached () {
    this.setData({
      historyWords: keyword.getHistory()
    })

    keyword.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore () {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        book.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
      }
    },
    onCancel () {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete () {
      this.initialize()
      this._closeResult()
    },

    onConfirm (e) {
      const q = e.detail.value || e.detail.text
      if (!q) {
        return
      }
      this.initialize()
      this._showResult()
      this._showLoadingCenter()
      this.setData({
        q
      })
      book.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keyword.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter () {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter () {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult () {
      this.setData({
        searching: true
      })
    },

    _closeResult () {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
