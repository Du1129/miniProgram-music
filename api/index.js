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