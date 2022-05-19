import request from '../../utils/request'
//获取活动的所有数据
export const getAllActivity = (page,size)=>request({
    url: `/activity/all/${page}/${size}`,
    method: 'get'
  })
export const getAll = ()=>request({
    url: `/activity/all`,
    method: 'get'
  })
// 添加活动
export const addActivity = (activity)=>request({
  url:`/activity/add`,
  method:'post',
  data:activity
})

// 修改活动
export const editActivity = (activity)=>request({
  url:`/activity/update`,
  method:'post',
  data:activity
})

// 删除活动
export const delActivity = (activityId)=>request({
  url:`/activity/del/${activityId}`,
  method:'post',
  data:activityId
})