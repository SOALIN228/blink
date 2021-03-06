Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer (newVal, oldVal, changedPath) {
        const val = newVal.padStart(2, '0')
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    year: 0,
    month: '',
    _index: ''
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()

      this.setData({
        year,
        month: this.data.months[month]
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})
