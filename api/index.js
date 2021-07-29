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
//获取用户目前等级
export const reqUserLevel = () => {
    return request({url:"/user/level"})
}

//获取用户歌单(包括我喜欢，我创建的，我收藏的)
export const reqUserPlayList = (uid) => {
    return request({
        url:'/user/playlist',
        data:{
            uid
        }
    })
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
export const reqHomeRecommendList = (limit) => {
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

export const reqRecentRecord = (data) => {
    return request({
        url:"/user/record",
        data
    })
}
//获取每日推荐
export const reqEverydayRecommand = () => {
    return request({
        url:"/recommend/songs"
    })
}
//视频页相关
//分类列表
export const reqVideoGroupList = () => {
    return request({url:'/video/group/list'})
}
export const reqVideoList = (data) => {
    return request({
        url:"/video/group",
        data
    })
}