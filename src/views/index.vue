<template>
  <el-container>
    <!-- 顶部导航栏 -->
    <el-header style="text-align: right; font-size: 12px; border: 1px solid gr">
      <div class="theme"></div>
      <div style="float:left;">
        <img src="src/assets/logohaha.png" alt="" width="260" height="60" style="margin-left:-30px">
      </div>
      <div class="toolbar">
        
        <el-dropdown trigger="click">
          <el-avatar>{{ empName }}</el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="person()"
                ><el-icon><avatar /></el-icon>&nbsp;个人信息</el-dropdown-item
              >
              <el-dropdown-item divided @click="logOut()"
                ><el-icon><expand /></el-icon>退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template> </el-dropdown
        >&nbsp;&nbsp;&nbsp;
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside_bgc">
        <!-- <button @click="isCollapse = !isCollapse">123</button> -->
        <el-scrollbar height="88vh">
          <el-menu
            router
            active-text-color="#ffd04b"
            background-color="#304156"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            :collapse="isCollapse"
          >
            <el-menu-item index="/Amain">
              <el-icon><Menu /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <!-- 遍历菜单 从 vuex中-->
            <template
              v-for="(menu, index) in $store.state.employee.paths"
              :key="index"
            >
              <!-- 有子菜单 ，就有下拉列表-->
              <el-sub-menu
                :index="menu.menuName"
                v-if="menu.childMenuList != null"
              >
                <template #title>
                  <el-icon><money /></el-icon>{{ menu.menuName }}
                </template>
                <el-menu-item-group class="menu_item_bgc">
                  <el-menu-item
                    :index="childMenu.menuPath"
                    v-for="(childMenu, index) in menu.childMenuList"
                    :key="index"
                  >
                    {{ childMenu.menuName }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <!-- 没有子菜单 ，没有下拉列表-->
              <!-- <el-menu-item index="/sys/loginLog" v-else> -->
              <el-menu-item :index="menu.menuPath" v-else>
                <el-icon><setting /></el-icon>
                <span>{{ menu.menuName }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主页面  通过路由显示 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import {
  Avatar,
  Setting,
  Histogram,
  Expand,
  MoreFilled,
  Money,
  Menu,
} from "@element-plus/icons-vue";
import { useStore } from "vuex"; // 导入vuex
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
const store = useStore(); // 创建对象
const router = useRouter(); // 创建route
let isCollapse = ref(false); // 菜单收缩

const empName = store.state.employee.user.user.employeeDatail.empName;
// 退出登录
async function logOut() {
  //发送退出指令给后台：
  api.login.logout().then((response) => {
    if (response.code == 200) {
      store.state.employee.token = ""; // 清空token
      router.push({ path: "/login" });
    }
  });
}

// 个人中心
function person() {
  router.push({ path: "/person" });
}
</script>

<style scoped>
.userInfo {
  font-size: 13px;
  color: #666;
}
.menu_item_bgc {
  background-color: #1f2d3d;
}
.aside_bgc {
  background-color: #304156;
}
.item_bgc {
  color: #fff;
}
.el-header {
  position: relative;
  color: var(--el-text-color-primary);
  /* background-color: #fff; */
  background: linear-gradient(to left, gray, gainsboro);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

