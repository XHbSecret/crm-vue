<template>
  <el-dialog title="添加步骤" :model-value="visible_details" @close="close()">
    <el-form :model="form" label-width="120px" ref="formRef" :rules="rules">
      <el-form-item label="步骤名">
        <el-input v-model="form.flowDetailsName" />
      </el-form-item>
      <el-form-item label="是否需要审核">
        <el-radio-group v-model="form.flowIsCheck">
          <el-radio label="1">需要</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="步骤说明">
        <el-input v-model="form.flowDetailsDesc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">Create</el-button>
        <el-button @click="close()">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive, defineEmits, ref } from "vue";
import { addDetails } from "@/api/system/flow";
const emits = defineEmits(["update:modelValue", "updateData"]);
const form = reactive({
  flowDetailsName: "",
  flowIsCheck: "",
  flowDetailsDesc: "",
});
const formRef = ref(null);
function close() {
  formRef.value.resetFields();
  emits("update:modelValue", false);
}
function onSubmit() {
  close();
  console.log(JSON.stringify(form));
  addDetails(form).then(() => {
    emits("updateData");
  });
}
// 校验规则
const rules = reactive({
  flowDetailsName: [
    { required: true, message: "步骤名不能为空！！", trigger: "blur" },
    { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
  ],
  flowIsCheck: [
    { required: true, message: "请选择是否要审核", trigger: "blur" },
  ],
  flowDetailsDesc: [
    { required: true, message: "说明不能为空", trigger: "blur" },
  ],
});
</script>

<style>
</style>