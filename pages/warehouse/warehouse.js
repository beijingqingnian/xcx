import newData from '../../assets/plugins/mgtv.js';
Page({
    data: {
        build: ['砖混', '彩钢', '钢结构', '其他'],
        buildId: 0,
        buildTypeId: 0,
        buildType: ['平台', '高台', '楼台'],
        typeId: 0,
        type: ['普通库', '恒温库', '冷藏库', '冷冻库', '危险品库'],
        terraceId:0,
        terrace:['水泥','金刚砂','环氧'],
        floorId:0,
        parkId:0,
        floor:[1,2,3,4,5],
        cutOffId:0,
        cutOff:['可分割','不可分割'],
        goods:['生鲜','电子产品','汽车配件','预包装食品','重物(煤\、钢材\、木材等)','服装鞋帽','日用品','化妆品','文化体育用品','家用电器','家具','机电产品及设备','酒水','电子配件','五金件'],
    },
      onLoad: function(option){
          var that = this;
          that.setData({
            'parkId':option.parkId
          })
  },
    bindPickerChangeBuild: function (e) {
        this.setData({
            buildId: e.detail.value
        })
    },
    bindPickerBuildType: function (e) {
        this.setData({
            buildTypeId: e.detail.value
        })
    },
    bindPickerType: function (e) {
        this.setData({
            typeId: e.detail.value
        })
    },
    bindPickerTerrace:function(e){
        this.setData({
            terraceId:e.detail.value
        })
    },
    bindPickerFloor:function(e){
        this.setData({
            floorId:e.detail.value
        })
    },
    bindPickerCutOff:function(e){
        this.setData({
            cutOffId:e.detail.value
        })
    },
    formSubmit:function(e){
        var that = this;
        var formVal = e.detail.value;
        var isDivisible = formVal.warehouseIsDivisible === "0" ? true :false;
        var storageArr = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

         var warehouseStorageGoods = formVal.warehouseStorageGoods;
         for(var i=0;i<warehouseStorageGoods.length;i++){
             for(var j=0;j<that.data.goods.length;j++){
                 if(that.data.goods[j] == warehouseStorageGoods[i]){
                    storageArr[j] = true;
                    j = j;
                 }
             }
         }

        var warehouse = {
            "floor":{
                "id":"",
                "loadBearing":formVal.warehouseLoadBearing,
                "storageType":formVal.warehouseType,
                "terrace":formVal.warehouseTerrace
            },
            "warehouse":{
                "area":formVal.houseArea,
                "buildingStruct":formVal.warehouseBuildingStruct,
                "id":"",
                "isDivisible":isDivisible,
                "minLeasePrice":formVal.warehouseMinLeasePrice,
                "name":formVal.warehouseName,
                "parkId":formVal.parkId,
                "remainArea":formVal.houseRemainArea,
                "sizeHigh":formVal.warehouseSizeHigh,
                "storageApa":storageArr[0],
                "storageC":storageArr[1],
                "storageCs":storageArr[2],
                "storageCsh":storageArr[3],
                "storageD":storageArr[4],
                "storageDn":storageArr[5],
                "storageEa":storageArr[6],
                "storageEp":storageArr[7],
                "storageF":storageArr[8],
                "storageH":storageArr[9],
                "storageHa":storageArr[10],
                "storageHf":storageArr[11],
                "storageMe":storageArr[12],
                "storagePf":storageArr[13],
                "storageW":storageArr[14],
                "warehouseFloor":formVal.warehouseFloor,
                "warehouseMode":formVal.warehouseMode
            }
        };
        //console.log(warehouse);
      
        let param = {
            API_URL: 'http://a.yidaichu.com/ydc/warehouse',
            data:warehouse,
            method:"POST"
        };

        newData.result(param).then( data => {
            wx.navigateTo({
                url: '../park/park'
            })
        }).catch(e => {
            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })
        });


    }


})