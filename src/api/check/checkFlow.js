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