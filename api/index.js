import { request } from "./request.js"

//用户登录
export const reqLoginData = (data) => {
    return request(
        {
            url:'/login/cellphone',
            data
        }   
    )
}
//获取轮播图数据
export const reqBannerData = () => {
    return request({
        url:"/banner?type=2"
    })
}
//获取首页导航栏图标
export const reqHomeNavIcon = () => {
    return request({url:"/homepage/dragon/ball"})
}
//获取首页推荐歌单
export const reqHomeRecommandList = (limit) => {
    return request({url:"/personalized",data:{
        limit
    }})
}
//获取首页排行榜数据
export const reqTopListDetail = (id) => {
    return request({
        url:`/playlist/detail?id=${id}`
    })
}