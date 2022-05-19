<template>
  <div>
    <!-- 功能区域 -->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleNew">新增</el-button>
      <el-button type="primary">高级筛查</el-button>
      <el-button type="primary" @click="downloadexcel">导出</el-button>
      <el-button type="primary" :style="{ display: Buttonstyle.visibleCancel }"
        >导出选中</el-button
      >
      <el-button
        type="primary"
        @click="BatchReturn"
        :style="{ display: Buttonstyle.visibleCancel }"
        >退回公海</el-button
      >
      <el-button
        type="primary"
        @click="rallotSwitch"
        :style="{ display: Buttonstyle.visibleCancel }"
        >转让客户</el-button
      >
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
      id="table"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column fixed label="客户名称" width="120" sortable>
        <template #default="{ row }">
          <!-- <el-link type="primary" @click="drawer(scope.row)" sortable>{{
            scope.row.customerDetail.custDetailName
          }}</el-link> -->
          <el-button type="text" @click="drawer(row)">{{
            row.customerDetail.custDetailName
          }}</el-button>
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
      <el-table-column
        prop="employeeDatail.empName"
        label="负责人"
        width="120"
      />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <!-- handleEdit触发事件：修改此表 -->
          <el-button type="text" size="small" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="transfer(row)"
            >退回公海</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加/修改区域 -->
    <CustomerDialog
      @ceshi="ceshi"
      :title="addName"
      :rowInfo="rowInfo"
      :zt="zt"
      :empId="empid"
      v-if="dialogShow"
      v-model:dialogShow="dialogShow"
    />
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
    <Thedrawer
      v-if="chouti"
      v-model:chouti="chouti"
      :rowInfo="rowInfo"
      @ThedrawerGetList="ThedrawerGetList"
    />
    <!-- 转让区 -->
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
import customeRallot from "./customeRallot.vue";
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
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//组件化测试 添加
const dialogShow = ref(false);
const addName = ref("");
const rowInfo = ref({}); //新增/编辑的数据
const zt = ref(0);
const empid = ref();
//新增
const handleNew = () => {
  addName.value = "新增";
  dialogShow.value = true;
  rowInfo.value = { customerDetail: {} };
  zt.value = 1;
  empid.value = empId;
  console.log(rowInfo.value);
};
//修改
const handleEdit = (val) => {
  zt.value = 2;
  addName.value = "修改";
  dialogShow.value = true;
  rowInfo.value = JSON.parse(JSON.stringify(val));
  console.log(rowInfo.value);
};
const BatchReturn = () => {
  ElMessageBox.confirm("你确定将该放回公海吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer
        .updateEmpIdBatchByid(custList.multipleTable, 0)
        .then((response) => {
          if (response.code == 200) {
            // custList.d.splice(custList.d.indexOf(val), 1);
            GetList();
            ElMessage({
              type: "success",
              message: "成功放回公海",
            });
          } else {
            ElMessage.error("放回公海失败，请联系管理员");
          }
        });
    })
    .catch(() => {
      // catch error
    });
};
//抽屉状态
const chouti = ref(false);
//改变抽屉状态
const drawer = (val) => {
  // const customerDetail = val.customerDetail;
  rowInfo.value = JSON.parse(JSON.stringify(val));
  chouti.value = true;
};
//定义分页初始值
let pagePlugs = reactive({
  data: {
    page: 1,
    size: 10,
    total: 0,
  },
});
//获取后端返回的数据
let custList = reactive({ d: [], multipleTable: [] });

//挂载
onMounted(async () => {
  console.log("-----加载中开始调用查询方法-----");
  GetList();
});

//回调方法
const sxkh = () => {
  GetList();
  console.log("我是父方法的函数 我被转让界面调用啦");
};
const ceshi = () => {
  GetList();
  console.log("我是父方法的函数 我被新增或修改界面调用啦");
};
const ThedrawerGetList = () => {
  GetList();
  console.log("我是父方法的函数 我被抽屉调用啦");
};
const store = useStore();
//从token 获取empid
let empId = store.state.employee.user.user.empId;
console.log("empId =  ", empId);
let Customerterm = reactive({
  empId: empId,
  custDetailName: "",
});
//测试查询
const GetList = () => {
  console.log("-----查询方法被调用了-----");
  api.customer
    .CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm)
    .then((response) => {
      if (response.code == 200) {
        console.log("xixi");
        custList.d = response.data.records;
        pagePlugs.data.total = response.data.total;
        console.log(custList);
        console.log("-----查询方法调用结束-----");
      }
    });
};
const Buttonstyle = reactive({
  visibleCancel: "none",
});
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
  GetList();
  console.log(`${val} items per page`);
}
function handleCurrentChange(val) {
  pagePlugs.data.page = val;
  GetList();
  console.log(`current page: ${val}`);
}
//删除
function transfer(val) {
  const custId = val.customerDetail.custId;
  ElMessageBox.confirm("你确定将该放回公海吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer.transfer(custId, 0).then((response) => {
        if (response.code == 200) {
          custList.d.splice(custList.d.indexOf(val), 1);
          GetList();
          ElMessage({
            type: "success",
            message: "成功放回公海",
          });
        } else {
          ElMessage.error("放回公海失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
}
//导出所有
const downloadexcel = () => {
  ElMessageBox.confirm("你确定将你负责的客户导出吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer.downloadexcel(empId).then((response) => {
        console.log(response)
        let blob = new Blob([response], {
          type: "application/vnd.ms-excel",
        });
        // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象

        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        let a = document.createElement("a");
        a.href = url;
        a.download = "客户表.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
        ElMessage({
          message: "导出成功！",
          type: "success",
        });
      });
    })
    .catch(() => {
      // catch error
      console.log("haha");
    });
};
//暴露方法
defineExpose({
  GetList,
});

//转让区
//打开分配
const rallot = ref(false);
const title = ref("");
const pd = ref();
const rallotSwitch = () => {
  console.log("转让组件被打开");
  title.value = "转让";
  rallot.value = true;
  pd.value = 2;
};
</script>

<style></style>
