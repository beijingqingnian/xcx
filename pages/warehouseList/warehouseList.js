import newData from '../../assets/plugins/mgtv.js';
Page({
    data: {
        parkId :0
    },
    onLoad: function (option) {
        var that = this;
        
         that.setData({
             'parkId': option.parkId
         })

         let param = {
             API_URL: 'http://a.yidaichu.com/ydc/warehouse/list?id='+option.parkId,
         };

         newData.result(param).then( data => {
          console.log(data);
          let warehouseList = [];
            this.setData({
              warehouseList:data.data.data
            })
            
            //  let datas = data.data.data,
            //      bannerData = [],
            //      AvatorData = [],
            //      RollData = [],
            //      lists = [],
            //      wareList = [],
            //     obj = {};

            //  wareList = datas;    

            // this.setData({
            //      loading: true,
            //      loadtxt: '来了来了',
            //      wareHouseList: wareList,
            //      newList: Object.assign([], lists)
            //  })

            //  console.log(this.data.newList)
         }).catch(e => {

             this.setData({
                 loadtxt: '数据加载异常',
                 loading: false
             })
         });

    },
    // addWarehouse:function(e){
    //   console.log(e)
    // }
})