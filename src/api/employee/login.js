// import request from '@/utils/request'

import request from '../../utils/request'

export const login = (data)=>request({
    url: `/user/login`,
    method: 'post',
    data
  })