<template>
  <el-drawer
    :model-value="drawer"
    @close="handClose"
    size="65%"
    :show-close="false"
    :with-header="false"
  >
    <el-container class="container1">
      <el-header class="ct">
        <!-- 抽屉头部第一层 -->
        <div
          class="vux-flexbox t-section vux-flex-row"
          style="align-items: stretch"
        >
          <el-row :gutter="24">
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <img src="src\assets\opp.png" />
                </div></div
            ></el-col>
            <el-col :span="13">
              <div class="t-section__bd">
                <div class="type-name">商机</div>
                <div class="vux-flexbox type-content vux-flex-row">
                  <div class="el-tooltip name">
                    {{ pObj.oppName }}
                  </div>
                  <div class="el-button-group wk-header-page-btn"></div>
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="t-section__ft">
                <el-button type="success" @click="change">转移</el-button>
                <el-button type="primary">编辑</el-button>
                <el-dropdown trigger="click">
                  <el-button type="primary">...</el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="deleteOpp"
                        >删除</el-dropdown-item
                      >
                      <el-dropdown-item divided @click="nextOpp"
                        >下一阶段</el-dropdown-item
                      >
                      <el-dropdown-item>归档</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div></el-col
            >
          </el-row>
        </div>
        <!-- 抽屉头部第二层 -->
        <div
          class="vux-flexbox h-section vux-flex-row"
          style="align-items: stretch"
        >
          <el-row :gutter="24">
            <el-col :span="4"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">客户名称</div>
                <div class="h-value text-one-line">
                  {{ pObj.customerDetail.custDetailName }}
                </div>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">商机金额</div>
                <div class="h-value text-one-line">
                  {{ pObj.oppMoney }}
                </div>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">所选服务</div>
                <div class="h-value text-one-line">
                  {{ pObj.flow.flowName }}
                </div>
              </div></el-col
            >
            <el-col :span="4"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">负责人</div>
                <div class="h-value text-one-line">
                  {{ pObj.employee.employeeDatail.empName }}
                </div>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">创建时间</div>
                <div class="h-value text-one-line">
                  <!-- {{ multipleTable.custCreateTime }} -->
                  {{ pObj.customer.custCreateTime }}
                </div>
              </div></el-col
            >
          </el-row>
        </div>
        <!-- 抽屉第三层 -->
        <div class="three_drawer">
          <el-steps :active="leng" align-center finish-status="success">
            <el-step
              v-for="(item, index) in flowList.list.flowDetails"
              :key="index"
              :title="item.flowDetailsName"
            />
          </el-steps>
        </div>
      </el-header>
      <el-container>
        <el-main style="margin-top: 20px; margin-right: 20px">
          <el-tabs type="border-card">
            <el-tab-pane label="操作记录">
              <oppActivity :rowInfo="data.formData"></oppActivity>
            </el-tab-pane>
            <el-tab-pane label="基本信息">
              <oppEssential :rowInfo="data.formData"></oppEssential>
            </el-tab-pane>
            <el-tab-pane label="联系人" name="Contactst"
              >联系人
              <Contactst :rowInfo="data.formData" />
            </el-tab-pane>
            <el-tab-pane label="产品">
              <oppProduct :rowInfo="data.formData"></oppProduct>
            </el-tab-pane>
            <el-tab-pane label="合同">
              <contract :rowInfo="data.formData"></contract>
            </el-tab-pane>
            <el-tab-pane label="回款">
              <custPayments :rowInfo="data.formData"></custPayments>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-aside width="200px" style="margin-top: 20px; height: 100%">
          <el-tabs type="border-card" style="height: 99%">
            <el-tab-pane label="重要信息" style="margin: -10px">
              <oppMessage :rowInfo="data.formData"></oppMessage>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </el-container>
    <!-- 转移负责人 -->
    <changeDialogSinger
      v-model="dialog_change"
      :emplist="pObj"
      @updateData="props.oppDetails"
    ></changeDialogSinger>
  </el-drawer>
</template>

<script setup>
// 导入组件
import { Edit } from "@element-plus/icons-vue";
import Contactst from "./Contactst.vue";
import Visit from "./visit.vue";
import Accessory from "./Accessory.vue";
import oppEssential from "./oppEssential.vue";
import cooperation from "./cooperation.vue";
import contract from "./contract.vue";
import custPayments from "./custPayments.vue";
// import CustomerDialog from "../customer/customerDialog.vue";
import oppActivity from "./oppActivity.vue";
import changeDialogSinger from "./changeDialogSinger.vue";
import setps from "./setps.vue";
import oppMessage from "./oppMessage.vue";
import oppProduct from "./oppProduct.vue";
import {
  delOppById,
  addOpps,
  getFlowRecords,
  editSalesDetailsId,
} from "@/api/sales/index";
import { ElMessage, ElMessageBox } from "element-plus";
import { getFlowDetails } from "@/api/system/flow";
import {
  ref,
  onMounted,
  reactive,
  watch,
  toRefs,
  defineEmits,
  defineProps,
} from "vue";
import { getAllByCustId } from "@/api/customer/index";

const emits = defineEmits(["update:modelValue", "updateData"]);
const data = reactive({
  formData: {},
});
const sub = reactive({
  data: [],
});
const pObj = toRefs(props).oppDetails;
const props = defineProps({
  oppDetails: {
    type: Object,
    default: () => {},
  },
  nums: {
    type: Number,
    default: 0,
  },
});
const dialog_change = ref(false);
const leng = ref(0);
const flowLists = reactive({ list: [] });
const flowList = reactive({ list: [] });
function handClose() {
  leng.value = 0;
  emits("update:modelValue", false);
}

const getAllByCustIds = () => {
  console.log("中意商品查询方法");
  console.log(data.formData.custId);
  getAllByCustId(data.formData.custId).then((response) => {
    if (response.code == 200) {
      sub.data = response.data.records;
    }
  });
};

const change = () => {
  dialog_change.value = true;
};
// 通过oppId删除商机
function deleteOpp() {
  ElMessageBox.confirm("你确认要删除这个商机吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delOppById(data.formData.oppId).then(() => {
        ElMessage({
          message: "删除成功！！！！",
          type: "success",
        });
        handClose();
        emits("updateData");
      });
    })
    .catch(() => {
      ElMessage.info("取消删除");
    });
}

// 获取已到业务阶段
function getFlowRecord() {
  getFlowRecords(data.formData.oppId).then((res) => {
    flowLists.list = res.data;
    var records = [];
    flowLists.list.forEach((item) => {
      records.push(item.flowRecordStatus);
    });
    for (let i = 0; i < records.length; i++) {
      if (records[i] > 0) {
        leng.value++;
      }
    }
    console.log(leng.value);
  });
}

// 获取当前服务的所有阶段
function getFlowDetailss() {
  getFlowDetails(data.formData.flowId).then((response) => {
    flowList.list = response.data;
    console.log(flowList.list);
  });
}

// 下一阶段
function nextOpp() {
  let flowCustId = data.formData.custId;
  let flowOppId = data.formData.oppId;
  let flowEmpId = data.formData.empChrgeId;
  let flowId = flowList.list.flowDetails[leng.value].flowId;
  let flowDetailsId = flowList.list.flowDetails[leng.value].flowDetailsId;
  let records = {
    flowCustId,
    flowOppId,
    flowEmpId,
    flowId,
    flowDetailsId,
  };
  console.log(records);
  // addOpps(records).then(() => {
  //   editSalesDetailsId(flowDetailsId, data.formData).then(() => {
  //     leng.value++;
  //     emits("updateData");
  //   });
  // });
}

watch(
  () => (props.oppDetails, props.nums),
  () => {
    console.log(props.oppDetails);
    data.formData = props.oppDetails;
    leng.value = props.nums;
    getAllByCustIds();
    getFlowRecord();
    getFlowDetailss();
    console.log("复制父组件的对象" + data.formData);
    console.log(data.formData);
  },
  {
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.ct {
  color: #333;
  padding: 0;
  height: 300px;
  background: beige;
}

.el-main {
  height: 100%;
  width: 100%;
  padding: 0;
  overflow: hidden;
  position: relative;
}
.el-tabs {
  height: 100%;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.h-section {
  position: relative;
  padding: 8px 20px 15px;
}

.t-section__bd .type-name {
  color: #999;
  font-size: 12px;
  margin-bottom: 5px;
}

.t-section {
  position: relative;
  padding: 30px 15px 17px;
  min-height: 60px;
}
.container1 {
  height: 100%;
  margin: -20px;
}

.three_drawer {
  margin-top: 20px;
}
</style>
