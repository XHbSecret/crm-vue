<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTittle"
    width="30%"
    @close="onClose"
  >
    <el-form :model="form" label-width="120px" ref="formRef" :rules="rules">
      <el-form-item label="产品名" prop="productName">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="户型" prop="productType">
        <el-input v-model="form.productType" />
      </el-form-item>
      <el-form-item label="房子类型" prop="houseType">
        <el-select
          placeholder="请选择类型"
          v-model="form.houseType"
          size="samll"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="报价" prop="productPrice">
        <el-input v-model="form.productPrice" />
      </el-form-item>
      <el-form-item label="产品状态" prop="productStatus">
        <el-radio-group v-model="form.productStatus">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="房子地址" prop="productAddress">
        <el-input v-model="form.productAddress" />
      </el-form-item>
      <el-form-item label="装修类型" prop="productDecorateType">
        <el-input v-model="form.productDecorateType" />
      </el-form-item>
      <el-form-item label="介绍" prop="productIntroduce">
        <el-input type="textarea" v-model="form.productIntroduce" />
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
const options = [
  {
    value: "1 ",
    label: "普通商品房",
  },
  {
    value: "2",
    label: "经济适用房",
  },
  {
    value: "3",
    label: "小产权房",
  },
  {
    value: "4",
    label: "房改房",
  },
  {
    value: "5",
    label: "集资房",
  },
  {
    value: "6",
    label: "廉租房",
  },
  {
    value: "7",
    label: "公租房",
  },
  {
    value: "8",
    label: "安置房",
  },
];
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
const rules = [{}];
</script>

<style>
</style>