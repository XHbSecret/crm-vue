<template>
  <div class="login_container">
    <el-form
     
      label-width="120px"
      class="login_form"
    >
    <div class="title-container">
      <h3 class="title">登录</h3>
    </div>

    <!-- 用户名 item -->
      <el-form-item 
        rule="[
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          }
        ]"
      >  
       <el-icon><user-filled /></el-icon>
        <el-input v-model="user.userName"/>
      </el-form-item>
     
     <!-- 密码 item -->
      <el-form-item
        rule="{
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }">
        <el-icon><lock /></el-icon>
        <el-input v-model="user.password"/>
        
      </el-form-item>

      <!-- 表单提交 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
   
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
    UserFilled,
    Lock
} from "@element-plus/icons-vue";
import { getCurrentInstance } from "vue";
import { useStore,mapActions } from 'vuex'
import {  useRouter } from 'vue-router'


const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
const store = useStore()    ///vuex
const router = useRouter()  // 路由

// 响应式数据定义
let user = reactive({
  userName:'',
  password:''
})

// 登录表单提交
 function submitForm(){

   api.login.login(user)
    .then(response=>{
      if(response.code==200){
        store.state.employee.token = response.data.token  // 放到vuex state中
        store.state.employee.user.user = response.data.user
        store.state.employee.user.menuList = response.data.menuList
        store.state.employee.paths = response.data.menuList
        store.state.employee.perms = response.data.permList
        
        // 设置动态路由
        store.dispatch('employee/setMoveRoute',response.data.menuList)

        // 获取按钮权限
        // api.menu.getButtonPerms().then(response=>{
        //   if(response.code==200){
        //     console.log("xixi")
        //     console.log(response.data)
        //     store.commit('employee/setButtonPerms',response.data)
        //   }
        // })

        // 跳到指定页面 或者首页
        router.push({       // push 、 repalce两个属性
                path:'/'
               })
      }
    });
}

</script>

<style scoped>
.title-container{
    font-size: 26px;
    color: #eee;
    font-weight: bold;
}
.form_input{
    width: 300px;
    height: 50px;
    border: 0px;
}
.login_container{
    /* height: 80vh; */
    text-align: center;
}
.login_form{
    position: relative;
    margin: 10% 33%;
    /* margin-top: 15%;
    margin-left: 35%; */
}
.form_item{
    border: 1px solid red;
}
</style>
