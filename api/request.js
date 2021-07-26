
const BASEURL = "https://netease-cloud-music-api-lcx12901.vercel.app"
export const request = ({url,data={},method='get'}) => {
    wx.showLoading({
      title: '正在努力加载…',
      mask:true
    })
    return new Promise((resolve,reject) => {
        wx.request({
            url: BASEURL+url,
          data,
          method,
          success(res){
              resolve(res.data);
              wx.hideLoading()
            },
            fail(err){
                reject(err);
                wx.hideLoading()
            }
        })
    })
}