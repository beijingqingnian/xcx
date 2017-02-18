// mgtv API 操作
import newData from '../../assets/plugins/mgtv.js';
import tcity from '../../etc/citys.js';
var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
const App = getApp()
Page({
  data: {
    focus: false,
    inputValue: '',
    levelId: 0,
    fireLevel: ['无', '甲类', '乙类', '丙二类', '丁类', '消防备案'],
    typeId: 0,
    fireType: ['厂房', '仓库'],
    invoiceId: 0,
    invoice: ['无', '普票', '专票'],
    qualification: ['产权证', '土地使用证', '消防证'],
    parkType: ['自营', '加盟', '结盟'],
    parkTypeId: 0,
    qualificationId: 0,
    provinces: [],
    province: "",
    provinceCode: [],
    provinceCodeId: "",
    citys: [],
    cityCode: [],
    cityCodeId: "",
    city: "",
    countyCodeId: "",
    countyCode: [],
    countys: [],
    county: "",
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    warehouseNum:0,

    sourceTypeIndex: 0,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 0,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    initPosition: false,
    disabled: false,
    parkId:0,
    actionUpdate:false,
  },
  form:{
    parkName: '',
    constact:'',
    identity:'',
    mobile:'1'
  },

  onLoad: function (option) {
    var that = this;

    tcity.init(that);

var parkId = option.parkId;

    //查询子仓库的条数warehouseNum
    if(parseInt(parkId)>0){
        let param = {
            API_URL: 'http://a.yidaichu.com/ydc/warehouse/list?id='+parkId,
            method:"GET"
        };

        newData.result(param).then( data => {
          this.setData({
            'actionUpdate':true,
            'parkId':parkId,
            'warehouseNum':data.data.data.length
          })
          console.log(data)
          //  let id = data.data.id;
          //   wx.navigateTo({
          //       url: '../warehouse/warehouse?parkId='+id
          //   })

        }).catch(e => {
            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })
        });
    }


    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];
    const provinceCode = [];
    const cityCode = [];
    const countyCode = [];

    for (let i = 0; i < cityData.length; i++) {
      provinceCode.push(cityData[i].code);
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      cityCode.push(cityData[0].sub[i].code);
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countyCode.push(cityData[0].sub[0].sub[i].code);
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'provinceCode': provinceCode,
      'cityCode': cityCode,
      'countyCode': countyCode,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
  },
  bindQualification: function (e) {
    this.setData({
      qualificationId: e.detail.value
    })
  },
  bindParkType: function (e) {
    this.setData({
      parkTypeId: e.detail.value
    })
  },
  //消防级别
  bindPickerChangeLevel: function (e) {
    this.setData({
      levelId: e.detail.value
    })
  },
  //消防类型
  bindPickerChangeType: function (e) {
    this.setData({
      typeId: e.detail.value
    })
  },
  //发票
  bindPickerChangeInvoice: function (e) {
    this.setData({
      invoiceId: e.detail.value
    })
  },
  //子仓库跳转
  addWarehouse: function (e) {
     wx.redirectTo({
       url: '../warehouseList/warehouseList?parkId='+e.target.dataset.id
     })
  },
  //省市县三级联动
  bindChange: function (e) {
    var val = e.detail.value
    //console.log(val)
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        provinceCodeId: this.data.provinceCode[val[0]],
        cityCodeId: cityData[val[0]].sub[0].code,
        countyCodeId: cityData[val[0]].sub[0].sub[0].code,
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      this.setData({
        countyCodeId: this.data.countyCode[val[2]],
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },

  //选择位置
  chooseLocation: function (e) {
    //console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        //console.log(res)
        that.setData({
          initPosition: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //图片上传
  chooseImage: function () {
    var that = this
    //console.log(that)
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        var imageList = ''
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formObj = e.detail.value;
    var propertyRightCard = formObj.qualification === '0' ? 1 : 0;
    var landUseCertificate = formObj.qualification === '1' ? 1 : 0;
    var firePermitCard = formObj.qualification === '2' ? 1 : 0;

    var park = {
      park: {
        id: '',
        name: formObj.parkName,
        parkType: formObj.parkType,
        contractArea: formObj.contractArea,
        parkArea: formObj.parkArea,
        //仓库面积
        warehouseArea: formObj.warehouseArea,
        //仓库剩余面积
        remainWarehouseArea: formObj.remainWarehouseArea,
        //办公室面积
        officeTotalArea: formObj.officeTotalArea,
        //办公室剩余面积
        remainOfficeArea: formObj.remainOfficeArea,
        //宿舍面积
        dormTotalArea: formObj.dormTotalArea,
        //宿舍剩余面积
        remainDormArea: formObj.remainDormArea,
        //产权证
        propertyRightCard: formObj.qualification,
        //土地使用证
        landUseCertificate: landUseCertificate,
        //消防证
        firePermitCard: firePermitCard,
        //消防级别
        firePermitLevel: formObj.firePermitLevel,
        //消防类型
        firePermitType: formObj.firePermitType,
        //其他园区资质
        qualificateOther: formObj.qualificateOther,
        //园区图片路径
        graphUrl: '/park/graph/pic_1487317325865.jpg',
        provinceId: that.data.provinceCodeId,
        cityId: that.data.cityCodeId,
        districtId: that.data.countyCodeId,
        minLeaseArea: formObj.minLeaseArea,
        minLeasePrice: formObj.minLeasePrice,
        minLeasePeriod: formObj.minLeasePeriod,
        detailsAddress: formObj.detailsAddress,
        longitudeLatitude: formObj.longitudeLatitude,
        invoice: formObj.invoice
      },
      constact: {
        name: formObj.constact,
        identity: formObj.identity,
        mobile: formObj.mobile
      }
    };

    //console.log(JSON.stringify(park));

        let param = {
            API_URL: 'http://a.yidaichu.com/ydc/park',
            data:park,
            method:"POST"
        };

        newData.result(param).then( data => {

           let id = data.data.id;
            wx.navigateTo({
                url: '../warehouse/warehouse?parkId='+id
            })

        }).catch(e => {
            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })
        });

  }

})