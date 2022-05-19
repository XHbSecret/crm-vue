<template>
  <div>
    <!-- 功能区域 -->
    <div style="margin: 10px 0">
      <el-button type="primary">高级筛查</el-button>
      <el-button type="primary" :style="{ display: Buttonstyle.visibleCancel }">导出选中</el-button>
      <el-button type="primary" @click="rallotSwitch" :style="{ display: Buttonstyle.visibleCancel }">分配</el-button>
      <el-button type="primary" @click="draw" :style="{ display: Buttonstyle.visibleCancel }">领取</el-button>
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
      <el-button @click="GetSeaList()"
        ><el-icon><search /></el-icon
      ></el-button>
    </div>

    <!-- 数据展示区域 -->
    <!--border边框  stripe斑马纹 -->
    <el-table
      :data="custList.data"
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
      <el-table-column fixed label="客户名称" width="120" prop="customerDetail.custDetailName" sortable>
        <!-- <template #default="{ row }">
          <el-button type="text" @click="drawer(row)"
            >{{row.customerDetail.custDetailName}}</el-button>
        </template> -->
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
          <el-button type="text" size="small" @click="deleteOneCont(row)">删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div style="margin: 10px 0">
      <el-pagination
        v-model:currentPage="pagePlugs.data.page"
        v-model:page-size="pagePlugs.data.size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagePlugs.data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="float: right"
      />
    </div>
    <!-- 抽屉区 -->
    <!-- <Thedrawer v-if="chouti" v-model:chouti="chouti" :rowInfo="rowInfo" /> -->
    <!-- 分配区 -->
    <customeRallot v-if="rallot" v-model:rallot="rallot" :rowInfo="custList.multipleTable" @ceshi="ceshi" :title="title" :pd="pd"></customeRallot>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import CustomerDialog from "./customerDialog.vue";
import Thedrawer from "./Thedrawer.vue";
import customeRallot from "./customeRallot.vue"
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
// const empId = store.state.employee.user.user.empId
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
const store = useStore();
//从token 获取empid
let empId = store.state.employee.user.user.empId;
console.log("empId =  ",empId)
//抽屉状态
const chouti = ref(false);
//储存数据
const rowInfo = ref({});
//改变抽屉状态
const drawer =(val)=> {
  // const customerDetail = val.customerDetail;
  rowInfo.value = val;
  chouti.value = true;
}
//打开分配
const rallot = ref(false)
const title = ref("")
const pd =ref()
const rallotSwitch =()=>{
  console.log("分配组件被打开")
  title.value="分配"
  rallot.value = true;
  pd.value=1;
}
const Buttonstyle  = reactive({
  visibleCancel :'none'
})
const ceshi =()=>{
  emit("Sealist");
  GetSeaList()
  console.log("公海刷新")
}
//定义分页初始值
let pagePlugs = reactive({
  data: {
    page: 1,
    size: 10,
    total: 0,
  },
});
let Customerterm = reactive({
  empId: 0,
  custDetailName: "",
});
//获取后端返回的数据
let custList = reactive({ data: [], multipleTable: [] });
//测试查询
const GetSeaList =() =>{
  console.log("-----查询方法被调用了-----")
  api.customer
    .CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm)
    .then((response) => {
      if (response.code == 200) {
        console.log("xixi");
        custList.data = response.data.records;
        pagePlugs.data.total = response.data.total;
        console.log(custList.data );
        console.log("-----查询方法调用结束-----")
      }
    });
}
//获取单选框选中的值
function handleSelectionChange(val) {
  custList.multipleTable = [];
   val.forEach(item => {
        custList.multipleTable.push(item.custId);
        console.log(custList.multipleTable)
      });
    if(custList.multipleTable.length>0){
      Buttonstyle.visibleCancel = '' 
    } else{
      Buttonstyle.visibleCancel = 'none' 
    }
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
  GetSeaList();
}
function handleCurrentChange(val) {
  pagePlugs.data.page = val;
  GetSeaList();
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
          custList.data.splice(custList.data.indexOf(val), 1);
          GetSeaList();
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
//领取客户
const draw = ()=>{
  console.log(custList.multipleTable)
  console.log(empId)
   ElMessageBox.confirm("你确定领取该客户吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer.updateEmpIdBatchByid( custList.multipleTable,empId).then((response) => {
        if (response.code == 200) {
          emit("Sealist");
          GetSeaList();
          ElMessage({
            type: "success",
            message: "成功领取该客户放回公海",
          });
        } else {
          ElMessage.error("领取失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
}
const emit = defineEmits(["Sealist"]);
//暴露子组件的方法
defineExpose({
  GetSeaList
})
</script>

<style>

</style>
