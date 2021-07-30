// pages/video/video.js
import {reqVideoGroupList, reqVideoList,reqVideoUrl} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],
    navId:'',
    offset:0,
    videoList:[],
    videoId:'',//视频id标识；
    videoUpdateTime:[],
    isTriggered:false,
    videoUrl:null


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData();

  },
  async getVideoGroupListData(){
    let {data} = await reqVideoGroupList();
    let index = Math.floor(Math.random()*(data.length-10))
    let videoGroupList = data.slice(index,index+10);
    this.setData({
      videoGroupList,
      navId: videoGroupList[0].id
    });

    // 获取视频列表数据
    this.getVideoList();
  },
  async getVideoList(){
    if(!this.data.navId) return;
    let {datas} = await reqVideoList({id:this.data.navId,offset:this.data.offset});
    console.log(datas);


    let index = 0;
    let videoList = datas.map((item) => {
      item.id = index++;
      return item;
    });
    this.setData({
      videoList,
      isTriggered:false
    })
    // this.getVideoUrl();
  },
  // getVideoUrl(){
  //   this.setData({videoUrls:[]})
  //   this.data.videoList.forEach(async (item) =>{
  //     const {urls} = await reqVideoUrl(item.data.vid);
  //     // console.log(urls);
  //     this.data.videoUrls.push(urls[0]);
  //     this.setData({videoUrls:this.data.videoUrls})
  //   })
    
  // },
  //点击切换导航
  changeNav(event){
    // console.log(event);
    let navId = event.target.id;
    this.setData({
      navId:navId>>>0,
      videoList:[],
      videoUrls:[],
      offset:0
    });
    this.getVideoList();
  },

  //点击播放/继续播放
  async handlePlay(event){
    let vid = event.currentTarget.id;
    const {urls} = await reqVideoUrl(vid);

    this.setData({videoUrl:urls[0].url})
    // 更新视频ID
    // if(code===200)
      this.setData({
        videoId:vid
      });
    //创建video标签实例对象
    this.videoContext = wx.createVideoContext(vid);
    //判断之前是否有播放过，是否有播放记录
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid ===vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime)
    }else{
      this.videoContext.play();
    }


  },
  handleTimeUpdate(event){
    let videoTimeObj = {vid:event.currentTarget.id,currentTime:event.detail.currentTime};
    let {videoUpdateTime} = this.data;

    let videoItem = videoUpdateTime.find(item=>item.vid === videoTimeObj.vid);
    if(videoItem){
      if(event.detail.currentTime !== 0) videoItem.currentTime = event.detail.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj);
    }
    this.setData({
      videoUpdateTime
    })
  },

  handleEnd(event){
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item=>item.vid === event.currentTarget.id),1)
    this.setData({
      videoUpdateTime
    })

  },
//定义列表下拉刷新
  handleRefresher(){
    this.setData({offset:0})
    // console.log("下拉刷新成功")
    this.getVideoList();
  },
  toSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
    })

  },
  async handleToLower(){
    //网易云没提供分页功能，以下是模拟数据
    let {offset} = this.data;
    offset++;
    this.setData({offset})
    let {videoList} = this.data;
    const {datas} = await reqVideoList({id:this.data.navId,offset})
    let index = offset*datas.length;
    let newVideoList = datas.map((item) => {
      item.id = index++;
      return item;
    });
    videoList.push(...newVideoList);
    this.setData({
      videoList
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
    // console.log("页面的下拉刷新触发了")

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from}) {
    console.log(from)
    if(from === 'button'){
      return {
        title:'来自button',
        page:'/pages/video/video',
        imageUrl: '/static/images/nvshen.jpg'
      }
    }else{
      return {
        title:'来自右上角的转发',
        page:'/pages/video/video',
        imageUrl: '/static/images/nvshen.jpg'
      }
    }

  }
})