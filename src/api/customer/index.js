// import request from '@/utils/request'

import request from '../../utils/request'

export const CustomerSearch = (page,size,data)=>request({
  url: `/customer/Multicondition/${page}/${size}`,
  method: 'post',
  data
})

export const AddCustomer = (data)=>request({
  url: `customer/addCustomer/-1`,
  method: 'post',
  data
})
// Contacts/selectContacts/1/2/177
export const selectContacts = (page,size,custId)=>request({
  url: `Contacts/selectContacts/${page}/${size}/${custId}`,
  method: 'get',
})
//visit/selectAllByCustId/1/2/2
export const selectAllByCustId = (page,size,custId)=>request({
  url: `visit/selectAllByCustId/${page}/${size}/${custId}`,
  method: 'get',
})