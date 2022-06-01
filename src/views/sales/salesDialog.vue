<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="新建商机"
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

        <el-form-item label="商机金额（元）" prop="oppMoney">
          <el-input placeholder="请输入金额" v-model="addForm.oppMoney" />
        </el-form-item>

        <el-form-item label="负责人">
          <el-input placeholder="选择员工" @click="showEmpDialog"> </el-input>
        </el-form-item>

        <el-form-item label="客户">
          <el-input placeholder="选择客户" @click="showCustDialog"> </el-input>
        </el-form-item>

        <el-form-item label="业务">
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

        <el-form-item label="业务阶段">
          <el-select
            placeholder="请选择"
            v-model="addForm.flowDetailsId"
            clearable
          >
            <el-option
              v-for="item in options.details"
              :key="item.flowDetailsId"
              :label="item.flowDetailsName"
              :value="item.flowDetailsId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预计成交时间">
          <el-date-picker
            placeholder="选择"
            type="date"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            v-model="addForm.oppStopTime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="addForm.oppNotes"></el-input>
        </el-form-item>

        <el-form-item label="产品">
          <el-input
            placeholder="选择产品"
            @click="showProductDialog"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="handleClose()">取消</el-button>
          <el-button type="primary" @click="addOpps()">添加</el-button>
        </el-form-item>
      </el-form>
      <empDialog v-model="dialogVisible_emp"></empDialog>
      <custDialog v-model="dialogVisible_cust"></custDialog>
      <productDialog v-model="dialogVisible_product"></productDialog>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, defineProps } from "vue";
import { ElMessage } from "element-plus";
import empDialog from "./empDialog.vue";
import custDialog from "./custDialog.vue";
import productDialog from "./productDialog.vue";
import { addOpp, findEmps } from "@/api/sales/index";
import { getAllFlows, getFlowDetails } from "@/api/system/flow";
import { getProdcutVos } from "@/api/system/product";
const emits = defineEmits(["update:modelValue", "updateDate"]);

const dialogVisible_emp = ref(false);
const dialogVisible_cust = ref(false);
const dialogVisible_product = ref(false);
const options1 = reactive({ flow: [] });
const options2 = reactive({ employee: [] });
const options3 = reactive({ customer: [] });
const options4 = reactive({ product: [] });
const options = reactive({ details: [] });

const formRef = ref(null);

let addForm = ref({
  oppId: "",
  custId: "",
  empId: "",
  oppName: "",
  oppMoney: "",
  flowId: "",
  flowDetailsId: "",
  oppStopTime: "",
  pId: "",
  oppNotes: "",
});

onMounted(() => {
  getAllFlow();
  getAllProducts();
  findAllEmps();
});

function showEmpDialog() {
  dialogVisible_emp.value = true;
}
function showCustDialog() {
  dialogVisible_cust.value = true;
}
function showProductDialog() {
  dialogVisible_product.value = true;
}
function selectDetails(val) {
  console.log(val);
  getFlowDetails(val)
    .then((response) => {
      options.details = response.data.flowDetails;
      console.log(options.details);
    })
    .catch(() => {});
}

function handleClose() {
  emits("update:modelValue", false);
}
function getAllFlow() {
  getAllFlows()
    .then((response) => {
      options1.flow = response.data;
      console.log(options1.flow);
    })
    .catch((err) => {});
}
function getAllProducts() {
  getProdcutVos()
    .then((response) => {
      options4.product = response.data;
      console.log(options4.product);
    })
    .catch(() => {});
}

function findAllEmps() {
  findEmps().then((response) => {
    options2.employee = response.data;
    console.log(options2.employee);
  });
}
function addOpps() {
  handleClose();
  addOpp(addForm.value).then(() => {});
}
</script>

<style>
</style>