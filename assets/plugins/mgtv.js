import Promise from 'es6-promise';

var newData = {

    //API_URL : 'http://m.api.hunantv.com/channel/getDetail',

    fetchApi : function(params) {

        var _this = this;

        return new Promise((resolve,reject) => {
            wx.request({
              url: params.API_URL,
              data:Object.assign({}, params.data),
              header: {
                //'Connection':'keep-alive',
                'Cookie':'uid=1; token=7618fa9a2584535372c3e47a6641365ebf84c9a7f8d38565e1be4610d3167e84; loginContent=13544667799; returnUri=%2Fydc%2Fmanager%2Fpark%2Flist'//'JSESSIONID=6BD04400FA3D04B6D9279ED19403B26F;token=6285c9135f91549015f7a7c6d8dffd49e6ede726ed8212febebd5540dd94b7ba; loginContent=13544667799; returnUri=%2Fydc%2Fmanager%2Fpark%2Flist'
              },
              method:params.method == '' ? 'GET' : params.method,
              success: resolve,
              fail: reject 
            })
        })

    },

    result : function (params) {

        var _this = this;

        return _this.fetchApi(params).then( res => res)

    }

}


export default newData ;
