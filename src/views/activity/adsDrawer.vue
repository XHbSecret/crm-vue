<template>
  <el-dialog
    :title="dialogTittle"
    width="50%"
    :model-value="dialogVisible"
    @close="onclose"
  >
    <el-form label-width="120px" ref="formRef" :model="addForm" :rules="rules">
      <el-form-item label="产品名" prop="productNo">
        <el-select
          placeholder="请选择产品"
          v-model="addForm.productNo"
          clearable
        >
          <el-option
            v-for="item in options1.productVo"
            :key="item.productNo"
            :label="item.porductName"
            :value="item.productNo"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="投放公司" prop="companyId">
        <el-select
          placeholder="请选择公司"
          v-model="addForm.companyId"
          clearable
        >
          <el-option
            v-for="item in options2.companyVo"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="comProStatus">
        <el-select
          placeholder="请选择状态"
          v-model="addForm.comProStatus"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, watch, toRaw } from "vue";
import { getProdcutVos } from "@/api/system/product";
import { getCompanyVos } from "@/api/system/company";
import { addComPro, editComPros } from "@/api/system/activity";
import { ElMessage } from "element-plus";
const formRef = ref(null);
const emits = defineEmits(["update:modelValue", "updateDate"]);
const value1 = ref("");
const value2 = ref("");

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
let addForm = ref({
  productNo: "",
  companyId: "",
  comProTime: "",
  comProContent: "",
  comProCost: "",
  comProStatus: 0,
});
const options1 = reactive({ productVo: [] });
const options2 = reactive({ companyVo: [] });
const options = [
  {
    value: 1,
    label: "开始",
  },
  {
    value: 0,
    label: "未审核",
  },
  {
    value: 2,
    label: "结束",
  },
];
const onclose = () => {
  emits("update:modelValue", false);
  formRef.value.resetFields();
};
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      addComPro(addForm.value).then((response) => {
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
      editComPros(addForm.value).then((response) => {
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
function getProductVo() {
  getProdcutVos().then((response) => {
    options1.productVo = response.data;
    console.log(options1.productVo);
  });
}
function getCompanyVo() {
  getCompanyVos().then((response) => {
    options2.companyVo = response.data;
    console.log(options2.companyVo);
  });
}
onMounted(() => {
  getProductVo();
  getCompanyVo();
});

// 监听
watch(
  () => props.dialogValue,
  () => {
    console.log(props.dialogValue);
    console.log(1234);

    addForm.value = toRaw(props.dialogValue);
    // addForm.value.companyId = props.dialogValue.company.companyId;
    // addForm.value.productNo = props.dialogValue.product.productNo;
    console.log(addForm.value.productNo);
    console.log(addForm.value.companyId);

    console.log(addForm.value);
  },
  { deep: true, immediate: true }
);

const rules = reactive({
  productNo: [{ required: true, message: "请选择产品", trigger: "blur" }],
  companyId: [{ required: true, message: "请选择公司", trigger: "blur" }],
  comProTime: [{ required: true, message: "请选择时间日期", trigger: "blur" }],
  comProContent: [{ required: true, message: "请输入内容", trigger: "blur" }],
  comProCost: [{ required: true, message: "请输入金额", trigger: "blur" }],
});
</script>

<style>
</style>