<template>
  <!-- 标题及搜索区域 -->
  <el-row class="row">
    <!-- 标题 -->
    <el-col :span="8">
      <img src="src/assets/backMoney.png" alt="" width="30" height="30" />
      <a class="title">回款管理</a>
    </el-col>

    <!-- 搜索 -->
    <el-col :span="8">
      <el-input
        style="width: 300px"
        v-model="searchContent"
        placeholder="输入客户姓名，或回款编号"
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" type="primary" />
        </template>
      </el-input>
    </el-col>

    <!-- 添加回款 -->
    <el-col :span="8">
      <el-button
        :icon="Plus"
        type="warning"
        style="float: right; margin-right: 30px; background-color: #ff6a00"
        @click="addBack()"
        >新建回款</el-button
      >
    </el-col>
  </el-row>

  <!-- 场景 -->
  <el-row class="row">
    <el-col :span="8">
      <span>场景：</span>
      <el-select v-model="searchType" class="m-2" placeholder="请选择">
        <el-option label="全部回款" value="1" />
      </el-select>
    </el-col>
  </el-row>

  <!-- 表格 -->
  <el-row class="row">
    <el-table :data="backList.data" height="420px" stripe style="width: 100%">
      <el-table-column prop="backNo" label="回款编号" fixed />
      <el-table-column prop="customer.custDetailName" label="客户名称" />
      <el-table-column prop="contract.contractNo" label="合同编号" />
      <el-table-column prop="backMethod" label="回款方式" />
      <el-table-column prop="backMoney" label="回款金额" />
      <el-table-column prop="backDescribe" label="备注" />
      <el-table-column prop="employeeDatail.empName" label="负责人" />
      <el-table-column prop="backTime" label="回款时间" />
      <el-table-column prop="backStatus" label="回款状态" fixed="right" />
    </el-table>
  </el-row>

  <!-- 分页 -->
  <el-row>
    <el-col :span="9" :offset="15">
      <el-pagination
        v-model:currentPage="page.currentPage"
        v-model:page-size="page.size"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      />
    </el-col>
  </el-row>

  <!-- 添加回款的dialog 框 -->
  <el-dialog v-model="dialogVisible" title="添加回款" width="40%" draggable>
    <!-- 添加的表单 -->
    <el-form label-width="100px" :model="addBackForm" style="max-width: 460px">
      <el-form-item label="客户">
        <span class="select-input">
          <el-input
            :readonly="true"
            v-model="addBackForm.backCustName"
            @click="openSelectCustomer()"
          />
        </span>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="addBackForm.contractNo" />
      </el-form-item>
      <el-form-item label="回款方式">
        <el-select v-model="addBackForm.backMethod" placeholder="选择回款方式">
          <el-option label="微信" value="微信" />
          <el-option label="支付宝" value="支付宝" />
          <el-option label="银联" value="银联" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="回款日期">
        <el-date-picker
          value-format="YYYY-MM-DD"
          v-model="addBackForm.backTime"
          type="date"
          placeholder="回款时间"
        />
      </el-form-item>
      <el-form-item label="回款金额">
        <el-input v-model="addBackForm.backMoney" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="addBackForm.backDescribe" />
      </el-form-item>
    </el-form>

    <!-- 取消 确定 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 选择客户的dialog框 -->
  <el-dialog
    v-model="dialogVisible_SelectCustomer"
    title="选择客户"
    width="40%"
    draggable
  >
    <!-- 客户 -表格 -->
    <el-table
      :data="customerList.data"
      height="200px"
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="客户名称" prop="customerDetail.custDetailName" />
      <el-table-column
        prop="customerDetail.custDetailPhone"
        label="电话"
        sortable
      />
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="custPage.currentPage"
      v-model:page-size="custPage.size"
      layout="prev, pager, next"
      background
      :total="custPage.total"
      @current-change="handleCustPage"
    />

    <!-- 取消 确定 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_SelectCustomer = false"
          >取消</el-button
        >
        <el-button type="primary" @click="customerConfirm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { Search, Plus } from "@element-plus/icons-vue";
import { getAllBackMoney } from "@/api/back/backMoney";
import { CustomerSearch } from "@/api/customer/index";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

const store = useStore();
let searchContent = ref();
let searchType = ref("1");
let dialogVisible = ref(false);
let dialogVisible_SelectCustomer = ref(false);
let backList = reactive({ data: [] });
let page = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
let custPage = reactive({
  currentPage: 1,
  size: 4,
  total: 0,
});

let addBackForm = reactive({
  contractId: "请点击选择合同",
  backCustId: 0,
  backCustName: "请点击选择客户",
  backEmpId: 0,
});
//关于客户数据的
let selectCustomer = { name: "", id: 0 };
let customerList = reactive({ data: [] });
let empId = store.state.employee.user.user.empId;
let Customerterm = reactive({
  empId,
  custDetailName: "",
});

// 客户dialog框，选择后确认
function customerConfirm() {
  dialogVisible_SelectCustomer.value = false;
  if (selectCustomer != 0) {
    addBackForm.backCustId = selectCustomer.id;
    addBackForm.backCustName = selectCustomer.name;
  }
}

// 改变客户 复选框
function handleCurrentChange(row) {
  console.log("row");
  console.log(row);
  if (row != null) {
    selectCustomer.id = row.custId;
    selectCustomer.name = row.customerDetail.custDetailName;
  }
}

//客户分页
function handleCustPage(){
  customerList.data = []
  CustomerSearch(custPage.currentPage, custPage.size, Customerterm).then((res) => {
    customerList.data = res.data.records;
    custPage.total = res.data.total
  });
}

// 选择客户input 点击
function openSelectCustomer() {
  dialogVisible_SelectCustomer.value = true;
  CustomerSearch(custPage.currentPage, custPage.size, Customerterm).then((res) => {
    customerList.data = res.data.records;
    custPage.total = res.data.total
  });
}

// 添加回款 按钮
function addBack() {
  dialogVisible.value = true;
}

// 挂载
onMounted(() => {
  getAllBackMoney(page.currentPage, page.size).then((res) => {
    backList.data = res.data.records;
    page.total = res.data.total;
  });
});
</script>


<script>
export default {
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style>
.select-input .el-input__wrapper {
  background-color: #eee;
  cursor: pointer;
}
.select-input .el-input__inner {
  cursor: pointer;
}
.select-input {
  background-color: #eeeeee;
}
.row {
  margin-bottom: 25px;
}
.title-search {
  display: inline-block;
  margin: 0 auto;
}
.title {
  vertical-align: super;
  font-size: 16px;
  font-weight: 600;
  padding-left: 10px;
}
</style>