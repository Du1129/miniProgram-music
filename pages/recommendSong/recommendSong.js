// pages/recommendSong/recommendSong.js
import {reqEverydayRecommand} from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate:null,
    currentMonth:null,
    recommendSongInfo:{}
    

  },
  async getRecommendSong(){
    let {data} = await reqEverydayRecommand();
    this.setData({recommendSongInfo:data})
    console.log(data);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendSong();
    let current = new Date();
    this.setData({currentDate:current.getDate()})
    this.setData({currentMonth:current.getMonth()+1})
    // console.log(this.data.currentTime)
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

  }
})