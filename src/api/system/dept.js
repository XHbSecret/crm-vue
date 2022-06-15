import request from '../../utils/request'

export const getAllDeptPage = (currentPage,size)=>request({
    url: `/dept/all/${currentPage}/${size}`,
    method: 'get'
  })

export const addDept = (dept)=>request({
    url: `/dept/add`,
    method: 'post',
    data:dept
})

export const getEmpByDeptId = (deptId,currentPage,size)=>request({
  url: `/user/find/dept/${deptId}/${currentPage}/${size}`,
  method: 'get'
})

export const delDeptById = (deptId)=>request({
  url: `/dept/del/${deptId}`,
  method: 'get'
})

export const transferDept = (deptId,empId)=>request({
  url: `/dept/trans/${deptId}/${empId}`,
  method: 'get'
})

export const transferDeptList = (deptId,empIds)=>request({
  url: `/dept/mTrans/${deptId}`,
  method: 'post',
  data:empIds
})
