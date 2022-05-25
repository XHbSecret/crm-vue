<template>
  <el-card>
    <div id="flow_main">
      <div id="flow_main_header">
        <h1>流程管理</h1>
        <div id="header-but">
          <el-button @click="addFlow()" type="success" :icon="Plus"
            >新增流程</el-button
          >
        </div>
      </div>
      <el-table
        :data="datas.tableData"
        row-key="flowId"
        style="width: 100%"
        stripe
        height="500"
        @row-click="clickData"
      >
        <el-table-column prop="flowName" label="流程名" width="150px" fixed>
        </el-table-column>
        <el-table-column
          prop="flowStatus"
          label="流程状态"
          width="120px"
          type="int"
        >
          <template v-slot="scope">
            <el-tag v-if="scope.row.flowStatus == 1" type="success"
              >启用</el-tag
            >
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="flowTime" label="创建时间" sortable />
        <el-table-column prop="flowLastTime" label="最后修改时间" sortable />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click.stop="addFlowDetail(row)" type="text" :icon="Plus"
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
    </div>
  </el-card>
  <!-- 添加流程 -->
  <flowInsert
    v-model="visible_add"
    :dialogTittle="dialogTittle"
    @updateDate="getFlows"
    v-if="visible_add"
  ></flowInsert>

  <!-- 修改流程 -->
  <flowEditVue
    v-model="visible_edit"
    :dialogTittle="dialogTittle"
    @updateDate="getFlows"
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
  <!-- 显示流程详情 -->
  <flowDetail
    v-model="drawer"
    :dialogTittle="dialogTittle"
    :dialogValue="dialogValue"
    @insertDetail="addFlowDetails"
  ></flowDetail>
  <!-- 添加流程详情 -->
  <flowInsertDetails
    v-model="visible_adds"
    :dialogTittle="dialogTittle"
    @updateDate="getFlows"
    :ids="ids"
    :idss="idss"
  ></flowInsertDetails>
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
#header-but {
  float: right;
}
</style>
<script setup>
import { ref, reactive } from "@vue/reactivity";
import { onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import flowInsert from "./flowInsert.vue";
import flowInsertDetails from "./flowInsertDetails.vue";
import flowEditVue from "./flowEdit.vue";
import flowDetail from "./flowDetail.vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

let datas = reactive({ tableData: [] });

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
onMounted(() => {
  getFlows();
});

function getFlows() {
  api.flow
    .getFlows(pagePlugs.data.pageNum, pagePlugs.data.pageSize) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      pagePlugs.data.total = response.data.total;
    });
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
  api.flow.getFlowDetails(row.flowId).then((response) => {
    dialogValue.value = response.data;
  });
}
function addFlowDetail(row) {
  visible_adds.value = true;
  dialogTittle.value = row.flowName;
  ids.value = row.flowId;
  console.log(ids.value);
}
function addFlowDetails(idsss) {
  visible_adds.value = true;
  idss.value = idsss;
  console.log(idss.value);
}
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getFlows();
}
function handleCurrentChange(val) {
  pagePlugs.data.pageNum = val;
  getFlows();
}
</script>