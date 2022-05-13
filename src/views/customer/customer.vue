<template>
  <div style="padding: 10px">
    <!-- 功能区域 -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleNew">新增</el-button>
      <el-button type="primary">高级筛查</el-button>
      <el-button type="primary">导出选中</el-button>
      <el-button type="primary">分配</el-button>
    </div>

    <!-- 搜索区域 -->
    <div style="margin: 10px 0">
      <!-- search模糊查询 -->
      <el-input
        v-model="Customerterm.custDetailName"
        placeholder="请输入关键字"
        style="width: 20%"
        clearable
        @clear="Customerterm.custDetailName"
      />
      <el-button @click="GetList()"
        ><el-icon><search /></el-icon
      ></el-button>
    </div>

    <!-- 数据展示区域 -->
    <!--border边框  stripe斑马纹 -->
    <el-table
      :data="custList.d"
      border
      stripe
      style="width: 100%"
      height="480"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      ref="custList.multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column fixed label="客户名称" width="120" sortable>
        <template #default="{ row }">
          <!-- <el-link type="primary" @click="drawer(scope.row)" sortable>{{
            scope.row.customerDetail.custDetailName
          }}</el-link> -->
          <el-button type="text" @click="drawer(row)"
            >{{row.customerDetail.custDetailName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="custCreateTime"
        label="创建时间"
        width="180"
        sortable
      />
      <el-table-column prop="" label="跟进记录" width="120" sortable />
      <el-table-column
        prop="custType"
        label="客户类型"
        width="120"
        sortable
        :formatter="cuType"
      />
      <el-table-column prop="" label="最后一次跟进时间" width="180" sortable />
      <el-table-column
        prop="customerDetail.custDetailPhone"
        label="电话"
        width="120"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailWechat"
        label="微信"
        width="120"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailJob"
        label="客户行业"
        width="120"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailAddress"
        label="省,市,区/县"
        width="120"
        sortable
      />
      <el-table-column prop="" label="下一次联系时间" width="180  " />
      <el-table-column prop="" label="负责人" width="120" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <!-- handleEdit触发事件：修改此表 -->
          <el-button type="text" size="small" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteOneCont(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加/修改区域 -->
    <CustomerDialog
      @addRow="addRow"
      @editRow="editRow"
      :title="addName"
      :rowInfo="rowInfo"
      v-if="dialogShow"
      v-model:dialogShow="dialogShow"
    />
    <!-- 分页区域 -->
    <div style="margin: 10px 0">
      <el-pagination
        v-model:currentPage="pagePlugs.data.page"
        v-model:page-size="pagePlugs.data.size"
        :page-sizes="[5, 10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagePlugs.data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @editRow="editRow"
        style="float: right"
      />
    </div>
    <!-- 抽屉区 -->
    <Thedrawer v-if="chouti" v-model:chouti="chouti" :rowInfo="rowInfo" />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import CustomerDialog from "./customerDialog.vue";
import Thedrawer from "./Thedrawer.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
const store = useStore();
// const empId = store.state.employee.user.user.empId
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//组件化测试 添加
const dialogShow = ref(false);
const addName = ref("");
const rowInfo = ref({}); //新增/编辑的数据
const handleNew = () => {
  addName.value = "新增";
  dialogShow.value = true;
  rowInfo.value = {};
};
const handleEdit = (val) => {
  console.log(val)
  const customerDetail = val.customerDetail;
  addName.value = "修改";
  dialogShow.value = true;
  rowInfo.value = customerDetail;
  console.log(rowInfo.value)
};
//抽屉状态
const chouti = ref(false);
//改变抽屉状态
const drawer =(val)=> {
  // const customerDetail = val.customerDetail;
  rowInfo.value = val;
  chouti.value = true;
}
function editRow(val) {
  let index = custList.d.findIndex((item, index) => item.id === val.id);
  custList.d.splice(index, 1, val);
}
//新增一行数据
function addRow(val) {
  console.log("子组件的值： ", val);
  custList.d.push(val);
}

//定义分页初始值
let pagePlugs = reactive({
  data: {
    page: 1,
    size: 5,
    total: 0,
  },
});
let Customerterm = reactive({
  empId: -1,
  custDetailName: "",
});
//获取后端返回的数据
let custList = reactive({ d: [], multipleTable: [] });

//挂载 点击时加载
onMounted(() => {
  GetList();
});
//测试查询
function GetList() {
  api.customer
    .CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm)
    .then((response) => {
      if (response.code == 200) {
        console.log("xixi");
        custList.d = response.data.records;
        pagePlugs.data.total = response.data.total;
        console.log(custList);
        console.log("---------");
        console.log(response.data.total);
        console.log("---------");
      }
    });
}
//获取单选框选中的值
function handleSelectionChange(val) {
  custList.multipleTable = val; //  this.multipleTable 选中的值
}
//客户类型格式
function cuType(rew, column) {
  let custType = rew.custType;
  if (custType == 1) {
    return "房源";
  } else if (custType == 2) {
    return "租房";
  } else if (custType == 3) {
    return "买房";
  } else if (custType == 4) {
    return "居家装修";
  }
}
//当分页插件做出改变时
function handleSizeChange(val) {
  pagePlugs.data.size = val;
  GetList();
  console.log(`${val} items per page`);
}
function handleCurrentChange(val) {
  pagePlugs.data.page = val;
  GetList();
  console.log(`current page: ${val}`);
}
//删除
function deleteOneCont(val) {
  const custId = val.customerDetail.custId;
  ElMessageBox.confirm("你确定删除这个客户的信息吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer.deleteOneCont(custId).then((response) => {
        if (response.code == 200) {
          custList.d.splice(custList.d.indexOf(val), 1);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        } else {
          ElMessage.error("删除失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
}
</script>

<style>
/* .ct {
  color: #333;
  padding: 0 !important;
  height: 200px !important;
  background: antiquewhite;
}

.el-main {
  height: 100%;
  padding: 0 !important;
  overflow: hidden;
  position: relative;
}
.el-tabs{
  height: 100%;
} */
</style>
