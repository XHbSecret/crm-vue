import request from '../../utils/request'

export const getAllBackMoney = (page,size)=>request({
    url: `/back/list/${page}/${size}`,
    method: 'get'
  })

export const updateStatusById = (backId)=>request({
    url: `/back/updStatus/${backId}`,
    method: 'get'
  })
