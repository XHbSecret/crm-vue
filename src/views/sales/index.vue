<template>
  <div id="head">
    <el-row>
      <el-col :span="8"><h3>商机管理</h3></el-col>
      <el-col :span="5">
        <el-input
          placeholder="请输入商机名称"
          @change="find()"
          v-model="value1"
          clearable
        />
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
    <div style="float: left" v-show="Opportunities.datas.length > 0">
      <span>已选中{{ num }}项&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-button style="small" :icon="Switch">转移</el-button>
      <el-button :icon="Delete">删除</el-button>
      <el-button>导出选中</el-button>
    </div>
  </div>
  <el-table
    @selection-change="handleSelectionChange"
    :data="tableData.datas"
    stripe
    style="width: 100%"
    height="450"
    row-key="oppId"
    empty-text="请新建商机"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column
      label="商机名称"
      prop="oppName"
      width="130"
      fixed
    ></el-table-column>
    <el-table-column
      label="负责人"
      prop="employee.employeeDatail.empName"
      width="130"
    ></el-table-column>
    <el-table-column
      label="商机阶段"
      prop="flowId"
      width="130"
    ></el-table-column>
    <el-table-column
      label="客户名称"
      prop="customerDetail.custDetailName"
      width="130"
    ></el-table-column>
    <el-table-column label="创建人" width="130">
      <template> </template>
    </el-table-column>
    <el-table-column
      label="商机金额"
      prop="oppMoney"
      width="130"
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
    :page-sizes="[10, 20, 30, 40]"
    small
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagePlugs.data.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="float: right; height: 60px; line-height: 60px"
  />
  <salesDialog v-model="dialogVisible" v-if="dialogVisible"></salesDialog>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getAllOpp } from "@/api/sales/index";
import { Delete, Switch, Plus } from "@element-plus/icons-vue";
import salesDialog from "./salesDialog.vue";
import { useStore } from "vuex";

const store = useStore();
const value1 = ref("");
const num = ref(0);
const dialogVisible = ref(false);
const tableData = reactive({ datas: [] });

// 分页
let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});
onMounted(() => {
  getAllOpps();
});

function showDialog() {
  dialogVisible.value = true;
}

function find() {
  console.log(value1.value);
}
const Opportunities = reactive({ datas: [] });

// 多选框
function handleSelectionChange(val) {
  Opportunities.datas = val;
  num.value = Opportunities.datas.length;
  console.log(Opportunities.datas);
}

// 所有数据
function getAllOpps() {
  getAllOpp(pagePlugs.data.currentPage, pagePlugs.data.pageSize).then(
    (response) => {
      tableData.datas = response.data.records;
      pagePlugs.data.total = response.data.total;
      console.log(tableData.datas);
    }
  );
}

// 分页函数
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
}
function handleCurrentChange(val) {
  pagePlugs.data.currentPage = val;
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