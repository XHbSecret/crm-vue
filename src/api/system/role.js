import request from '../../utils/request'

export const addRole = (data)=>request({
  url: '/role/add',
  method: 'post',
  data
})
export const addEmpRole = (roleId,data)=>request({
  url: `/role/addEmpRole/${roleId}`,
  method: 'post',
  data
})

export const delRole = (roleId)=>request({
  url: `/role/del/${roleId}`,
  method: 'get',
})

export const delEmp = (data)=>request({
  url: `/role/delEmp`,
  method: 'post',
  data
})

export const updateRole = (data)=>request({
  url: '/role/update',
  method: 'post',
  data
})

export const getAllRole = ()=>request({
    url: '/role/all',
    method: 'get'
  })

export const getRoleByMenu = (menuId)=>request({
    url: `/role/menuRole/${menuId}`,
    method: 'get'
  })

export const getEmpByRoleId = (roleId,currentPage,size)=>request({
    url: `/user/find/role/${roleId}/${currentPage}/${size}`,
    method: 'get'
  })


export const updatePermsByRoleId = (roleId,permsIds)=>request({
  url: `/role/updateRoleMenuB/${roleId}`,
  method: 'post',
  data:permsIds
})

export const getRolesByEmpId = (empId)=>request({
  url: `/role/roles/${empId}`,
  method: 'get',
})

export const updateEmpRole = (empId,roleList)=>request({
  url: `/role/updateEmpRole/${empId}`,
  method: 'post',
  data:roleList
})

export const hasRole = (empId)=>request({
  url: `/role/hasRole/list/${empId}`,
  method: 'get',
})
