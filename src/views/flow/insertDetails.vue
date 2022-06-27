<template>
  <el-dialog :title="dialogTittle" :model-value="visible_details" @close="close()">
    <el-form :model="form" label-width="120px" ref="formRef" :rules="rules">
      <el-form-item label="步骤名" prop="flowDetailsName">
        <el-input v-model="form.flowDetailsName" />
      </el-form-item>
      <el-form-item label="步骤说明" prop="flowDetailsDesc">
        <el-input v-model="form.flowDetailsDesc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
        <el-button @click="close()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive, defineEmits, ref,watch,toRefs } from "vue";
import { addDetails,editDetails } from "@/api/system/flow";
import { ElMessage, ElMessageBox } from "element-plus";
const emits = defineEmits(["update:modelValue", "updateData"]);
const props = defineProps({
  dialogEditValue: {
    type: Object,
    default: {}
  },
  dialogTittle:{
    type:String,
    default:''
  }
});
const form = ref({
  flowDetailsName: "",
  flowDetailsDesc: "",
});
const formRef = ref(null);

// 关闭Dialog
function close() {
  formRef.value.resetFields();
  emits("update:modelValue", false);
}
function onSubmit() {
  if(props.dialogTittle=="添加步骤"){
    addDetails(form.value).then(() => {
    ElMessage.success("添加成功！！！")
    emits("updateData");
    close();
  }).catch(()=>{
     ElMessage.error("添加失败！！！")
  });
    console.log(form.value);
  }else if(props.dialogTittle=="修改步骤"){
    editDetails(form.value).then(()=>{
       ElMessage.success("修改成功！！！")
      emits("updateData");
      close();
    }).catch(()=>{
     ElMessage.error("修改失败！！！")
  });
    console.log(form.value);
  }
    

}
watch(
  () => props.dialogEditValue,
  () => {
    console.log(props.dialogEditValue);
    form.value = props.dialogEditValue;
  },
  { deep: true, immediate: true }
);

// 校验规则
const rules = reactive({
  flowDetailsName: [
    { required: true, message: "步骤名不能为空！！", trigger: "blur" },
    { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
  ],
  flowDetailsDesc: [
    { required: true, message: "说明不能为空", trigger: "blur" },
  ],
});
</script>

<style>
</style>