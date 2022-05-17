<template>
  <!-- 表单 -->
  <el-dialog
    :model-value="true"
    :title="title"
    width="50%"
    @close="onClose"
    close-on-press-escape
  >
    <el-form
      :model="data.formData"
      label-width="120px"
      :rules="rules"
      ref="customerFrom"
    >
      <el-form-item label="客户姓名" prop="customerDetail.custDetailName">
        <el-input v-model="data.formData.customerDetail.custDetailName" />
      </el-form-item>
      <el-form-item label="年龄" prop="customerDetail.custDetailAge">
        <el-input v-model="data.formData.customerDetail.custDetailAge" />
      </el-form-item>
      <el-form-item label="客户性别" prop="customerDetail.custSex">
        <el-radio-group v-model="data.formData.customerDetail.custSex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="客户类型" prop="custType">
        <el-select v-model="data.formData.custType" placeholder="Select">
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
        <el-select
          v-model="data.formData.customerDetail.custDetailJob"
          placeholder="Select"
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
      <el-form-item label="客户电话" prop="customerDetail.custDetailPhone">
        <el-input v-model="data.formData.customerDetail.custDetailPhone" />
      </el-form-item>
      <el-form-item label="客户微信" prop="customerDetail.custDetailWechat">
        <el-input v-model="data.formData.customerDetail.custDetailWechat" />
      </el-form-item>
      <el-form-item label="客户地址" prop="customerDetail.custDetailAddress">
        <el-input v-model="data.formData.customerDetail.custDetailAddress" />
      </el-form-item>
      <el-form-item label="客户备注" prop="customerDetail.custDetailDescribe">
        <el-input
          v-model="data.formData.customerDetail.custDetailDescribe"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { unref, reactive, ref, getCurrentInstance, onMounted } from "vue";
import { fromPairs } from "lodash";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//储存form表单的值
const data = reactive({
  dialogFlag: false,
  formData: {},
});
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
    value: "投资/证券/银行/保险/信托",
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
const customerFrom = ref(null);
//重置
function cancel() {
  emits("update:dialogShow", false);
}
//提交表单
function submitForm() {
  customerFrom.value.validate(async (valid) => {
    if (!valid) return console.log("表单校验不通过");
    if (JSON.stringify(props.zt) == "2") {
      console.log(data.formData);
      // 修改
      api.customer.updateCustomercust(data.formData).then((response) => {
        if (response.code == 200) {
          onClose();
          ElMessage({
            type: "success",
            message: "修改成功",
          });
        } else {
          ElMessage.error("修改失败，请联系管理员");
        }
      });
    } else if (JSON.stringify(props.zt) == "1") {
      // 新增
      console.log(data.formData);
      api.customer.AddCustomer(data.formData).then((response) => {
        if (response.code == 200) {
          onClose();
          ElMessage({
            type: "success",
            message: "新增成功",
          });
        } else {
          ElMessage.error("新增失败，请联系管理员");
        }
      });
    }
  });
}

//接收父组件的值
const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  dialogShow: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => {},
  },
  zt: {
    type: Number,
    default: () => 0,
  },
});
onMounted(() => {
  data.formData = Object.assign({}, props.rowInfo);
  data.dialogFlag = props.rowInfo;
});
//监听
const emits = defineEmits(["update:dialogShow", "ceshi"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emits("update:dialogShow", false);
  emits("ceshi");
};

//验证
const rules = reactive({
  customerDetail: {
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
    custDetailJob: [
      { required: true, message: "请选择客户职业", trigger: "blur" },
    ],
  },
  custType: [{ required: true, message: "请选择客户类型", trigger: "blur" }],
});
</script>
