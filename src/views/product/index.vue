<template>
  <el-tabs type="border-card" style="margin: -20px" @tab-click="handleClick">
    <el-tab-pane label="售房">
      <header id="header">
        <el-row type="flex" justify="space-between">
          <el-col :span="3" style="width: 600px">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RkJENTRDN0RBOTYxMUU5QkE1ODgxNUFCQkRCNzRBNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RkJENTRDOERBOTYxMUU5QkE1ODgxNUFCQkRCNzRBNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGQkQ1NEM1REE5NjExRTlCQTU4ODE1QUJCREI3NEE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGQkQ1NEM2REE5NjExRTlCQTU4ODE1QUJCREI3NEE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+X5quNAAAA9VJREFUeNrsmUloE2EUx/+ZpLFpNk1qm7pV0dblYkFBEfFQpaLiQb1VEAVPUj2oh2LBY6i49aAnrVJUxB29VEU9iAdFvIhLccGqoTVttmZtms33xkZq7Waaydhh/vCSy2S++c33vfe9/xdN9ZsPIFVRNFNsoLBgaitI8YiikeKjjj4WUzynmA5liCdoO0UtxWqBPpwKghsqZnIKg8tSqaoTFJBzY8kkQOFSAVVAFVAFVAFVwDGkk3oADbdKFhN226djuaGY3qgGHfE4bvj7cNMfRCKTkXZ8chMZqcDWm01oKLNhafG0Ea/pTiRxwevHdYLtT2emBuBEwIbLk0zhvMePawQaTaf/X8B1JiMOltsnDDZcgVQKrQR6xdeHSJ5A8wK41lSCA2V2McfyoVAqjUu+AM4R7GRndNKAjY5S7LHPkCR/XkVjqP/ikm+bKNVpqTpKA8daUWJApb5IPkCtRiMWFamUpC3ET3kpG6CbynybNyAJXIoSp/mHB8FUWv4is4yqZgMVmfVm46TB+GHa+0Jo6fHi60BC3k6Gc3CTxYwQVbpDrm4s0OtzBs2Cne31wZVIYCN1P7zttAdD4j5Z8BksEQS0L6qEo+jXO+pJJtHi9uJOIIgl/zijj0MRnHZ78Ck+gC1WMw6Xl6Ji8L4/KA02f/qa876Ycw7W0J6XhWOV6XRwzi7H3YXzYKOZ3fetC9s+f8ODYBiZMcD4Gr6WX9jVBXNxco7jNxyLx6gpKS78EuUHGknVNHutlbPxLBzFMZqVA9+7sWiaHruo2V5JZZ9/9ToWR5vPj7f0zQAnCGorzdxoMmgEeXJwvO5mjWke7pBjOE0F42hXz58PLWiwn5bxXtpHiwXpNhtJ/SDffMcMC+5XVYrAWa0yGvCwaj4aZtokhSuY4TXRcm6ZUwGLVhDjzNxZYs4qwvBmZSawWrJRLIZUjKMfKqs4g1r1TEYFVAHzAJhGpmAPmZzEWDkDvqEuJFUARh6DO56CA3JzfdHrlxzwsi+AXhpLlm3iVI9HdNzckRiE/KazlywSe0I+IJatyPDy4fPMDR87cYt6znysWD7p5nvW0T35QDgjV5EZKjakR7rcovV5EYmN81JGf2S2VpvI+x0nFxLO07loXjuZ9/1x7Op0UUtmRKNj5l8nYp3xhOgihusd/c7Z3YuX0djUaNWekJF9Sn5wp82KegqbVifm0tNwRDyJuxcIYbPVBDcVDz6iYEuVlqhISfbni9rJqIAqoAqoAqqAKuD/ARhUMF+YAR8pGPAhAzZRBBQIx0xNDNhBsZriNkVIAWChQRZm6vgpwADCQWwnTL97rgAAAABJRU5ErkJggg=="
              style="height: 40px; width: 40px; vertical-align: middle"
            />
            <span
              style="
                vertical-align: middle;
                font-weight: bold;
                margin-left: 10px;
              "
              >房产出售</span
            ></el-col
          >
          <el-col :span="5">
            <el-input
              placeholder="请输入产品名"
              v-model="productQuery.productName"
            >
              <template #append>
                <el-button :icon="Search" @click="addProductByName"></el-button>
              </template>
            </el-input>
          </el-col>
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
      <div v-show="productList.datas.length == 0" id="head">
        <span>场景：</span>
        <el-select
          v-model="productQuery.productStatus"
          class="m-2"
          @change="getcommodity()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-table
        :data="datas.tableData"
        stripe
        style="width: 100%"
        height="500"
        @selection-change="handleSelectionChange"
        id="body-table"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="productName" label="产品名" width="180">
          <!-- <template #default="{ row }">
            <a href="#" @click.prevent="clickData(row)">{{
              row.productName
            }}</a>
          </template> -->
          <template #default="{ row }">
            <el-link type="primary" @click.prevent="clickData(row)">{{
              row.productName
            }}</el-link>
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
        <el-table-column prop="productArea" label="面积/㎡" width="180" />
        <el-table-column prop="productPrice" label="售价/平方米" width="180" />
        <el-table-column prop="productValuation" label="估价/￥" width="180" />
        <el-table-column prop="productQuantity" label="房屋数量" width="180" />
        <el-table-column
          prop="employeeDatail.empName"
          label="负责人"
          width="180"
        />
        <el-table-column prop="productUnit" label="单位" width="180">
          <template v-slot="scope">
            <p v-if="scope.row.productUnit == 1">套</p>
            <p v-else-if="scope.row.productUnit == 2">间</p>
            <p v-else-if="scope.row.productUnit == 3">幢</p>
            <p v-else-if="scope.row.productUnit == 4">栋</p>
          </template>
        </el-table-column>
        <el-table-column prop="productIntroduce" label="介绍" width="180" />
        <el-table-column prop="productSell" label="售价方式" width="180">
          <template v-slot="scope">
            <p v-if="scope.row.productSell == 1">出售</p>
            <p v-else-if="scope.row.productSell == 2">出租</p>
          </template>
        </el-table-column>
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
          prop="customerDetail.custDetailName"
          label="提供者"
          width="180"
        />
      </el-table>
      <el-pagination
        v-model:currentPage="pagePlugs.data.pageNum"
        v-model:page-size="pagePlugs.data.pageSize"
        :page-sizes="[5, 10, 15, 20, 30]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="pagePlugs.data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
      />
      <!-- 添加插件 -->
      <pDialog
        v-model="dialogVisible"
        :dialogTittle="dialogTittle"
        :mode="mode"
        @AddData="getProduct()"
      ></pDialog>

      <!-- 抽屉 -->
      <pDraw
        v-if="drawer"
        v-model:drawer="drawer"
        :rowInfo="rowInfo"
        @upData="getProduct()"
      ></pDraw>
    </el-tab-pane>
    <el-tab-pane label="租房" name="first">
      <renting ref="SeaComp"></renting>
    </el-tab-pane>
    <el-tab-pane label="房源公海">房源公海</el-tab-pane>
  </el-tabs>
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
import { useStore } from "vuex";
import pDialog from "./productDialog.vue";
import pDraw from "./productDraw.vue";
import renting from "./renting.vue";
const drawer = ref(false);
const seaches = ref("");
const num = ref(0);
let datas = reactive({ tableData: [] });
let searchData = reactive({ tableData: [] });
let pagePlugs = reactive({
  data: {
    pageNum: 1,
    pageSize: 5,
    total: 0,
  },
});
const productList = reactive({ datas: [] });

//下拉框查询
const options = [
  {
    value: "",
    label: "全部产品",
  },
  {
    value: 1,
    label: "上架产品",
  },
  {
    value: 0,
    label: "下架产品",
  },
];
//下拉框测试
const getcommodity = () => {
  getProduct();
};

//储存查询商品条件数据
const productQuery = reactive({
  productStatus: "",
  productSell: 1,
  empId: null,
  productCustId: null,
});
//useStore 获取store
const store = useStore();
//搜索框根据产品名模糊查询
const addProductByName = () => {
  getProduct();
};

//挂载
onMounted(() => {
  getProduct();
});

function getProduct() {
  console.log(productQuery);
  productQuery.empId = store.state.employee.user.user.empId;
  getAllProducts(pagePlugs.data.pageNum, pagePlugs.data.pageSize, productQuery) // 使用接口，调用
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

//打开添加产品组件
const dialogVisible = ref(false);
const dialogTittle = ref("");
const mode = ref();
function addProduct() {
  dialogVisible.value = true;
  dialogTittle.value = "添加出售产品";
  mode.value = 1;
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

//传入抽屉的值
const rowInfo = ref({});
//打开抽屉并且传值
function clickData(row) {
  drawer.value = true;
  rowInfo.value = row;
  console.log(JSON.parse(JSON.stringify(row)));
}

const SeaComp = ref(null); //获取子组件的方法
const handleClick = (tab, event) => {
  // console.log(tab, event);
  //这样才能获取每个el-tab-pane的name属性
  //  console.log(tab.props.name);
  if (tab.props.name == "first") {
    // console.log(SeaComp.value)
    SeaComp.value.getProduct();
    console.log("hahaha");
  }
};
</script>

<style scoped>
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
