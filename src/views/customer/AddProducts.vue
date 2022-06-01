<!-- 添加产品 -->
<template>
  <div>
    <el-dialog :model-value="true" width="50%" @close="onClose">
      <el-table
        :data="datas.tableData"
        stripe
        style="width: 100%"
        id="body-table"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :selectable="selectInit" />
        <el-table-column fixed prop="productName" label="产品名" width="180">
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
        <el-table-column prop="productAddress" label="房子地址" width="180" />
        <el-table-column
          prop="productDecorateType"
          label="装修类型"
          width="180"
        />
        <el-table-column prop="productArea" label="面积" width="180" />
      </el-table>
      <el-button>取消</el-button>
      <el-button @click="add">确认</el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  unref,
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
  toRefs,
} from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AddProductsfrom from "./AddProducts.vue";
import { getAllProducts } from "@/api/system/product";
let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
});
const emits = defineEmits(["update:dialogShow", "addproducts"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emits("update:dialogShow", false);
};

//添加
const add = () => {
  emits("addproducts", Products.ProductsData, ceshi);
  emits("update:dialogShow", false);
};

const ceshi = ref(0);
let Products = reactive({ ProductsData: [] });
//获取单选框选中的值
function handleSelectionChange(val) {
  Products.ProductsData = [];
  val.forEach((item) => {
    Products.ProductsData.push(item);
    console.log(ceshi);
    console.log(Products.ProductsData);
  });
}
//当你选中一条后警用其他数据
function selectInit() {
  if (Products.ProductsData.length==0) {
    return true;
  } else {
    return false;
  }
}

//挂载
onMounted(() => {
  getProduct();
});

//储存查询商品条件数据
const productQuery = reactive({});
let datas = reactive({ tableData: [] });
function getProduct() {
  getAllProducts(pagePlugs.data.pageNum, pagePlugs.data.pageSize, productQuery) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
    });
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
