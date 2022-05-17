// ----------表格组件所用到的方法----------
import request from '../../utils/request'
//多条件查询
export const CustomerSearch = (page,size,data)=>request({
  url: `/customer/Multicondition/${page}/${size}`,
  method: 'post',
  data
})
//进行添加操作 
export const AddCustomer = (data)=>request({
  url: `customer/addCustomer/1`,
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
export const transfer = (custId)=>request({
  url: `customer/transfer/${custId}/0`,
  method: 'get',
})
//批量退回公海操作
// customer/updateEmpIdBatchByid/{{empid}}
export const updateEmpIdBatchByid = (data,empid)=>request({
  url: `customer/updateEmpIdBatchByid/${empid}`,
  method: 'post',
  data
})
// ----------抽屉组件所用到的方法----------

//根据id查询详情
export const selectContacts = (page,size,custId)=>request({
  url: `Contacts/selectContacts/${page}/${size}/${custId}`,
  method: 'get',
})

//查询根据记录
export const selectAllByCustId = (page,size,custId)=>request({
  url: `visit/selectAllByCustId/${page}/${size}/${custId}`,
  method: 'get',
})

// ----------分配组件所用到的方法----------

export const allEmp = ()=>request({
  url: `user/all/1/1000`,
  method: 'get',
})