<!--  -->
<template>
  <div class="">
    <el-table :data="data.custList" style="width: 100%">
      <el-table-column prop="attachment.attName" label="附件名称" width="80" />
      <el-table-column prop="attachment.attType" label="附件类型" width="80" />
      <el-table-column prop="attachment.attPath" label="附件路径" width="150" />
      <el-table-column prop="attachment.attTime" label="创建时间" width="180"/>
      <el-table-column prop="attachment.attStatus" label="附件状态" />
      <el-table-column prop="attachment.attDesc" label="附件描述" />
    </el-table>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs,defineProps, } from "vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

//挂载 点击时加载
// onMounted(() => {
//   GetAttachment();
// });
//接收父组件的值
const props = defineProps({
  rowInfo: {},
});
const pObj = toRefs(props).rowInfo;
//定义分页初始值
const pagePlugs = reactive({
  page: 1,
  size: 5,
});
let data = reactive({
  custList:[]
});

// function GetAttachment() {
//   api.customer
//     .selectAllByCustId(pagePlugs.page, pagePlugs.size, pObj.value.custId)
//     .then((response) => {
//       if (response.code == 200) {
//         data.custList = response.data.records;
//       }
//     });
// }
</script>
<style lang="scss" scoped></style>
