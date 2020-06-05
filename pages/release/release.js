// pages/release/release.js
import {
    uploadRelease,
    phoneverification,
    sendverification,
    throttle
} from "../../utils/network";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 标题
        title: null,
        // 产品图片
        tempFilePaths: [],
        // 化验单
        tempFilePaths1: [],
        // 低位发热量
        netcalorificpower: null,
        // 硫
        sulphur: null,
        // 高位发热量
        higherheatingvalue: null,
        // 灰分
        ashcontent: null,
        // 水分
        moisture: null,
        // 挥发
        volatilization: null,
        // 产品介绍
        production: null,
        // 库存
        inventory: null,
        // 价格
        price: null,
        // 规格样式
        btnindex: null,
        // 规格value
        btnvalue: null,
        //   企业名称
        companyname: null,
        // 供应地址
        companyaddress: null,
        // 电话
        phonenumber: null,
        // 验证码
        verificationcode: null,
        // 服务器返回的产品图片
        imgarr: [],
        // 服务器返回的化验单图片
        imgstr: null,
        // 正确的验证码
        rightcode: false,
        // 验证码按钮data
        sendtime: '获取验证码',
        sendcolor: '#363636',
        snsmsgwait: 60,
        // 是否需要验证
        needcode:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
 wx.showShareMenu({
   complete: (res) => {},
 })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 上传产品展示
    uploadproduct: function () {
        var that = this;

        wx.chooseImage({
            count: 3,
            sourceType: ['album', 'camera'],
            success: function (res) {
                var filePath = res.tempFilePaths;
                var arr = [];
                that.setData({
                    tempFilePaths: res.tempFilePaths,

                });
                for (var i = 0; i < filePath.length; i++) {
                    wx.uploadFile({
                        filePath: filePath[i],
                        name: 'file',
                        url: 'https://wldpvc.com/api/v1/tpsc',
                        success(data) {
                            var meg = JSON.parse(data.data)
                            that.data.imgarr.push(meg.data)
                        },
                        fail(err) {
                            console.log(err)
                        }
                    })
                }
            }
        })
    },
    // 上传产品化验单
    uploadlaboratory: function () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sourceType: ['camera', 'album'],
            success: function (res) {
                var filePath1 = res.tempFilePaths;
                that.setData({
                    tempFilePaths1: res.tempFilePaths,
                });
                wx.uploadFile({
                    filePath: filePath1[0],
                    name: 'file',
                    url: 'https://wldpvc.com/api/v1/tpsc',
                    success(data) {
                        var meg = JSON.parse(data.data)
                        that.data.imgstr = meg.data
                    },
                    fail(err) {
                        console.log(err)
                    }
                })
            }
        })
    },

    // 获取产品标题
    gettitle(e) {
        // console.log(e.detail)
        this.setData({
            title: e.detail.value
        })
    },
    // 获取低位发热量
    getdiwei(e) {
    
        this.setData({
            netcalorificpower: e.detail.value
        })
    },
    // 获取硫
    getliu(e) {
        this.setData({
            sulphur: e.detail.value
        })
    },
    // 获取高位发热量
    getgaowei(e) {
        this.setData({
            higherheatingvalue: e.detail.value
        })
    },
    // 获取灰分
    gethuifen(e) {
        this.setData({
            ashcontent: e.detail.value
        })
    },
    // 获取水分
    getshuifen(e) {
        this.setData({
            moisture: e.detail.value
        })
    },
    // 获取挥发
    gethuifa(e) {
        this.setData({
            volatilization: e.detail.value
        })
    },
    // 获取产品介绍
    getjieshao(e) {
        this.setData({
            production: e.detail.value
        })
    },
    // 获取产品库存
    getkucun(e) {
        this.setData({
            inventory: e.detail.value
        })
    },
    // 获取产品价格
    getjiage(e) {
        this.setData({
            price: e.detail.value
        })
    },
    // 获取产品规格
    changeBtnindex: function (e) {
        // console.log(e.currentTarget)
        this.setData({
            btnindex: e.currentTarget.dataset.index,
            btnvalue: e.currentTarget.dataset.value
        })
    },
    // 获取企业名称
    getname(e) {
        this.setData({
            companyname: e.detail.value
        })
    },
    // 获取供应地址
    getaddress(e) {
        this.setData({
            companyaddress: e.detail.value
        })
    },
    // 获取手机号
    getphonenum: function (e) {
        var that =this
        var okphonenumber =wx.getStorageSync('okPhonenumber')
        var thisnumber=e.detail.value
        for (var i=0;i<okphonenumber.length;i++){
            if(okphonenumber[i]==thisnumber){
                that.setData({
                    needcode:false
                })
                // console.log(that.data.needcode)
            }else{
                this.setData({
                    needcode:true
                })
            }
        }
        if (!(/^1[34578]\d{9}$/.test(e.detail.value))) {
            wx.showToast({
                title: '请填写正确的手机号',
                icon: "none",
                duration: 1000
            })
        } else {
            this.setData({
                phonenumber: e.detail.value
            })
        }
    },
    // 发送验证码
    phoneverification() {
     

            var inter = setInterval(() => {
                this.setData({
                    smsflag: true,
                    sendcolor: '#cccccc',
                    sendtime: this.data.snsmsgwait + 's后重发',
                    snsmsgwait: this.data.snsmsgwait - 1
                });
                if (this.data.snsmsgwait < 0) {
                    clearInterval(inter)
                    this.setData({
                        sendcolor: '#363636',
                        sendtime: '发送验证码',
                        snsmsgwait: 60,
                        smsflag: false
                    })
                }
            }, 1000);
            sendverification(this.data.phonenumber).then(data => {
                wx.showToast({
                    title: '验证码已发送至手机',
                    icon: "none",
                    duration: 1000
                });
                // console.log(data)     
            }).catch(err => {
                wx.showToast({
                  title: '验证码错误',
                })
            })
        
    },
    // 获取验证码
    getmess(e) {
        var code = e.detail.value
        var api_token = wx.getStorageSync('apiToken')
        this.setData({
            verificationcode: e.detail.value
        })
        phoneverification(code, this.data.phonenumber, api_token, this.data.companyname).then(data => {
        //    var date= new Date();
        //    console.log(date)
            if (data.ret == 200) {
                var okPhonenumber =wx.getStorageSync('okPhonenumber')
                okPhonenumber.push(this.data.phonenumber)
                wx.setStorageSync('okPhonenumber', okPhonenumber)
                this.setData({
                    rightcode: true
                })
                // console.log(this.data.rightcode)
            }else{
                wx.showToast({
                  title: '验证码错误',
                  icon:'none',
                  duration:2000
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },
    // 发布
    requsetUpload() {
        if (this.data.title == null || this.data.title == "") {
            wx.showToast({
                title: '请填写产品标题',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.tempFilePaths.length < 1) {
            wx.showToast({
                title: '请上传产品图片',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.tempFilePaths1.length < 1) {
            wx.showToast({
                title: '请上传化验单',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.netcalorificpower == null || this.data.netcalorificpower == "") {
            wx.showToast({
                title: '请输入低位发热量',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.sulphur == null || this.data.sulphur == "") {
            wx.showToast({
                title: '请输入硫百分比',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.higherheatingvalue == null || this.data.higherheatingvalue == "") {
            wx.showToast({
                title: '请输入高位发热量',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.ashcontent == null || this.data.ashcontent == "") {
            wx.showToast({
                title: '请输入灰分百分比',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.moisture == null || this.data.moisture == "") {
            wx.showToast({
                title: '请输入水分百分比',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.volatilization == null || this.data.volatilization == "") {
            wx.showToast({
                title: '请输入挥发百分比',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.production == null || this.data.production == "") {
            wx.showToast({
                title: '请输入产品介绍',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.inventory == null || this.data.inventory == "") {
            wx.showToast({
                title: '请输入产品库存',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.price == null || this.data.price == "") {
            wx.showToast({
                title: '请输入产品价格',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.btnvalue == null || this.data.btnvalue == "") {
            wx.showToast({
                title: '请选择产品规格',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.companyname == null || this.data.companyname == "") {
            wx.showToast({
                title: '请输入企业名称',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.companyaddress == null || this.data.companyaddress == "") {
            wx.showToast({
                title: '请输入供应地址',
                icon: "none",
                duration: 1000
            })
        } else if (this.data.verificationcode == null || this.data.verificationcode == "") {
            wx.showToast({
                title: '请输入短信验证码',
                icon: "none",
                duration: 1000
            })
        } else {
            wx.showLoading({
                title: '发布中',
            })
            throttle(uploadRelease(this.data.title, this.data.netcalorificpower, this.data.sulphur, this.data.higherheatingvalue, this.data.ashcontent, this.data.moisture, this.data.volatilization, this.data.production, this.data.inventory, this.data.price, this.data.btnvalue, this.data.companyname, this.data.companyaddress, this.data.phonenumber, this.data.imgarr, this.data.imgstr).then(data => {
                wx.hideLoading()
                wx.showToast({
                  title: '发布成功,即将跳转',
                  icon:'none',
                  duration:2000
                })
                setTimeout(() => {
                    wx.navigateTo({
                        url: '../../pages/index/index',
                      })
                }, 2000);
                // console.log(data)
                this.setData({
                    title: null,
                    // 产品图片
                    tempFilePaths: [],
                    // 化验单
                    tempFilePaths1: [],
                    // 低位发热量
                    netcalorificpower: null,
                    // 硫
                    sulphur: null,
                    // 高位发热量
                    higherheatingvalue: null,
                    // 灰分
                    ashcontent: null,
                    // 水分
                    moisture: null,
                    // 挥发
                    volatilization: null,
                    // 产品介绍
                    production: null,
                    // 库存
                    inventory: null,
                    // 价格
                    price: null,
                    // 规格样式
                    btnindex: null,
                    // 规格value
                    btnvalue: null,
                    //   企业名称
                    companyname: null,
                    // 供应地址
                    companyaddress: null,
                    // 电话
                    phonenumber: null,
                    // 验证码
                    verificationcode: null,
                    // 服务器返回的产品图片
                    imgarr: [],
                    // 服务器返回的化验单图片
                    imgstr: null,
                })

            }).catch(err => {
                console.log(err)
            }), 3000)

        }

    },


})