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

export const addEmp = (data)=>request({
  url: `/user/add`,
  method: 'post',
  data
})

export const resetPwd = (empId)=>request({
  url: `/user/resetPwd/${empId}`,
  method: 'get',
})

export const delEmps = (empIds)=>request({
  url: `/user/del/`,
  method: 'post',
  data:empIds
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

export const getAllEmp = (page,size)=>request({
  url: `/user/all/${page}/${size}`,
  method: 'get',
})

export const forbiddenEmps = (emps)=>request({
  url: `/user/forbidden`,
  method: 'post',
  data:emps
})

export const activeEmps = (emps)=>request({
  url: `/user/active`,
  method: 'post',
  data:emps
})

export const search = (content,page,size)=>request({
  url: `/user/search/${content}/${page}/${size}`,
  method: 'get',
})

export const updatePwd = (empId,updatePwdVo)=>request({
  url: `/user/updatePwd/${empId}`,
  method: 'post',
  data:updatePwdVo
})