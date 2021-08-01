// pages/search/search.js
import { reqSearchData,reqSearchDefault,reqSearchHot } from "../../api/index";
let isSend = false;//函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
      placeholderContent:'',
      hotList:[],
      searchContent:'',
      searchList:[],//模糊匹配的数据
      historyList:[]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getInitData();
      this.getSearchHistory();

  },
    async getInitData(){
        let placeholderData = await reqSearchDefault();
        let hotListData = await reqSearchHot();
        this.setData({
          placeholderContent:placeholderData.data.showKeyword,
          hotList:hotListData.data
        })

    },
    getSearchHistory(){
      let historyList = wx.getStorageSync('searchHistory');
      if(historyList){
          this.setData({
              historyList
          })
      }
    },
    handleInputChange(event){
      //搜索输入框发生变化的回调
        this.setData({
            searchContent:event.detail.value.trim()
        });
        if(isSend) return;
        isSend = true;
        this.getSearchList();
        setTimeout(()=>{
            isSend = false;
        },300)
    },
    //获取搜索结果列表
    async getSearchList(){
      if(!this.data.searchContent){
          this.setData({
              searchList:[]
          });
          return;
      }
      //发请求获取关键字模糊匹配数据
      let {searchContent,historyList} = this.data;
      let searchListData = await reqSearchData({keywords:searchContent,limit:10});
      this.setData({
            searchList:searchListData.result.songs
      });
      //同时把关键字添加到添加历史记录中；
      if(historyList.indexOf(searchContent)!== -1){//存在的话，把旧的历史记录删除，后面在数组的开头在加上
          historyList.splice(historyList.indexOf(searchContent),1)
      }
      historyList.unshift(searchContent);
      this.setData({
          historyList
      });
      //存进本地
        wx.setStorageSync('searchHistory',historyList)
    },
    clearSearchContent(){
      this.setData({
          searchContent:'',
          searchList:[]
      })
    },
    deleteSearchHistory(){
      wx.showModal({
          content:'确认删除历史记录吗？',
          success:(res)=>{
              if(res.confirm){
                  this.setData({
                      historyList:[]
                  });
                  wx.removeStorageSync('searchHistory')
              }
          }
      })
    },
    toVedioPage(){
      wx.navigateBack({
          delta:1
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

  }
})