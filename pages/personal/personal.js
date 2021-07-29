// pages/personal/personal.js
// let startY = 0;
// let moveY = 0;
// let moveDistance = 0;
import {reqUserLevel,reqUserPlayList} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data:{
    coverTransform:'translateY(0)',
    coverTransition:'',
    userInfo:{},
    userLevel:null,
    recentPlayList:[],
    favorInfo:{},//我喜欢的
    createdPlayList:[],//我创建的
    starPlayList:[],//我收藏的
    isFixed:false,//是否固定切换栏
    isActive:true,
    starTop:null


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  // handleTouchStart(event){
  //   startY = event.touches[0].clientY;
  //   this.setData({
  //     coverTransition:''
  //   })

  // },
  // handleTouchMove(event){
  //   moveY = event.touches[0].clientY;
  //   moveDistance = moveY - startY;
  //   if(moveDistance <= 0 ){
  //     return;
  //   }
  //   if(moveDistance >= 80){
  //     moveDistance = 80;
  //   }
  //   this.setData({
  //     coverTransform:`translateY(${moveDistance}rpx)`
  //   })

  // },
  // handleTouchEnd(){
  //   this.setData({
  //     coverTransform:`translateY(0)`,
  //     coverTransition:`transform 0.5s linear`
  //   })
  // },

  toLogin(){
    if(this.data.userInfo.nickname) return;
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },
  // async getUserRecentPlayList(userId) {
  //   let recentPlayListData = await reqRecentRecord({uid:userId,type:0});
  //   let index = 0;
  //   let recentPlayList = recentPlayListData.allData.splice(0,10).map(item=>{
  //     item.id = index++;
  //     return item;
  //   });
  //   this.setData({
  //     recentPlayList
  //   })
  // },
  async getUserLevel(){
    let {data} = await reqUserLevel();
    this.setData({userLevel:data.level});
  },
  async getUserPlayList(uid){
    let res = await reqUserPlayList(uid)
    console.log(res.playlist);
    this.setData({favorInfo:res.playlist[0]});
    res.playlist.shift();
    let createdPlayList=[] , starPlayList = [];
    res.playlist.forEach(item => {
      if(item.userId === uid){
        createdPlayList.push(item);
        this.setData({createdPlayList})
      }else{
        starPlayList.push(item);
        this.setData({starPlayList})
      }
    })
    //
    var query = wx.createSelectorQuery();
    query.select('.star').boundingClientRect();//添加节点的布局位置的查询请求
    query.exec((res)=>{ //执行所有添加的请求
        // console.log(res);  
        // this.setData()
        this.setData({starTop:res[0].top})
    })
  },
  scrollTap(ev){
    // console.log(ev.currentTarget.dataset.type);
    let type = ev.currentTarget.dataset.type;
    wx.pageScrollTo({
      selector:`.${type}`,
      duration:500
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
    let userInfo = wx.getStorageSync('userInfo');
    // console.log(userInfo);
    if(userInfo){
      //获取用户等级
      this.getUserLevel();
      this.getUserPlayList(userInfo.userId);
      //更新userInfo的状态
      this.setData({
        userInfo
      })
    }
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onPageScroll(ev){
    // console.log(ev.scrollTop);
    
    if(ev.scrollTop>this.data.starTop-12){
      this.setData({isActive:false})
    }else{
      this.setData({isActive:true})
    }
    if(ev.scrollTop>310){
      this.setData({isFixed:true})
    }
    else{
      this.setData({isFixed:false})
    }
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