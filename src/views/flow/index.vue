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
          <el-table-column
            label="流程名"
            prop="flowName"
            width="120"
          ></el-table-column>
          <el-table-column label="流程状态" prop="flowStatus">
            <template #default="scope">
              <el-tag v-if="scope.row.flowStatus == 1"> 启用 </el-tag>
              <el-tag v-else type="danger"> 禁用 </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="flowTime"></el-table-column>
          <el-table-column
            label="修改时间"
            prop="flowLastTime"
          ></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                @click.stop="addFlowDetail(row)"
                type="text"
                :icon="Plus"
                >添加</el-button
              >
              <el-button @click.stop="editFlow(row)" type="text" :icon="Edit"
                >修改</el-button
              >
              <el-button
                @click.stop="delFlow(row.flowId)"
                type="text"
                :icon="Delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:currentPage="pagePlugs.data.page"
          v-model:page-size="pagePlugs.data.size"
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="pagePlugs.data.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        />
        <hr />
        <div style="text-align: center">
          <p>所查结果</p>
        </div>
        <el-table
          :data="datass.tableDatas"
          row-key="flowId"
          style="width: 100%"
          stripe
          height="100"
          @row-click="clickData"
        >
          <el-table-column
            label="流程名"
            prop="flowName"
            width="120"
          ></el-table-column>
          <el-table-column label="流程状态" prop="flowStatus">
            <template #default="scope">
              <el-tag v-if="scope.row.flowStatus == 1"> 启用 </el-tag>
              <el-tag v-else type="danger"> 禁用 </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="flowTime"></el-table-column>
          <el-table-column
            label="修改时间"
            prop="flowLastTime"
          ></el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                @click.stop="addFlowDetail(row)"
                type="text"
                :icon="Plus"
                >添加</el-button
              >
              <el-button @click.stop="editFlow(row)" type="text" :icon="Edit"
                >修改</el-button
              >
              <el-button
                @click.stop="delFlow(row.flowId)"
                type="text"
                :icon="Delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
        <div>
          <el-row>
            <el-col :span="3">
              <el-button @click="addFlowDetails()" type="success" :icon="Plus"
                >新增流程步骤</el-button
              >
            </el-col>
            <el-col :span="5">
              <el-input placeholder="查询流程步骤">
                <template #append>
                  <el-button :icon="Search"></el-button>
                </template>
              </el-input>
            </el-col>
          </el-row>
          <div style="margin-top: 20px">
            <el-button
              v-for="(index, item) in fDetails.datas"
              :key="item"
              type="primary"
            >
              {{ index.flowDetailsName }}
            </el-button>
          </div>
        </div>
      </el-card>
    </transition>
  </el-card>

  <!-- 添加流程 -->
  <flowInsert
    v-model="visible_add"
    :dialogTittle="dialogTittle"
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
  <!-- 删除流程 -->
  <el-dialog width="30%" v-model="visible_del">
    <div v-if="issuccess">
      <el-result icon="success" title="删除成功！！"> </el-result>
    </div>
    <div v-else>
      <el-result icon="error" title="删除失败"> </el-result>
    </div>
  </el-dialog>
  <!-- 流程详情 -->
  <flowDetail
    v-model="drawer"
    :dialogValue="dialogValue"
    :dialogTittle="dialogTittle"
  ></flowDetail>
  <insertDetails
    v-model="visible_details"
    v-if="visible_details"
    @updateData="getFlowDetailss"
  >
  </insertDetails>
</template>
<style >
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
import { ElMessage } from "element-plus";
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
import {
  getFlows,
  getAllFlowDetails,
  getFlowss,
  getFlowDetails,
} from "@/api/system/flow";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

let datas = reactive({ tableData: [] });
let datass = reactive({ tableDatas: [] });
let flow = reactive({
  flowName: "",
});
let loading = ref(true);
let show = ref(false);
let shows = ref(false);
const fDetails = reactive({ datas: [] });
const visible_add = ref(false);
const visible_edit = ref(false);
const visible_del = ref(false);
const visible_adds = ref(false);
const issuccess = ref(false);
const drawer = ref(false);
const dialogTittle = ref("");
const dialogValue = ref({});
const ids = ref(0);
const idss = ref(0);
let pagePlugs = reactive({
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
function showFlow() {
  show.value = true;
}

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
function getFlowDetailss() {
  getAllFlowDetails().then((res) => {
    fDetails.datas = res.data;
    loading.value = false;
    console.log(fDetails.datas);
  });
}
function findFlow() {
  if (flow.flowName != "") {
    getFlowss(pagePlugs.data.pageNum, pagePlugs.data.pageSize, flow) // 使用接口，调用
      .then((response) => {
        // 响应对象
        datass.tableDatas = response.data.records;
        console.log(response.data);
      });
  } else {
    getFlows(0, 0) // 使用接口，调用
      .then((response) => {
        // 响应对象
        datass.tableDatas = response.data.records;
        console.log(response.data);
      });
  }
}

// 添加流程
function addFlow() {
  visible_add.value = true;
  dialogTittle.value = "添加流程";
}
// 修改流程
function editFlow(row) {
  visible_edit.value = true;
  dialogTittle.value = "修改流程";
  dialogValue.value = JSON.parse(JSON.stringify(row));
}

// 删除流程
function delFlow(flowId) {
  visible_del.value = true;
  api.flow.delFlow(flowId).then(() => {
    getFlows();
    issuccess.value = true;
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
function addFlowDetail(row) {
  visible_adds.value = true;
  dialogTittle.value = row.flowName;
  ids.value = row.flowId;
  console.log(ids.value);
}

function addFlowDetails() {
  visible_details.value = true;
}
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getFlow();
}
function handleCurrentChange(val) {
  pagePlugs.data.pageNum = val;
  getFlow();
}
</script>