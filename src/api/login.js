import request from '@/utils/request'


export function login(username,password,code,uuid) {
    const data = {
        username,
        password,
        code,
        uuid
    }
    return request({
        url:'/login',
        headers:{
            isToken: false
        },
        method: 'post',
        data: data
    })
}

export function getLineName(query) {
    return request({
        url: '/board/line',
        method: 'get',
        params: query
    })
}

export function getBoard(query) {
    return request({
      url: '/system/post/list',
      method: 'get',
      params: query
    })
  }
export function getReview(query) {
    return request({
        url:'/feeder/list/stop',
        method: 'get',
        params: query
    })
}

export function getWare(query){
    return request({
        url:'/board/wareHouseBoard',
        method: 'get',
        params:query
    })
}

export function searchWare(lineName){
    return request({
        url:'/board/lineBoard',
        method: 'get',
        params:{lineName}
    })
}

export function findWare(lineName,machine){
    return request({
        url:'/board/lineBoard/machineAndModule',
        method: 'get',
        params:{lineName,machine}
    })
}

export function getSurplus() {
    return request({
        url:'/feeder/list/current/qty',
        method: 'get',
    })
}
// export function getBoard(lineName) {
//     return request ({
//     url: '/rests/ez/getReelMaterialBoard/',
//     method: 'get',
//     params: {lineName},
//     timeout: 20000
// })
// }

export function getCodeImg() {
    return request ({
        url: '/captchaImage',
        headers: {
            isToken:false
        },
        method: 'get',
        timeout: 20000
    })
}

export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}