<template>
  <h3>修改信息</h3>
   <el-form
    class="form"
    :model="updateForm"
    :rules="rules" 
    ref="ruleFormRef"
    label-width="100px">

    <el-form-item label="头像" prop="empHead">
      <el-col :span="12">
        <el-avatar :size="80" :src="updateForm.empHead" style="margin-top: -20px; "/>
        <el-button type="primary" plain style="margin-top: -70px; margin-left:50px" @click="updateImg()">更改头像</el-button>
      </el-col>
    </el-form-item>

    <el-form-item label="姓名" prop="empName">
      <el-col :span="12">
        <el-input v-model="updateForm.empName"/>
      </el-col>
    </el-form-item>

    <el-form-item label="出生日期" prop="empAge">
      <el-col :span="12">
        <el-date-picker
          value-format="YYYY-MM-DD"
          v-model="updateForm.empAge"
          type="date"
          placeholder="Pick a day"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="性别" prop="empSex">
      <el-col :span="12">
        <el-radio v-model="updateForm.empSex" label=1 size="large">男</el-radio>
        <el-radio v-model="updateForm.empSex" label=0 size="large">女</el-radio>
      </el-col>
    </el-form-item>

    <el-form-item label="电话" prop="empPhone">
      <el-col :span="12">
        <el-input v-model="updateForm.empPhone"/>
      </el-col>
    </el-form-item>

     <el-form-item label="地址" prop="empAddress">
      <el-col :span="12">
        <el-input v-model="updateForm.empAddress"/>
      </el-col>
    </el-form-item>

     <el-form-item label="邮箱" prop="empEmail">
      <el-col :span="12">
        <el-input v-model="updateForm.empEmail"/>
      </el-col>
    </el-form-item>

    <!-- 保存 -->
    <el-form-item>
      <el-button type="primary" @click="save()">保存</el-button>
    </el-form-item>
  </el-form>
  
  <UserAvater :open="openDialog" @cancel = "cancel"/>
</template>

<script setup>
import UserAvater from './UserAvater.vue'
import { reactive,ref } from "@vue/reactivity";
import { getCurrentInstance,onMounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { useStore } from 'vuex'

const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // 找到api
const store = useStore()

// 表单数据
const updateForm = reactive({
    empDetailId:0,
    empName:'',
    empAge:'',
    empPhone:'',
    empAddress:'',
    empEmail:'',
    empHead:'',
    empSex:0
})

// 挂载 
onMounted(()=>{
  let empInfo = store.state.employee.user.user.employeeDatail
  updateForm.empDetailId = empInfo.empDetailId
  updateForm.empName = empInfo.empName
  updateForm.empAge = empInfo.empAge
  updateForm.empPhone = empInfo.empPhone
  updateForm.empAddress = empInfo.empAddress
  updateForm.empEmail = empInfo.empEmail
  updateForm.empSex = empInfo.empSex
  updateForm.empHead = empInfo.empHead
})

let openDialog = ref(false)
// 修改图片 打开dialog 框
function updateImg(){
  openDialog.value = true
}

// 取消 dialog框
function cancel(value){
  openDialog.value=value
}

// 保存 修改用户信息
function save(){
  ruleFormRef.value.validate(async valid=>{
    if (!valid) return;
    // updateForm.empAge = new Date(updateForm.empAge)
    api.login.updateEmp(updateForm).then((response) => {
    if (response.code == 200) {
      store.state.employee.user.user.employeeDatail = response.data
       ElMessage({ showClose: true, message: "保存成功", type: "success" });
    }
  });
  })
}

let ruleFormRef = ref(null)
// 表单验证规则
let rules = reactive({
  empName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  empPhone: [
    { required: true, message: "请输入电话", trigger: "blur" },
    { 
      pattern:"[1][3,4,5,7,8][0-9]{9}",
      message:'电话不合法',
      trigger: "blur"
    }
  ],
  empEmail: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      pattern:"^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$",
      message:'邮箱不合法',
      trigger: "blur"
    }
    ],
});
</script>

<style>

</style>