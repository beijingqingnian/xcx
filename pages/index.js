// mgtv API 操作
import newData from '../assets/plugins/mgtv.js';

//创建精选页面对象
Page({

    data: {
        loading: false,
        loadtxt: '正在加载',
        currentId: '101',
        wareHouseList : [],
        newList: []
    },

    isEmptyObject: function(e){ //判断Object对象是否为空

        let t;  

        for (t in e)  
            return !1;  
        return !0 

    },

    onLoad: function(params){

        let _this = this;

        //登录
        // wx.request({
        //       url: 'http://a.yidaichu.com/login/enter',
        //       data:{"loginType":0,"loginContent":"13544667799","loginPwd":"123123"},
        //       method:'POST',
        //       success: function(data){
        //         console.log('登录成功');
        //         console.log(data);
        //       },
        //       fail: function(){
        //         console.log('登录失败');
        //       } 
        // });

        let param = {
            API_URL: 'http://a.yidaichu.com/ydc/manager/park/list?parkType=&parkStatus=&provinceId=&cityId=&districtId=&page=1&numPerPage=17',
            // data:{
            //     'channelId':this.data.currentId,
            //     'type':'normal'
            // },
        };

        newData.result(param).then( data => {
          
            
            let datas = data.data.data,
                bannerData = [],
                AvatorData = [],
                RollData = [],
                lists = [],
                wareList = [],
                obj = {};

            wareList = datas;    

            this.setData({
                loading: true,
                loadtxt: '来了来了',
                wareHouseList: wareList,
                newList: Object.assign([], lists)
            })

            console.log(this.data.newList)
        }).catch(e => {

            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })

            //console.error(e);
        });

    },

    handleTap: function(e){

        //console.log(e);
        let id = e.currentTarget.id;

        if(id){
            this.setData({ currentId: id })
            this.onLoad();
        }

    }
})