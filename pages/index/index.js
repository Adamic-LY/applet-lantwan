//index.js
//获取应用实例
const app = getApp()
import {requestData} from '../../utils/network'
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        productList:[],
        host:"https://wldpvc.com/",
        shownull:false
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        wx.showShareMenu({
          complete: (res) => {},
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        // 获取token
        wx.login({
            success(res) {
                wx.request({
                    url: "http://wldpvc.com/api/v2.1/login",
                    method: 'POST',
                    data: {
                        code: res.code
                    },
                    success(res) {
                        var apiToken=res.data.api_token           
                        wx.setStorageSync("apiToken", apiToken)  
                        var phonearr=['13939009563']
                        wx.setStorageSync('okPhonenumber',phonearr )
                    }
                })
            }
        })
          // 请求数据
          requestData("兰炭").then(data=>{ 
            //   console.log(this)     
            // console.log(data)
            var productlist=data.data.data
            this.setData({
                productList:productlist
            })
            // console.log(this.data.productList)
        }).catch(err=>{
            console.log(err)
        })
        
     
    },
    // onShow:function(){
    //     // console.log(this.data.productList)
    // },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    gofabu() {
        wx.navigateTo({
            url: '../../pages/release/release',
        })
    },
    tobig(e) {
        // console.log(e.currentTarget.dataset.src)
        var url = e.currentTarget.dataset.src;
        wx.previewImage({
            urls: [url],
            current: url,
            success(res) {
                // console.log(res)
            },
            fail(err) {
                // console.log(err)
            }
        })

    },
    // 接收组件数据
    showData:function(e){
        //  console.log(e.detail)
         if(e.detail.length<1){
             this.setData({
                productList:e.detail,
                 shownull:true
             })
            //  console.log(this.data.shownull)
         }else{
            this.setData({
                productList:e.detail,
                shownull:false
            })
         }      
        //  console.log(this.data.productList)
    },
    // 去详情页
    godetail(e){
        var id =e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../../pages/productDetail/productDetail?id='+id,
        })
    },
    onShareAppMessage:function(ops){
        
    }
})