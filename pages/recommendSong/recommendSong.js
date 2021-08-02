// pages/recommendSong/recommendSong.js
import {reqEverydayRecommand} from "../../api/index"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate:null,
    currentMonth:null,
    recommendSongInfo:{},
    isFix:false
    

  },
  async getRecommendSong(){
    let {data} = await reqEverydayRecommand();
    this.setData({recommendSongInfo:data})
    // console.log(data);
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendSong();
    let current = new Date();
    this.setData({
      currentDate:current.getDate(),
      currentMonth:current.getMonth()+1
    })
    // console.log(this.data.currentTime)
  },
  toSongDetail(event){
    let {id,index} = event.currentTarget.dataset;
    // this.setData({
      
    // });
    wx.navigateTo({
      url:'/pages/songDetail/songDetail?musicId='+ id +'&index='+index
    })
  },
  bubbleTap(){
    app.globalData = {
      ...app.globalData,
      playingList:this.data.recommendSongInfo.dailySongs
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPageScroll:function(ev){
    // console.log(ev.scrollTop);
    if(ev.scrollTop>250){
      this.setData({isFix:true})
    }else{
      this.setData({isFix:false})
    }
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