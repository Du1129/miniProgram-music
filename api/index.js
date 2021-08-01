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
//获取歌单，排行榜详情数据
export const reqPlayListDetail = (id) => {
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

//请求视频播放url
export const reqVideoUrl = (id) => {
    return request({url:`/video/url?id=${id}`})
}
//歌曲播放页相关
export const reqSongDetail = (ids) => {
    return request({url:'/song/detail',data:{ids}})
}
export const reqSongUrl = (id) => {
    return request({
        url:'/song/url',
        data:{id}
    })
}
//搜索
export const reqSearchData = (data) => {
    return request({
        url:'/search',
        data
    })
}
export const reqSearchDefault = () => {
    return request({
        url:'/search/default'
    })
}
export const reqSearchHot = () => {return request({url:'/search/hot/detail'})}