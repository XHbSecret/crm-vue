<template>
  <div id="head">
    <!-- 搜索/按钮区域 -->
    <el-row>
      <el-col :span="8" style="width: 700px">
        <img
          src="src\assets\opp.png"
          style="height: 40px; width: 40px; vertical-align: middle"
        />
        <span
          style="vertical-align: middle; font-weight: bold; margin-left: 10px"
          >商机管理</span
        ></el-col
      >
      <el-col :span="5">
        <el-input
          placeholder="请输入商机名称"
          v-model="value1.oppName"
          clearable
        >
          <template #append>
            <el-button :icon="Search" @click="find"></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
  </div>
  <div id="Operation">
    <el-button
      type="primary"
      :icon="Plus"
      style="float: right"
      @click="showDialog()"
      >新建商机</el-button
    >
    <div
      v-show="Opportunities.datas.length > 0"
      style="float: right; margin-right: 5px"
    >
      <span style="font-size: small"
        >已选中{{ num }}项&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
      >
      <el-button style="small" :icon="Switch" @click="change()">转移</el-button>
      <el-button :icon="Delete" @click="deleteSales()">删除</el-button>
      <el-button type="primary" @click="exportExcel">导出选中</el-button>
    </div>
  </div>
  <el-radio-group v-model="value1.status">
    <el-radio :label="1" @click.prevent="showSales(1)">未成交</el-radio>
    <el-radio :label="2" @click.prevent="showSales(2)">已成交</el-radio>
    <el-radio :label="3" @click.prevent="showSales(3)">已归档</el-radio>
  </el-radio-group>
  <el-table
    @selection-change="handleSelectionChange"
    :data="tableData.datas"
    style="width: 100%"
    height="450"
    v-loading="loading"
    async
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="商机名称" prop="oppName" width="130" fixed>
      <template v-slot="scope" default="{row}">
        <a href="#" @click.prevent="showOppDetails(scope.row)">{{
          scope.row.oppName
        }}</a>
      </template>
    </el-table-column>
    <el-table-column
      label="负责人"
      prop="employee.employeeDatail.empName"
      width="130"
    ></el-table-column>
    <el-table-column label="商机阶段" prop="flowDetailsName" width="130">
      <template v-slot="scope" default="{row}">
        <p>{{ scope.row.flowDetails.flowDetailsName }}</p>
      </template>
    </el-table-column>
    <el-table-column label="客户名称" prop="customerDetail.custId" width="130">
      <template v-slot="scope" default="{row}">
        <a href="#" @click.prevent="showCustDetails(scope.row)">{{
          scope.row.customerDetail.custDetailName
        }}</a>
      </template></el-table-column
    >
    <el-table-column
      label="创建人"
      width="130"
      prop="employee1.employeeDatail.empName"
    />
    <el-table-column label="商机金额/元" width="130" fixed="right">
      <template v-slot="scope">
        {{ scope.row.product.productPrice * scope.row.product.productArea }}
      </template>
    </el-table-column>
    <el-table-column
      label="更新时间"
      prop="oppUpdateTime"
      width="200"
    ></el-table-column>
    <el-table-column
      label="创建时间"
      prop="oppStartTime"
      width="200"
    ></el-table-column>
    <el-table-column
      label="预计成交日期"
      prop="oppStopTime"
      width="200"
    ></el-table-column>
    <el-table-column label="备注" prop="oppNotes" width="130"></el-table-column>
  </el-table>
  <div
    style="
      float: left;
      height: 60px;
      line-height: 60px;
      font-family: 'Courier New', Courier, monospace;
    "
  ></div>
  <el-pagination
    v-model:currentPage="pagePlugs.data.currentPage"
    v-model:page-size="pagePlugs.data.pageSize"
    :page-sizes="[10, 30, 60, 90]"
    small
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagePlugs.data.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="float: right; height: 60px; line-height: 60px"
  />
  <!-- 添加dialog框 -->
  <salesDialog
    v-model="dialogVisible"
    v-if="dialogVisible"
    @updateDate="find"
  ></salesDialog>
  <!-- 变更负责人dialog框 -->
  <changeDialog
    v-model="dialog_change"
    :emplist="Opportunities.datas"
    @updateData="find"
  ></changeDialog>
  <!-- 商机详情 -->
  <oppDrawer v-model="drawer_opp" :oppDetails="oppDetails" @updateData="find">
  </oppDrawer>
  <!-- 客户详情 -->
  <custDrawer v-model="drawer_cust" :custDetails="custDetails"></custDrawer>

  <!-- 预览所要导出的数据 -->
  <el-dialog title="预览" v-model="selectOpp" :before-close="handClose">
    <el-table
      :data="Opportunities.datas"
      style="width: 100%"
      height="450"
      id="selectTable"
    >
      <el-table-column type="index" width="50" fixed />
      <el-table-column label="商机名称" prop="oppName" width="130" fixed>
      </el-table-column>
      <el-table-column
        label="负责人"
        prop="employee.employeeDatail.empName"
        width="130"
      ></el-table-column>
      <el-table-column
        label="商机阶段"
        prop="flowDetails.flowDetailsName"
        width="130"
      >
      </el-table-column>
      <el-table-column
        label="客户名称"
        prop="customerDetail.custDetailName"
        width="130"
      >
      </el-table-column>
      <!-- <el-table-column
        label="创建人"
        width="130"
        prop="employee1.employeeDatail.empName"
      >
      </el-table-column> -->
      <el-table-column
        label="商机金额/元"
        prop="oppMoney"
        width="130"
        fixed="right"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="oppUpdateTime"
        width="200"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="oppStartTime"
        width="200"
      ></el-table-column>
      <el-table-column
        label="预计成交日期"
        prop="oppStopTime"
        width="200"
      ></el-table-column>
      <el-table-column
        label="备注"
        prop="oppNotes"
        width="130"
      ></el-table-column>
    </el-table>
    <el-button type="info" @click="handClose">取消</el-button>
    <el-button type="primary" @click="exportToExcel">确认</el-button>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getAllOpp, getAllOpps, delSales, findById } from "@/api/sales/index";
import { Delete, Switch, Plus, Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { CustomerSearch } from "@/api/customer/index";
import salesDialog from "./salesDialog.vue";
import oppDrawer from "./oppDrawer.vue";
import custDrawer from "./custDrawer.vue";
import changeDialog from "./changeDialog.vue";
import htmlExcel from "../../utils/hemlExcel";
import { useStore } from "vuex";

const selectOpp = ref(false);
const dialog_change = ref(false);
const loading = ref(true);
const oppDetails = ref({});
const custDetails = ref({});
const drawer_cust = ref(false);
const drawer_opp = ref(false);
const num = ref(0);
const dialogVisible = ref(false);
const tableData = reactive({ datas: [] });
const Opportunities = reactive({ datas: [] });
const emps = reactive({ list: [] });
const store = useStore();
//从token 获取empid
let empId = store.state.employee.user.user.empId;
console.log("empId =  ", empId);
let value1 = reactive({
  oppName: "",
  empId: empId,
  status: "",
});
// 分页
let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});

onMounted(() => {
  find();
});

function showDialog() {
  dialogVisible.value = true;
}
function showOppDetails(val) {
  drawer_opp.value = true;
  oppDetails.value = JSON.parse(JSON.stringify(val));
  console.log(JSON.parse(JSON.stringify(val)));
  console.log(oppDetails.value);
}
function showCustDetails(val) {
  drawer_cust.value = true;
  custDetails.value = JSON.parse(JSON.stringify(val));
  console.log(JSON.parse(JSON.stringify(val)));
  console.log(custDetails.value);
}
// 查询商机数据
function find() {
  value1.status == 1;
  getAllOpp(pagePlugs.data.currentPage, pagePlugs.data.pageSize, value1).then(
    (response) => {
      tableData.datas = response.data.records;
      pagePlugs.data.total = response.data.total;
      loading.value = false;
      console.log(tableData.datas);
      console.log(response.data);
    }
  );
}

const showSales = (e) => {
  e === value1.status ? (value1.status = "") : (value1.status = e);
  find();
};

function deleteSales() {
  ElMessageBox.confirm("你确认要删除这些内容吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delSales(Opportunities.datas).then(() => {
        ElMessage({
          message: "删除成功！！！！",
          type: "success",
        });
        find();
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}

function change() {
  dialog_change.value = true;
  Opportunities.datas;
}
// 多选框
function handleSelectionChange(val) {
  Opportunities.datas = val;
  num.value = Opportunities.datas.length;
  console.log(Opportunities.datas);
}

function getEmpById() {
  findById(tableData.datas).then((response) => {
    emps.list = response.data;
    console.log(emps.list);
  });
}

// 分页函数
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getAllOpps();
}
function handleCurrentChange(val) {
  pagePlugs.data.currentPage = val;
  getAllOpps();
}

// 导出选中的数据
function exportExcel() {
  selectOpp.value = true;
}
function exportToExcel() {
  htmlExcel.getExcel("#selectTable", "商机");
  ElMessage.success("导出成功！！！");
  handClose();
}

function handClose() {
  selectOpp.value = false;
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#head {
  height: 50px;
  line-height: 50px;
}
#Operation {
  height: 60px;
  position: relative;
}
</style>