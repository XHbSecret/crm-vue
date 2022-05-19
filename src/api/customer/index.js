// ----------表格组件所用到的方法----------
import request from '../../utils/request'
//多条件查询
export const CustomerSearch = (page,size,data)=>request({
  url: `/customer/Multicondition/${page}/${size}`,
  method: 'post',
  data
})
//进行添加操作 
export const AddCustomer = (empid,data)=>request({
  url: `customer/addCustomer/${empid}`,
  method: 'post',
  data
})
//进行删除操作
export const deleteOneCont = (custId)=>request({
  url: `customer/evenDelect/${custId}`,
  method: 'get',
})
//进行修改操作
export const updateCustomercust = (data)=>request({
  url: `customer/updateCustomercust`,
  method: 'post',
  data
})
//进行将客户数据放回公海的操作
export const transfer = (custId,empId)=>request({
  url: `customer/transfer/${custId}/${empId}`,
  method: 'get',
})
//批量退回公海操作
// customer/updateEmpIdBatchByid/{{empid}}
export const updateEmpIdBatchByid = (data,empid)=>request({
  url: `customer/updateEmpIdBatchByid/${empid}`,
  method: 'post',
  data
})
//批量导出
export const downloadexcel = (empId)=>request({
  url: `customer/downloadexcel.do/${empId}`,
  method: 'get',
  responseType: 'blob',
})

// ----------抽屉组件所用到的方法----------

//根据id联系人
export const selectContacts = (page,size,custId)=>request({
  url: `Contacts/selectContacts/${page}/${size}/${custId}`,
  method: 'get',
})
//新增联系人   Contacts/addCustomer/1
export const addCustomer = (custId,data)=>request({
  url: `Contacts/addCustomer/${custId}`,
  method: 'post',
  data
})
//修改联系人  Contacts/updateCustomer
export const updateCustomer = (data)=>request({
  url: `Contacts/updateCustomer`,
  method: 'post',
  data
})
//删除联系人 Contacts/deleteCustomer/3
export const deleteCustomer = (contactId)=>request({
  url: `Contacts/deleteCustomer/${contactId}`,
  method: 'get'
})
//查询根据记录
export const selectAllByCustId = (page,size,custId)=>request({
  url: `visit/selectAllByCustId/${page}/${size}/${custId}`,
  method: 'get',
})
// ----------协作人组件所用到的方法----------
export const getAllAssociates = (custId)=>request({
  url: `Associates/getAllAssociates/1/10/${custId}`,
  method: 'get',
})
// ----------分配组件所用到的方法----------

export const allEmp = ()=>request({
  url: `user/all/1/1000`,
  method: 'get',
})

//添加一个联系人
export const addAssociates = (data)=>request({
  url: `Associates/addAssociates`,
  method: 'post',
  data
})

//删除一个联系人 Associates/deleteAssociates/3
export const deleteAssociates = (assId)=>request({
  url: `Associates/deleteAssociates/${assId}`,
  method: 'get',
})
