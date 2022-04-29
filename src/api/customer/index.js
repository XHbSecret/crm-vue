// import request from '@/utils/request'

import request from '../../utils/request'

export const getCustomers = (page,size,eid)=>request({
    url: `/customer/part/${page}/${size}/${eid}`,
    method: 'get'
  })