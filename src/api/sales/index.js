import request from '../../utils/request'

export const getAllOpp = (page,size)=>request({
    url: `/opp/getAllOpp/${page}/${size}`,
    method: 'post'
  })

export const addOpp = (data)=>request({
  url:`/opp/addOpp`,
  method:"post",
  data
})

export const findEmps = ()=>request({
  url:`/opp/findEmp`,
  method:"get"
})

export const findCust = (page,size)=>request({
  url:`/opp/findCust/${page}/${size}`,
  method:"get"
})