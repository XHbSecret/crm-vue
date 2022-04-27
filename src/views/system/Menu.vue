<template>
 
  <button @click="getMenus"> 获取权限信息</button>
  <template>
      <el-tree :data="menus" :props="defaultProps"/>
  </template>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { getCurrentInstance } from "vue";        // 导入实例
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;  // 找到api
let menus = reactive({data:{}})
 function getMenus(){
      api.menu.getAllMenu()      // 使用接口，调用
        .then(response=>{                // 响应对象
            console.log(response.data+"xixi")
          menus.data = response.data
         // console.log(response)
        });
 }
</script>

<style>

</style>