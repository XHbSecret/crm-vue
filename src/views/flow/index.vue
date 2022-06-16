<template>
  <el-card>
    <div>
      已有流程
      <el-button
        :icon="ArrowDownBold"
        style="float: right"
        v-if="show == false"
        @click="show = !show"
        >展开</el-button
      >
      <el-button
        :icon="ArrowUpBold"
        style="float: right"
        v-if="show == true"
        @click="show = !show"
        >收起</el-button
      >
    </div>
    <transition name="flow">
      <el-card
        shadow="never"
        v-loading="loading"
        v-show="show"
        style="margin: 20px"
      >
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="4">
                <el-button @click="addFlow()" type="success" :icon="Plus"
                  >新增流程</el-button
                >
              </el-col>
              <el-col :span="5">
                <el-input
                  placeholder="通过流程名查询流程"
                  v-model="flow.flowName"
                  clearable
                >
                  <template #append>
                    <el-button :icon="Search" @click="findFlow"></el-button>
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-table
          :data="datas.tableData"
          row-key="flowId"
          style="width: 95%"
          stripe
          height="250"
          @row-click="clickData"
        >
          <el-table-column label="序号" width="80">
            <template v-slot="scope">
              {{
                (pagePlugs.data.pageNum - 1) * pagePlugs.data.pageSize +
                scope.$index +
                1
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="流程名"
            prop="flowName"
            width="120"
          ></el-table-column>
          <el-table-column label="流程状态" prop="flowStatus">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.flowStatus"
                active-text="启用"
                inactive-text="禁用"
                @click.stop="changStatus(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="flowTime"></el-table-column>
          <el-table-column
            label="修改时间"
            prop="flowLastTime"
          ></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button @click.stop="addFlow(row)" type="text" :icon="Plus"
                >添加</el-button
              >
              <el-button @click.stop="editFlow(row)" type="text" :icon="Edit"
                >修改</el-button
              >
              <el-button @click.stop="delFlow(row)" type="text" :icon="Delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:currentPage="pagePlugs.data.pageNum"
          v-model:page-size="pagePlugs.data.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="pagePlugs.data.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        />
      </el-card>
    </transition>
  </el-card>

  <el-card style="margin-top: 20px">
    <div>
      已有步骤
      <el-button
        :icon="ArrowDownBold"
        style="float: right"
        v-if="shows == false"
        @click="shows = !shows"
        >展开</el-button
      >
      <el-button
        :icon="ArrowUpBold"
        style="float: right"
        v-if="shows == true"
        @click="shows = !shows"
        >收起</el-button
      >
    </div>
    <transition name="flowDetails">
      <el-card
        shadow="never"
        style="margin: 20px"
        v-show="shows"
        v-loading="loading"
      >
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="3">
                <el-button @click="addFlowDetails()" type="success" :icon="Plus"
                  >新增流程步骤</el-button
                >
              </el-col>
              <el-col :span="5">
                <el-input
                  placeholder="查询流程步骤"
                  v-model="flows.flowDetailsName"
                  clearable
                >
                  <template #append>
                    <el-button
                      :icon="Search"
                      @click="findFlowDetails"
                    ></el-button>
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-table :data="fDetails.datas" style="width: 90%" stripe height="250">
          <el-table-column label="序号" width="80">
            <template v-slot="scope">
              {{
                (pagePlugsd.data.pageNum - 1) * pagePlugsd.data.pageSize +
                scope.$index +
                1
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="步骤名"
            prop="flowDetailsName"
            width="120"
          ></el-table-column>
          <el-table-column label="说明" prop="flowDetailsDesc" width="120">
            <template v-slot="scope">
              {{
                scope.row.flowDetailsDesc == null
                  ? "无"
                  : scope.row.flowDetailsDesc
              }}
            </template>
          </el-table-column>
          <el-table-column label="是否审核" prop="flowIdCheck" width="120">
            <template v-slot="scope">
              <el-tag v-if="scope.row.flowIsCheck == 1">需要</el-tag>
              <el-tag type="danger" v-else>不需要</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否使用" prop="flowId" width="120">
            <template v-slot="scope">
              <el-tag type="danger" v-if="scope.row.flowId == null"
                >未使用</el-tag
              >
              <el-tag v-else>已使用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="text"
                :icon="Edit"
                @click="addFlowDetails(scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                :icon="Delete"
                @click="delDetail(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:currentPage="pagePlugsd.data.pageNum"
          v-model:page-size="pagePlugsd.data.pageSize"
          :page-sizes="[10, 30, 60, 90, 120]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="pagePlugsd.data.total"
          @size-change="handleSizeChangeDetails"
          @current-change="handleCurrentChangeDetails"
          background
        />
      </el-card>
    </transition>
  </el-card>

  <!-- 添加流程 -->
  <flowInsert
    v-model="visible_add"
    :dialogTittle="dialogTittle"
    :dialogDetailsValue="dialogDetailsValue"
    @updateDate="getFlow"
    v-if="visible_add"
  ></flowInsert>

  <!-- 修改流程 -->
  <flowEditVue
    v-model="visible_edit"
    :dialogTittle="dialogTittle"
    @updateDate="getFlow"
    :dialogValue="dialogValue"
    v-if="visible_edit"
  ></flowEditVue>

  <!-- 流程详情 -->
  <flowDetail
    v-model="drawer"
    :dialogValue="dialogValue"
    @updateData="getFlow"
  ></flowDetail>
  <!-- 添加详情 -->
  <insertDetails
    v-model="visible_details"
    v-if="visible_details"
    :dialogEditValue="dialogEditValue"
    :dialogTittle="dialogTittles"
    @updateData="getFlowDetailss"
  >
  </insertDetails>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}
#flow_main {
  width: 100%;
}
#flow_main_header {
  height: 60px;
}
h1 {
  font-style: italic;
  float: left;
  font-size: larger;
  height: 50px;
}

.flow-enter-active {
  animation: myAniY 1s;
}

.flow-leave-active {
  animation: myAniX 1s reverse;
}
.flowDetails-enter-active {
  animation: myAniY 1s;
}

.flowDetails-leave-active {
  animation: myAniX 1s reverse;
}
@keyframes myAniY {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0px);
  }
}
@keyframes myAniX {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
<script setup>
import { ref, reactive } from "@vue/reactivity";
import { onMounted, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Edit,
  Delete,
  Plus,
  Search,
  ArrowDownBold,
  ArrowUpBold,
} from "@element-plus/icons-vue";
import flowInsert from "./flowInsert.vue";
import flowInsertDetails from "./flowInsertDetails.vue";
import flowEditVue from "./flowEdit.vue";
import flowDetail from "./flowDetail.vue";
import insertDetails from "./insertDetails.vue";
import editDetail from "./editDetails.vue";
import {
  getFlows,
  getAllFlowDetails,
  getFlowss,
  getFlowDetails,
  editFlowStatus,
  getAllFlowDetailsName,
  delDetails,
} from "@/api/system/flow";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

let datas = reactive({ tableData: [] });
let datass = reactive({ tableDatas: [] });
let datasd = reactive({ tableDatas: [] });
let flow = reactive({
  flowName: "",
});
let flows = reactive({
  flowDetailsName: "",
});
let loading = ref(true);
let show = ref(false);
let shows = ref(false);
const fDetails = reactive({ datas: [] });
const visible_add = ref(false);
const visible_edit = ref(false);
const drawer = ref(false);
const dialogTittle = ref("");
const dialogTittles = ref("");
const dialogValue = ref({});
const dialogEditValue = ref({});
const height = ref(0);
const visible_adds = ref(false);
const dialogTittless = ref("");
const dialogDetailsValue = ref({});

// 流程的分页
let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});

// 步骤的分页
let pagePlugsd = reactive({
  data: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});
const visible_details = ref(false);

onMounted(() => {
  getFlow();
  getFlowDetailss();
});

function getheight() {
  height.value = 250;
}

// 获取流程
function getFlow() {
  getFlows(pagePlugs.data.pageNum, pagePlugs.data.pageSize) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      console.log(response.data);
      pagePlugs.data.total = response.data.total;

      loading.value = false;
    });
}

// 获取步骤
function getFlowDetailss() {
  getAllFlowDetails(pagePlugsd.data.pageNum, pagePlugsd.data.pageSize).then(
    (res) => {
      fDetails.datas = res.data.records;
      pagePlugsd.data.total = res.data.total;
      loading.value = false;
      console.log(fDetails.datas);
    }
  );
}

// 查询流程
function findFlow() {
  if (flow.flowName != "") {
    getFlowss(pagePlugs.data.pageNum, pagePlugs.data.pageSize, flow) // 使用接口，调用
      .then((response) => {
        // 响应对象
        datas.tableData = response.data.records;
        console.log(response.data);
      });
  } else {
    getFlow();
  }
}

// 查询步骤
function findFlowDetails() {
  if (flows.flowDetailsName != "") {
    getAllFlowDetailsName(
      pagePlugsd.data.pageNum,
      pagePlugsd.data.pageSize,
      flows
    ) // 使用接口，调用
      .then((response) => {
        // 响应对象
        fDetails.datas = response.data.records;
        console.log(response.data);
      });
  } else {
    getFlowDetailss();
  }
}

// 添加流程
function addFlow(row) {
  if (row == null) {
    visible_add.value = true;
    dialogTittle.value = "添加流程";
    dialogDetailsValue.value = {};
  } else {
    visible_add.value = true;
    dialogTittle.value = "添加步骤";
    dialogDetailsValue.value = JSON.parse(JSON.stringify(row))
  }
}

// 修改流程
function editFlow(row) {
  visible_edit.value = true;
  dialogTittle.value = "修改流程";
  dialogValue.value = JSON.parse(JSON.stringify(row));
}

// 删除流程
function delFlow(row) {
  ElMessageBox.confirm("你确认要删除这个流程吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      if (row.flowStatus == 1) {
        ElMessage.error("已启用的流程不能删除！！");
      } else {
        api.flow.delFlow(row.flowId).then(() => {
          ElMessage.success("删除成功！！！");
          getFlow();
        });
      }
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}

// 修改状态
function changStatus(row) {
  editFlowStatus(row)
    .then(() => {
      ElMessage.success("修改成功！！！");
      getFlow();
    })
    .catch(() => {
      ElMessage.error("修改失败！！！");
    });
}

// 流程细项
function clickData(row) {
  drawer.value = true;
  dialogTittle.value = row.flowName;
  getFlowDetails(row.flowId).then((response) => {
    dialogValue.value = response.data;
  });
}

// 添加流程步骤
function addFlowDetails(row) {
  if (row == null) {
    visible_details.value = true;
    dialogTittles.value = "添加步骤";
    dialogEditValue.value = {};
  } else {
    visible_details.value = true;
    dialogTittles.value = "修改步骤";
    dialogEditValue.value = JSON.parse(JSON.stringify(row));
  }
}

// 删除步骤
function delDetail(row) {
  ElMessageBox.confirm("你确认要删除这个步骤吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delDetails(row.flowDetailsId).then(() => {
        ElMessage.success("删除成功！！！");
        getFlowDetailss();
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}

function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getFlow();
}
function handleCurrentChange(val) {
  pagePlugs.data.pageNum = val;
  getFlow();
}
function handleSizeChangeDetails(val) {
  pagePlugsd.data.pageSize = val;
  getFlowDetailss();
}
function handleCurrentChangeDetails(val) {
  pagePlugsd.data.pageNum = val;
  getFlowDetailss();
}
</script>