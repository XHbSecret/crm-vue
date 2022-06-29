import request from '../../utils/request'
// 根据客户id查询
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

//根据合同id删除
export const deleteContract = (contractId)=>request({
    url: `/contract/del/${contractId}`,
    method: 'get',
})

//修改合同草稿
export const updateContract = (data)=>request({
    url: `contract/update`,
    method: 'post',
    data
})

//根据合同id查询
export const getContractById = (contractId)=>request({
    url: `contract/selectOne/${contractId}`,
    method: 'get',
})
//多条件查询
export const getContractsBycontract = (data,page1,size)=>request({
    url: `contract/getContractsBycontract/${page1}/${size}`,
    method: 'post',
    data
})
