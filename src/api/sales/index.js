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

export const addOpportunity=(data)=>request({
  url:`/opp/addOpps`,
  method:"post",
  data
})

export const findEmps = ()=>request({
  url:`/opp/findEmp`,
  method:"get"
})

export const findById = (opportunity)=>request({
  url: `/opp/findEmpById`,
  method: 'post',
  data:opportunity
})

export const findCust = (page,size)=>request({
  url:`/opp/findCust/${page}/${size}`,
  method:"get"
})

export const findOppLogs = (oppId)=>request({
  url:`/opp/findOppLog/${oppId}`,
  method:'get'
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

export const getFlowRecords =(oppId)=>request({
  url:`/opp/getFlowRecordById/${oppId}`,
  method:"post"
})

export const delOppById=(oppId)=>request({
  url:`/opp/delById/${oppId}`,
  method:"get"
})

// 修改阶段
export const editSalesDetailsId= (detailsId,opportunity)=>request({
  url:`/opp/updateByOppId/${detailsId}`,
  method:'post',
  data:opportunity
})

// 更改成交状态与归档（1为未完成，2为已完成，3为归档）
export const updateSales=(data,status)=>request({
  url:`/opp/updateOppStatus/${status}`,
  method:"post",
  data
})

export const getOppVisits=(oppId)=>request({
  url:`/opp/getOppVisitAllById/${oppId}`,
  method:"get"
})

export const addOppVisit=(data)=>request({
  url:`/opp/addOppVisit`,
  method:"post",
  data
})