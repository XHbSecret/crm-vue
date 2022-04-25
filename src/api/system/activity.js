import request from '../../utils/request'

export const getAllActivity = (page,size)=>request({
    url: `/activity/all/${page}/${size}`,
    method: 'get'
  })