import request from '../../utils/request'

export const getCompanyById = (ids)=>request({
  url:`/company/getByCompanyId`,
  method:'post',
  data:ids
})

export const getCompanyVos=()=>request({
  url:`/company/findCompanyVo`,
  method:'get',
})