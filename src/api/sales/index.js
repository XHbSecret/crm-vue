import request from '../../utils/request'

export const getAllOpp = (page,size,data)=>request({
    url: `/opp/getAllOpp/${page}/${size}`,
    method: 'post',
    data
  })
export const getAllOpps = (page,size)=>request({
    url: `/opp/getAllOpps/${page}/${size}`,
    method: 'get',
  })

export const addOpp = (data)=>request({
  url:`/opp/addOpp`,
  method:"post",
  data
})

export const findEmps = ()=>request({
  url:`/opp/findEmp`,
  method:"get"
})

export const findCust = (page,size)=>request({
  url:`/opp/findCust/${page}/${size}`,
  method:"get"
})

// 批量删除
export const delSales = (opportunity)=>request({
  url:`/opp/del`,
  method:'post',
  data:opportunity
})

// 批量转移
export const editSales = (empId,opportunity)=>request({
  url:`/opp/update/${empId}`,
  method:'post',
  data:opportunity
})

// 单个转移
export const editSalesBySinger = (empId,opportunity)=>request({
  url:`/opp/updateBySinger/${empId}`,
  method:'post',
  data:opportunity
})
