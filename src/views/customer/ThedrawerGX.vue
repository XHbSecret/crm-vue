<!--  -->
<template>
  <el-drawer
    :model-value="true"
    direction="rtl"
    destroy-on-close
    size="80%"
    :with-header="false"
    @close="onClose"
  >
    <el-container class="container1">
      <el-header class="ct">
        <!-- 抽屉头部第一层 -->
        <div
          class="vux-flexbox t-section vux-flex-row"
          style="align-items: stretch"
        >
          <el-row :gutter="20">
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <img src="src\assets\kehuLogo.png" />
                </div></div
            ></el-col>
            <el-col :span="12">
              <div class="t-section__bd">
                <div class="type-name">客户</div>
                <div class="vux-flexbox type-content vux-flex-row">
                  <div class="el-tooltip name">
                    {{ pObj.customerDetail.custDetailName }}
                  </div>
                  <div class="el-button-group wk-header-page-btn"></div>
                </div>
              </div>
            </el-col>
            <el-col :span="8"
              ><div class="t-section__ft" style="text-align: right">
                <el-button
                  type="success"
                  @click="handleEdit()"
                  v-if="props.rowInfo.empId == props.rowInfo.assPrincipal"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="transfer()"
                  v-if="props.rowInfo.empId != props.rowInfo.assPrincipal"
                  >退出团队</el-button
                >
                <!-- <el-button type="primary" v-if="pObj.custType == 1&&pObj.custStatus==3" @click="gaibian">变为合作伙伴</el-button>
                <el-button type="danger" v-if="pObj.custType == 1&&pObj.custStatus==4" @click="qvxiao">取消合作伙伴</el-button> -->
                <el-button>...</el-button>
              </div></el-col
            >
          </el-row>
        </div>
        <!-- 抽屉头部第二层 -->
        <div
          class="vux-flexbox h-section vux-flex-row"
          style="align-items: stretch"
        >
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">
                  跟进进度:
                  <el-tag>
                    {{
                      pObj.customer.custStatus == 1
                        ? "初步接触"
                        : pObj.customer.custStatus == 2
                        ? "有意向"
                        : pObj.customer.custStatus == 3
                        ? "跟进中"
                        : pObj.customer.custStatus == 4
                        ? "已合作"
                        : pObj.customer.custStatus == 5
                        ? "无意向"
                        : "待开发"
                    }}
                  </el-tag>
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">
                  客户类型:
                  {{
                    pObj.customer.custType == 1
                      ? "房源"
                      : pObj.customer.custType == 2
                      ? "租房"
                      : pObj.customer.custType == 3
                      ? "买房"
                      : pObj.customer.custType == 4
                      ? "居家装修"
                      : "无"
                  }}
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">
                  主要负责人:
                  {{ pObj.employeeDatail.empName }}
                </div>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">
                  创建时间:
                  {{ pObj.customer.custCreateTime }}
                </div>
              </div></el-col
            >
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-main style="margin-top: 20px; background: white">
          <el-tabs :tab-position="tabPosition" class="demo-tabs">
            <el-tab-pane label="基本信息">
              <essentialGX
                :rowInfo="data.formData"
                @essentialGetList="essentialGetList"
              ></essentialGX>
            </el-tab-pane>
            <el-tab-pane label="跟进">
              <synthesisGX
                :rowInfo="data.formData"
                @essentialGetList="essentialGetList"
              ></synthesisGX>
            </el-tab-pane>
            <el-tab-pane label="联系人" name="Contactst">
              <Contactst :rowInfo="data.formData" ref="ContactstDom" />
            </el-tab-pane>
            <el-tab-pane
              label="团队成员"
              name="cooperation"
            >
              <cooperationGX
                :rowInfo="data.formData"
                @haha="essentialGetList"
              ></cooperationGX>
            </el-tab-pane>
            <el-tab-pane label="合同">
              <contract :rowInfo="data.formData"></contract>
            </el-tab-pane>
            <el-tab-pane label="回款">
              <custPayments :rowInfo="data.formData"></custPayments>
            </el-tab-pane>
            <el-tab-pane label="回访"
              >回访
              <button>添加联系人</button>
              <Visit :rowInfo="data.formData" />
            </el-tab-pane>
            <el-tab-pane label="附件"
              >附件
              <Accessory :rowInfo="data.formData" />
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-aside
          width="200px"
          style="background-color: #000; margin-top: 20px; margin-left: 20px"
          >Aside</el-aside
        >
      </el-container>
    </el-container>
    <CustomerDialog
      @ceshi="ceshi"
      :title="addName"
      :rowInfo="rowInfo"
      :zt="zt"
      :empId="empid"
      v-if="dialogShow"
      v-model:dialogShow="dialogShow"
    />
  </el-drawer>
</template>

<script setup>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  inject,
} from "vue";
import Contactst from "./Contactst.vue";
import Visit from "./visit.vue";
import Accessory from "./Accessory.vue";
import essentialGX from "./essentialGX.vue";
import cooperationGX from "./cooperationGX.vue";
import contract from "./contract.vue";
import custPayments from "./custPayments.vue";
import synthesisGX from "./synthesisGX.vue";
import customerCrder from "./customerCrder.vue";
import CustomerDialog from "./customerDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//接收父组件的数据复制
const data = reactive({
  formData: {},
});
const formSwitch = reactive({
  flag: true,
});
const customerFrom = ref(null);
//接收父组件的值
const props = defineProps({
  chouti: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const pObj = toRefs(props).rowInfo;
const essentialGetList = () => {
  emit("ThedrawerGetList");
};
//监听
const emit = defineEmits(["update:chouti", "ThedrawerGetList"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:chouti", false);
};

const ceshi = () => {
  essentialGetList();
};
const sub = reactive({
  data: [],
});
const getAllByCustId = () => {
  console.log("中意商品查询方法");
  console.log(data.formData.custId);
  api.customer.getAllByCustId(data.formData.custId).then((response) => {
    if (response.code == 200) {
      sub.data = response.data.records;
    }
  });
};

//退出该团队
function transfer() {
  ElMessageBox.confirm("是否退出该团队?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log("haha");
      api.customer.deleteAssociates(props.rowInfo.assId).then((response) => {
        if (response.code == 200) {
          essentialGetList();
          onClose();
          ElMessage({
            type: "success",
            message: "退出团队成功",
          });
        } else {
          ElMessage.error("退出团队失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
}

const gaibian = () => {
  api.customer
    .updateCustomercustStatusById(props.rowInfo.custId, 4)
    .then((response) => {
      if (response.code == 200) {
        essentialGetList();
        onClose();
      }
    });
};
const qvxiao = () => {
  api.customer
    .updateCustomercustStatusById(props.rowInfo.custId, 3)
    .then((response) => {
      if (response.code == 200) {
        essentialGetList();
        onClose();
      }
    });
};

const cardDom = ref();
//测试添加元素
const addcard = () => {
  items.push("");
};
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  getAllByCustId();
});

const tabPosition = ref("left");

//组件化测试 添加
const dialogShow = ref(false);
const addName = ref("");
const rowInfo = ref({}); //新增/编辑的数据
const zt = ref(0);
const empid = ref();
//修改
const handleEdit = () => {
  zt.value = 2;
  addName.value = "修改";
  dialogShow.value = true;
  rowInfo.value = JSON.parse(JSON.stringify(data.formData));
  console.log(rowInfo.value);
};
</script>

<style lang="scss" scoped>
.ct {
  color: #333;
  padding: 0;
  height: 150px;
  background: white;
}

.el-main {
  height: 100%;
  width: 100%;
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
  padding: 30px 20px 5px;
  min-height: 60px;
}
.container1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(245, 246, 249);
}
</style>
