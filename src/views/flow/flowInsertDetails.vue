<template>
  <el-dialog
    :title="dialogTittle"
    width="50%"
    :model-value="visible_adds"
    @close="onclose"
  >
    <el-form
      :model="flowDetail"
      label-width="200px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="流程步骤名" prop="flowDetailsName">
        <el-col :span="10">
          <el-input
            v-model="flowDetail.flowDetailsName"
            placeholder="请输入流程步骤名"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="是否审核" prop="flowIsCheck">
        <el-col :span="10">
          <el-radio-group v-model="flowDetail.flowIsCheck">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="顺序" prop="flowOrder">
        <el-col :span="10">
          <el-input v-model.number="flowDetail.flowOrder" />
        </el-col>
      </el-form-item>
      <el-form-item label="介绍" prop="flowDesc">
        <el-col :span="10">
          <el-input v-model="flowDetail.flowDesc" type="textarea" />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addDetail()">添加</el-button>
      <el-button type="info" @click="onclose()">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
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
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
  ids: {
    type: Number,
    default: 0,
  },
  idss: {
    type: Number,
    default: 0,
  },
});
let flowDetail = reactive({
  flowDetailsName: "",
  flowIsCheck: "",
  flowDesc: "",
  flowOrder: "",
  flowId: 0,
});

function addDetail() {
  flowDetail.flowId = props.ids;
  flowDetail.flowId = props.idss;
  console.log(flowDetail);
  formRef.value.validate(async (valid) => {
    if (valid) {
      api.flow.addDetails(flowDetail).then((response) => {
        formRef.value.resetFields();
        ElMessage({
          message: "添加成功！！！！",
          type: "success",
        });
        onclose();
      });
    } else {
      ElMessage.error("表单为空！！！");
      return false;
    }
  });
}
const onclose = () => {
  emits("update:modelValue", false);
};

// 校验规则
const rules = reactive({
  flowDetailsName: [
    { required: true, message: "详情名不能为空！！", trigger: "blur" },
    { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
  ],
  flowIsCheck: [{ required: true, message: "请选择是否审核", trigger: "blur" }],
  flowOrder: [{ required: true, message: "请输入顺序", trigger: "blur" }],
});
</script>

<style>
</style>