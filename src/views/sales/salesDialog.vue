<template>
  <!-- 商机dialog -->
  <el-dialog
    :model-value="dialogVisible"
    title="新建商机"
    width="45%"
    :before-close="handleClose"
  >
    <!-- 表单区域 -->
    <el-scrollbar style="height: 100%">
      <el-form
        label-width="120px"
        :rules="rules"
        :model="addForm"
        ref="formRef"
      >
        <el-form-item label="商机名" prop="oppName">
          <el-input placeholder="请输入商机名" v-model="addForm.oppName" />
        </el-form-item>

        <el-form-item label="负责人" prop="empName">
          <el-input
            placeholder="选择员工"
            @click="showEmpDialog"
            v-model="addForm.empName"
            readonly="true"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="客户" prop="custName">
          <el-input
            placeholder="选择客户"
            @click="showCustDialog"
            v-model="addForm.custName"
            readonly="true"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="所选服务" prop="flowName">
          <el-select
            placeholder="请选择"
            v-model="addForm.flowId"
            @change="selectDetails($event)"
          >
            <el-option
              v-for="item in options1.flow"
              :key="item.flowId"
              :label="item.flowName"
              :value="item.flowId"
              filterable
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预计成交时间" prop="oppStopTime">
          <el-date-picker
            placeholder="选择"
            type="date"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            v-model="addForm.oppStopTime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="备注" prop="oppNotes">
          <el-input type="textarea" v-model="addForm.oppNotes"></el-input>
        </el-form-item>

        <el-form-item label="产品" prop="productName">
          <el-input
            placeholder="选择产品"
            @click="showProductDialog"
            v-model="addForm.productName"
            readonly="true"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="info" @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="addOpps()">添加</el-button>
        </el-form-item>
      </el-form>
      <!-- 员工Dialog -->
      <empDialog
        v-model="dialogVisible_emp"
        v-if="dialogVisible_emp"
        :emplist="emplist"
        @getEmpList="getEmps"
      ></empDialog>
      <!-- 客户Dialog -->
      <custDialog
        v-model="dialogVisible_cust"
        v-if="dialogVisible_cust"
        @getCust="getCusts"
      ></custDialog>
      <!-- 产品Dialog -->
      <productDialog
        v-model="dialogVisible_product"
        v-if="dialogVisible_product"
        @getProducts="getProducts"
      ></productDialog>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
// 导包
import { ref, reactive, onMounted, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import empDialog from "./empDialog.vue";
import custDialog from "./custDialog.vue";
import productDialog from "./productDialog.vue";
import { addOpp, findEmps, addOpportunity } from "@/api/sales/index";
import { getAllFlows, getFlowDetails, getALlFlowss } from "@/api/system/flow";
import { useStore } from "vuex";

const store = useStore();
//从token 获取empid
let empId = store.state.employee.user.user.employeeDatail.empId;
console.log("empId =  ", empId);
// 定义的字段
const emits = defineEmits(["update:modelValue", "updateDate"]);
const emplist = ref({});
const custlist = ref({});
const productList = ref({});
const dialogVisible_emp = ref(false);
const dialogVisible_cust = ref(false);
const dialogVisible_product = ref(false);
const options1 = reactive({ flow: [] });
const options = reactive({ details: [] });
const formRef = ref(null);
const detailsIds = ref([]);
let addForm = reactive({
  oppId: "",
  custId: "",
  empCreateId: empId,
  empChrgeId: "",
  oppName: "",
  empName:"",
  flowId: "",
  custName:"",
  oppStopTime: "",
  productId: "",
  oppNotes: "",
  productName:"",
});

// 挂载数据
onMounted(() => {
  getAllFlow();
});

// 显示员工dialog
function showEmpDialog() {
  dialogVisible_emp.value = true;
}

// 显示客户dialog
function showCustDialog() {
  dialogVisible_cust.value = true;
}

// 显示产品dialog
function showProductDialog() {
  dialogVisible_product.value = true;
}

// 获取子组件传来的员工数据
function getEmps(val) {
  emplist.value = val;
  console.log(emplist.value);
  addForm.empChrgeId = emplist.value.empId;
  addForm.empName=emplist.value.employeeDatail.empName;
  console.log(emplist.value.empId);
}

// 获取子组件传来的客户数据
function getCusts(val) {
  custlist.value = val;
  console.log(custlist.value);
  addForm.custId = custlist.value.custId;
  addForm.custName=custlist.value.customerDetail.custDetailName
  console.log(addForm.custId);
}

// 获取子组件传来的产品数据
function getProducts(val) {
  console.log(val);
  productList.value = val;
  addForm.productId = productList.value.productNo;
  addForm.productName=productList.value.productName;
  console.log(addForm.productId);
}

// 获取流程阶段
function selectDetails(val) {
  console.log(val);
  getFlowDetails(val)
    .then((response) => {
      options.details = response.data.flowDetails;
      console.log(options.details);
    })
    .catch(() => {});
}

// 关闭表单
function handleClose() {
  formRef.value.resetFields();
  emits("update:modelValue", false);
  emits("updateDate");
}

// 获取所有流程
function getAllFlow() {
  getALlFlowss()
    .then((response) => {
      options1.flow = response.data;
      console.log(options1.flow);
    })
    .catch((err) => {});
  // console.log("12345");
}

// 添加商机
function addOpps() {
  const ids = reactive([]);
  const strings=reactive([]);
  for (let i = 0; i < options.details.length; i++) {
    ids.push(options.details[i].flowDetailsId);
  }
  addForm["flowDetailsIds"] = ids;
  for(let j=0;j<options.details.length;j++){
    strings.push(options.details[j].flowDetailsName)
  }
  addForm["flowDetailsNames"]=strings;
  formRef.value.validate((valid) => {
    if (valid) {
      addOpp(addForm).then(() => {
        ElMessage.success("添加成功！！！")
        handleClose();
      });
      console.log(addForm);
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
}


// 校验规则
const rules = reactive({
  oppName: [
    { required: true, message: "商机名为空", trigger: "blur" },
    { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
  ],
  empName: [{ required: true, message: "负责人为空", trigger: "blur" }],
  custName: [{ required: true, message: "客户为空", trigger: "blur" }],
  flowName: [{ required: true, message: "请选择需求", trigger: "blur" }],
  oppStopTime: [{ required: true, message: "日期不能为空", trigger: "blur" }],
  oppNotes: [{ required: true, message: "备注不能为空", trigger: "blur" }],
  productName: [{ required: true, message: "产品为空", trigger: "blur" }],
});
</script>

<style scoped>
</style>