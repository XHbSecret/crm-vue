<template>
  <div id="flow_main">
    <div id="flow_main_header">
      <h1>流程管理</h1>
      <div id="header-but">
        <el-button @click="visible_add = true" type="success" :icon="Plus"
          >新增流程</el-button
        >
      </div>
    </div>
    <el-table
      :data="datas.tableData"
      row-key="flowId"
      style="width: 100%"
      height="500"
      stripe
      @row-click="clickData"
    >
      <el-table-column prop="flowName" label="流程名" width="150px" fixed >
      </el-table-column>
      <el-table-column
        prop="flowStatus"
        label="流程状态"
        width="120px"
        type="int"
      >
      </el-table-column>
      <el-table-column prop="flowTime" label="创建时间" sortable />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click.stop="addFlowDetail(scope.row.flowId)" type="text" :icon="Plus"
            >添加</el-button
          >
          <el-button
            @click.stop="editFlow(scope.row)"
            type="text"
            :icon="Edit"
            >修改</el-button
          >
          <el-button
            @click.stop ="delFlow(scope.row.flowId)"
            type="text"
            :icon="Delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      layout="total, sizes, prev, pager, next"
      :total="40"
    />
    <span
      style="
        color: red;
        font-style: italic;
        font-size: small;
        display: block;
        float: right;
      "
      >流程状态:1为启用,0为禁用</span
    >
  </div>

  <!-- 添加流程 -->
  <el-dialog title="添加流程" width="50%" v-model="visible_add">
    <el-form :model="addflow" label-width="200px" :rules="rules" ref="formRef">
      <el-form-item label="流程名" prop="flowName">
        <el-col :span="10">
          <el-input
            v-model="addflow.flowName"
            placeholder="请输入流程名"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="流程状态" prop="flowStatus">
        <el-radio-group v-model="addflow.flowStatus">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addFlows()">添加</el-button>
      <el-button type="info" @click="cancle()">取消</el-button>
    </template>
  </el-dialog>
  <!-- 添加流程详情 -->
    <el-dialog title="添加详情" width="50%" v-model="visible_adds">
    <el-form :model="flowDetail" label-width="200px" :rules="rules" ref="formRef">
      <el-form-item label="流程详情名" prop="flowDetailsName">
        <el-col :span="10">
          <el-input
            v-model="flowDetail.flowDetailsName"
            placeholder="请输入流程详情名"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="是否审核" prop="flowIsCheck">
        <el-col :span="10">
          <el-radio-group v-model="flowDetail.flowIsCheck">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item label="顺序" prop="flowOrder">
        <el-col :span="10">
          <el-input v-model.number="flowDetail.flowOrder" />
        </el-col>
      </el-form-item>
      <el-form-item label="介绍" prop="flowDesc">
        <el-col :span="10">
          <el-input v-model="flowDetail.flowDesc" type="textarea"/>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addFlows()">添加</el-button>
      <el-button type="info" @click="cancle()">取消</el-button>
    </template>
  </el-dialog>
  <!-- 修改流程 -->
  <el-dialog title="修改流程" width="50%" v-model="visible_edit"> 
    <el-form :model="editFlows" label-width="200px" :rules="rules" ref="formRef">
      <el-form-item label="流程名" prop="flowName">
        <el-col :span="10">
          <el-input
            v-model="editFlows.flowName"
            placeholder="请输入流程名"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="流程状态" prop="flowStatus">
        <el-radio-group v-model="editFlows.flowStatus">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addFlows()">保存</el-button>
      <el-button type="info" @click="cancle()">取消</el-button>
    </template>

  </el-dialog>
  <!-- 删除流程 -->
  <el-dialog  width="30%" v-model="visible_del">
    <div v-if="issuccess">
      <el-result icon="success" title="删除成功！！"> </el-result>
    </div>
    <div v-else>
      <el-result icon="error" title="删除失败"> </el-result>
    </div>
  </el-dialog>
  <el-drawer v-model="drawer" :modal="false">
    <el-form :model="showflows"> </el-form>
  </el-drawer>
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
  margin: 20px;
}
h1 {
  font-style: italic;
  float: left;
  font-size: larger;
}
#header-but {
  width: 100px;
  float: right;
  margin: 12px;
}
</style>
<script setup>
import { ref, reactive } from "@vue/reactivity";
import { onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";

let datas = reactive({ tableData: [] });

const visible_add = ref(false);
const visible_edit = ref(false);
const visible_del = ref(false);
const visible_adds=ref(false);
const issuccess = ref(false);
const formRef = ref(null);
const drawer = ref(false);

let addflow = reactive({
  flowName: "",
  flowStatus: "",
});
let flowDetail = reactive({
  flowDetailsName:"",
  flowIsCheck:"",
  flowDesc:"",
  flowOrder:""
})

let editFlows = reactive({

})

let showflows = reactive({
  flowStatus: "",
  flowDetailsName: "",
});

const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

onMounted(() => {
  getFlows();
});

function getFlows() {
  api.flow
    .getFlows() // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data;
      console.log(JSON.stringify(datas.tableData));
      // console.log(response)
    });
}

function addFlows() {
  api.flow.addFlow(addflow).then((response) => {
    datas.tableData.push(response.data);
    formRef.value.resetFields();
    console.log(response.data);
    visible_add.value = false;
  });
}
function editFlow() {
  visible_edit.value = true;


}
function delFlow(flowId) {
  console.log(flowId);
  visible_del.value = true;
  api.flow.delFlow(flowId).then(() => {
    getFlows();
    issuccess.value = true;
  });
}
function cancle() {
  formRef.value.resetFields();
  visible_add.value = false;
  visible_edit.value=false;
}
function clickData(row) {
  drawer.value = true;
  api.flow.getFlowDetails(row.flowId).then((response) => {
    console.log(response.data);
  });
  console.log(row.flowId);
}
function addFlowDetail(){
  visible_adds.value = true;
}

let rules = reactive({
  flowName: [{ required: true, message: "请输入流程名", trigger: "blur" }],
  flowStatus: [{ required: true, message: "请选择状态", trigger: "blur" }],
});
</script>