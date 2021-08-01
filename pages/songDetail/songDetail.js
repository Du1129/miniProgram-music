// pages/songDetail/songDetail.js
import {reqSongDetail,reqSongUrl} from "../../api/index"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:true,
    song:{},
    musicId:'',
    musicUrl:'',
    statusH:null,
    scrollTop:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      complete: (res) => {
        this.setData({
          statusH:res.statusBarHeight,
          scrollTop:res.statusBarHeight+46
        })
      },
    })
    let {musicId} = options;
    console.log(musicId);
    this.setData({musicId})

    this.getSongDetail(musicId);

    this.backgroundAudioManager = wx.getBackgroundAudioManager();

  },
  async getSongDetail(musicId){
    let songDetail = await reqSongDetail(musicId);
    // let totalTime = moment(songDetail.songs[0].dt).format('mm:ss')
    this.setData({
      song:songDetail.songs[0],
        // totalTime
    });
  },
  async musicControl(isPlay,musicId,musicUrl){
    if(isPlay){
        if(!musicUrl){
            let {data} = await reqSongUrl(musicId)
            console.log(data);
            //创建一个音频的实例对象；
            musicUrl = data[0].url;
            this.setData({
                musicUrl
            })
        }
      //获取音乐播放链接
      this.backgroundAudioManager.src = musicUrl;
      this.backgroundAudioManager.title = this.data.song.name;

    }else{
      //暂停播放
      this.backgroundAudioManager.pause()
    }
  },
  toPrePage(){
    wx.navigateBack({
      delta: 1
    });
    console.log('11111')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let {isPlay,musicId,musicUrl} = this.data;
    this.musicControl(isPlay,musicId,musicUrl);
    

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