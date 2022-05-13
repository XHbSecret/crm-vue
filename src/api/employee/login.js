// import request from '@/utils/request'

import request from '../../utils/request'

export const login = (data)=>request({
    url: `/user/login`,
    method: 'post',
    data
  })

export const logout = ()=>request({
  url: `/user/logout`,
  method: 'get',
})

export const updateEmp = (data)=>request({
  url: `/user/update`,
  method: 'post',
  data
})

export const uploadHead = (data)=>request({
  url: `/user/uploadHead`,
  method: 'post',
  data
})