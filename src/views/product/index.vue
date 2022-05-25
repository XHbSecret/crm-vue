<template>
  <el-card>
    <header id="header">
      <el-row>
        <el-col :span="6" style="width: 600px">产品管理</el-col>
        <el-col :span="5">
          <el-input placeholder="请输入产品名" v-model="seaches"></el-input>
        </el-col>
        <el-button :icon="Search" type="primary" @click="search"></el-button>
        <el-col :span="6">
          <el-button type="warning" :icon="Plus" @click="addProduct"
            >添加产品</el-button
          >
        </el-col>
      </el-row>
    </header>
    <div v-show="productList.datas.length > 0" id="head">
      <span style="font-size: smaller">已选中{{ num }}条数据</span
      >&nbsp;&nbsp;&nbsp;
      <el-button type="">导出选中</el-button>
      <el-button type="" :icon="Delete" @click="delProduct()">删除</el-button>
      <el-button type="" @click="UpProduct()">上架</el-button>
      <el-button type="" @click="DownProduct()">下架</el-button>
    </div>
    <el-table
      :data="datas.tableData"
      stripe
      style="width: 100%"
      height="500"
      border
      :row-key="productNo"
      @selection-change="handleSelectionChange"
      id="body-table"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="productName" label="产品名" width="180">
        <template v-slot="scope" default="{row}">
          <a href="#" @click.prevent="clickData(scope.row)">{{
            scope.row.productName
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="户型" width="180" />
      <el-table-column prop="houseType" label="房子类型" width="180">
        <template v-slot="scope">
          <p v-if="scope.row.houseType == 1">普通商品房</p>
          <p v-else-if="scope.row.houseType == 2">经济适用房</p>
          <p v-else-if="scope.row.houseType == 3">小产权房</p>
          <p v-else-if="scope.row.houseType == 4">房改房</p>
          <p v-else-if="scope.row.houseType == 5">集资房</p>
          <p v-else-if="scope.row.houseType == 6">廉租房</p>
          <p v-else-if="scope.row.houseType == 7">公租房</p>
          <p v-else-if="scope.row.houseType == 8">安置房</p>
        </template>
      </el-table-column>
      <el-table-column prop="productPrice" label="报价" width="180" />
      <el-table-column prop="productIntroduce" label="介绍" width="180" />
      <el-table-column prop="productStatus" label="产品状态" width="180">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.productStatus == 1"
            >上架</el-tag
          >
          <el-tag type="info" v-else>下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="productAddress" label="房子地址" width="180" />
      <el-table-column
        prop="productDecorateType"
        label="装修类型"
        width="180"
      />
      <el-table-column prop="productArea" label="面积" width="180" />
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
  <productDialog
    v-model="dialogVisible"
    :dialogTittle="dialogTittle"
    @updateDate="getProduct"
  ></productDialog>
  <productDraw v-model="drawer"></productDraw>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, Plus, Delete } from "@element-plus/icons-vue";
import {
  getAllProducts,
  delProducts,
  upProduct,
  downProduct,
} from "@/api/system/product";
import productDialog from "./productDialog.vue";
import productDraw from "./productDraw.vue";
const drawer = ref(false);
const dialogVisible = ref(false);
const dialogTittle = ref("");
const seaches = ref("");
const num = ref(0);
let datas = reactive({ tableData: [] });
let searchData = reactive({ tableData: [] });
let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});
const productList = reactive({ datas: [] });
onMounted(() => {
  getProduct();
});
function getProduct() {
  getAllProducts(pagePlugs.data.pageNum, pagePlugs.data.pageSize) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      pagePlugs.data.total = response.data.total;
    });
}

function handleSelectionChange(val) {
  productList.datas = val;
  num.value = val.length;
}
function addProduct() {
  dialogVisible.value = true;
  dialogTittle.value = "添加产品";
}
function delProduct() {
  ElMessageBox.confirm("你确认要删除这些产品吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delProducts(productList.datas).then(() => {
        ElMessage({
          message: "删除成功！！！！",
          type: "success",
        });
        getProduct();
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}
function UpProduct() {
  upProduct(productList.datas).then(() => {
    ElMessage({
      message: "上架成功！！！！",
      type: "success",
    });
    getProduct();
  });
}
function DownProduct() {
  downProduct(productList.datas).then(() => {
    ElMessage({
      message: "下架成功！！！！",
      type: "success",
    });
    getProduct();
  });
}
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getProduct();
}
function handleCurrentChange(val) {
  pagePlugs.data.pageNum = val;
  getProduct();
}
function clickData(row) {
  drawer.value = true;
  console.log(JSON.parse(JSON.stringify(row)));
}
</script>

<style>
#header {
  height: 40px;
}
#head {
  height: 38px;
  position: absolute;
  z-index: 6;
}
#body-table {
  margin-top: 38px;
}
</style>