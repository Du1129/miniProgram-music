
import {reqLoginData} from "../../api/index"
Page({
  data: {
  },
  onLoad(options) {

  },
  async formSubmit(e){
    console.log(e.detail.value);
    if(e.detail.value.checkbox.length === 0){
      return wx.showToast({
        title: '请勾选同意用户协议',
        icon:'none',
        mask:true
      })
    }
    const {phone,password} = e.detail.value;
    const res = await reqLoginData({phone,password})
    if(res.code !== 200) return wx.showToast({
      title: res.msg,
      icon:'error',
    })
    wx.setStorageSync('userInfo',res.profile);
    wx.setStorageSync('cookie', res.cookie)
    wx.showToast({
      title: '登录成功',
      icon:'success'
    })
    wx.navigateBack({
      delta: 1
    });
  },
  onReady() {

  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
});