<template>
  <!-- 功能区域 -->
  <header id="header">
    <el-row type="flex" justify="space-between">
      <el-col :span="7" style="width: 600px">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MjY1MjNDOERBOTYxMUU5QUZDQkVFNjczQkJCQzA4RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MjY1MjNDOURBOTYxMUU5QUZDQkVFNjczQkJCQzA4RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNjUyM0M2REE5NjExRTlBRkNCRUU2NzNCQkJDMDhEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyNjUyM0M3REE5NjExRTlBRkNCRUU2NzNCQkJDMDhEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++MAjQQAAAuBJREFUeNrsmEtoE1EUhv87MxoSY6pYi4+a1sY2VCmhqJiFIsRHViK4EKEoWAW3ggsLEeuqlK7UbhVcuXAhtN1JNkqRVgqCGFutYK0LC0XbJvVFTK7npq0kaRJMMo4z4z3wZ5F53PvNPeefc4f5OpOgaCb1ko6SPLB2xElRUhdpUqMfP2mEtAH2CLFAp0ghUlChnx4bwWWHYOpRltPSrnFcsUHNlQq3ApuHBJSAElACSkAJ+D8DatVc7FgD3L+qIrCTVXT92CRHR18KqbRJV7BpC6sYTsS+Zpa5h3lTVIe5aZqswX9Xg4WifzCNZ2840nl1pdKjPNzGcCGsWBdw/APHrYHijvF0nCO8l6G+lhkGqOvj3FzDMs5aLFwOoGYds+4K1tLWeeC6ihdThf2o3Qesd1q8BndtYyQbm0y5cTLIEPSvTtvEN2BoNI0fSZMBzi4A72Z4wWO+rQyb8r4AXSzhqiITeh+kzQM4twiEr/1E/Gvh4xvdwJM+DU7Hn92vsa56Q9LVRT9+5kXhVh7A7AK3bg227mA4G1Iw9pYXdNGDexi8dRZ+TTCae3dHeUlxmxqDe9HcOmv3Mdy9rNrDRWPTq9M69p5aPQ5zAs7MLU2Q501QoYVta2TU7eT+f/OSipdTuecLt1WYCQFXXPTL9+Iu+phc1JXlos61wP4WZo0aFC5aDC7bRRuyjOZTHBh+xX/v6sWRQBN02wjrCrjby3D+mILR15Ry+e8jmu8hctGGPBe9cieF4Vju2W7qV5/3a+aswciZ8lw0FGCYnkXO/vEAtW6MmdRkyo1zRxSS/GRhPGDL9qV6+5vhrwe6TiuZsSpuPnydyYpeqUPdKlq9xrRd4lPIiRspY1fQY+CnB4+LGZ+inBu3K6hmrIoBB0f06xdLhRhDjGV4DdreRSWgBJSAElACSkAJaA3AuI35FgVg1MaAjwRghDRvQzjBFBGAE6Qg6SEpYQOwxDKLYJr4JcAAgnO65/3FDNAAAAAASUVORK5CYII="
          style="height: 40px; width: 40px; vertical-align: middle"
        />
        <span
          style="vertical-align: middle; font-weight: bold; margin-left: 10px"
          >客户管理</span
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
          <template #prepend>
            <el-select
              v-model="Customerterm.custType"
              class="m-2"
              style="width: 100px; background: white"
              @change="GetList()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template #append>
            <el-button @click="GetList()"
              ><el-icon><search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </el-col>
      <el-button type="primary" @click="handleNew">新增</el-button>
      <el-upload
        class="upload-demo"
        multiple=""
        method="post"
        :action="exlsrc"
        accept=".xlsx,.xls"
        :show-file-list="false"
        :on-success="success"
        :headers="headers" 
        name="excelFile"
      >
        <el-button type="primary">导入</el-button>
      </el-upload>
      <el-button type="primary" @click="downloadexcel">导出</el-button>
    </el-row>
  </header>
  <div id="head">
    <div v-show="custList.multipleTable.length > 0">
      <span style="font-size: smaller"
        >已选中{{ custList.multipleTable.length }}条数据</span
      >&nbsp;&nbsp;&nbsp;
      <el-button type="primary">导出选中</el-button>
      <el-button type="primary" @click="BatchReturn">退回公海</el-button>
      <el-button type="primary" @click="rallotSwitch">转让客户</el-button>
    </div>
    <div v-show="custList.multipleTable.length == 0" id="head">
      <el-radio-group v-model="Customerterm.custStatus">
        <el-radio :label="0" @click.native.prevent="getcustList(0)"
          >待开发</el-radio
        >
        <el-radio :label="1" @click.native.prevent="getcustList(1)"
          >初步接触</el-radio
        >
        <el-radio :label="2" @click.native.prevent="getcustList(2)"
          >有意向</el-radio
        >
        <el-radio :label="3" @click.native.prevent="getcustList(3)"
          >跟进中</el-radio
        >
        <el-radio :label="4" @click.native.prevent="getcustList(4)"
          >已合作</el-radio
        >
        <el-radio :label="5" @click.native.prevent="getcustList(5)"
          >无意向</el-radio
        >
      </el-radio-group>
    </div>
  </div>

  <!-- 数据展示区域 -->
  <!--border边框  stripe斑马纹 -->
  <el-table
    :data="custList.d"
    border
    stripe
    style="width: 100%; margin-top: 20px"
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
      prop="custStatus"
      label="客户状态"
      width="120"
      :formatter="custStatus"
    />
    <el-table-column prop="employeeDatail.empName" label="负责人" width="120" />
    <!-- <el-table-column prop="" label="跟进记录" width="120" sortable /> -->
    <el-table-column
      prop="custType"
      label="客户类型"
      width="120"
      sortable
      :formatter="cuType"
    />
       <el-table-column
      prop="custCreateTime"
      label="创建时间"
      width="180"
      sortable
    />
    <el-table-column
      prop="custLastTime"
      label="最后一次跟进时间"
      width="180"
      sortable
    />
    <el-table-column prop="custNextTime" label="下一次联系时间" width="180  " />
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
    <!-- <el-table-column
      prop="custDetailRelation"
      label="客户身份"
      width="120"
      sortable
    /> -->
    <el-table-column
      prop="customerDetail.custDetailAddress"
      label="省,市,区/县"
      width="120"
      sortable
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
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  nextTick,
  provide,
} from "vue";
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
const store = useStore();
//图片携带token
let getToken = store.state.employee.token;
const headers = { token: getToken };
//导入的请求
const exlsrc =ref("http://localhost:8088/customer/importexcel")




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

//场景
const options = [
  {
    value: "",
    label: "全部客户",
  },
  {
    value: 3,
    label: "买房",
  },
  {
    value: 2,
    label: "租房",
  },
];

//挂载
onMounted(async () => {
  console.log("-----加载中开始调用查询方法-----");
  GetList();
});
const getcustList = (e) => {
  e === Customerterm.custStatus
    ? (Customerterm.custStatus = "")
    : (Customerterm.custStatus = e);
  GetList();
};
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
//从token 获取empid
let empId = store.state.employee.user.user.empId;
console.log("empId =  ", empId);
let Customerterm = reactive({
  empId: empId,
  custDetailName: "",
  custType: "",
  custStatus: null,
  custShared: null,
});
//测试查询
const GetList = () => {
  console.log("-----查询方法被调用了-----");
  if (Customerterm.custType == "") {
    Customerterm.custStatus == null;
    api.customer
      .CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm)
      .then((response) => {
        if (response.code == 200) {
          custList.d = response.data.records;
          pagePlugs.data.total = response.data.total;
          console.log(custList.d)
        }
      });
  } else {
    api.customer
      .CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm)
      .then((response) => {
        if (response.code == 200) {
          custList.d = response.data.records;
          pagePlugs.data.total = response.data.total;
        }
      });
  }
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
function custStatus(rew) {
  let custStatus = rew.custStatus;
  if (custStatus == 0) {
    return "待开发";
  } else if (custStatus == 1) {
    return "初步接触";
  } else if (custStatus == 2) {
    return "有意向";
  } else if (custStatus == 3) {
    return "跟进中";
  } else if (custStatus == 4) {
    return "已合作";
  } else if (custStatus == 5) {
    return "无意向";
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
        console.log(response);
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

<style scoped>
#header {
  height: 40px;
}
#head {
  height: 20px;
}
</style>
