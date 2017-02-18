const App = getApp()
Page({
    data: {
        activeIndex: 0,
        navList: [],
        indicatorDots: !0,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !0,
        listHidden:!0,
        clientId:0,
        clientArr:['A重点客户','B普通客户','C非重点客户'],
        goods: {    
      "params": {
      "type": "587c687bf036c862bb0d2ae7",
      "page": 1,
      "limit": 10
      },
    "items": [{
        "name": "对对对",
        "price": 34,
        "remark": "是打发斯蒂芬",
        "_id": "58901032ee7d6d66f2b80138",
        "__v": 0,
        "create_at": "2017-01-22T15:40:48.836Z",
        "images": [
          {
            "__v": 0,
            "name": "电视背景墙.jpg",
            "path": "uploads/HvNmZ4ITcwsXsEO5rlpMuYLagg6oc1485836334000.jpg",
            "_id": "5890102eee7d6d66f2b80137",
            "create_at": "2017-01-22T15:40:48.863Z"
          }
        ],
        "types": [
          {
            "__v": 0,
            "_id": "587c687bf036c862bb0d2ae7",
            "name": "缠绕管",
            "remark": "HDPE缠绕增强管",
            "update_at": "2017-01-18T02:32:35.955Z",
            "create_at": "2017-01-13T03:17:55.463Z"
          }
        ],
        "thumb_url": "https://www.skyvow.cn/uploads/HvNmZ4ITcwsXsEO5rlpMuYLagg6oc1485836334000.jpg"
      }],
      "paginate": {
      "page": 1,
      "pages": 1,
      "perPage": 10,
      "total": 3,
      "prev": 1,
      "next": 1,
      "hasNext": false,
      "hasPrev": false
    }},
    formHidden:{
      hidden:!0
    },
        prompt: {
            hidden: !0,
        },
    },
    swiperchange(e) {
        // console.log(e.detail.current)
    },
    changeClient:function(e){
      this.setData({
        clientId:e.detail.value
      })
    },
    modalTap: function(e) {
        wx.makePhoneCall({
        phoneNumber: '18511404343' //仅为示例，并非真实的电话号码
    })
  },
    onLoad() {

        //console.log(navLists)
        //this.banner = App.HttpResource('/banner/:id', {id: '@id'})
        //this.goods = navLists//App.HttpResource('/goods/:id', {id: '@id'})
        //this.classify = App.HttpResource('/classify/:id', {id: '@id'})
    },
    onShow() {
        this.getBanners()
        this.getClassify()
    },
    initData() {
        const type = this.data.goods.params && this.data.goods.params.type || ''

        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }
        //console.log('========1999====')
        //console.log(navLists)
        this.setData({
            goods: goods
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    search() {
        App.WxService.navigateTo('/pages/search/index')
    },
    getBanners() {
    	// App.HttpService.getBanners({is_show: !0})
        // this.banner.queryAsync({is_show: !0})
        // .then(data => {
        // 	console.log(data)
        // 	if (data.meta.code == 0) {
        //         data.data.items.forEach(n => n.path = App.renderImage(n.images[0].path))
        // 		this.setData({
        //             images: data.data.items
        //         })
        // 	}
        // })
    },
    getClassify() {
        const activeIndex = this.data.activeIndex
        let navLists = []
        
        //for(let i=0;i<2;i++){
            let nav1={}
            nav1.rankArr = [];
            nav1.create_at = "2017-19-12"
            nav1.name = "跟进记录"
            nav1.remark = "详细资料"
            nav1._id = "record" 
            navLists.push(nav1)
            let nav2={}
            nav2.rankArr = [];
            nav2.create_at = "2017-19-12"
            nav2.name = "详细资料"
            nav2.remark = "详细资料"
            nav2._id = "detail" 
            navLists.push(nav2)
        
        

                 this.setData({
                     navList: navLists,//[{'name':999,'remark':'ppp'},{'name':8888,'remark':'ppp'}],//data.data.items,
                     'goods.params.type': 1//data.data.items[activeIndex]._id
                 })
        // App.HttpService.getClassify({
        //     page: 1, 
        //     limit: 4, 
        // })
        // this.classify.queryAsync({
        //     page: 1, 
        //     limit: 4, 
        // })
        // .then(data => {
        //     console.log(data)
        //     if (data.meta.code == 0) {
        //         this.setData({
        //             navList: [{'name':999,'remark':'ppp'},{'name':8888,'remark':'ppp'}],//data.data.items,
        //             'goods.params.type': data.data.items[activeIndex]._id
        //         })
        //         this.onPullDownRefresh()
        //     }
        // })
    },
    getList() {
        const goods = this.data.goods
        const params = goods.params

        // App.HttpService.getGoods(params)
        // this.goods.queryAsync(params)
        // .then(data => {
        //     console.log(data)
        //     if (data.meta.code == 0) {
        //         data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
        //         goods.items = [...goods.items, ...data.data.items]
        //         goods.paginate = data.data.paginate
        //         goods.params.page = data.data.paginate.next
        //         goods.params.limit = data.data.paginate.perPage
        //         this.setData({
        //             goods: goods,
        //             'prompt.hidden': goods.items.length,
        //         })
        //     }
        // })
    },
    onPullDownRefresh() {
        console.info('onPullDownRefresh')
        this.initData()
        this.getList()
    },
    onReachBottom() {
        console.info('onReachBottom')
        if (!this.data.goods.paginate.hasNext) return
        this.getList()
    },
    onTapTag(e) {
        const type = e.currentTarget.dataset.type
        const index = e.currentTarget.dataset.index
        console.log('=====__=====');
        console.log(type);
        console.log(index);
        if(index === 1){
          this.setData({ formHidden:{hidden: 0},listHidden:!0 })
        }else{
           this.setData({ formHidden:{hidden: !0},listHidden:0 })
        }

        let navLists = []
 navLists = {
    "params": {
      "type": "587c687bf036c862bb0d2ae7",
      "page": 1,
      "limit": 10
    },
    "items": [
      {
        "name": "对对对",
        "price": 34,
        "remark": "是打发斯蒂芬",
        "_id": "58901032ee7d6d66f2b80138",
        "__v": 0,
        "create_at": "2017-01-22T15:40:48.836Z",
        "images": [
          {
            "__v": 0,
            "name": "电视背景墙.jpg",
            "path": "uploads/HvNmZ4ITcwsXsEO5rlpMuYLagg6oc1485836334000.jpg",
            "_id": "5890102eee7d6d66f2b80137",
            "create_at": "2017-01-22T15:40:48.863Z"
          }
        ],
        "types": [
          {
            "__v": 0,
            "_id": "587c687bf036c862bb0d2ae7",
            "name": "缠绕管",
            "remark": "HDPE缠绕增强管",
            "update_at": "2017-01-18T02:32:35.955Z",
            "create_at": "2017-01-13T03:17:55.463Z"
          }
        ],
        "thumb_url": "http://www.svg.com/kehu_icon_6.png"
      },
      {
        "name": "hhhggv",
        "price": 258,
        "remark": "ffg ggg g g v b",
        "_id": "589458deee7d6d66f2b80161",
        "__v": 0,
        "create_at": "2017-01-22T15:40:48.836Z",
        "images": [
          {
            "__v": 0,
            "name": "向阳花_&_f345e1b7-dd0a-4eb2-b174-1171e223f63b.jpg",
            "path": "uploads/XfuI7tK9fLsSWqKVvyxVM3HcTv2vqkYlvFqiwac56uDQifVHJVG641486117083000.jpg",
            "_id": "589458dbee7d6d66f2b80160",
            "create_at": "2017-01-22T15:40:48.863Z"
          }
        ],
        "types": [
          {
            "__v": 0,
            "_id": "587c687bf036c862bb0d2ae7",
            "name": "缠绕管",
            "remark": "HDPE缠绕增强管",
            "update_at": "2017-01-18T02:32:35.955Z",
            "create_at": "2017-01-13T03:17:55.463Z"
          }
        ],
        "thumb_url": "http://www.svg.com/kehu_icon_6.png"
      },
      {
        "name": "HDPE缠绕增强管",
        "price": 100,
        "remark": "HDPE缠绕增强管",
        "_id": "587f124ecd7fdb027a12dbfb",
        "__v": 0,
        "create_at": "2017-01-18T03:18:26.402Z",
        "images": [
          {
            "__v": 0,
            "name": "201701101622037634467.jpg",
            "path": "uploads/dEOjuds77nFTkjqniaoh5Ec3U7mccha1HQuLJW9h7kitHCNGRJipxwlS8EBJjtyfxD1484722744000.jpg",
            "_id": "587f1238cd7fdb027a12dbfa",
            "create_at": "2017-01-18T03:18:26.433Z"
          }
        ],
        "types": [
          {
            "__v": 0,
            "_id": "587c687bf036c862bb0d2ae7",
            "name": "缠绕管",
            "remark": "HDPE缠绕增强管",
            "update_at": "2017-01-18T02:32:35.955Z",
            "create_at": "2017-01-13T03:17:55.463Z"
          },
          {
            "__v": 0,
            "_id": "5836cb9df3a3ab2153543f34",
            "name": "波纹管",
            "remark": "HDPE双壁波纹管",
            "update_at": "2017-01-18T02:33:08.730Z",
            "create_at": "2016-11-24T10:54:43.590Z"
          },
          {
            "__v": 0,
            "_id": "5836cba7f3a3ab2153543f35",
            "name": "检查井",
            "remark": "塑料检查井",
            "update_at": "2017-01-18T02:33:33.717Z",
            "create_at": "2016-11-24T10:54:43.590Z"
          },
          {
            "__v": 0,
            "_id": "5836cbb3f3a3ab2153543f36",
            "name": "化粪池",
            "remark": "塑料化粪池",
            "update_at": "2017-01-18T02:34:06.507Z",
            "create_at": "2016-11-24T10:54:43.590Z"
          }
        ],
        "thumb_url": "http://www.svg.com/kehu_icon_6.png"
      }
    ],
    "paginate": {
      "page": 1,
      "pages": 1,
      "perPage": 10,
      "total": 3,
      "prev": 1,
      "next": 1,
      "hasNext": false,
      "hasPrev": false
    }
  }
  //console.log(navLists.items)
        const goods = {
            items: [],
            params: {
                page : 1,
                limit: 10,
                type : type,
            },
            paginate: {}
        }
        this.setData({
            activeIndex: index,
            goods: navLists//goods,
        })
        this.getList()
    },
})