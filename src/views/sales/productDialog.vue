<template>
  <!-- 商品dialog框 -->
  <el-dialog
    :model-value="dialogVisible_product"
    title="选择商品"
    width="60%"
    draggable
    @close="handClose"
  >
    <!-- 标题区域 -->
    <header id="header">
      <el-row class="row-margin">
        <el-col :span="8">
          <el-input
            placeholder="请输入产品名"
            v-model="productQuery.productName"
            clearable
          >
            <template #append>
              <el-button :icon="Search" @click="addProductByName"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </header>
    <!-- 表格区域 -->
    <el-table
      :data="datas.tableData"
      stripe
      style="width: 100%"
      height="350"
      :page-size="5"
      ref="multipleTable"
      @selection-change="selectionChange"
      @select-all="selectAll"
    >
      <!--el-table的    :row-key="productNo" -->
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="productName" label="产品名" width="120">
      </el-table-column>
      <el-table-column prop="productType" label="户型" width="120" />
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
      <el-table-column
        prop="productArea"
        label="面积"
        width="120"
        fixed="right"
      />
    </el-table>
    <el-button type="info" @click="handClose()">取消</el-button>
    <el-button type="primary" @click="addOpps()">添加</el-button>
    <el-pagination
      v-model:currentPage="pagePlugs.data.page"
      v-model:page-size="pagePlugs.data.size"
      :page-sizes="[10, 20, 30, 40, 50]"
      layout="total,sizes, prev, pager, next, jumper"
      :total="pagePlugs.data.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      small
      style="float: right; height: 60px; line-height: 60px"
    />
  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getAllProducts, getProductStatus } from "@/api/system/product";

const emits = defineEmits(["update:modelValue", "getProducts"]);
const props = defineProps({
  productList: {
    type: Object,
    default: {},
  },
});

const datas = reactive({ tableData: [] });
const multipleTable = ref(null);
const productlist = reactive({ datas: [] });
let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});
const productQuery = reactive({});

//搜索框根据产品名模糊查询
const addProductByName = () => {
  getAllPro();
};

// 关闭dialog框
function handClose() {
  emits("update:modelValue", false);
}

// 传递数据到父组件
function addOpps() {
  handClose();
  emits("getProducts", productlist.datas);
}

// 挂载
onMounted(() => {
  getAllPro();
});

// 获取所有的商品（房子）
function getAllPro() {
  getAllProducts(pagePlugs.data.pageNum, pagePlugs.data.pageSize, productQuery) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      pagePlugs.data.total = response.data.total;
    });
}

// 多选框（改变选择状态）
function selectionChange(selection, row) {
  if (selection.length == 1) {
    productlist.datas = selection[0];
  } else if (selection.length > 1) {
    productlist.datas = selection[1];
    let del_row = selection.shift();
    multipleTable.value.toggleRowSelection(del_row, false);
  }
  console.log(productlist.datas);
}

// 多选框（获取所有）
function selectAll(selection) {
  if (selection.length > 1) {
    selection.length = 1;
  }
}

// 监听父组件传的值
watch(
  () => props.productList,
  () => {
    console.log(props.productList);
    props.productList = datas.tableData;
  }
);
</script>

<style scoped>
:deep(.el-table__header-wrapper .el-checkbox) {
  display: none;
}
#header {
  height: 40px;
}
</style>