import axios from 'axios'  // 导入axios
// import { MessageBox } from 'element-plus'  // 导入element 消息框
import { ElMessage } from 'element-plus'
import store from '../store/index'

// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8088', // url = base url + request url
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000 // request timeout
  })

// 请求拦截器
service.interceptors.request.use(
    config => {
      if (store.state.employee.token!='') {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        console.log("token 是 "+store.state.employee.token)
        config.headers['token'] = store.state.employee.token
        console.log(config)
      }
      return config
    },
    error => {
      // do something with request error
      // console.log(error) // for debug
      // return Promise.reject(error)
    }
  )


// 响应拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */
  
    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
      const res = response.data
      console.log(res)
      // if the custom code is not 20000, it is judged as an error.
      if (res.code !== 20000 && res.code!==200) {
        ElMessage({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
  
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.log('err' + error) // for debug
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  )
  
// 导出
export default service