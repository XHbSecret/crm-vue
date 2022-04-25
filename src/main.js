import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,createWebHashHistory,createWebHistory} from "vue-router";
import router from './router/index' // 导入配置路由器规则
import ElementPlus from 'element-plus' // 导入 ElementPlus
import 'element-plus/dist/index.css'  // ElementPlus css
import store from './store/index'  // 导入store
import API from './api/index' // 引入API

const app = createApp(App)

// 将API 绑定在 vue原型上。任何组件都能访问
app.config.globalProperties.$API = API;

app.use(router)  // 加载路由
app.use(store)   // store
app.use(ElementPlus) // 加载elementplus
app.mount('#app') // 挂载 在app下