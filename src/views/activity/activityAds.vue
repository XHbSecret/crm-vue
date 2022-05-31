<template>
  <el-card shadow="hover" v-loading="loading" style="height: 95%">
    <!-- 标题 -->
    <el-row>
      <el-col :span="5">
        <h1>广告投放</h1>
      </el-col>
    </el-row>

    <!-- 按钮 -->
    <el-row style="margin-bottom: 10px">
      <el-button type="primary" @click="changeValue()">投放商品</el-button>
      <el-button
        type="danger"
        :icon="Delete"
        @click="delComPro()"
        v-show="comprolist.tableDatas.length > 0"
        >删除&nbsp;{{ num }}&nbsp;项</el-button
      >
    </el-row>

    <!-- 表格区域 -->
    <el-row>
      <el-col>
        <el-table
          stripe
          style="width: 100%"
          border
          :data="datas.tableDatas"
          :row-key="comProId"
          @selection-change="handleSelectionChange"
          height="450"
        >
          <el-table-column type="selection" width="55" />

          <el-table-column
            prop="product.productName"
            label="商品名"
            width="180"
          />
          <el-table-column prop="company.companyName" label="投放公司" />
          <el-table-column prop="comProTime" label="投放日期" />
          <el-table-column prop="comProStatus" label="投放状态">
            <template v-slot="scope">
              <el-tag type="info" v-if="scope.row.comProStatus == 0"
                >未审核</el-tag
              >
              <el-tag type="success" v-else-if="scope.row.comProStatus == 1"
                >开始</el-tag
              >
              <el-tag type="error" v-else-if="scope.row.comProStatus == 2"
                >结束</el-tag
              >
              <el-tag v-else-if="scope.row.comProStatus == 3">待审核</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="comProContent"
            label="投放内容"
            :show-overflow-tooltip="true"
          >
            <template v-slot="scope">
              <el-tooltip
                effect="dark"
                :content="scope.row.comProContent"
                placement="top"
              >
                {{ scope.row.comProContent }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="comProCost" label="价格" />

          <!-- 操作区域 -->
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                type="text"
                @click="changeValue(row)"
                :disabled="row.comProStatus != 0"
                >修改</el-button
              >
              <el-button
                type="text"
                :disabled="row.comProStatus != 1"
                @click="changeStatus(row)"
                >结束</el-button
              >
              <el-button type="text" :disabled="row.comProStatus != 0"
                >发起审核</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
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
        />
      </el-col>
    </el-row>
  </el-card>

  <!-- 添加 / 修改 dialog 框 -->
  <adsDrawerVue
    v-model="dialogVisible"
    :dialogTittle="dialogTittle"
    :dialogValue="dialogValue.datas"
    @updateDate="getAll"
    v-if="dialogVisible"
  ></adsDrawerVue>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, toRaw } from "vue";
import { getAllAds, delComPros, editComProStatus } from "@/api/system/activity";
import adsDrawerVue from "./adsDrawer.vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
const loading = ref(true);

const dialogVisible = ref(false);
const dialogTittle = ref("");
const dialogValue = reactive({ datas: {} });

const datas = reactive({ tableDatas: [] });
const comprolist = reactive({ tableDatas: [] });
const num = ref(0);
// 分页
let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});

// 挂载
onMounted(() => {
  getAll();
});

// 修改按钮 触发
function changeValue(row) {
  if (row == null) {
    dialogTittle.value = "投放";
    dialogVisible.value = true;
    dialogValue.datas = {};
    console.log(toRaw(row));
  } else {
    dialogTittle.value = "修改";
    dialogVisible.value = true;
    dialogValue.datas = JSON.parse(JSON.stringify(row));
    console.log(toRaw(row));
  }
}
// 获取所有数据
function getAll() {
  getAllAds(pagePlugs.data.currentPage, pagePlugs.data.pageSize) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableDatas = response.data.records;
      pagePlugs.data.total = response.data.total;
      console.log(datas.tableDatas);
      loading.value = false;
    });
}
// 多选框
function handleSelectionChange(val) {
  comprolist.tableDatas = val;
  num.value = comprolist.tableDatas.length;
  console.log(comprolist.tableDatas);
}
// 删除
function delComPro() {
  ElMessageBox.confirm("你确认要删除这些信息吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      for (let i = 0; i < comprolist.tableDatas.length; i++) {
        console.log(comprolist.tableDatas[i].comProStatus);
        if (
          comprolist.tableDatas[i].comProStatus == 2 ||
          comprolist.tableDatas[i].comProStatus == 0
        ) {
          console.log(comprolist.tableDatas);
          delComPros(comprolist.tableDatas).then(() => {
            ElMessage({
              message: "删除成功！！！！",
              type: "success",
            });
            getAll();
          });
        } else {
          ElMessage.error("未结束与审核的广告不能删除！！！");
          getAll();
        }
      }
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}
// 结束广告
function changeStatus(row) {
  ElMessageBox.confirm("你确定要结束吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      editComProStatus(row).then(() => {
        ElMessage.success("结束成功！！！");
        getAll();
      });
    })
    .catch(() => {
      ElMessage.info("取消");
    });
}
// 分页函数
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getAll();
}
function handleCurrentChange(val) {
  pagePlugs.data.currentPage = val;
  getAll();
}
</script>

<style>
#header_btu {
  position: absolute;
  left: 71%;
  top: 20%;
  z-index: 6;
}
</style>