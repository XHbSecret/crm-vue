<template>
  <el-drawer
    :model-value="drawer"
    @close="handClose"
    size="65%"
    :show-close="false"
    :with-header="false"
    destroy-on-close
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
              ><div class="t-section__ft"  v-if="data.formData.oppStatuss!=1">
                <el-button type="success" >编辑</el-button>
                <el-button type="primary" @click="showStatus"  
                  >更改成交状态</el-button
                >
                <el-button >...</el-button>
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
            <el-col :span="6" v-if="pObj.oppStatus != 3"
              >
              <div class="vux-flexbox-item h-item" >
                <div class="h-title">成交状态</div>
                <div class="h-value text-one-line">
                  {{
                    pObj.oppStatus == 1
                      ? "未成交"
                      : pObj.oppStatus == 2
                      ? "已成交"
                      : "已归档"
                  }}
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">客户类型</div>
                <div class="h-value text-one-line">
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
      </el-header>
      <el-container>
        <el-main style="margin-top: 20px; margin-right: 20px">
          <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
              <oppEssential1 :rowInfo="data.formData"></oppEssential1>
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
    <el-dialog
      title="更改成交状态"
      v-model="showStatuss"
      :before-close="handleClose"
      destroy-on-close
    >
      <el-form ref="formRef" :model="forms">
        <el-form-item>
          <el-radio-group v-model="forms.status" prop="status">
            <el-radio :label="1">未成交</el-radio>
            <el-radio :label="2">已成交</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeStatus">确认</el-button>
          <el-button type="info" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-drawer>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { Edit } from "@element-plus/icons-vue";
import Contactst from "./Contactst.vue";
import Visit from "./visit.vue";
import Accessory from "./Accessory.vue";
import oppEssential1 from "./oppEssential1.vue";
import cooperation from "./cooperation.vue";
import contract from "./contract.vue";
import custPayments from "./custPayments.vue";
import synthesis from "./synthesiss.vue";
import CustomerDialog from "../customer/customerDialog.vue";
import { onMounted, reactive, watch, toRefs, ref } from "vue";
import { getAllByCustId } from "@/api/customer/index";
import { updateSales } from "@/api/sales/index";

const emits = defineEmits(["update:modelValue","updateData"]);
const formRef = ref(null);
const data = reactive({
  formData: {},
});
const sub = reactive({
  data: [],
});
const pObj = toRefs(props).custDetails;
const props = defineProps({
  custDetails: {
    type: Object,
    default: () => {},
  },
});
const showStatuss = ref(false);
let forms = reactive({
  status: 0,
});
function handleClose() {
  formRef.value.resetFields();
  showStatuss.value = false;
}

function showStatus() {
  showStatuss.value = true;
}

function changeStatus() {
  console.log(forms.status);
  updateSales(data.formData, forms.status)
    .then(() => {
      ElMessage.success("修改成功！！！");
      handleClose();
      emits("updateData")
    })
    .catch(() => {
      ElMessage.error("请求失败！！");
    });
}

function handClose() {
  emits("update:modelValue", false);
}

const getAllByCustIds = () => {
  console.log("中意商品查询方法");
  console.log(data.formData);
  getAllByCustId(data.formData.custId).then((response) => {
    if (response.code == 200) {
      sub.data = response.data.records;
    }
  });
};
// onMounted(() => {
//   getAllByCustIds();
// });
watch(
  () => props.custDetails,
  () => {
    console.log(props.custDetails);
    data.formData = props.custDetails;
    getAllByCustIds();
    console.log("复制父组件的对象" + data.formData);
    console.log(pObj);
  },{
    deep:true
  }
);
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
