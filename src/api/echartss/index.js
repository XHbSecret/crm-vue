import request from '../../utils/request'

// 支出单
export const outlay=()=>request({
    url:`/echarts/outlay`,
    method:"get"
})