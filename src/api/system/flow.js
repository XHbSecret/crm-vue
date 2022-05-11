import request from '../../utils/request'
//获取所有流程
export const getFlows = ()=>request({
    url: `/user/allFlows`,
    method: 'get'
  })
//获取单个流程的详情
export const getFlowDetails = (flowId)=>request({
  url: `/user/allFlow/${flowId}`,
  method: 'get',
  data:flowId
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

