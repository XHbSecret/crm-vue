<template>
  <!-- 表单 -->
  <el-dialog
    v-model="dialogShow"
    :title="title"
    width="50%"
    @close="onClose"
    close-on-press-escape
  >
    <el-form
      :model="form"
      label-width="120px"
      :rules="rules"
      ref="customerFrom"
    >
      <el-form-item label="客户姓名" prop="custDetailName">
        <el-input v-model="form.custDetailName" />
      </el-form-item>
      <el-form-item label="客户性别">
        <el-radio-group v-model="form.custSex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
          <el-radio :label="2">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.custDetailAge" />
      </el-form-item>
      <el-form-item label="客户电话" prop="custDetailPhone">
        <el-input v-model="form.custDetailPhone" />
      </el-form-item>
      <el-form-item label="客户微信">
        <el-input v-model="form.custDetailWechat" />
      </el-form-item>
      <el-form-item label="客户地址">
        <elui-china-area-dht
          isall
          :leave="3"
          @change="custAddress"
        ></elui-china-area-dht>
      </el-form-item>
      <el-form-item label="客户备注">
        <el-input v-model="form.custDetailDescribe" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddCustomer()">保存</el-button>
        <el-button @click="cancel()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { unref, reactive, ref, getCurrentInstance } from "vue";
import { EluiChinaAreaDht } from "elui-china-area-dht";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//储存form表单的值
const form = reactive({
  custDetailName: "",
  custDetailAge: "",
  custSex: 0,
  custDetailPhone: "",
  custDetailWechat: "",
  custDetailDescribe: "",
  custDetailAddress: "",
});
//中国地址插件
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
function custAddress(e) {
  const one = chinaData[e[0]];
  const two = chinaData[e[1]];
  const three = chinaData[e[2]];
  form.custDetailAddress = one.label + "/" + two.label + "/" + three.label;
  console.log(one.label, two.label, three.label);
}

const customerFrom = ref(null);
//重置
function cancel() {
  customerFrom.value.resetFields();
}
//添加
function AddCustomer() {
  customerFrom.value.validate(async (valid) => {
    if (!valid) return console.log("表单校验不通过");
    api.customer.AddCustomer(form).then((response) => {
      if (response.code == 200) {
        this.dialogShow = false;
        console.log("添加成功");
        console.log(valid);
      }
    });
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
});

//监听
const emit = defineEmits(["update:dialogShow", "close"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:dialogShow");
  emit("close");
};

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
    {pattern:/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,message: "请输入正确的手机号码", trigger: "blur",},
  ],
});

</script>
