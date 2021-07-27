// index.js

import {
  reqLoginData,
  reqBannerData,
  reqHomeNavIcon,
  reqHomeRecommandList,
  reqTopListDetail
} from "../../api/index.js"
Page({
  data: {
    bannerList:[],
    navIconList:[],
    recommandList:[],
    topListId:{
      0: '3779629', //云音乐新歌榜
      1: '3778678', //云音乐热歌榜
      2: '2884035', ///云音乐原创榜
      3: '19723756', //云音乐飙升榜
      4: '10520166', //云音乐电音榜
      5: '180106', //UK排行榜周榜
      6: '60198', //美国Billboard周榜
      7: '21845217', //KTV嗨榜
      8: '11641012', //iTunes榜
      9: '120001', //Hit FM Top榜
      10: '60131', //日本Oricon周榜
      11: '3733003', //韩国Melon排行榜周榜
      12: '60255', //韩国Mnet排行榜周榜
      13: '46772709', //韩国Melon原声周榜
      14: '112504', //中国TOP排行榜(港台榜)
      15: '64016', //中国TOP排行榜(内地榜)
      16: '10169002', //香港电台中文歌曲龙虎榜
      17: '4395559', //华语金曲榜
      18: '1899724', //中国嘻哈榜
      19: '27135204', //法国 NRJ EuroHot 30周榜
      20: '112463', //台湾Hito排行榜
      21: '3812895', //Beatport全球电子舞曲榜
      22: '71385702', //云音乐ACG音乐榜
      23: '991319590', //云音乐说唱榜,
      24: '71384707', //云音乐古典音乐榜
      25: '1978921795', //云音乐电音榜
      26: '2250011882', //抖音排行榜
      27: '2617766278', //新声榜
      28: '745956260', //云音乐韩语榜
      29: '2023401535', //英国Q杂志中文版周榜
      30: '2006508653', //电竞音乐榜
      31: '2809513713', //云音乐欧美热歌榜
      32: '2809577409', //云音乐欧美新歌榜
      33: '2847251561', //说唱TOP榜
      34: '3001835560', //云音乐ACG动画榜
      35: '3001795926', //云音乐ACG游戏榜
      36: '3001890046', //云音乐ACG VOCALOID榜
    },
    topList:[]
  },
  // 事件处理函数
  onLoad() {
    this.getLogin()
    this.getSwiperList();
    this.getHomePageIcon();
    this.getRecommandList();
    this.getTopList();
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
  },
  async getHomePageIcon(){
    const {data} = await reqHomeNavIcon();
    console.log(data)
    this.setData({navIconList:data})
  },
  async getRecommandList(){
    const {result:recommandList} = await reqHomeRecommandList(6);
    this.setData({recommandList})
  },
  getTopList(){
    let idArr = [];
    while(idArr.length<5){
      let id = Math.floor(Math.random()*Object.keys(this.data.topListId).length)
      if(idArr.includes(id)) continue;
      idArr.push(id);
      
    }
    let topList = [];
    idArr.forEach(async (item) => {
      const {playlist} = await reqTopListDetail(this.data.topListId[item]);
      const {id,name,tracks} = playlist;
      topList.push({
        id,
        name,
        tracks:tracks.slice(0,3)
      })
      this.setData({topList})
    })
    console.log(topList);
    
    
  }
})
