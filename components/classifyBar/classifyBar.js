// components/classifyBar/classifyBar.js
const app =getApp()
import {requestData} from "../../utils/network"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bartxt: [
            "大料",
            "中料",
            "小料",
            "米料",
            "焦面",
        ],
        activeindex: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    requestData(e){
        // console.log(e.currentTarget.dataset.txt)
        var fenlei=e.currentTarget.dataset.txt
        var that =this
        this.setData({
            activeindex: e.currentTarget.dataset.index
        })
        // console.log(that)
        requestData(fenlei).then(data=>{
                // console.log(data.data.data)
                // that.setData({
                //     productlist:data.data
                // })
                that.triggerEvent('showData', data.data.data);
            }).catch(err=>{
                console.log(err)
            })
    }
})