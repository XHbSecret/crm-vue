<!--  -->
<template>
  <div class="">
    <!-- {{ custList.d }} -->
    <el-table :data="custList.d" style="width: 100%">
      <el-table-column prop="contactName" label="联系人姓名" width="200" />
      <el-table-column prop="contactIsPolicy" label="是否决策人" width="200" />
      <el-table-column prop="contactRelation" label="与客户的关系" width="200" />
      <el-table-column prop="contractDesc" label="客户联系人备注" width="200" />
    </el-table>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import Contactst from "./Contactst.vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

//挂载 点击时加载
onMounted(() => {
  GetContactst();
});
//接收父组件的值
const props = defineProps({
  data: {},
});
const pObj = toRefs(props).data;
//定义分页初始值
const pagePlugs = reactive({
  page: 1,
  size: 5,
});
let custList = reactive({});

function GetContactst() {
  api.customer
    .selectContacts(pagePlugs.page, pagePlugs.size, pObj.value.custId)
    .then((response) => {
      if (response.code == 200) {
        console.log("xixi");
        custList.d = response.data.records;
      }
    });
}
</script>
<style></style>
