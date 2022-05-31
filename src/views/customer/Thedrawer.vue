<!--  -->
<template>
  <el-drawer
    :model-value="true"
    direction="rtl"
    destroy-on-close
    size="70%"
    :with-header="false"
    @close="onClose"
    style="margin: 0"
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
              ><div class="t-section__ft">
                <el-button type="success">编辑</el-button>
                <el-button type="primary">更改成交状态</el-button>
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
                <div class="h-title">成交状态</div>
                <div class="h-value text-one-line">
                  {{
                    pObj.custStatus == 1
                      ? "跟进阶段"
                      : pObj.custStatus == 2
                      ? "商机阶段"
                      : pObj.custStatus == 3
                      ? "成交阶段"
                      : "无"
                  }}
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">客户类型</div>
                <div class="h-value text-one-line">
                  {{
                    pObj.custType == 1
                      ? "房源"
                      : pObj.custType == 2
                      ? "租房"
                      : pObj.custType == 3
                      ? "买房"
                      : pObj.custType == 4
                      ? "居家装修"
                      : "无"
                  }}
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">负责人</div>
                <div class="h-value text-one-line">
                  {{ pObj.employeeDatail.empName }}
                </div>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">创建时间</div>
                <div class="h-value text-one-line">
                  <!-- {{ multipleTable.custCreateTime }} -->
                  {{ pObj.custCreateTime }}
                </div>
              </div></el-col
            >
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-main style="margin-top: 20px; margin-right: 20px">
          <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
              <essential
                :rowInfo="data.formData"
                @essentialGetList="essentialGetList"
              ></essential>
            </el-tab-pane>
            <el-tab-pane label="跟进">
              <synthesis :rowInfo="data.formData" @essentialGetList="essentialGetList"></synthesis>
            </el-tab-pane>
            <el-tab-pane label="联系人" name="Contactst"
              >联系人
              <Contactst :rowInfo="data.formData" ref="ContactstDom"/>
            </el-tab-pane>
            <el-tab-pane label="协作人" name="cooperation">
              <cooperation :rowInfo="data.formData"></cooperation>
            </el-tab-pane>
            <el-tab-pane label="合同">
              <contract :rowInfo="data.formData"></contract>
            </el-tab-pane>
            <el-tab-pane label="回款">
              <custPayments></custPayments>
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
        <el-aside width="200px" style="margin-top: 20px; height: 100%">
          <el-tabs type="border-card" style="height: 99%">
            <el-tab-pane label="商机" style="margin: -10px">
              <el-scrollbar height="450px">
                <el-card
                  class="box-card"
                  shadow="hover"
                  v-for="(data, index) of sub.data"
                  :key="index"
                  style="margin-bottom: 10px"
                  ref="cardDom"
                  height="150px"
                >
                  <template #header>
                    <el-carousel :interval="2000" height="200px" style="margin: -30px;" arrow="never" indicator-position="none">
                      <el-carousel-item v-for="(attachment,i) in data.product.attachments" :key="i" style="height:200px">
                        <el-image
                          :src="attachment.attPath"
                          class="image"
                          style="height:200px; width: 200px;"
                        />
                      </el-carousel-item>
                    </el-carousel>
                  </template>
                  {{ data.product.productName }}
                </el-card>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </el-container>
  </el-drawer>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import Contactst from "./Contactst.vue";
import Visit from "./visit.vue";
import Accessory from "./Accessory.vue";
import essential from "./essential.vue";
import cooperation from "./cooperation.vue";
import contract from "./contract.vue";
import custPayments from "./custPayments.vue";
import synthesis from "./synthesis.vue";
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
const cardDom = ref();
//测试添加元素
const addcard = () => {
  items.push("");
};
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  getAllByCustId();
});


</script>

<style lang="scss" scoped>
.ct {
  color: #333;
  padding: 0;
  height: 200px;
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
  padding: 30px 20px 5px;
  min-height: 60px;
}
.container1 {
  height: 100%;
  margin: -20px;
}
</style>
