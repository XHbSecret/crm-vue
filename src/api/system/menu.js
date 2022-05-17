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

export const delMenu = (menuId)=>request({
  url: `/menu/del/${menuId}`,
  method: 'get'
})

export const updateMenu = (menu)=>request({
  url: '/menu/update',
  method: 'post',
  data: menu
})

export const searchMenus = (menuName)=>request({
  url: `/menu/search/${menuName}`,
  method: 'get',
})

export const getAllPerms = ()=>request({
  url: `/menu/allPerms`,
  method: 'get',
})