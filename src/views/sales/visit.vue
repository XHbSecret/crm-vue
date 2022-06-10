<!--  -->
<template>
  <div class="">
    <el-table :data="data.custList" style="width: 100%">
      <el-table-column prop="visitNo" label="回访编号" width="180" />
      <el-table-column prop="visitTime" label="回访时间" width="180" />
      <el-table-column prop="visitMethod" label="回访方式" />
      <el-table-column prop="visitStart" label="回访满意度" />
      <el-table-column prop="customerFeedback" label="客户反馈内容" />
    </el-table>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

//挂载 点击时加载
onMounted(() => {
  GetVisit();
});
//接收父组件的值
const props = defineProps({
   rowInfo: {
    type: Object,
    default: ()=> {},
  },
});
const pObj = toRefs(props).rowInfo;
//定义分页初始值
const pagePlugs = reactive({
  page: 1,
  size: 5,
});
const data = reactive({
  custList:[]
});

function GetVisit() {
  api.customer
    .selectAllByCustId(pagePlugs.page, pagePlugs.size, pObj.value.custId)
    .then((response) => {
      if (response.code == 200) {
        data.custList = response.data.records;
      }
    });
}
</script>
<style lang="scss" scoped></style>
