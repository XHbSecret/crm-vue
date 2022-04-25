 // 1、导入路由插件
 import { createRouter,createWebHashHistory,createWebHistory} from "vue-router"
 import customer from './modules/Customer'  // 导入客户模块的路由配置
 import store from '../store/index'

 import system from '../views/system/index.vue'
 import loginLog from '../views/system/LoginLog.vue'
 import opLog from '../views/system/opLog.vue'

 // 2. 定义路由规则， 每个路由都需要映射到一个组件。
 const routes = [
  //  { 
  //      path: '/', 
  //      component: () => import('../views/index.vue')
  //     //  children:[
  //     //    customer
  //     //  ]
  //  },
   {
     path:'/login',
     component: ()=>import('../views/login/index.vue')
   }
 ]

 // 3. 创建路由实例并传递 `routes` 配置
 const router = createRouter({
   history: createWebHashHistory(),//hash值模式，有#号
   routes, // `routes: routes` 的缩写
 })


 // 全局路由守卫，路由拦截  未登录跳转到登录界面
 router.beforeEach((to,from,next)=> {
  console.log("全局前置路由守卫...")
  const token = store.state.employee.token
  // console.log("路由拦截前的token = " + token)

  if(to.path === '/login'){ // 去往登录界面，就放行
    next()
    return;
  }

  if( token == '123' ||  token =='' || token==undefined || token == null){ // token不存在
    next({
      path: '/login',//如果为假，则重定向到这个路由路径
      query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }else {  // token 存在放行
    if (to.matched.length ===0){
      if(store.state.employee.paths.length ==0){  // vuex 中也没有路由信息，就去登录获取权限信息
        next({path:'/login'})
        return ;
      }
      store.dispatch('employee/setMoveRoute', store.state.employee.paths) // 从vuex中获取菜单信息。
       next({path: to.path})
      }else{ 
         // 放行
        console.log("放行...",to)
        next()
      }
  }
 })


 export default router