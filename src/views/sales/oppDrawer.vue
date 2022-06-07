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
          <el-row :gutter="20">
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
            <el-col :span="8"
              ><div class="t-section__ft">
                <el-button type="success" @click="change()">转移</el-button>
                <el-button type="primary">编辑</el-button>
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
                  {{ pObj.employeeDatail.empName }}
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
          <el-steps
            :active="1"
            finish-status="success"
            align-center
            simple
            class="three_drawer_steps"
          >
            <el-step title="Step 1" />
            <el-step title="Step 2" />
            <el-step title="Step 3" />
            <el-step title="Step 4" />
            <el-step title="Step 1" />
            <el-step title="Step 2" />
            <el-step title="Step 3" />
            <el-step title="Step 4" />
          </el-steps>
        </div>
      </el-header>
      <el-container>
        <el-main style="margin-top: 20px; margin-right: 20px">
          <el-tabs type="border-card">
            <el-tab-pane label="活动">
              <oppActivity></oppActivity>
            </el-tab-pane>
            <el-tab-pane label="基本信息">
              <oppEssential :rowInfo="data.formData"></oppEssential>
            </el-tab-pane>
            <el-tab-pane label="跟进">
              <synthesis :rowInfo="data.formData"></synthesis>
            </el-tab-pane>
            <el-tab-pane label="联系人" name="Contactst"
              >联系人
              <Contactst :rowInfo="data.formData" />
            </el-tab-pane>
            <el-tab-pane label="协作人" name="cooperation">
              <cooperation :rowInfo="data.formData"></cooperation>
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
        <el-aside width="200px" style="margin-top: 20px; height: 100%">
          <el-tabs type="border-card" style="height: 99%">
            <el-tab-pane label="商机" style="margin: -10px">
              <el-scrollbar height="450px">
                <el-card
                  class="box-card"
                  shadow="hover"
                  :key="index"
                  v-for="(data, index) of sub.data"
                  style="margin-bottom: 10px"
                  ref="cardDom"
                  height="150px"
                >
                  <template #header>
                    <el-carousel
                      :interval="2000"
                      height="200px"
                      style="margin: -30px"
                      arrow="never"
                      indicator-position="none"
                    >
                      <el-carousel-item
                        v-for="(attachment, i) in data.product.attachments"
                        :key="i"
                        style="height: 200px"
                      >
                        <el-image
                          :src="attachment.attPath"
                          class="image"
                          style="height: 200px; width: 200px"
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
import Contactst from "../customer/Contactst.vue";
import Visit from "../customer/visit.vue";
import Accessory from "../customer/Accessory.vue";
import oppEssential from "./oppEssential.vue";
import cooperation from "../customer/cooperation.vue";
import contract from "../customer/contract.vue";
import custPayments from "../customer/custPayments.vue";
import synthesis from "../customer/synthesis.vue";
import CustomerDialog from "../customer/customerDialog.vue";
import oppActivity from "./oppActivity.vue";
import changeDialogSinger from "./changeDialogSinger.vue";
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

const emits = defineEmits(["update:modelValue"]);
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
});
const dialog_change = ref(false);
function handClose() {
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
watch(
  () => props.oppDetails,
  () => {
    console.log(props.oppDetails);
    data.formData = props.oppDetails;
    getAllByCustIds();
    console.log("复制父组件的对象" + data.formData);
    console.log(pObj);
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
  padding: 30px 20px 5px;
  min-height: 60px;
}
.container1 {
  height: 100%;
  margin: -20px;
}

.three_drawer {
  margin-top: 20px;
}
.three_drawer_steps {
}
</style>
