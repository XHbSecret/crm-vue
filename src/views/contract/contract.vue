<template>
  <!-- 标题及搜索区域 -->
  <el-row class="row">
    <!-- 标题 -->
    <el-col :span="8">
      <img src="src/assets/backMoney.png" alt="" width="30" height="30" />
      <a class="title">合同管理</a>
    </el-col>

    <!-- 搜索 -->
    <el-col :span="8">
      <el-input
        style="width: 300px"
        v-model="searchContent"
        placeholder="输入客户姓名，或合同编号"
        class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" type="primary" @click="likeSearch()" />
        </template>
      </el-input>
    </el-col>

    <!-- 新建合同 -->
    <el-col :span="8">
      <el-button
        :icon="Plus"
        type="warning"
        style="float: right; margin-right: 30px; background-color: #ff6a00"
        @click="addContract()"
        >新建合同</el-button
      >
    </el-col>
  </el-row>

  <!-- 场景 -->
  <el-row class="row">
    <el-col :span="8">
      <span>场景：</span>
      <el-select
        v-model="searchType"
        class="m-2"
        placeholder="请选择"
        @change="handlerChangeType()"
      >
        <el-option label="全部合同" value="1" />
        <el-option label="我负责的合同" value="2" />
      </el-select>
    </el-col>
  </el-row>

  <!-- 合同 表格 -->
  <el-table
    :data="contractList.data"
    height="400px"
    style="width: 100%; margin-top: 30px"
  >
    <el-table-column
      prop="contractNo"
      label="合同编号"
      width="250px"
      fixed="left"
    >
      <template v-slot="scope">
        <el-link type="primary" @click="contractItemClick(scope.row)">{{
          scope.row.contractNo
        }}</el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="contractTotalCommission"
      label="合同佣金"
      width="100px"
    >
      <template v-slot="scope">
        {{ scope.row.contractTotalCommission }}元
      </template>
    </el-table-column>

    <el-table-column
      prop="contractSignTime"
      label="合同签约时间"
      width="150px"
    />
    <el-table-column
      prop="customerDetail.custDetailName"
      label="合同客户"
      width="120px"
    >
    </el-table-column>
    <el-table-column prop="product.productName" label="合同产品" width="100px">
    </el-table-column>
    <el-table-column prop="empName" label="合同负责人" width="100px" />
    <el-table-column prop="contractDescribe" label="合同描述" />
    <el-table-column prop="contractStatus" label="合同状态" width="120px">
      <template v-slot="scope">
        <el-popover
          placement="top-start"
          title="审核进度"
          :width="200"
          trigger="hover"
          @show="showStatus(scope.row.contractId, scope.row.contractStatus)"
          @hide="disableStatus"
        >
          <template v-slot>
            <el-timeline class="info">
              <el-timeline-item
                v-for="(activity, index) in checkUser.data.records"
                :key="index"
                :timestamp="activity.checkTime"
                :color="
                  activity.checkStatus == 1
                    ? '#0bbd87'
                    : activity.checkStatus == 2
                    ? 'red'
                    : '#e4e7ed'
                "
              >
                审批人：{{
                  activity.checkUserVO.userName
                }}&nbsp;&nbsp;&nbsp;&nbsp;
                <template v-if="activity.checkStatus == 2">
                  <el-tag class="ml-2" type="danger"
                    >拒绝通过，原因是：{{ activity.checkAdvice }}</el-tag
                  >
                </template>
                <template v-else-if="activity.checkStatus == 1">
                  <el-tag>审批通过</el-tag>
                </template>
                <template v-if="activity.checkStatus == 3">
                  <el-tag class="ml-2" type="info">审批中...</el-tag>
                </template>
              </el-timeline-item>
            </el-timeline>
          </template>
          <template #reference>
            <template v-if="scope.row.contractStatus == 0">
              <div>
                <div class="cycle check-draft"></div>
                <span>草稿</span>
              </div>
            </template>
            <template v-else-if="scope.row.contractStatus == 3">
              <div>
                <div
                  class="cycle check-wait"
                  style="background-color=#398dff"
                ></div>
                <span>审核中</span>
              </div>
            </template>
            <template v-else-if="scope.row.contractStatus == 1">
              <div>
                <div
                  class="cycle check-ok"
                  style="background-color=#20b559"
                ></div>
                <span>审核通过</span>
              </div>
            </template>
            <template v-else-if="scope.row.contractStatus == 2">
              <div>
                <div
                  class="cycle check-ok"
                  style="background-color=#20b559"
                ></div>
                <span>审核未通过</span>
              </div>
            </template>
            <template v-else>
              <div>无</div>
            </template>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="280px" fixed="right" align="center">
      <template v-slot="scope">
        <template v-if="scope.row.contractStatus == 0"
          ><!-- 草稿状态 -->
          <el-button type="primary" @click="submitCheck(scope.row.contractId)"
            >提交审核</el-button
          >
          <el-button type="primary" @click="delContract()">删除</el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <!-- <el-row>
    <el-col :span="9" :offset="15">
      <el-pagination
        v-model:currentPage="page.currentPage"
        v-model:page-size="page.size"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      />
    </el-col>
  </el-row> -->
  <div style="margin: 10px 0">
    <el-pagination
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.size"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleChange"
      style="float: right"
    />
  </div>

  <!-- 添加合同的dialog 框 -->
  <el-dialog
    v-model="dialogVisible"
    title="添加合同"
    width="40%"
    draggable
    @close="closeAddContract()"
  >
    <!-- 添加的表单 -->
    <div class="addForm-info">基本信息</div>
    <el-form
      label-width="100px"
      :model="addContractForm"
      style="max-width: 460px"
    >
      <el-form-item label="客户">
        <span class="select-input">
          <el-input
            :readonly="true"
            v-model="addContractForm.custName"
            @click="openSelectCustomer()"
          />
        </span>
      </el-form-item>
      <el-form-item label="合同编号">
        <el-input v-model="addContractForm.contractNo" disabled />
      </el-form-item>
      <el-form-item label="合同金额">
        <el-input v-model="addContractForm.contractMoney" />
      </el-form-item>
      <el-form-item label="佣金">
        <el-input v-model="addContractForm.contractTotalCommission" />
      </el-form-item>
      <el-form-item label="签约时间">
        <el-date-picker
          value-format="YYYY-MM-DD"
          v-model="addContractForm.contractSignTime"
          type="date"
          placeholder="签约时间"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="addContractForm.contractDescribe" />
      </el-form-item>
    </el-form>

    <!-- 产品 -->
    <div class="addForm-info">产品信息</div>
    <!-- <el-table
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
    </el-table> -->

    <!-- 取消 确定 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitContract()">确定</el-button>
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
  <!-- 审批文件（合同）抽屉 -->
  <!-- <el-drawer

    v-model="contractDrawer"
    title="I am the title"
    :with-header="false"
    size="75%"
  >
  {{contractList.data}}
</el-drawer> -->
  <contCT
    v-if="contractDrawer"
    v-model:contractDrawer="contractDrawer"
    :rowInfo="rowInfo"
  ></contCT>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { nanoid } from "nanoid";
import { Search, Plus } from "@element-plus/icons-vue";
import {
  getAllContractPage,
  getContractByEmp,
  addContractTo,
  searchByLike,
  updateStatus,
} from "@/api/contract/index";
import { getRecordByService } from "@/api/check/checkFlow";
import { CustomerSearch } from "@/api/customer/index";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import contCT from "./contractCT.vue";
import contractItem from "../check/contractItem.vue";
const store = useStore();
let searchContent = ref("");
let searchType = ref("1");
let dialogVisible = ref(false);
let dialogVisible_SelectCustomer = ref(false);
let backList = reactive({ data: [] });
let contractList = reactive({ data: [] });
let productList = reactive({ data: [] });
let page = reactive({
  currentPage: 1,
  size: 5,
  total: 0,
});
let custPage = reactive({
  currentPage: 1,
  size: 4,
  total: 0,
});

// 模糊查询
function likeSearch() {
  if (searchContent.value != "") {
    searchByLike(page.currentPage, page.size, searchContent.value).then(
      (res) => {
        contractList.data = res.data.records;
        page.total = res.data.total;
      }
    );
  } else {
    getAllContractPage(page.currentPage, page.size).then((res) => {
      contractList.data = res.data.records;
      page.total = res.data.total;
    });
  }
}
//合同分页
function handleSizeChange(val) {
  page.size = val;
  getAllContractPage(page.currentPage, page.size).then((res) => {
    contractList.data = res.data.records;
    page.total = res.data.total;
  });
}
function handleChange(val) {
  page.currentPage = val;
  getAllContractPage(page.currentPage, page.size).then((res) => {
    contractList.data = res.data.records;
    page.total = res.data.total;
  });
}
// 添加合同的表单
let addContractForm = reactive({
  empId: store.state.employee.user.user.empId,
  empName: store.state.employee.user.user.employeeDatail.empName,
  productId: 3,
  contractNo: nanoid(), // 合同编号
  custId: 0,
  custName: "请选择客户",
  contractMoney: "",
  contractTotalCommission: "",
  contractSignTime: "",
  contractDescribe: "",
  contractStatus: 0,
});
//关于客户数据的
let selectCustomer = { name: "", id: 0 };
let customerList = reactive({ data: [] });
let empId = store.state.employee.user.user.empId;
let Customerterm = reactive({
  empId,
  custDetailName: "",
});

//合同详情
let contractDrawer = ref(false);
//传入抽屉的值
const rowInfo = ref({}); // 子组件的传递的 合同id

//表格 合同触发
function contractItemClick(row) {
  contractDrawer.value = true;
  rowInfo.value = row
  // contractId.value = row.contractId
  // contractData.data = rows
}

let checkUser = reactive({ data: {} });
// 状态显示
function showStatus(contractId, status) {
  if (status != 0) {
    getRecordByService(1, contractId).then((res) => {
      console.log(res.data);
      checkUser.data = res.data;
    });
  }
}

// 状态消失
function disableStatus() {
  checkUser.data = {};
}

// 提交审核
function submitCheck(contractId) {
  updateStatus(contractId, 3).then((res) => {
    if (res.data) {
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("提交失败");
    }
  });
}

// 删除合同
function delContract() {}

//提交合同
function submitContract() {
  dialogVisible.value = false;
  console.log(addContractForm);
  addContractTo(addContractForm).then((res) => {
    if (res.data != null) {
      ElMessage.success("添加成功");
      getAllContractPage(page.currentPage, page.size).then((res) => {
        contractList.data = res.data.records;
        page.total = res.data.total;
      });
    } else {
      ElMessage.error("添加失败");
    }
  });
}

// 处理改变类型
function handlerChangeType() {
  if (searchType.value == "2") {
    getContractByEmp(
      store.state.employee.user.user.empId,
      page.currentPage,
      page.size
    ).then((res) => {
      contractList.data = [];
      contractList.data = res.data.records;
      page.total = res.data.total;
    });
  } else {
    getAllContractPage(page.currentPage, page.size).then((res) => {
      contractList.data = res.data.records;
      page.total = res.data.total;
    });
  }
}

// 客户dialog框，选择后确认
function customerConfirm() {
  dialogVisible_SelectCustomer.value = false;
  if (selectCustomer != 0) {
    addContractForm.custId = selectCustomer.id;
    addContractForm.custName = selectCustomer.name;
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
function handleCustPage() {
  customerList.data = [];
  CustomerSearch(custPage.currentPage, custPage.size, Customerterm).then(
    (res) => {
      customerList.data = res.data.records;
      custPage.total = res.data.total;
    }
  );
}

// 选择客户input 点击
function openSelectCustomer() {
  dialogVisible_SelectCustomer.value = true;
  CustomerSearch(custPage.currentPage, custPage.size, Customerterm).then(
    (res) => {
      customerList.data = res.data.records;
      custPage.total = res.data.total;
    }
  );
}

// 添加回款 按钮
function addContract() {
  dialogVisible.value = true;
}

// 挂载
onMounted(() => {
  // 合同信息
  getAllContractPage(page.currentPage, page.size).then((res) => {
    contractList.data = res.data.records;
    page.total = res.data.total;
    console.log(contractList.data);
  });
  // 产品新消息
  //TODO
});

// 关闭 添加合同dialog框
function closeAddContract() {
  addContractForm = {};
}
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

<style scoped>
.addForm-info {
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #2362fb;
  font-size: 14px;
  font-weight: 600;
}
.check-draft {
  background-color: #bfbfbf;
}
.check-wait {
  background-color: #398dff;
}
.check-ok {
  background-color: #20b559;
}
.cycle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 5px;
}
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
