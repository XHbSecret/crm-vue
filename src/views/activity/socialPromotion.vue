<template>
  <el-card v-loading="loading">
    <!-- 标题 -->
    <el-row>
      <el-col :span="5">
        <h1>社交推广</h1>
      </el-col>
    </el-row>
    <!-- 按钮 -->
    <div style="margin: 20px; display: block">
      <el-button type="primary" :icon="Plus" @click="showAdd()"
        >添加活动</el-button
      >
      <el-button
        type="warning"
        :icon="Delete"
        v-show="activity.tablesData.length > 0"
        @click="delActivitys()"
        >删除&nbsp;{{ activity.tablesData.length }}&nbsp;项</el-button
      >
    </div>
    <!-- 数据区域 -->
    <el-table
      :data="datas.tableData"
      height="450"
      style="width: 100%"
      row-key="activityId"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column prop="activityName" label="活动名" width="130" fixed />

      <el-table-column prop="activityType" label="活动形式" width="130" />

      <el-table-column
        prop="activityContent"
        label="活动内容"
        width="200"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <el-tooltip
            effect="dark"
            :content="scope.row.activityContent"
            placement="top"
          >
            {{ scope.row.activityContent }}
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        prop="activityStartTime"
        label="开始时间"
        width="180"
        sortable
      />
      <el-table-column
        prop="activityStopTime"
        label="结束时间"
        width="180"
        sortable
      />

      <el-table-column prop="activityStatus" label="活动状态" width="200">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.activityStatus == 1"
            >开始</el-tag
          >
          <el-tag type="error" v-else-if="scope.row.activityStatus == 0"
            >结束</el-tag
          >
          <el-tag v-else-if="scope.row.activityStatus == 2">未开始</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="activityCost" label="活动支出/元" width="200" />

      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button @click="showAdd(row)" type="text" :icon="Edit"
            >修改</el-button
          >
          <el-button type="text">发起审核</el-button>
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
  </el-card>

  <activity-dialog
    v-model="dialogVisible"
    :dialogTittle="dialogTittle"
    @updateDate="getActivity"
    :dialogTableValue="dialogTableValue"
    v-if="dialogVisible"
  ></activity-dialog>
</template>

<script setup>
import { ref, reactive } from "@vue/reactivity";
import { onMounted, getCurrentInstance } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getAllActivity, delActivity } from "@/api/system/activity";
import { Edit, Delete, Plus, Search } from "@element-plus/icons-vue";
import activityDialog from "./activityDialog.vue";

const dialogVisible = ref(false);
const dialogTittle = ref("");
const dialogTableValue = ref({});
const loading = ref(true);
const activity = reactive({ tablesData: [] });
let datas = reactive({ tableData: [] });

let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});

onMounted(() => {
  getActivity();
});

function getActivity() {
  getAllActivity(pagePlugs.data.pageNum, pagePlugs.data.pageSize) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      pagePlugs.data.total = response.data.total;
      loading.value = false;
    });
}

function showAdd(row) {
  if (row == null) {
    dialogVisible.value = true;
    dialogTittle.value = "添加活动";
    dialogTableValue.value = {};
  } else {
    dialogVisible.value = true;
    dialogTittle.value = "修改活动";
    dialogTableValue.value = JSON.parse(JSON.stringify(row));
  }
}

// 删除活动
function delActivitys() {
  ElMessageBox.confirm("你确认要删除这些活动吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delActivity(activity.tablesData).then(() => {
        ElMessage({
          message: "删除成功！！！！",
          type: "success",
        });
        getActivity();
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}

function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getActivity();
}
function handleCurrentChange(val) {
  pagePlugs.data.pageNum = val;
  getActivity();
}
function handleSelectionChange(val) {
  activity.tablesData = val;
  console.log(activity.tablesData);
}
</script>

<style>
</style>