<template>
  <el-card shadow="hover" v-loading="loading" style="height: 95%">
    <!-- 标题 -->
    <div v-show="comprolist.tableDatas.length > 0" id="header_btu">
      <el-button type="danger" :icon="Delete" @click="delComPro()"
        >删除&nbsp;{{ num }}&nbsp;项</el-button
      >
    </div>
    <el-row>
      <el-col :span="5">
        <h1>广告投放</h1>
      </el-col>
    </el-row>

    <!-- 搜索区域 -->
    <el-row style="margin-bottom: 10px">
      <el-col :span="5">
        <el-input placeholder="输入搜索条件" v-model="seaches"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search"></el-button>
      <el-button type="primary" @click="changeValue()">投放商品</el-button>
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
                >待审核</el-tag
              >
              <el-tag type="success" v-else>开始</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="comProContent" label="投放内容" />
          <el-table-column prop="comProCost" label="价格" />

          <!-- 操作区域 -->
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                type="text"
                @click="changeValue(row)"
                :disabled="row.comProStatus == 1"
                >修改</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
import { getAllAds, delComPros } from "@/api/system/activity";
import adsDrawerVue from "./adsDrawer.vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
const seaches = ref("");
const loading = ref(true);
const dialogVisible = ref(false);
const dialogTittle = ref("");
const dialogValue = reactive({ datas: {} });
const datas = reactive({ tableDatas: [] });
const comprolist = reactive({ tableDatas: [] });
const num = ref(0);
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
  console.log("xixi");
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
function handleSelectionChange(val) {
  comprolist.tableDatas = val;
  num.value = comprolist.tableDatas.length;
  console.log(comprolist.tableDatas);
}

function delComPro() {
  ElMessageBox.confirm("你确认要删除这些信息吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      if (comprolist.tableDatas.comProStatus != 2) {
        ElMessage.error("未结束与审核的广告不能删除！！！");
      }
      delComPros(comprolist.tableDatas).then(() => {
        ElMessage({
          message: "删除成功！！！！",
          type: "success",
        });
        getAll();
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}
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