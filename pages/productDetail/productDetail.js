// pages/productDetail/productDetail.js
import {productDetail} from "../../utils/network"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:0,
    productDetail:null,
    host:"https://wldpvc.com/",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      complete: (res) => {},
    })
       this.setData({
         productId:options.id
       })
      //  console.log(this.data.productId)
      productDetail(this.data.productId).then(data=>{
        this.setData({
          productDetail:data.data.data
        })
        // console.log(this.data.productDetail)

      }).catch(err=>{
        console.log(err)
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
  // 去发布
  gorelease:function () {
    wx.navigateTo({
      url: '../../pages/release/release',
    })
  },
  // 打电话
  callPhone(e){
    var phone = e.currentTarget.dataset.phone
    wx.showModal({
     title:'拨打电话',
     content:phone,
     success(res){
       if(res.confirm){
         wx.makePhoneCall({
           phoneNumber: phone,
         })
       }else if(res.cancel){
        //  console.log("用户取消了")
       }
     }
    })
  },
  tobig(e){
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
  }
})