import request from '../../utils/request'
// 社交推广
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

// 广告投放
export const getAllAds = (page,size)=>request({
      url: `/compro/getAll/${page}/${size}`,
    method: 'get'
})

export const addComPro = (compro)=>request({
  url:`/compro/addComPro`,
  method:"post",
  data:compro
})

export const delComPros = (compro)=>request({
  url:`/compro/delComPro`,
  method:"post",
  data:compro
})

export const editComPros = (compro)=>request({
  url:`/compro/editComPro`,
  method:"post",
  data:compro
})
