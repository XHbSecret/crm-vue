import request from '../../utils/request'
// 获取所有商品
export const getAllProducts=(page,size)=>request({
    url:`/product/allProduct/${page}/${size}`,
    method:'post'
})

//添加产品
export const addProducts = (product)=>request({
  url: `/product/addProduct`,
  method: 'post',
  data:product
})

export const delProducts=(product)=>request({
  url: `/product/delProducts`,
  method: 'post',
  data:product
})

export const upProduct=(product)=>request({
  url: `/product/editUpStatus`,
  method: 'post',
  data:product
})

export const downProduct=(product)=>request({
  url: `/product/editDownStatus`,
  method: 'post',
  data:product
})

export const getById = (ids)=>request({
  url:`/product/getById`,
  method:'post',
  data:ids
})

export const getProdcutVos=()=>request({
  url:`/product/findProdcutVo`,
  method:'get'
})