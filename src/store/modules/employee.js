import { createStore } from 'vuex'
// import {  useRouter } from 'vue-router'
import router from '../../router'

const modules = import.meta.glob('../../views/*/*.vue')
let rts = []

const store = {
  namespaced: true,
  // 状态管理
  state: {
    user: {},
    token: '123',
    paths: [], // 动态路由 （菜单）
    perms:[]   // 按钮权限 （按钮）
  },

  // getters
  getters: {
    getToken(state, getters, rootState) {
      return state.token
    }
  },

  // mutations 操作数据  （类似于dao层）
  mutations: {
    // 设置按钮权限
    setButtonPerms(state,perms){
      console.log("xixi 2",perms,state)
      state.perms = perms
    }
  },

  // action 业务处理 （类似于service层）
  actions: {
    // 设置动态路由
    setMoveRoute(state, menuList) {
      setRoute(menuList)
    },


  }



}

// 设置动态路由
function setRoute(menus) {
  // console.log("menus",menus)
  // 遍历菜单，生成路由表。
  for (let i = 0; i < menus.length; i++) {
    if(menus[i].menuPath == '' || menus[i].menuPath == undefined || menus[i].menuPath == null){
      
    }
    let rt = {
      path: menus[i].menuPath,
      component: modules[`../../views/${menus[i].menuComponent}`],
      meta: { title: menus[i].menuName }
    }

    rts.push(rt)            //这里就将每个菜单的路由push进去了

    if (menus[i].childMenuList && menus[i].childMenuList.length > 0) {  //当存在子菜单时
      setRoute(menus[i].childMenuList)  //递归实现子菜单的路由设置
    }
  }

  //添加到路由表中，
  // console.log("rts")
  // console.log(rts)

  let homeRts = {
    path: '/',
    component: () => import('../../views/index.vue'),
    redirect:'/Amain',
    children: [...rts,     //从后台获取到的动态路由，展开后作为home页面的二级路由
        { path: 'Amain',  component: () => import('../../views/Amain.vue'),},
        // { path:'person', component:()=>import('../../views/employee/Person.vue')},
      //   // { path: 'consumeRule/couponDetail', name: '优惠券管理', component: resolve => require(['@/views/consumeRule/pages/couponDetail.vue'], resolve) },
      //   // { path: 'error', name: '错误', component: resolve => require(['@/views/error/index.vue'], resolve) },
    ]   //这三个是基本的都会有的路由和菜单
  }


  router.addRoute(homeRts)   //将后台返回并配置好的路由，添加到路由配置中去，也就是home路由是和login并列的

  console.log("加载动态路由store...")
  console.log(router.getRoutes())


}

export default store