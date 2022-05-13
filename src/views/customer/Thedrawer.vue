<template>
  <div class="div1">
    <el-drawer
      :model-value="true"
      direction="rtl"
      destroy-on-close
      size="70%"
      :with-header="false"
      @close="onClose"
    >
      <el-container style="height: 100%">
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
                    <img src="src\assets\kehuLogo.png"/>
                  </div>
                </div></el-col
              >
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
                  <div class="h-title">客户级别</div>
                  <div class="h-value text-one-line">2</div>
                </div>
              </el-col>
              <el-col :span="6"
                ><div class="vux-flexbox-item h-item">
                  <div class="h-title">客户类型</div>
                  <div class="h-value text-one-line">
                    {{ pObj.custType }}
                  </div>
                </div>
              </el-col>
              <el-col :span="6"
                ><div class="vux-flexbox-item h-item">
                  <div class="h-title">负责人</div>
                  <div class="h-value text-one-line">肖胡斌</div>
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
          <el-main>
            <el-tabs type="border-card">
              <el-tab-pane label="活动">活动</el-tab-pane>
              <el-tab-pane label="基本信息">
                <el-form
                  :model="data.formData"
                  label-width="120px"
                  :rules="rules"
                  ref="customerFrom"
                  class="xiangxiForm"
                >
                  <el-form-item label="客户姓名" prop="formData.custDetailName">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custDetailName
                    }}</span>
                    <el-input
                      type="text"
                      v-else
                      @change="input()"
                      v-model="data.formData.custDetailName"
                    />
                  </el-form-item>
                  <el-form-item label="客户性别" prop="formData.custSex">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custSex
                    }}</span>
                    <el-radio-group v-else @change="input()" v-model="data.formData.custSex">
                      <el-radio :label="0">男</el-radio>
                      <el-radio :label="1">女</el-radio>
                      <el-radio :label="2">未知</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="年龄" prop="formData.custDetailAge">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custDetailAge
                    }}</span>
                    <el-input
                      type="text"
                      v-else
                      @change="input()"
                      v-model="data.formData.custDetailAge"
                    />
                    <!-- <el-input v-model="data.formData.custDetailAge" /> -->
                  </el-form-item>
                  <el-form-item label="客户电话" prop="formData.custDetailPhone">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custDetailPhone
                    }}</span>
                    <el-input
                      type="text"
                      v-else
                      @change="input()"
                      v-model="data.formData.custDetailPhone"
                    />
                  </el-form-item>
                  <el-form-item label="客户微信" prop="formData.custDetailWechat">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custDetailWechat
                    }}</span>
                    <el-input
                      type="text"
                      v-else
                      @change="input()"
                      v-model="data.formData.custDetailWechat"
                    />
                  </el-form-item>
                  <el-form-item label="客户地址" prop="formData.custDetailAddress">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custDetailAddress
                    }}</span>
                    <el-input
                      type="text"
                      v-else
                      @change="input()"
                      v-model="data.formData.custDetailAddress"
                    />
                  </el-form-item>
                  <el-form-item label="客户备注" prop="formData.custDetailDescribe">
                    <span @click="edit()" v-if="formSwitch.flag">{{
                      data.formData.custDetailDescribe
                    }}</span>
                    <el-input
                      type="textarea"
                      v-else
                      @change="input()"
                      v-model="data.formData.custDetailDescribe"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()"
                      >保存</el-button
                    >
                    <el-button @click="cancel()">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="联系人"
                >联系人
                <button>添加联系人</button>
                <Contactst :rowInfo="data.formData" />
              </el-tab-pane>
              <el-tab-pane label="合同">合同</el-tab-pane>
              <el-tab-pane label="回款">回款</el-tab-pane>
              <el-tab-pane label="回访"
                >回访
                <button>添加联系人</button>
                <Visit :rowInfo="data.formData" />
              </el-tab-pane>
              <el-tab-pane label="附件"
                >附件
                <Accessory :rowInfo="data.formData" />
              </el-tab-pane>
              <el-tab-pane label="操作记录">操作记录</el-tab-pane>
            </el-tabs>
          </el-main>
          <el-aside width="200px" style="background-color: blue"
            >Aside</el-aside
          >
        </el-container>
      </el-container>
    </el-drawer>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import Contactst from "./Contactst.vue";
import Visit from "./visit.vue";
import Accessory from "./Accessory.vue";
import CustomerDialog from "./customerDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//储存form表单的值
const data = reactive({
  dialogFlag: false,
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
//点击span后隐藏变为input可编辑
const edit = () => {
  formSwitch.flag = false;
};
const input = () => {
  formSwitch.flag = true;
};
const cancel = () => {
  formSwitch.flag = true;
  data.formData = Object.assign({}, props.rowInfo.customerDetail);
};
const pObj = toRefs(props).rowInfo;
//提交表单
function submitForm() {
  onClose();
  customerFrom.value.validate(async (valid) => {
    if (!valid) return console.log("表单校验不通过");
      // 修改
      api.customer.updateCustomercust(data.formData).then((response) => {
        if (response.code == 200) {
          emit("editRow", data.formData);
          ElMessage({
            type: "success",
            message: "修改成功",
          });
        } else {
          ElMessage.error("修改失败，请联系管理员");
        }
      });
  });
}

//监听
const emit = defineEmits(["update:chouti", "addRow", "editRow"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:chouti", false);
};

onMounted(() => {
  data.formData = Object.assign({}, props.rowInfo.customerDetail);
  data.dialogFlag = props.rowInfo.customerDetail;
});

//验证
const rules = reactive({
  custDetailName: [
    { required: true, message: "请输入客户名称", trigger: "blur" },
    {
      min: 3,
      max: 10,
      message: "用户名的长度在 3 - 10个字符之间",
      trigger: "blur",
    },
  ],
  custDetailPhone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
    {
      pattern:
        /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
});
</script>

<style lang="scss" scoped>
.ct {
  color: #333;
  padding: 0 !important;
  height: 200px !important;
  background: beige;
}

.el-main {
  height: 100%;
  padding: 0 !important;
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
</style>
