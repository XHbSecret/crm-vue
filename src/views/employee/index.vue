<template>
  <!-- 搜索框 -->
  <el-row class="row-margin">
    <el-col :span="24">
      <el-input
        v-model="searchContent.empName"
        placeholder="请输入姓名/电话"
        class="input-with-select"
      >
        <template #append>
          <el-button type="primary" :icon="Search" @click="searchLike()"/>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <!-- 增删改 按钮区 -->
  <el-row class="row-margin">
    <el-col :span="12">
      <el-button type="primary" plain :icon="Plus" @click="addEmpBtn()"
        >新增</el-button
      >
      <el-button
        v-show="selectEmp.data.length > 0"
        type="info"
        plain
        :icon="DeleteFilled"
        @click="delEmp()"
        >删除</el-button
      >
      <el-button
        v-show="selectEmp.data.length > 0"
        type="warning"
        plain
        :icon="CircleCloseFilled"
        @click="disableEmp()"
        >禁用</el-button
      >
      <el-button
        v-show="selectEmp.data.length > 0"
        type="warning"
        plain
        :icon="CircleCheckFilled"
        @click="activeEmp()"
        >激活</el-button
      >
    </el-col>
    <el-col :span="12">
      <div style="float: right; margin-right: 40px">
        <!-- <el-button type="warning" plain :icon="Upload">导入</el-button> -->
        <el-button
          v-show="selectEmp.data.length > 0"
          type="primary"
          plain
          :icon="Download"
          >选中导出</el-button
        >
        <el-button
          type="primary"
          plain
          :icon="Download"
          >全部导出</el-button
        >
      </div>
    </el-col>
  </el-row>

  <!-- 表格 （用户信息显示区域） -->
  <el-row>
    <el-col>
      <el-table
        :data="empList.data"
        :page-size="5"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column
          fixed
          prop="employeeDatail.empName"
          label="姓名"
          width="180"
        />
        <el-table-column prop="empNumber" label="登录账号" width="180" />
        <el-table-column
          prop="employeeDatail.empPhone"
          label="电话"
          width="180"
        />
        <el-table-column prop="empCreateTime" label="入职时间" width="180" />

        <el-table-column label="状态" width="180">
          <template v-slot="scope">
            <span v-if="scope.row.empStatus == 1"><el-tag class="ml-2" type="success">正常</el-tag></span>
            <span v-else><el-tag class="ml-2" type="danger">禁用</el-tag></span>
          </template>
        </el-table-column>

        <el-table-column
          prop="employeeDatail.empDescribe"
          width="180"
          label="描述"
        />
        <el-table-column fixed="right" width="250px" label="操作">
          <template v-slot="scope">
            <el-button
              :icon="Delete"
              size="small"
              type="text"
              @click="resetPassword(scope.row)"
              >重置密码</el-button
            >
            <el-button
              :icon="Delete"
              size="small"
              type="text"
              @click="editRole(scope.row)"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />

      <!-- 分页 -->
      <div style="float: right; margin-right: 20px">
        <el-pagination
          background
          :page-size="size"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-col>
  </el-row>

  <!-- 添加用户的 dialog框   
    :before-close="handleClose"-->
  <el-dialog v-model="addEmpDialogVisible" title="添加用户" width="500px">
    <!-- 主体  :rules="rules"  ref="ruleFormRef"-->
    <el-form :model="addEmpForm" label-width="100px">
      <el-form-item label="姓名">
        <el-col :span="22">
          <el-input v-model="addEmpForm.empName" class="input-width" />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="addEmpForm.empSex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="电话">
        <el-col :span="9">
          <el-input v-model="addEmpForm.empPhone" class="input-width" />
        </el-col>
      </el-form-item>
      <el-form-item label="身份证">
        <el-col :span="9">
          <el-input v-model="addEmpForm.empCard" class="input-width" />
        </el-col>
      </el-form-item>

      <el-form-item label="微信号">
        <el-col :span="9">
          <el-input v-model="addEmpForm.empWechat" class="input-width" />
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="9">
          <el-input v-model="addEmpForm.empEmail" class="input-width" />
        </el-col>
      </el-form-item>
      <el-form-item label="地址">
        <el-col :span="9">
          <el-input v-model="addEmpForm.empAddress" class="input-width" />
        </el-col>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="addEmpForm.empStatus">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              class="input-width"
              :rows="3"
              type="textarea"
              placeholder="备注信息.."
              v-model="addEmpForm.empDescribe"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 添加 取消按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addEmpDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddEmp()">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分配角色dialog框 -->
  <el-dialog
    v-model="editRoleDialogVisible"
    title="分配角色"
    width="500px"
    @close="roleDialogClose()"
  >
    <!-- 主体  :rules="rules"  ref="ruleFormRef"-->
    <span>设置角色：&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <el-select
      v-model="selectRole.data"
      multiple
      placeholder="请选择角色"
      style="width: 240px"
    >
      <el-option
        v-for="item in roleList.data"
        :key="item.roleId"
        :label="item.roleName"
        :value="item.roleId"
      />
    </el-select>
    <!-- 添加 取消按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editRoleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRole()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import {
  Edit,
  Delete,
  EditPen,
  DeleteFilled,
  Upload,
  Download,
  Plus,
  Search,
  CircleCloseFilled,
  CircleCheckFilled,
} from "@element-plus/icons-vue";
import { onMounted } from "@vue/runtime-core";
import { getAllEmp, addEmp, resetPwd, delEmps,forbiddenEmps,activeEmps,search } from "@/api/employee/login";
import { getAllRole, updateEmpRole, hasRole } from "@/api/system/role";
import { ElMessage } from "element-plus";

let searchContent = reactive({ empName: "" }); // 搜索内容
let empList = reactive({ data: [] }); // 员工列表
let roleList = reactive({ data: [] }); // 角色列表
let addEmpDialogVisible = ref(false);
let editRoleDialogVisible = ref(false);
let total = ref(0);
let size = ref(5);
let page = ref(1);
let selectEmp = reactive({ data: [] });
let selectRole = reactive({ data: [] });
let addEmpForm = reactive({
  empName: "",
  empAge: "",
  empSex: -1,
  empPhone: "",
  empCard: "",
  empAddress: "",
  empEmail: "",
  empWechat: "",
  empDescribe: "",
  empStatus: 0,
}); // 添加用户表单对象

// 已挂载 获取员工信息
onMounted(() => {
  getEmpData(page.value, size.value);
});

// 多条件查询
function searchLike(){
  let content = searchContent.empName.replace(" ","")
  if(content == ''){
    content = "all"
  }
  search(content,page.value,size.value).then(res=>{
    empList.data = res.data.records
     total.value = res.data.total;
    size.value = res.data.size;
  })
}

// 批量 禁用用户
function disableEmp(){
  forbiddenEmps(selectEmp.data).then(res=>{
    if(res.data == true){
      ElMessage.success("禁用成功")
      getEmpData(page.value, size.value);
    }else{
      ElMessage.error("禁用失败")
    }
  })
}

// 批量 激活用户
function activeEmp(){
  activeEmps(selectEmp.data).then(res=>{
    if(res.data == true){
      ElMessage.success("激活成功")
      getEmpData(page.value, size.value);
    }else{
      ElMessage.error("激活失败")
    }
  })
}

let empId = 0;
// 编辑角色按钮触发  from 表格
async function editRole(row) {
  empId = row.empId;
  editRoleDialogVisible.value = true;
  getAllRole().then((res) => {
    // 获取所有角色
    roleList.data = res.data;
  });

  hasRole(empId).then((res) => {
    // 选中的角色
    selectRole.data.length = 0;
    for (let i = 0; i < res.data.length; i++) {
      selectRole.data.push(res.data[i].roleId);
    }
  });
}

// 提交  分配角色
function submitRole() {
  editRoleDialogVisible.value = false;
  updateEmpRole(empId, selectRole.data).then((res) => {
    if (res.data == true) {
      ElMessage.success("修改成功");
    } else {
      ElMessage.success("修改失败");
    }
  });
  console.log("empId = ", empId, "角色列表：", selectRole);
}

// 删除用户
function delEmp() {
  delEmps(selectEmp.data).then((res) => {
    if (res.data == true) {
      ElMessage.success("删除成功");
      getEmpData(page.value, size.value);
    } else {
      ElMessage.error("删除失败! 请确保员工为离职（禁用）状态才能删除");
    }
  });
}

// 复选框选中
function handleSelectionChange(data) {
  selectEmp.data.length = 0;
  for (let i = 0; i < data.length; i++) {
    selectEmp.data.push(data[i].empId);
  }
  console.log(selectEmp.data);
}

// 分页，改变当前页
function handleCurrentChange(val) {
  console.log("页面：", val, size.value);
  getEmpData(val, size.value);
}

// 获取用户数据，分页
async function getEmpData(p, s) {
  getAllEmp(p, s).then((res) => {
    // 获取所有的用户信息
    empList.data = res.data.records;
    total.value = res.data.total;
    size.value = res.data.size;
  });
}

// 重置密码
function resetPassword(data) {
  console.log(data.employeeDatail.empName, "xixi");
  resetPwd(data.empId).then((res) => {
    if (res.data == true) {
      ElMessage.success(`${data.employeeDatail.empName}  密码重置成功`);
    } else {
      ElMessage.error(`${data.employeeDatail.empName} 密码重置失败`);
    }
  });
}

//添加用户按钮触发
function addEmpBtn() {
  addEmpDialogVisible.value = true;
}

// 添加用户表单提交
function submitAddEmp() {
  addEmpDialogVisible.value = false;
  addEmp(addEmpForm).then((res) => {
    empList.data.unshift(res.data);
  });
}

// 分配角色 关闭事件
function roleDialogClose() {
  selectRole.data.length = 0;
}
</script>



<style>
.input-width {
  width: 200px;
}
.input-with-select {
  width: 250px;
}
.row-margin {
  margin-bottom: 20px;
}
</style>