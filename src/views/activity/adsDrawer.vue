<template>
  <el-dialog
    :title="dialogTittle"
    width="50%"
    :model-value="dialogVisible"
    @close="onclose"
  >
    <el-form label-width="120px" ref="formRef" :model="addForm" :rules="rules">
      <el-form-item label="产品名" prop="productNo">
        <el-input
          placeholder="选择产品"
          @click="showProduct"
          v-model="addForm.productNo"
          readonly="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="投放公司" prop="companyId">
        <el-input placeholder="选择公司" @click="showCompany"></el-input>
      </el-form-item>

      <el-form-item label="投放日期" prop="comProTime">
        <el-date-picker
          v-model="addForm.comProTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="datetime"
          placeholder="选择日期"
        />
      </el-form-item>

      <el-form-item label="投放内容" prop="comProContent">
        <el-input type="textarea" v-model="addForm.comProContent"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="comProCost">
        <el-input placeholder="请输入价格" v-model="addForm.comProCost" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit()"
          v-if="dialogTittle == '投放'"
          >投放</el-button
        >
        <el-button
          type="primary"
          @click="editComPro()"
          v-else-if="dialogTittle == '修改'"
          >保存</el-button
        >
        <el-button @click="onclose()">取消</el-button>
      </el-form-item>
    </el-form>
    <productDialog
      v-model="dialogVisible_product"
      v-if="dialogVisible_product"
      @getProducts="getProducts"
    ></productDialog>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, watch, toRaw } from "vue";
import { addComPro, editComPros } from "@/api/system/activity";
import { ElMessage } from "element-plus";
import productDialog from "../sales/productDialog.vue";
const formRef = ref(null);
const emits = defineEmits(["update:modelValue", "updateDate"]);
const dialogVisible_product = ref(false);
const products = ref({});
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
  dialogValue: {
    type: Object,
    default: () => {},
  },
});
let addForm = reactive({
  productNo: "",
  companyId: "",
  comProTime: "",
  comProContent: "",
  comProCost: "",
});

const onclose = () => {
  emits("update:modelValue", false);
  formRef.value.resetFields();
};
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      console.log(addForm);
      addComPro(addForm).then(() => {
        ElMessage({
          message: "添加成功！！！！",
          type: "success",
        });
        emits("update:modelValue", false);
        formRef.value.resetFields();
        emits("updateDate");
      });
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
};
const editComPro = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      editComPros(addForm).then((response) => {
        console.log(response.data);
        ElMessage({
          message: "修改成功！！！！",
          type: "success",
        });
        emits("update:modelValue", false);
        formRef.value.resetFields();
        emits("updateDate");
      });
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
};
function showProduct() {
  dialogVisible_product.value = true;
}
function getProducts(val) {
  console.log(val);
  products.value = val;
  addForm.productNo = products.value.productNo;
  console.log(addForm.productNo);
}
// 监听
watch(
  () => props.dialogValue,
  () => {
    console.log(props.dialogValue);
    console.log(1234);

    addForm = toRaw(props.dialogValue);
    console.log(addForm.productNo);
    console.log(addForm.companyId);
    console.log(addForm);
  },
  { deep: true, immediate: true }
);

const rules = reactive({
  productNo: [{ required: true, message: "请选择产品", trigger: "blur" }],
  companyId: [{ required: true, message: "请选择公司", trigger: "blur" }],
  comProTime: [{ required: true, message: "请选择时间日期", trigger: "blur" }],
  comProContent: [{ required: true, message: "请输入内容", trigger: "blur" }],
  comProCost: [{ required: true, message: "请输入金额", trigger: "blur" }],
  comProStatus: [{ required: true, message: "状态不能为空", trigger: "blur" }],
});
</script>

<style>
</style>