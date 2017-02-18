Page({
  data: {
    boards: [
      { key: 'in_theaters', name: '合同' },
      { key: 'coming_soon', name: '合同二' },
      { key: 'top250', name: '合同三' },
      // { key: 'weekly', name: '口碑榜' },
      { key: 'us_box', name: '合同四' },
      // { key: 'new_movies', name: '新片榜' }
    ],
    movies: [],
    loading: true
  },

  onLoad () {
    douban.find('in_theaters', 1, 5)
      .then(d => this.setData({ movies: d.subjects, loading: false }))
      .catch(e => {
        console.error(e)
        this.setData({ movies: [], loading: false })
      })
  },
})