<template>
  <el-dialog
    :title="dialogTittle"
    width="50%"
    :model-value="visible_add"
    @close="onclose"
  >
    <el-form :model="addflow" label-width="200px" :rules="rules" ref="formRef">
      <el-form-item label="流程名" prop="flowName">
        <el-col :span="10">
          <el-input
            v-model="addflow.flowName"
            placeholder="请输入流程名"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="流程状态" prop="flowStatus">
        <el-radio-group v-model="addflow.flowStatus">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="confirm()">添加</el-button>
      <el-button type="info" @click="onclose()">取消</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
// import { ref, reactive } from "@vue/reactivity";
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  defineEmits,
  defineProps,
} from "vue";
import { ElMessage } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

const formRef = ref(null);

let addflow = reactive({
  flowName: "",
  flowStatus: "",
});

const emits = defineEmits(["update:modelValue", "updateDate"]);
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
});
const onclose = () => {
  emits("update:modelValue", false);
};
const confirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      api.flow.addFlow(addflow).then(() => {
        formRef.value.resetFields();
        ElMessage({
          message: "添加成功！！！！",
          type: "success",
        });
        onclose();
        emits("updateDate");
      });
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
};
// 校验规则
const rules = reactive({
  flowName: [
    { required: true, message: "请输入流程名", trigger: "blur" },
    { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
  ],
  flowStatus: [{ required: true, message: "请选择状态", trigger: "blur" }],
});
</script>