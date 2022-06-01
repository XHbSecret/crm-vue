<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTittle"
    width="40%"
    :before-close="handleClose"
  >
    <!-- 表单区域 -->
    <el-form :model="addForm" label-width="120px" ref="formRef" :rules="rules">
      <el-form-item label="活动名" prop="activityName">
        <el-input v-model="addForm.activityName" placeholder="请输入活动名" />
      </el-form-item>
      <el-form-item label="活动形式" prop="activityType">
        <el-select
          v-model="addForm.activityType"
          placeholder="请选择形式"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动内容" prop="activityContent">
        <el-input
          type="textarea"
          v-model="addForm.activityContent"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="activityStartTime">
        <el-date-picker
          v-model="addForm.activityStartTime"
          type="datetime"
          placeholder="选择时间日期"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="activityStopTime">
        <el-date-picker
          v-model="addForm.activityStopTime"
          type="datetime"
          placeholder="选择时间日期"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="活动支出" prop="activityCost">
        <el-input v-model="addForm.activityCost" placeholder="请输入金额" />
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="info" @click="handleClose()">取消</el-button>
        <el-button
          type="primary"
          @click="addActivitys()"
          v-if="dialogTittle == '添加活动'"
          >添加</el-button
        >
        <el-button
          type="primary"
          @click="editActivitys()"
          v-else-if="dialogTittle == '修改活动'"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
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
import { addActivity, editActivity } from "@/api/system/activity";
const emits = defineEmits(["update:modelValue", "updateDate"]);
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
  dialogTableValue: {
    type: Object,
    default: {},
  },
});
let addForm = ref({
  activityId: 0,
  activityName: "",
  activityContent: "",
  activityStartTime: "",
  activityStopTime: "",
  activityStatus: 2,
  activityCost: "",
  activityType: "",
});

const options = [
  {
    value: "线下活动 ",
    label: "线下活动",
  },
  {
    value: "官网发布",
    label: "官网发布",
  },
  {
    value: "传单",
    label: "传单",
  },
];
const formRef = ref(null);

//关闭
const handleClose = () => {
  formRef.value.resetFields();
  emits("update:modelValue", false);
};

// 添加活动
const addActivitys = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      addActivity(addForm.value).then(() => {
        ElMessage({
          message: "添加成功！！！！",
          type: "success",
        });
        handleClose();
        emits("updateDate");
      });
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
};

// 修改活动
const editActivitys = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      editActivity(addForm.value).then(() => {
        ElMessage({
          message: "修改成功！！！！",
          type: "success",
        });
        handleClose();
        emits("updateDate");
      });
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
};
watch(
  () => props.dialogTableValue,
  () => {
    console.log(props.dialogTableValue);
    addForm.value = props.dialogTableValue;
  },
  { deep: true, immediate: true }
);
// 校验规则
const rules = {
  activityName: [
    { required: true, message: "请输入流程名", trigger: "blur" },
    {
      pattern: "^[\u4e00-\u9fa5]{0,}$",
      message: "只能输入中文",
      trigger: "blur",
    },
  ],
  activityStartTime: [
    { required: true, message: "请选择日期时间", trigger: "blur" },
  ],
  activityStopTime: [
    { required: true, message: "请选择日期时间", trigger: "blur" },
  ],
  activityCost: [
    { required: true, message: "请输入金额,如：130000.36", trigger: "blur" },
    {
      pattern: "[1-9]d*.d*|0.d*[1-9]d*",
      message: "格式不正确",
      trigger: "blur",
    },
  ],
  activityContent: [
    {
      required: true,
      message: "内容不能为空",
      trigger: "blur",
    },
    {
      pattern: "^[\u4e00-\u9fa5]{0,}$",
      message: "只能输入中文",
      trigger: "blur",
    },
  ],
  activityType: [
    {
      required: true,
      message: "类型不能为空",
      trigger: "blur",
    },
  ],
};
</script>

<style>
</style>