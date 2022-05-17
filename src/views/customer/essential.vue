<!--  -->
<template>
  <div class="essential">
    <span>基本信息</span>
    {{pObj}}
    <!-- <el-form :inline="true" :model="data.formData" class="demo-form-inline">
      <el-form-item label="客户姓名">
        <el-input v-model="data.formData.customerDetail.custDetailName" />
      </el-form-item>
      <el-form-item label="客户年龄">
        <el-input v-model="data.formData.customerDetail.custDetailAge" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//接收父组件的值
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const data = reactive({
  formData: {},
});
onMounted(() => {
  data.formData = Object.assign({}, props.rowInfo);
});
const pObj = toRefs(props).rowInfo;
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
