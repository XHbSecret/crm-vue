<!--  -->
<template>
  <el-dialog
    :model-value="true"
    :title="title"
    width="50%"
    @close="onClose"
    close-on-press-escape
  >
  <!--:rules="rules" 表单验证未作 -->
    <el-form
      :model="data.formData"
      label-width="120px"
      ref="customerFrom"
    >
      <el-form-item label="联系人姓名" prop="contactName">
        <el-input v-model="data.formData.contactName" />
      </el-form-item>
      <el-form-item label="联系人电话" prop="contactPhone">
        <el-input v-model="data.formData.contactPhone" />
      </el-form-item>
      <el-form-item label="是否是决策人" prop="contactIsPolicy">
        <el-radio-group v-model="data.formData.contactIsPolicy">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
        <!-- <el-input v-model="data.formData.contactIsPolicy" /> -->
      </el-form-item>
      <el-form-item label="与客户的关系" prop="contactRelation">
        <el-select v-model="data.formData.contactRelation" placeholder="Select">
          <el-option
            v-for="item in contactRelation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- <el-input v-model="data.formData.contactRelation" /> -->
      </el-form-item>
      <el-form-item label="联系人备注" prop="contractDesc">
        <el-input v-model="data.formData.contractDesc" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//接收父组件数据的复制
const data = reactive({
  formData: {},
});
//接收父组件的数据
const props = defineProps({
  addCustomer: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => {},
  },
  custId: {
    type: Number,
  },
});
const contactRelation = [
  {
    value: "1",
    label: "亲戚",
  },
  {
    value: "2",
    label: "家属",
  },
  {
    value: "3",
    label: "朋友",
  },
  {
    value: "4",
    label: "同事",
  },
  {
    value: "5",
    label: "其他",
  },
];
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
});
//监听
const emit = defineEmits(["update:addCustomer", "addCustomerList"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:addCustomer", false);
};
//取消
const cancel =()=>{
  emit("update:addCustomer", false);
}
//新增联系人
const submitForm = () => {
  if (JSON.stringify(props.rowInfo) != "{}") {
     ElMessageBox.confirm("确认修改吗?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        api.customer
          .updateCustomer(data.formData)
          .then((response) => {
            if (response.code == 200) {
              onClose();
              emit("addCustomerList");
              ElMessage({
                type: "success",
                message: "修改添加",
              });
            } else {
              ElMessage.error("修改失败，请联系管理员");
            }
          });
      })
      .catch(() => {
        // catch error
      });
  } else {
    ElMessageBox.confirm("确认添加吗?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        api.customer
          .addCustomer(props.custId, data.formData)
          .then((response) => {
            if (response.code == 200) {
              onClose();
              emit("addCustomerList");
              ElMessage({
                type: "success",
                message: "成功添加",
              });
            } else {
              ElMessage.error("添加失败，请联系管理员");
            }
          });
      })
      .catch(() => {
        // catch error
      });
  }
};
</script>
<style lang="scss" scoped></style>
