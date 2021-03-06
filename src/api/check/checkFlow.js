import request from '../../utils/request'

export const getAllCheckFlow = (page,size)=>request({
    url: `/check/all/${page}/${size}`,
    method: 'get'
  })

export const getCheckUserByCheckId = (checkId)=>request({
  url: `/ch/user/list/${checkId}`,
  method: 'get'
})

export const updateCheckUser = (checkId,userIds)=>request({
  url: `/ch/user/update/${checkId}`,
  method: 'post',
  data:userIds
})

export const getRecordBySendId = (sendId)=>request({
  url: `/record/send/${sendId}`,
  method: 'get',
})

export const getRecordByType = (type)=>request({
  url: `/record/type/${type}`,
  method: 'get',
})

export const getRecordByPage = (currentPage,size)=>request({
  url: `/record/list/${currentPage}/${size}`,
  method: 'get',
})

export const getRecordByMePage = (userId,currentPage,size)=>request({
  url: `/record/byMe/${userId}/${currentPage}/${size}`,
  method: 'get',
})

export const getAlreadyCRecordByMePage = (userId,currentPage,size)=>request({
  url: `/record/alreadyC/${userId}/${currentPage}/${size}`,
  method: 'get',
})

export const updStatus = (data)=>request({
  url: `/record/updStatus`,
  method: 'post',
  data
})

export const getRecordByService = (flowId,serviceId)=>request({
  url: `/record/ser/${flowId}/${serviceId}`,
  method: 'get',
})

export const getRecordByCondition = (method,type,status,currentPage,size)=>request({
  url: `/record/condition/${method}/${type}/${status}/${currentPage}/${size}`,
  method: 'get',
})
export const getBackMoneyByCustomerId = (custId)=>request({
  url: `back/getBackMoneyByCustomerId/${custId}`,
  method: 'get',
})

export const addCheckFlow = (checkFlow)=>request({
  url: `/check/add`,
  method: 'post',
  data:checkFlow
})
export const delCheckFlow = (id)=>request({
  url: `/check/del/${id}`,
  method: 'get',
})

export const getAllCheckObj = ()=>request({
  url: `/checkObj/all`,
  method: 'get',
})