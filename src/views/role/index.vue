<template>
  <div>
    <el-icon size="20px"><UserFilled /></el-icon> &nbsp;&nbsp;
    <span class="title">角色权限控制</span>

    <!-- 管理角色 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- 左侧 -->
      <el-col :span="6" :offset="0">
        <el-card
          class="box-card"
          shadow="hover"
          :body-style="{ padding: '20px 0px' }"
        >
          <!-- 头部 -->
          <template #header>
            <div class="card-header" style="margin: -5px 0px">
              <span style="font-weight: 600">管理角色</span>
              <el-button
                v-show="$store.state.employee.perms.indexOf('role/add')==-1?false:true"
                :icon="CirclePlusFilled"
                size="default"
                type="text"
                class="create-role"
                @click="showDialog()"
                >创建角色</el-button
              >
            </div>
          </template>

          <!-- 角色导航栏 -->
          <div
            class="text item line"
            v-for="(i, index) in roleList.data"
            :key="index"
            @click="changeRole(i.roleId)"
            :class="{ active: num == i.roleId }"
          >
            {{ i.roleName }}
            <div style="float: right; margin-right: 15px">
              <el-popover placement="bottom" :width="60" trigger="click">
                <template #reference>
                  <el-icon><ArrowDown /></el-icon>
                </template>
                <div style="width: 60px">
                  <el-button type="text" @click="delRoleBtn(i)">删除</el-button>
                </div>
                <div style="width: 60px">
                  <el-button type="text" @click="updateRoleBtn(i)"
                    >修改</el-button
                  >
                </div>
              </el-popover>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧 -->
      <el-col :span="6" :offset="0">
        <div class="bg-white right-box">
          <el-tabs class="demo-tabs" v-model="activeTab">
            <el-tab-pane label="角色员工" name="first"
              ><RoleEmp
                :empList="empList.data"
                :roleId="roleId"
                @flushEmp="flushEmp(roleId)"
            /></el-tab-pane>
            <el-tab-pane label="角色权限" name="second"
              ><RolePerm
                :checkedPerms="checkedPermList.data"
                :roleId="roleId"
                :perms="perms.data"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>

  <!-- 添加角色 dialog 框 -->
  <el-dialog v-model="addRoleVisible" :title="dialogTitle" width="400px">
    <el-form :model="roleForm">
      <el-form-item label="角色名称">
        <el-input
          v-model="roleForm.roleName"
          autocomplete="off"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="roleForm.roleDesc"
          :rows="3"
          type="textarea"
          autocomplete="off"
          style="width: 250px"
        />
      </el-form-item>
    </el-form>
    <!-- 提交和取消按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRoleVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  ArrowDown,
  CirclePlusFilled,
  Lock,
  UserFilled,
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
import { reactive, ref, watch } from "vue";
import RoleEmp from "./RoleEmp.vue";
import RolePerm from "./RolePerm.vue";
import {
  getAllRole,
  getEmpByRoleId,
  addRole,
  delRole,
  updateRole,

} from "@/api/system/role";
import {getAllPerms,  getPermsB,} from "@/api/system/menu";
import { onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import {useStore} from 'vuex'
const store = useStore()

let clickStyle = reactive({ style: "click-none" });
let num = ref(0); // 同上，实现侧边框选中效果
let roleId = ref(0); // roleId  传值给子组件
let roleList = reactive({ data: [] }); // 角色数据
let empList = reactive({ data: [] }); // 角色对应的用户数据
const activeTab = ref("first");
let dialogTitle = ref(""); // dialog框的标题
let addRoleVisible = ref(false); //控制 添加角色的dialog框
let roleForm = reactive({
  roleId: 0,
  roleName: "",
  roleDesc: "",
});
let submitFlag = 0; // 提交方式，0：添加角色  1：修改角色

let perms = reactive({data:[]})
let checkedPermList = reactive({data:[]})

// 是否有创建角色的权限
async function hasCreateRolePerm(){
  // let x = store.dispatch("employee/getButtonPerm")
  // console.log(" x = ",x)
  let isShow = false;
  store.dispatch("employee/getButtonPerm").then(res=>{
    console.log(res,"res ...")
    isShow = res
    console.log(isShow,"isShow ...")
  })
  return isShow;
  
}

// 刷新用户信息
function flushEmp(roleId) {
  changeRole(roleId);
}

// 添加角色 提交表单
function submitForm() {
  addRoleVisible.value = false;
  if (submitFlag == 0) {
    // 添加角色
    addRole(roleForm).then((res) => {
      roleList.data.push(res.data);
    });
  } else if (submitFlag == 1) {
    // 修改角色
    if (roleForm.roleId != 0) {
      updateRole(roleForm).then((res) => {
        roleList.data.forEach((element) => {
          if (element.roleId == res.data.roleId) {
            //替换
            roleList.data.splice(roleList.data.indexOf(element), 1, res.data);
          }
        });
      });
    } else {
      ElMessage.error("id无效");
    }
  }
}

// 删除角色
function delRoleBtn(role) {
  delRole(role.roleId).then((res) => {
    if (res.code == 200) {
      ElMessage.success("删除成功");
      roleList.data.splice(roleList.data.indexOf(role), 1);
    }
  });
}

// 修改角色 打开dialog框
function updateRoleBtn(role) {
  addRoleVisible.value = true;
  dialogTitle.value = "修改角色";
  roleForm.roleId = role.roleId;
  roleForm.roleName = role.roleName;
  roleForm.roleDesc = role.roleDesc;
  submitFlag = 1;
}

// 挂载：  加载角色数据
onMounted(() => {
  getRole();
});

// 从后台获取角色数据
async function getRole() {
  getAllRole().then((response) => {
    roleList.data = response.data;
    roleId.value = response.data[0].roleId;
  });
}

// 获取已经选中的权限
function checkedPerms(){
  getPermsB(roleList.data[0].roleId).then(res=>{
    checkedPermList.data = res.data
    console.log("已选择的权限",res.data)
  })
}

// 获取权限信息
function allPerms(){
  getAllPerms().then(res=>{
    perms.data = res.data
  })
}

// 从后台获取用户信息  根据角色id
async function getEmpByRole() {
  getEmpByRoleId(roleList.data[0].roleId).then((res) => {
    empList.data = res.data;
  });
}

// 监视 角色数据不为空 去获取该角色的用户数据
watch(roleList, (newValue, oldValue) => {
  if (newValue.data.length > 0) {
    getEmpByRole();
    allPerms();
    checkedPerms();
  }
});

// 改变角色
function changeRole(id) {
  num.value = id; // 样式..
  roleId.value = id;

  // 获取员工对应的信息
  getEmpByRoleId(id).then((res) => {  
    empList.data = res.data;
  });

  // 获取权限对应的信息
  getAllPerms().then((res) => {  
    perms.data = res.data;
  });

  //TODO
    getPermsB(id).then(res=>{
     checkedPermList.data = res.data
  })
}

// 添加按钮 触发 显示dialog框
function showDialog() {
  addRoleVisible.value = true;
  dialogTitle.value = "创建角色";
  roleForm.roleName = "";
  roleForm.roleDesc = "";
  submitFlag = 0;
}
</script>



<script>
export default {
  // 加载背景颜色
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
<style scoped>
.right-box {
  width: 900px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.active {
  background-color: #f6f8fa;
  border-left: 2px solid red;
}
.click-none {
  background-color: #fff;
  border-left: 0px solid #fff;
}
.line {
  height: 40px;
  /* border-left: 2px solid red; */
  top: 40px;
  left: 180px;
  padding-left: 18px;
}
.text {
  font-size: 14px;
}
.item {
  height: 40px;
  line-height: 40px;
  /* margin-bottom: 18px; */
  color: #333;
  font-size: 13px;
}
.item:hover {
  background-color: #f6f8fa;
}
.item.active {
  background-color: #f6f8fa;
}
.create-role {
  font-size: 13px;
  font-weight: 400;
  float: right;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
.bg-white {
  background-color: #fff;
}
</style>