import request from '../../utils/request'
export const getContractByCustId = (custId)=>request({
    url: `/contract/customer/${custId}`,
    method: 'get'
})

export const getAllContractPage = (page,size)=>request({
    url: `/contract/selectList/${page}/${size}`,
    method: 'get'
})

export const getContractByEmp = (empId,page,size)=>request({
    url: `/contract/byEmp/page/${empId}/${page}/${size}`,
    method: 'get'
})

export const addContractTo = (data)=>request({
    url: `/contract/add`,
    method: 'post',
    data
})

export const searchByLike = (page,size,content)=>request({
    url: `/contract/like/${content}/${page}/${size}`,
    method: 'get',
})

export const updateStatus = (contractId,contractStatus)=>request({
    url: `/contract/updStatus/${contractId}/${contractStatus}`,
    method: 'get',
})
