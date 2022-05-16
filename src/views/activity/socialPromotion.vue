<template>
  <el-card>
    <h2>社交推广</h2>
    <div style="margin: 20px; display: block">
      <el-button type="primary" :icon="Plus" @click="showAdd()"
        >添加活动</el-button
      >
    </div>
    <el-table
      :data="datas.tableData"
      height="450"
      style="width: 100%"
      row-key="activityId"
    >
      <el-table-column prop="activityName" label="活动名" width="130">
      </el-table-column>
      <el-table-column prop="activityType" label="活动形式" width="130">
      </el-table-column>
      <el-table-column prop="activityContent" label="活动内容">
      </el-table-column>
      <el-table-column
        prop="activityStartTime"
        label="开始时间"
        width="180"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="activityStopTime"
        label="结束时间"
        width="180"
        sortable
      >
      </el-table-column>
      <el-table-column prop="activityStatus" label="活动状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.activityStatus == 1"
            >开始</el-tag
          >
          <el-tag type="error" v-else-if="scope.row.activityStatus == 0"
            >结束</el-tag
          >
          <el-tag type="info" v-else>待审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="activityCost" label="活动支出/元">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="showAdd(row)" type="text" :icon="Edit"
            >修改</el-button
          >
          <el-button @click="delActivitys(row.activityId)" type="text" :icon="Delete"
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
import { ElMessage } from "element-plus";
import { Edit, Delete, Plus,Search } from "@element-plus/icons-vue";
import activityDialog from "./activityDialog.vue";

const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

const dialogVisible = ref(false);
const dialogTittle = ref("");
const dialogTableValue = ref({});
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
  api.activity
    .getAllActivity(pagePlugs.data.pageNum, pagePlugs.data.pageSize) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      pagePlugs.data.total = response.data.total;
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

function delActivitys(activityId) {
  api.activity.delActivity(activityId).then(() => {
    ElMessage({
          message: "删除成功！！！！",
          type: "success",
    });
    getActivity();
  });
}
</script>

<style>
</style>