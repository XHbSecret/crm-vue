import request from '../../utils/request'

export const getButtonPerms = ()=>request({
    url: '/menu/type/B',
    method: 'get'
  })

export const getAllMenu = ()=>request({
  url: '/menu/allMenu',
  method: 'get'
})

export const addMenu = (menu)=>request({
  url: '/menu/add',
  method: 'post',
  data:menu
})