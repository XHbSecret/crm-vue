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
        <el-table-column prop="productPrice" label="售价/平方米" width="180" />
        <el-table-column prop="productArea" label="面积/㎡" width="180" />
        <el-table-column prop="productValuation" label="估价/￥" width="180" />
        <el-table-column prop="productSell" label="出售方式" width="180" >
           <template v-slot="scope">
            <p v-if="scope.row.productSell == 1">出售</p>
            <p v-else-if="scope.row.productSell == 2">出租</p>
          </template>
        </el-table-column>
        <el-table-column prop="rentalPrices" label="月租" width="180" />
        <el-table-column prop="productIntroduce" label="介绍" width="180" />
        <el-table-column prop="productAddress" label="房子地址" width="180" />
        <el-table-column
          prop="productDecorateType"
          label="装修类型"
          width="180"
        />
      </el-table>
      <div style="margin: 10px 0">
        <el-pagination
          v-model:currentPage="pagePlugs.data.pageNum"
          v-model:page-size="pagePlugs.data.pageSize"
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagePlugs.data.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="float: right"
        />
      </div>
      <el-button @click="onClose">取消</el-button>
      <el-button @click="add">确认</el-button>
      {{ props.custId }}
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
import { useStore } from "vuex";
import { getAllProducts } from "@/api/system/product";
let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 5,
    total: 0,
  },
});
const emits = defineEmits(["update:dialogShow", "addproducts"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emits("update:dialogShow", false);
};
//接收父组件的值
const props = defineProps({
  custId: {
    type: Number,
  },
   rowInfo: {
    type: Object,
    default: () => {},
  },
});
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
  if (Products.ProductsData.length == 0) {
    return true;
  } else {
    return false;
  }
}

//挂载
onMounted(() => {
  productBy();
  getProduct();
  console.log(props.rowInfo)
});
const pObj = toRefs(props).custId;
//储存查询商品条件数据
const productQuery = reactive({
  productSell: null,
  empId: null,
  productCustId: null,
  productSellable:0
});

const productBy = ()=>{
  if(props.rowInfo.custType==2){
    productQuery.productSell = 2
    console.log("这是租房合同:")
    console.log(props.rowInfo)
  }else if(props.rowInfo.custType==3){
    productQuery.productSell = 1
    console.log("这是买房合同")
  }else{
     productQuery.productSell = null
  }
}
//useStore 获取store
const store = useStore();
let datas = reactive({ tableData: [] });
function getProduct() {
  console.log(props.rowInfo.custType)
  productQuery.empId = store.state.employee.user.user.empId;
  productQuery.productCustId = props.custId;
  getAllProducts(pagePlugs.data.pageNum, pagePlugs.data.pageSize, productQuery) // 使用接口，调用
    .then((response) => {
      // 响应对象
      datas.tableData = response.data.records;
      pagePlugs.data.total = response.data.total;
      console.log(response.data);
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
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
