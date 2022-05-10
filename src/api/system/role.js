import request from '../../utils/request'

export const getAllRole = ()=>request({
    url: '/role/all',
    method: 'get'
  })

export const getRoleByMenu = (menuId)=>request({
    url: `/role/menuRole/${menuId}`,
    method: 'get'
  })
