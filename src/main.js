import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,createWebHashHistory,createWebHistory} from "vue-router";
import router from './router/index' // 导入配置路由器规则
import ElementPlus from 'element-plus' // 导入 ElementPlus
import 'element-plus/dist/index.css'  // ElementPlus css
import store from './store/index'  // 导入store
import API from './api/index' // 引入API
import VForm3 from 'vform3-builds'//引入VForm3库
import 'vform3-builds/dist/designer.style.css'//引入VForm3样式
import locale from 'element-plus/lib/locale/lang/zh-cn'


// 图片裁剪插件
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'

const app = createApp(App)

// 将API 绑定在 vue原型上。任何组件都能访问
app.config.globalProperties.$API = API;
app.use(VueCropper)
app.use(router)  // 加载路由
app.use(store)   // store
app.use(ElementPlus,{locale})// 加载elementplus
app.use(VForm3) 
app.mount('#app') // 挂载 在app下