<template>
  <el-dialog
    :model-value="dialogVisible_contract"
    @close="handClose"
    title="新增合同"
    width="60%"
  >
    <el-col :span="8">
      <el-input
        style="width: 300px"
        v-model="searchContent"
        placeholder="输入客户姓名"
        class="input-with-select"
        clearable
      >
        <template #append>
          <el-button :icon="Search" type="primary" @click="likeSearch()" />
        </template>
      </el-input>
    </el-col>
    <el-table
      :data="contractList.data"
      height="400px"
      style="width: 100%; margin-top: 30px"
    >
      <el-table-column label="序号" width="80" type="index" fixed>
      </el-table-column>
      <el-table-column
        prop="contractNo"
        label="合同编号"
        width="250px"
        fixed="left"
      >
      </el-table-column>
      <el-table-column prop="contractName" label="合同名称" width="150px" />
      <el-table-column prop="contractMoney" label="合同金额" width="100">
        <template v-slot="scope"> {{ scope.row.contractMoney }}元 </template>
      </el-table-column>
      <el-table-column
        prop="contractTotalCommission"
        label="合同佣金"
        width="100px"
      >
        <template v-slot="scope">
          {{ scope.row.contractTotalCommission }}元
        </template>
      </el-table-column>
      <el-table-column
        prop="contractSignTime"
        label="合同签约时间"
        width="150px"
      />
      <el-table-column
        prop="customerDetail.custDetailName"
        label="合同客户"
        width="120px"
      >
      </el-table-column>
      <el-table-column
        prop="product[0].productName"
        label="合同产品"
        width="100px"
      >
      </el-table-column>
      <el-table-column prop="empName" label="合同负责人" width="100px" />
      <el-table-column prop="contractDescribe" label="合同描述" />
    </el-table>
    <div>
      <el-button type="primary" @click="handClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineProps, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
const contractList = reactive({ data: [] });
const newContract = reactive({ datas: [] });
const searchContent = ref("");
const props = defineProps({
  contracts: {
    type: Object,
    default: () => {},
  },
});
const emits=defineEmits(["update:modelValue"])

function likeSearch() {
  if (searchContent.value != "") {
    contractList.data.forEach((item) => {
      if (
        item.customerDetail.custDetailName.indexOf(searchContent.value) != -1
      ) {
        newContract.datas.push(item);
      } else {
        contractList.data = props.contracts;
      }
    });
    contractList.data = [...new Set(newContract.datas)];
  } else {
    console.log(newContract.datas);
    contractList.data = props.contracts;
  }
}

function handClose() {
  emits("update:modelValue", false);
}
watch(
  () => props.contracts,
  () => {
    contractList.data = props.contracts;
    // pagePlugs.data.total = props.contracts.length;
    console.log(contractList.data);
  },
  { deep: true, immediate: true }
);
</script>

<style>
</style>