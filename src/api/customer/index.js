// ----------表格组件所用到的方法----------
import request from '../../utils/request'
export const getCustomerById = (id)=>request({
  url: `customer/${id}`,
  method: 'get'
})

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




// ---------跟进方法----------
//查询根据记录
export const selectAllByCustId = (page,size,custId)=>request({
  url: `visit/selectAllByCustId/${page}/${size}/${custId}`,
  method: 'get',
})

//添加跟进记录 http://localhost/visit/addVisit
export const addVisit = (data)=>request({
  url: `visit/addVisit`,
  method: 'post',
  data
})

//查询所有跟进 http://localhost/visit/selectAllByCustIds/{{custId}}
export const selectAllByCustIds = (custId)=>request({
  url: `visit/selectAllByCustIds/${custId}`,
  method: 'get'
})
//删除跟进记录 及其附件 和 本地文件 http://localhost/visit/deleteVisit/{{visitId}}/{{path}}
export const deleteVisits = (visitId,data)=>request({
  url: `visit/deleteVisits/${visitId}`,
  method: 'post',
  data
})

export const deleteVisit = (visitId)=>request({
  url: `visit/deleteVisit/${visitId}`,
  method: 'get'
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




// ----------抽屉组件中意商品所用到的方法----------
export const getAllByCustId = (custId)=>request({
  url: `CustSub/getAllByCustId/1/10/${custId}`,
  method: 'get',
})




// ----------抽屉组件常用语所用到的方法----------
//新增常用语
export const addEmpPhrase = (data)=>request({
  url: `EmpPhrase/addEmpPhrase`,
  method: 'post',
  data
})
//删除常用语
export const deleteEmpPhrase = (phraseId)=>request({
  url: `EmpPhrase/deleteEmpPhrase/${phraseId}`,
  method: 'get'
})
//修改常用语
export const updateEmpPhrase = (data)=>request({
  url: `EmpPhrase/updateEmpPhrase`,
  method: 'post',
  data
})
//查看常用语
export const selectByEmpId = (empId)=>request({
  url: `EmpPhrase/selectByEmpId/${empId}`,
  method: 'get'
})
