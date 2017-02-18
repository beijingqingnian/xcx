import newData from '../../assets/plugins/mgtv.js';

Page({
  data: {
    currentId:'custom',
    loading: true
  },
  
  onLoad (params) {

       let _this = this;
        let param = {
            API_URL: 'http://a.yidaichu.com/crm/customer/query/list?employeeId=1&pageNum=1&pageSize=1000',
            data:{},
        };

        newData.result(param).then( data => {
            let datas = data.data.data.result;
            let lists = [];
            let newList = [];
            for (let i in datas){
                lists.push(datas[i])
            }

            for (let i = 0; i < lists.length; i++) {
                let obj = {};
                obj.rankArr = [];
                obj.customerName = lists[i].customerName;
                obj.createTime = lists[i].createTime;
                obj.id = lists[i].id;
                for (let j = 1; j < lists[i].length-1; j++) {
                    obj.rankArr.push(lists[i][j])
                }
                newList.push(obj);
            }

            this.setData({
                loadtxt: '来了来了',
                loading: true,
                customerList: Object.assign([], newList)

            })

        }).catch(e => {

            this.setData({
                loadtxt: '数据加载异常',
                loading: false
            })

            console.error(e);
        })

    },

    deleteTxt: function(e){
        
        this.setData({
            value:'搜索客户名称'
        })

    },

    onFouse: function(e){

        this.setData({
            value:''
        })  

    },

    onBlue: function(){
        this.setData({
            value:'搜索客户名称'
        }) 
    }



})