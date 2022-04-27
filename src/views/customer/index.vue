<template>
    <div>
        客户管理界面<br>
         <template v-for="m in $store.state.employee.perms" :key="m.menuName">
             <el-button type="primary" @click="haha()">{{m.menuName}}</el-button><br>
         </template>
         <el-button type="primary" @click="getAllActivity()">活动</el-button><br>
        <el-button type="success" @click="isShow = !isShow">显示vuex的东西</el-button><br>
        <span v-show="isShow">{{$store.state.employee.token}}</span><hr>
        <span v-show="isShow">{{$store.state.employee.perms}}123</span>
        <el-button type="success" @click="getToken()">获取token</el-button><br>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance } from "vue";

    const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
    
    const isShow = ref(false)

    // 获取所有活动表单提交
async function getAllActivity(){

   api.activity.getAllActivity(1,2)
        .then(response=>{
          // console.log(response)
        });
}

 import { useStore } from 'vuex'
 const store = useStore()
function getToken(){
    console.log(store.state.employee.token)
    console.log(store.getters["employee/getToken"])
}
function haha(){
   alert('xiix')
}

</script>

<style>

</style>