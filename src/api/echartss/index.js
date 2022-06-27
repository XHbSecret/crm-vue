import request from '../../utils/request'

// 支出单
export const outlay=()=>request({
    url:`/echarts/outlay`,
    method:"get"
})

export const getCustJob=(page,size)=>request({
    url:`/echarts/custJob/${page}/${size}`,
    method:"get"
})

export const getCustAdd=(pageNum,pageSize,times)=>request({
    url:`/echarts/custAddByTime/${pageNum}/${pageSize}/${times}`,
    method:"get",
})

export const getContractAdd=(pageNum,pageSize,times)=>request({
    url:`/echarts/contractAddByTime/${pageNum}/${pageSize}/${times}`,
    method:"get",
})

export const getContractMoney=(pageNum,pageSize,times)=>request({
    url:`/echarts/contractMoneyByTime/${pageNum}/${pageSize}/${times}`,
    method:"get"
})

export const getBackMoney=(pageNum,pageSize,times)=>request({
    url:`/echarts/backMoneyByTime/${pageNum}/${pageSize}/${times}`,
    method:"get"
})

export const getEmpByTimes=(times)=>request({
    url:`/echarts/getEmpsByTime/${times}`,
    method:"get"
})