// pages/songDetail/songDetail.js
import {reqSongDetail,reqSongUrl} from "../../api/index"
import moment from '../../miniprogram_npm/moment/index.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:true,
    song:{},
    musicId:'',
    index:null,
    musicUrl:'',
    statusH:null,
    scrollTop:null,
    currentTime:'00:00',
    totalTime:'00:00',
    currentPercent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      complete: (res) => {
        // console.log(res);
        this.setData({
          statusH:res.statusBarHeight,
          scrollTop:res.statusBarHeight+46
        })
      },
    })
    console.log(app.globalData);
    let {musicId,index} = options;
    // console.log(musicId);
    this.setData({musicId,index})

    this.getSongDetail(musicId);

    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // console.log(this.backgroundAudioManager.src);
    //监听歌曲进度
    this.backgroundAudioManager.onTimeUpdate(() => {
      // console.log(this.backgroundAudioManager.currentTime)
      this.setData({
        currentTime:moment(this.backgroundAudioManager.currentTime * 1000).format("mm:ss"),
        currentPercent:this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration *100
      })
    })

    this.backgroundAudioManager.onPlay(() => {
      this.setData({isPlay:true})
      // 
    })

    this.backgroundAudioManager.onPause(() => {
      this.setData({isPlay:false})
    })

  },
  async getSongDetail(musicId){
    let songDetail = await reqSongDetail(musicId);
    let totalTime = moment(songDetail.songs[0].dt).format('mm:ss')
    this.setData({
      song:songDetail.songs[0],
      totalTime,
    });
  },
  async getSongUrl(){
    const {data} = await reqSongUrl(this.data.musicId)
    this.setData({musicUrl:data[0].url})
    // 给背景音乐设置地址
    this.backgroundAudioManager.src = this.data.musicUrl
    this.backgroundAudioManager.title = this.data.song.name;
  },
  handlePlay(){
    this.setData({isPlay:!this.data.isPlay})
    const {isPlay,musicId,musicUrl} = this.data;
    this.musicControl(isPlay,musicId,musicUrl);
  },
  
  async musicControl(isPlay,musicId,musicUrl){
    if(isPlay){
        if(!musicUrl){
            let {data} = await reqSongUrl(musicId)
            console.log(data);
            //创建一个音频的实例对象；
            musicUrl=data[0].url;
            this.setData({
                musicUrl
            })
        }
      //获取音乐播放链接
      if(musicUrl !== this.backgroundAudioManager.src) {
        this.backgroundAudioManager.src = musicUrl;
        this.backgroundAudioManager.title = this.data.song.name;
      }
    }else{
      //暂停播放
      this.backgroundAudioManager.pause()
    }
  },
  switchSong(e){
    let {type} = e.currentTarget.dataset;
    let {index} = this.data;
    console.log(type,index);
    if(type === "pre"){
        index -- 
        if(index < 0){
          index = app.globalData.playingList.length - 1
        }
    }else{
      index++
      if(index > app.globalData.playingList.length - 1){
        index = 0
      }
    }
    this.setData({
      musicId:app.globalData.playingList[index].id,
      index
    }) 
    this.getSongDetail(this.data.musicId)
    this.getSongUrl();

    
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