// index.js

import {reqLoginData,reqBannerData} from "../../api/index.js"
Page({
  data: {
    bannerList:[]
  },
  // 事件处理函数
  onLoad() {
    this.getLogin()
    this.getSwiperList();
  },
  
  async getLogin(){
    const res = await reqLoginData({
      phone:'15602241613',
      password:'asd31415926535'
    })
    console.log(res);
  },
  async getSwiperList(){
    const {banners} = await reqBannerData();
    console.log(banners);
    this.setData({bannerList:banners})
  }
})
