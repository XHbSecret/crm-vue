<template>
 <div class="login" style="height: 100%">
    <video style="width: 100%;" data-v-10a6bc2b="" autoplay="autoplay" loop="loop" muted="muted"><source  data-v-10a6bc2b="" src="/img/jl.mp4" type="video/mp4">
    </video>
    <div class="login-form">
      <el-form ref="loginForm" :model="user"
               :rules="rules" label-width="60px" class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="userPhoneNumber" >
          <el-input type="text" placeholder="请输入账号" v-model="user.userName"/>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword" >
          <el-input type="password" placeholder="请输入密码" v-model="user.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @keyup.enter="submitForm()" @click="submitForm()">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%"  :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
	        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
	      </span>
    </el-dialog>
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
/* .title-container{
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
    text-align: center;
}
.login_form{
    position: relative;
    margin: 10% 33%;
    /* margin-top: 15%;
    margin-left: 35%; 
}
.form_item{
    border: 1px solid red;
} */

/* this */
.login{
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form{
  position: absolute;
}
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  height: 300px;
  padding: 35px 35px 0px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #000;
  font-size: 24px;
}
</style>
