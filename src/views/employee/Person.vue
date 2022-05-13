<template>
  <!-- 顶部 图片 -->
  <el-row>
    <div class="top-img">
      <img
        src="https://s1.hdslb.com/bfs/static/account-fe/static/img/rl_top.35edfde.png"
        alt=""
        @click="gotoHome()"
      />
    </div>
  </el-row>

  <!-- 用户信息 -->
  <el-row :gutter="20" style="margin-top: 50px">
    <!-- 左侧 -->
    <el-col :span="6" :offset="3">
      <el-card class="box-card" shadow="hover ">
        <template #header>
          <div class="img-center">
            <el-avatar :size="100" :src="headImg" />
          </div>
        </template>
        <div class="text item">
          <el-icon><user-filled /></el-icon>
          <span style="margin-left: 15px">
            <el-link :underline="false"><router-link to='/person/info'>用户信息</router-link></el-link>
          </span>
        </div>
        <div class="text item">
          <el-icon><lock /></el-icon
          ><span style="margin-left: 15px">
            <el-link :underline="false"><router-link to='/person/pwd'>修改密码</router-link></el-link>
          </span>
        </div>
      </el-card>
    </el-col>

    <!-- 右侧 -->
    <el-col :span="6" :offset="0">
      <div class="bg-white right-box">
        <router-view></router-view>
        <!-- <el-form
          class="form"
          :model="addForm"
          label-width="100px"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="上级菜单">
            <el-col :span="22">
              <el-input  />
            </el-col>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select
              :teleported="false"
              
              multiple
              placeholder="Select"
              style="width: 240px"
            >
             
            </el-select>
          </el-form-item>

        </el-form> -->
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
<script setup>
import {
  Lock,
  UserFilled,
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

const store = useStore()
const router = useRouter()

let headImg = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);

// 挂载
onMounted(()=>{
  headImg.value = store.state.employee.user.user.employeeDatail.empHead
})

// 回到首页
function gotoHome(){
  router.push({path:'/Amain'})
}
</script>

<style>
.form{
    margin-top: 40px;
}
.top-img {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABWCAYAAADlqUfFAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAbSURBVCiRY2RYcOM/AwMDAxMDFIwyRhkjjQEAc4gDI5wD87YAAAAASUVORK5CYII=);
  text-align: center;
  width: 100%;
  height: 86px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-left: 30px;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.box-card {
  /* width: 480px; */
}
.user-btn {
  padding-left: 20px;
  padding-top: 15px;
}
.img-center {
  /* padding-top: 20px; */
  text-align: center;
}
.bg-white {
  background-color: #fff;
}
.left-box {
  width: 300px;
  height: 260px;
}
.right-box {
  width: 650px;
  /* height: 655px; */
  padding: 20px;
}

.el-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>