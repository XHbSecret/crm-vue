<template>
  <h3>修改密码</h3>
  <el-form
    class="form"
    :model="updateForm"
    label-width="100px"
    :rules="rules"
    ref="ruleFormRef">

    <!-- 原密码 -->
    <el-form-item label="原密码" prop="oldPwd">
      <el-col :span="12">
        <el-input />
      </el-col>
    </el-form-item>

    <!-- 新密码 -->
    <el-form-item label="新密码" prop="newPwd">
      <el-col :span="12">
        <el-input />
      </el-col>
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="confirmPwd">
      <el-col :span="12">
        <el-input />
      </el-col>
    </el-form-item>
    <!-- 确认 与 取消按钮 -->
    <el-form-item>
      <el-button type="primary" @click="save()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive ,ref} from "@vue/reactivity";

// 收集表单数据对象
let updateForm = reactive({
    oldPwd:'',
    newPwd:'',
    confirmPwd:'',
})
const ruleFormRef = ref(null);

// 保存
function save(){
    ruleFormRef.value.validate(async (valid)=>{
        if (!valid) return;
        alert("xixi")
    })
}


// 表单验证规则
let rules = reactive({
  oldPwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  confirmPwd: [{ required: true, message: "请输入确认密码", trigger: "blur" }],
});

</script>

<style>
</style>