<!--  -->
<template>
  <el-scrollbar height="400px">
    <div class="essential1">
      <span>基本信息</span>
      <button @click="edit()">编辑</button>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="客户姓名">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailName
          }}</span>
          <el-input
            v-else
            @change="input()"
            v-model="data.formData.customerDetail.custDetailName"
          />
        </el-form-item>
        <el-form-item label="客户年龄">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailAge
          }}</span>
          <el-input
            v-else
            @change="input()"
            v-model="data.formData.customerDetail.custDetailAge"
          />
        </el-form-item>
      </el-form>
      <el-form :model="data.formData">
        <el-form-item
          label="客户性别"
          prop="customerDetail.custSex"
          style="width: 300px"
        >
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custSex == 0
              ? "男"
              : data.formData.customerDetail.custSex == 1
              ? "女"
              : "未知"
          }}</span>
          <el-radio-group
            v-model="data.formData.customerDetail.custSex"
            v-else
            @change="input()"
          >
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="客户类型" prop="custType">
          <span v-if="formSwitch.flag">{{
            data.formData.custType == 1
              ? "房源"
              : data.formData.custType == 2
              ? "租房"
              : data.formData.custType == 3
              ? "买房"
              : data.formData.custType == 4
              ? "居家装修"
              : "无"
          }}</span>
          <el-select
            v-model="data.formData.custType"
            placeholder="Select"
            v-else
            @change="input()"
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户职业" prop="customerDetail.custDetailJob">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailJob
          }}</span>
          <el-select
            v-model="data.formData.customerDetail.custDetailJob"
            placeholder="Select"
            v-else
            @change="input()"
          >
            <el-option
              v-for="item in Occupation"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="客户电话" prop="customerDetail.custDetailPhone">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailPhone
          }}</span>
          <el-input
            v-model="data.formData.customerDetail.custDetailPhone"
            v-else
            @change="input()"
          />
        </el-form-item>
        <el-form-item label="客户微信" prop="customerDetail.custDetailWechat">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailWechat
          }}</span>
          <el-input
            v-model="data.formData.customerDetail.custDetailWechat"
            v-else
            @change="input()"
          />
        </el-form-item>
        <el-form-item label="客户地址" prop="customerDetail.custDetailAddress">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailAddress
          }}</span>
          <el-input
            v-model="data.formData.customerDetail.custDetailAddress"
            v-else
            @change="input()"
          />
        </el-form-item>
      </el-form>
      <el-form :model="data.formData">
        <el-form-item
          label="客户备注"
          prop="customerDetail.custDetailDescribe"
          style="width: 300px"
        >
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailDescribe
          }}</span>
          <el-input
            v-model="data.formData.customerDetail.custDetailDescribe"
            type="textarea"
            v-else
            @change="input()"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm()"
            :style="{ display: Buttonstyle.visibleCancel }"
            >保存</el-button
          >
          <el-button
            @click="cancel()"
            :style="{ display: Buttonstyle.visibleCancel }"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="emp">
      <span>系统信息</span>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="创建时间">
          <span>{{ data.formData.custCreateTime }}</span>
        </el-form-item>
        <el-form-item label="最后跟进时间">
          <span>{{ data.formData.custLastTime }}</span>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="负责人">
          <span>{{ data.formData.employeeDatail.empName }}</span>
        </el-form-item>
        <el-form-item label="创建人">
          <span>{{ data.formData.employeeDatail.empName }}</span>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="客户状态">
          <span>{{ data.formData.custStart }}</span>
        </el-form-item>
      </el-form>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//接收父组件的值
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const data = reactive({
  formData: {
    customerDetail: {},
    employee: {},
    employeeDatail: {},
  },
});
const cancel = () => {
  formSwitch.flag = true;
  Buttonstyle.visibleCancel = "none";
};
const submitForm = () => {
  api.customer.updateCustomercust(data.formData).then((response) => {
    if (response.code == 200) {
      emit("essentialGetList");
      formSwitch.flag = true;
      Buttonstyle.visibleCancel = "none";
      ElMessage({
        type: "success",
        message: "修改成功",
      });
    } else {
      ElMessage.error("修改失败，请联系管理员");
    }
  });
};
onMounted(() => {
  // data.formData = Object.assign({}, props.rowInfo);
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
});
const pObj = toRefs(props).rowInfo;
const formSwitch = reactive({
  flag: true,
});
const customerFrom = ref(null);
const Buttonstyle = reactive({
  visibleCancel: "none",
});
const edit = () => {
  formSwitch.flag = false;
  Buttonstyle.visibleCancel = "";
};
const cities = [
  {
    value: 1,
    label: "房源",
  },
  {
    value: 2,
    label: "租房",
  },
  {
    value: 3,
    label: "买房",
  },
  {
    value: 4,
    label: "居家装修",
  },
];
const Occupation = [
  {
    value: "投资/证券/银行/保险/信托",
    label: "投资/证券/银行/保险/信托",
  },
  {
    value: "互联网/游戏/软件",
    label: "互联网/游戏/软件",
  },
  {
    value: "房地产/建筑/物业",
    label: "房地产/建筑/物业",
  },
  {
    value: "教育/培训/科研",
    label: "教育/培训/科研",
  },
  {
    value: "生活服务/消费品/零售/餐饮/酒旅",
    label: "生活服务/消费品/零售/餐饮/酒旅",
  },
  {
    value: "制药/医疗/健康",
    label: "制药/医疗/健康",
  },
  {
    value: "广告/传媒/文化/体育/娱乐/会展",
    label: "广告/传媒/文化/体育/娱乐/会展",
  },
];
const emit = defineEmits(["update:chouti", "essentialGetList"]);
</script>
<style lang="scss" scoped>
.el-form-item {
  width: 250px;
}
</style>
