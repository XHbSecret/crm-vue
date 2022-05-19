<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTittle"
    width="30%"
    @close="onClose"
  >
    <el-form :model="form" label-width="120px" ref="formRef">
      <el-form-item label="产品名" prop="productName">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="户型" prop="productName">
        <el-input v-model="form.productType" />
      </el-form-item>
      <el-form-item label="房子类型" prop="productName">
        <el-input v-model="form.houseType" />
      </el-form-item>
      <el-form-item label="报价" prop="productPrice">
        <el-input v-model="form.productPrice" />
      </el-form-item>
      <el-form-item label="产品状态" prop="productStatus">
        <el-input v-model="form.productStatus" />
      </el-form-item>
      <el-form-item label="房子地址" prop="productAddress">
        <el-input v-model="form.productAddress" />
      </el-form-item>
      <el-form-item label="装修类型" prop="productDecorateType">
        <el-input v-model="form.productDecorateType" />
      </el-form-item>
      <el-form-item label="介绍" prop="productIntroduce">
        <el-input v-model="form.productIntroduce" />
      </el-form-item>
      <el-form-item label="面积" prop="productArea">
        <el-input v-model="form.productArea" />
      </el-form-item>
      <el-form-item>
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="addProduct()">添加</el-button>
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
import { addProducts } from "@/api/system/product";
import { ElMessage } from "element-plus";
const emits = defineEmits(["update:modelValue", "updateDate"]);
const formRef = ref(null);
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
const form = ref({
  productName: "",
  productType: "",
  houseType: "",
  productPrice: "",
  productStatus: "",
  productAddress: "",
  productIntroduce: "",
  productArea: "",
});
const onClose = () => {
  formRef.value.resetFields();
  emits("update:modelValue", false);
};
const addProduct = () => {
  addProducts(form.value).then(() => {
    ElMessage({
      message: "添加成功！！！！",
      type: "success",
    });
    onClose();
    emits("updateDate");
  });
};
</script>

<style>
</style>