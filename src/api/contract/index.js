import request from '../../utils/request'
export const getContractByCustId = (custId)=>request({
    url: `/contract/customer/${custId}`,
    method: 'get'
})