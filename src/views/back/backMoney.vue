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
      <el-table-column prop="backNo" label="回款编号" fixed width="180px">
        <template v-slot="scope">
          <el-link type="primary" @click="backNoLink(scope.row)">{{scope.row.backNo}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="customer.custDetailName" label="客户名称" />
      <el-table-column prop="contract.contractNo" label="合同编号" />
      <el-table-column prop="backMethod" label="回款方式" />
      <el-table-column prop="backMoney" label="回款金额" />
      <el-table-column prop="backDescribe" label="备注" />
      <el-table-column prop="employeeDatail.empName" label="负责人" />
      <el-table-column prop="backTime" label="回款时间" />
      <el-table-column prop="backStatus" label="回款状态" fixed="right">
        <template v-slot="scope">
          <el-popover
            placement="top-start"
            title="审核进度"
            :width="200"
            trigger="hover"
            @show="showStatus(scope.row.backId,scope.row.backStatus)"
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
                审批人：{{ activity.checkUserVO.userName }}&nbsp;&nbsp;&nbsp;&nbsp;
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
              <div v-if="scope.row.backStatus == 0">
                <div class="cycle check-draft"></div>
                <span>未审核</span>
              </div>
              <div v-else-if="scope.row.backStatus == 1">
                <div class="cycle check-ok"></div>
                <span>审核通过</span>
              </div>
              <div v-else-if="scope.row.backStatus == 3">
                <div class="cycle check-wait"></div>
                <span>审核中</span>
              </div>
              <div v-else-if="scope.row.backStatus == 2">
                <div class="cycle check-no"></div>
                <span>审核未通过</span>
              </div>
            </template>
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column  label="操作" fixed="right" align="center" width="280px">
        <template v-slot="scope">
          <template v-if="scope.row.backStatus ==0">
            <el-button type="primary" @click="backBtn(scope.row.backId)">回款（审核）</el-button>
          </template>
        </template>
      </el-table-column>
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

  <!-- 回款详情的 抽屉 -->
  <el-drawer v-model="backDrawer" title="I am the title" :with-header="false" size="75%">
    <span>Hi there!</span>
  </el-drawer>

</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { Search, Plus } from "@element-plus/icons-vue";
import { getAllBackMoney,updateStatusById } from "@/api/back/backMoney";
import { getRecordByService } from "@/api/check/checkFlow";
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

let checkUser = reactive({data:{}})
let backDrawer =  ref(false)

// 表格中 回款编号 link点击
function backNoLink(row){
  backDrawer.value = true
}

// 状态显示
function showStatus(contractId,status){
  if(status != 0){
    getRecordByService(2,contractId).then((res) => {
      console.log(res.data)
      checkUser.data = res.data;
    });
  }
}

// 状态消失
function disableStatus(){
  checkUser.data ={}
}

// 回款审核按钮
function backBtn(backId){
  updateStatusById(backId).then(res=>{
    console.log(res.data)
  })
}

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