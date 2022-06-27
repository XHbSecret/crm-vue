<template>
  <el-dialog
    :title="dialogTittle"
    width="50%"
    :model-value="visible_add"
    @close="onclose"
  >
    <div v-show="dialogTittle == '添加流程'">
      <el-form
        :model="addflow"
        label-width="200px"
        :rules="rules"
        ref="formRef"
      >
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
        <el-form-item
          v-for="(flowDetail, index) in addflow.flowDetails"
          :label="'步骤' + (index + 1)"
          :key="flowDetail.key"
          :prop="'flowDetail.' + index + '.flowDetailsId'"
        >
          <el-select v-model="flowDetail.flowDetailsId" placeholder="请选择">
            <el-option
              v-for="item in fDetails.datas"
              :key="item.flowDetailsId"
              :label="item.flowDetailsName"
              :value="item.flowDetailsId"
              @click="showDetailsId(item)"
            ></el-option>
          </el-select>
          <el-button @click="removeDomain(flowDetail)" type="text"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增步骤</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="dialogTittle == '添加步骤'">
      <el-form
        :model="addflows.datas"
        label-width="200px"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="流程名" prop="flowName">
          <el-col :span="10">
            <el-input
              v-model="addflows.datas.flowName"
              placeholder="请输入流程名"
              :disabled="true"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="流程状态" prop="flowStatus">
          <el-radio-group v-model="addflows.datas.flowStatus">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-for="(flowDetail, index) in addflows.datas.flowDetails"
          :label="'步骤' + (index + 1)"
          :key="flowDetail.key"
          :prop="'flowDetail.' + index + '.flowDetailsId'"
        >
          <el-select v-model="flowDetail.flowDetailsId" placeholder="请选择">
            <el-option
              v-for="item in fDetails.datas"
              :key="item.flowDetailsId"
              :label="item.flowDetailsName"
              :value="item.flowDetailsId"
              @click="showDetailsId(item)"
            ></el-option>
          </el-select>
          <el-button @click="removeDomain(flowDetail)" type="text"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增步骤</el-button>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <el-button
        type="primary"
        @click="confirm()"
        v-show="dialogTittle == '添加流程'"
        >添加</el-button
      >
      <el-button
        type="primary"
        @click="confirms()"
        v-show="dialogTittle == '添加步骤'"
        >保存</el-button
      >
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
  watch,
} from "vue";
import { ElMessage } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

const formRef = ref(null);

let addflow = reactive({
  flowId: "",
  flowName: "",
  flowStatus: "",
  flowDetails: [
    {
      flowDetailsId: "",
    },
  ],
});
const addflows = reactive({
  datas: {
    flowId: "",
    flowDetails: [
      {
        flowDetailsId: "",
      },
    ],
  },
});
const fDetails = reactive({ datas: [] });

const emits = defineEmits(["update:modelValue", "updateDate", "updateData"]);
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
  dialogDetailsValue: {
    type: Object,
    default: {},
  },
});
onMounted(() => {
  getFlowDetail();
  getDetail();
});

const onclose = () => {
  formRef.value.resetFields();
  emits("update:modelValue", false);
};
const confirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      api.flow.addFlow(addflow).then(() => {
        ElMessage({
          message: "添加成功！！！！",
          type: "success",
        });
        onclose();
        emits("updateDate");
        emits("updateData");
      });
      alert(JSON.stringify(addflow));
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
    console.log(addflow);
  });
};
function showDetailsId(value) {
  console.log(value.flowDetailsId);
}
function getDetail() {
  console.log(props.dialogTittle);
  if (props.dialogTittle == "添加步骤") {
    // api.flow.getFlowDetails(addflow.flowId).then((response) => {
    //   addflows.datas = response.data;
    // });
  }
}
function getFlowDetail() {
  api.flow.getAllFlowDetailss().then((res) => {
    fDetails.datas = res.data;
    console.log(fDetails.datas);
  });
}
function removeDomain(item) {
  if (props.dialogTittle == "添加步骤") {
    var index = addflows.datas.flowDetails.indexOf(item);
    if (index !== -1) {
      addflows.datas.flowDetails.splice(index, 1);
    }
  } else {
    var index = addflow.flowDetails.indexOf(item);
    if (index !== -1) {
      addflow.flowDetails.splice(index, 1);
    }
  }
}
function addDomain() {
  if (props.dialogTittle == "添加步骤") {
    addflows.datas.flowDetails.push({
      flowDetailsId: "",
    });
  } else {
    addflow.flowDetails.push({
      flowDetailsId: "",
    });
  }
}

watch(
  () => props.dialogDetailsValue,
  props.dialogTittle,
  () => {
    console.log(props.dialogDetailsValue);
    addflow = props.dialogDetailsValue;
    console.log(addflow);
  },
  { deep: true, immediate: true }
);

// 校验规则
// const rules = reactive({
//   flowName: [
//     { required: true, message: "请输入流程名", trigger: "blur" },
//     { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
//   ],
//   flowStatus: [{ required: true, message: "请选择状态", trigger: "blur" }],
// });
</script>