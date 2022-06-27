import request from '../../utils/request'
//获取所有流程(无条件)
export const getFlows = (pageNum,pageSize)=>request({
    url: `/user/allFlows/${pageNum}/${pageSize}`,
    method: 'post',
  })

// 查询流程（通过流程名）
export const getFlowss = (pageNum,pageSize,data)=>request({
    url: `/user/allFlowss/${pageNum}/${pageSize}`,
    method: 'post',
    data
  })

export const getAllFlows =()=>request({
  url: `/user/allFlows`,
  method: 'get',
})

// 查询所有的步骤（有分页）
export const getAllFlowDetails=(pageNum,pageSize)=>request({
  url:`/user/allFlowDetails/${pageNum}/${pageSize}`,
  method:"get"
})

// 查询所有的步骤（有分页有条件）
export const getAllFlowDetailsName=(pageNum,pageSize,flow)=>request({
  url:`/user/allFlowDetails/${pageNum}/${pageSize}`,
  method:"post",
  data:flow
})


export const getAllFlowDetailss=()=>request({
  url:`/user/allFlowDetailss`,
  method:"get"
})

export const getALlFlowss=()=>request({
  url:`/user/findAllFlow`,
  method:"get"
})
//获取单个流程的详情
export const getFlowDetails = (flowId)=>request({
  url: `/user/allFlow/${flowId}`,
  method: 'get',
  data:flowId
})

export const getFlowRecordss=(flowOppId)=>request({
  url: `/user/allFlowRecord/${flowOppId}`,
  method: 'get'
})


//添加流程
export const addFlow = (flow)=>request({
    url: `/user/addFlows`,
    method: 'post',
    data:flow
})
//删除流程
export const delFlow = (Id)=>request({
  url: `/user/delFlow/${Id}`,
  method: 'get',
  data:Id
})
//修改流程
export const editFlow = (flow)=>request({
  url: `/user/editFlow`,
  method: 'post',
  data:flow
})
export const editFlowStatus = (flow)=>request({
  url: `/user/editFlowStatus`,
  method: 'post',
  data:flow
})
//添加详情
export const addDetails = (details)=>request({
  url: `/user/addFlowDetails`,
  method: 'post',
  data:details
})

export const delDetails = (id)=>request({
  url:`/user/delFlowDetail/${id}`,
  method:'post',
  data:id
})

export const editDetails= (flowDetail)=>request({
  url:`/user/editFlowDetails`,
  method:'post',
  data:flowDetail
})

export const addDetail =(ids,flowId)=>request({
  url:`/user/addDetails/${flowId}`,
  method:"post",
  data:ids,
})

export const aditDetailNull = (id)=>request({
  url:`/user/editFlowDetail/${id}`,
  method:"post"
})

export const editFlowRecords=(data)=>request({
  url:`/user/updateFlowRecords`,
  method:"post",
  data
})