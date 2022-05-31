<!--这是合同组件 -->
<template>
  <div class="contract">
    <el-button type="" @click="addcontractfrom">新建合同</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="400px"
      :borde="true"
    >
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="320" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
    </el-table>
  </div>
  <Addcontractfrom
    v-if="dialogShow"
    v-model:dialogShow="dialogShow"
    :rowInfo="data.formData"
  ></Addcontractfrom>
</template>

<script setup>
import { unref, reactive, ref, getCurrentInstance, onMounted } from "vue";
import { getContractByCustId } from "@/api/contract/index";
import Addcontractfrom from "./Addcontract.vue";

let contractList = reactive({ data: [] });

const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});

//接收父组件的数据复制
const data = reactive({
  formData: {},
});

const dialogShow = ref(false);

const addcontractfrom = () => {
  dialogShow.value = true;
};

onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
