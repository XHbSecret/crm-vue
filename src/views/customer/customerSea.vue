<template>
  <div>
    <header id="header">
      <el-row type="flex" justify="space-between">
        <el-col :span="7" style="width: 600px">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MDlGQ0E1NERBOTYxMUU5ODYzOURFMDFEREM5MTQ4OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MDlGQ0E1NURBOTYxMUU5ODYzOURFMDFEREM5MTQ4OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUwOUZDQTUyREE5NjExRTk4NjM5REUwMUREQzkxNDg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUwOUZDQTUzREE5NjExRTk4NjM5REUwMUREQzkxNDg5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+CJ6UKQAABGdJREFUeNrsmltoHGUUx//zzU7a5p62SVutNoaENE3jBaRGQbAYFEGo+iKC9kGtIvigIlgMKj70IvRJwRdBiqIvlXrBKLZBbSpapNqXVmpLbNM0po0bu6bb7DZz839mEk13t0nYmM1m/A6cJDCzs+d3vnP+5+wSY1XXKGhN9J30DnolFraN0LvpW+knDQI2849D9GpEyxL0dsUf2yMIh3Gm7Wq8LKNq96gI9NxUVq4QcdOAGlADakANqAE1oAbUgBpwviw2Vw826M0VCjdVGahdZOCyB5xN+fjxTw/DY/7CBbRItnlNDE/dEMN1S4ys64LWPeTirV4Hhy94cw4oX1n8Z+m8pVphV5uFlorpK1/edHefgx2/2kg6ue9pX6oQY46+G/YKDyhns3KxgUVkWUugB68xcf8qE5PPLM5S/PYPD2f4FotN4MYqhdsZtDnppqHLPj7od3mfi3NpHxUsgQ01Co+sNtHG+11G17I/ddUkzBngMw0xvLLWynlNgtl5wsb7ZxzYGclfzbJ9vcXCfSvNGb2PzejW7UvhkltgFZVyzGVfnnNxV08a757OhhMToXni5zFsofdNk1tJ1Gu/2HnDzUpk3mP/NJYZ8PywzA4nPHz8u4tTl7KDtpiLTNguJuKr8y421proqFNBmZfxUEVg+/iMnmEXXYMeRhy/eERmwqrZRw+zh+6uM9l3BiqpFNJL0mOHOCb2MhEH4m6QnAWloqJ4WzgeXmiygtOYyo6OeHjpqI0jCa/4AWX2daww8WJTLGtEjLJ/BlKhiorAGBmj4sN+B++ccnAi+W8Yy0rCCni8Puyg275JBxVQUMA7lyu83GwFgdeXqmBcTLaDcQ9v9tpBSU4EJ6X70LUmnmuMYXnJlUuA9HGcXsoyWFN6ZSLautN5bz95i8xj18e4hmUrqQT6KpXvs8Fs6UtQ80VdPxpw0dkcw6N8xgRIHdc58Uz7hP06m9Uu7xPczOB2rLeCAEXpjiR8QjlBQKkZyno9T0ogN9YqNJaroNT98VHyPbeXPQNO8HveenCJGQaUzgF0M0/33hWhikpPyZjoZ+A/sGQ/54i4kHEqst2UsTxTrGfbK1IVFWutVNjWagXr1tVMErKbW84ubjujLopfRcVkLDzP8fA0x4RpzOw1cqKdx+zg00WmNXCJeJIqqvisrRwnBQeUsnuAC7aoaCtHQweHevkkyZLPf3vOOtg/5OH0qIdSUq/n6Yr835pxujIiDnLwC3ANG1Gu37FM/SNAs1HRvAHfoMCIkuayA3EZ4mPBp4hctomJ2bbOwtKS6Y/6PFV5w9fpYOku6JiwVHZwx7idvP2bE+ykU9mnvN7DJDzbEI6KihxRyBr3BXdV6VPbn4celK8hpNxE2ge5Y/7Eletk0s8jUdxUasJlu4oPS5OsNxmq7V+2X3wqqr9V04AaUANqQA2oATWgBtSAGvB/BDgSYb6kAHZHGHCfAHYi/AfuqJkwdQrgcXo7fS/9YgTALo6zCNPxvwUYAD/KxtakgdJgAAAAAElFTkSuQmCC"
            style="height: 40px; width: 40px; vertical-align: middle"
          />
          <span
            style="vertical-align: middle; font-weight: bold; margin-left: 10px"
            >客户公海</span
          ></el-col
        >
        <el-col :span="12">
          <el-input
            v-model="Customerterm.custDetailName"
            placeholder="请输入客户姓名"
            style="width: 50%"
            clearable
            @clear="Customerterm.custDetailName"
          >
            <template #append>
              <el-button @click="GetSeaList()"
                ><el-icon><search /></el-icon
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary">导入</el-button>
          <el-button type="primary">导出</el-button>
        </el-col>
      </el-row>
    </header>
    <div id="head">
      <div v-show="custList.multipleTable.length > 0">
        <span style="font-size: smaller"
          >已选中{{ custList.multipleTable.length }}条数据</span
        >&nbsp;&nbsp;&nbsp;
       <el-button type="primary">导出选中</el-button>
      <el-button type="primary" @click="rallotSwitch">分配</el-button>
      <el-button type="primary" @click="draw">领取</el-button>
      </div>
    </div>
    <!-- 功能区域 -->
    <!-- <div style="margin: 10px 0">
      <el-button type="primary">高级筛查</el-button>
      <el-button type="primary" :style="{ display: Buttonstyle.visibleCancel }">导出选中</el-button>
      <el-button type="primary" @click="rallotSwitch" :style="{ display: Buttonstyle.visibleCancel }">分配</el-button>
      <el-button type="primary" @click="draw" :style="{ display: Buttonstyle.visibleCancel }">领取</el-button>
    </div> -->

    <!-- 搜索区域 -->
    <!-- <div style="margin: 10px 0">
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
    </div> -->

    <!-- 数据展示区域 -->
    <!--border边框  stripe斑马纹 -->
    <el-table
      :data="custList.data"
      border
      stripe
      style="width: 100%; margin-top: 20px"
      height="480"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      ref="custList.multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column
        fixed
        label="客户名称"
        width="120"
        prop="customerDetail.custDetailName"
        sortable
      >
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
      <!-- <el-table-column prop="" label="跟进记录" width="120" sortable /> -->
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
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="deleteOneCont(row)"
            >删除</el-button
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
    <customeRallot
      v-if="rallot"
      v-model:rallot="rallot"
      :rowInfo="custList.multipleTable"
      @ceshi="ceshi"
      :title="title"
      :pd="pd"
    ></customeRallot>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import CustomerDialog from "./customerDialog.vue";
import Thedrawer from "./Thedrawer.vue";
import customeRallot from "./customeRallot.vue";
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
console.log("empId =  ", empId);
//抽屉状态
const chouti = ref(false);
//储存数据
const rowInfo = ref({});
//改变抽屉状态
const drawer = (val) => {
  // const customerDetail = val.customerDetail;
  rowInfo.value = val;
  chouti.value = true;
};
//打开分配
const rallot = ref(false);
const title = ref("");
const pd = ref();
const rallotSwitch = () => {
  console.log("分配组件被打开");
  title.value = "分配";
  rallot.value = true;
  pd.value = 1;
};
const Buttonstyle = reactive({
  visibleCancel: "none",
});
const ceshi = () => {
  emit("Sealist");
  GetSeaList();
  console.log("公海刷新");
};
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
  custShared: 1,
});
//获取后端返回的数据
let custList = reactive({ data: [], multipleTable: [] });
//测试查询
const GetSeaList = () => {
  console.log("-----查询方法被调用了-----");
  api.customer
    .CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm)
    .then((response) => {
      if (response.code == 200) {
        console.log("xixi");
        custList.data = response.data.records;
        pagePlugs.data.total = response.data.total;
        console.log(custList.data);
        console.log("-----查询方法调用结束-----");
      }
    });
};
//获取单选框选中的值
function handleSelectionChange(val) {
  custList.multipleTable = [];
  val.forEach((item) => {
    custList.multipleTable.push(item.custId);
    console.log(custList.multipleTable);
  });
  if (custList.multipleTable.length > 0) {
    Buttonstyle.visibleCancel = "";
  } else {
    Buttonstyle.visibleCancel = "none";
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
const draw = () => {
  console.log(custList.multipleTable);
  console.log(empId);
  ElMessageBox.confirm("你确定领取该客户吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer
        .updateEmpIdBatchByid(custList.multipleTable, empId)
        .then((response) => {
          if (response.code == 200) {
            emit("Sealist");
            GetSeaList();
            ElMessage({
              type: "success",
              message: "成功领取该客户",
            });
          } else {
            ElMessage.error("领取失败，请联系管理员");
          }
        });
    })
    .catch(() => {
      // catch error
    });
};
const emit = defineEmits(["Sealist"]);
//暴露子组件的方法
defineExpose({
  GetSeaList,
});
</script>

<style>
#header {
  height: 40px;
}
#head {
  height: 20px;
}
</style>
