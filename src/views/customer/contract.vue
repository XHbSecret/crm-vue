<!--这是合同组件 -->
<template>
  <div class="contract">
    <el-button type="" @click="addcontractfrom">新建合同</el-button>
    <el-table
      :data="getContractData.data"
      style="width: 100%"
      height="400px"
      :borde="true"
    >
      <el-table-column fixed prop="contractNo" label="合同编号" width="150" />
      <el-table-column prop="contractName" label="合同名称" width="100" />
      <el-table-column
        prop="customerDetail.custDetailName"
        label="客户姓名"
        width="100"
      />
      <el-table-column prop="contractMoney" label="合同金额" width="100" >
         <template v-slot="scope">
        {{ scope.row.contractMoney }}元
      </template>
      </el-table-column>
      <el-table-column prop="contractTotalCommission" label="合同佣金" width="100" >
         <template v-slot="scope">
        {{ scope.row.contractTotalCommission }}元
      </template>
      </el-table-column>
      <el-table-column
        prop="contractStatus"
        label="合同状态"
        width="100"
        :formatter="Status"
      />>
      <el-table-column
        fixed="right"
        prop="contractStopTime"
        label="操作"
        width="200"
      >
        <template #default="{ row }">
          <el-button
            type="text"
            size="small"
            @click="updataContractStatus(row)"
            :disabled="
              row.contractStatus == 3
                ? true
                : row.contractStatus == 1
                ? true
                : row.contractStatus ==2?true
                : false
            "
            >提交审核</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="upd(row)"
            :disabled="
              row.contractStatus == 3
                ? true
                : row.contractStatus == 2
                ? true
                : row.contractStatus == 1
                ? true
                : false
            "
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="CopyTheNew(row)"
            :disabled="row.contractStatus ==2?false:true"
            >复制并新建合同</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="del(row)"
            :disabled="
              row.contractStatus == 3
                ? true
                : row.contractStatus == 1
                ? true
                : false
            "
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- {{data.formData}} -->
  </div>
  <Addcontractfrom
    v-if="dialogShow"
    v-model:dialogShow="dialogShow"
    :rowInfo="data.formData"
    @GetContract="getContract"
    :title="addName"
    :rowData="rowData"
  ></Addcontractfrom>
  <UpdContractfrom
    v-if="UpdShow"
    v-model:UpdShow="UpdShow"
    :rowInfo="data.formData"
    :title="addName"
    :rowData="rowData"
    :judge = "judge"
    @GetContract="getContract"
  ></UpdContractfrom>
</template>

<script setup>
import {
  unref,
  reactive,
  ref,
  getCurrentInstance,
  onMounted,
  toRefs,
} from "vue";
import {
  getContractByCustId,
  updateStatus,
  deleteContract,
} from "@/api/contract/index";
import Addcontractfrom from "./Addcontract.vue";
import UpdContractfrom from "./UpdContract.vue";
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

const pObj = toRefs(props).rowInfo;
const getContractData = reactive({ data: [] });
//根据客户id查询合同
const getContract = () => {
  getContractByCustId(data.formData.custId) // 使用接口，调用
    .then((response) => {
      if (response.code == 200) {
        getContractData.data = response.data;
        console.log("合同加载成功" + response.data);
      }
    });
};
//提交审批
const updataContractStatus = (row) => {
  updateStatus(row.contractId, 3) // 使用接口，调用
    .then((response) => {
      if (response.code == 200) {
        getContract();
        console.log("审批提交成功");
      }
    });
  console.log(row);
};

//删除草稿
const del = (row) => {
  deleteContract(row.contractId) // 使用接口，调用
    .then((response) => {
      if (response.code == 200) {
        getContract();
        console.log("删除成功");
      }
    });
};
const UpdShow = ref(false);
//修改草稿
const upd = (row) => {
  addName.value = "修改合同";
  UpdShow.value = true;
  rowData.value = row;
  console.log(row)
  judge.value=1
};

//复制并新建
const CopyTheNew = (row) => {
  console.log(row)
  addName.value = "复制并新建";
  UpdShow.value = true;
  rowData.value = row;
  judge.value=2
};

const dialogShow = ref(false);

const addName = ref("");
const rowData = ref({});
const judge = ref(0)
//新增合同
const addcontractfrom = () => {
  addName.value = "新增合同";
  dialogShow.value = true;
  rowData.value = {};
};

//客户类型格式
function Status(rew, column) {
  let custType = rew.contractStatus;
  if (custType == 0) {
    return "未审核";
  } else if (custType == 1) {
    return "审核通过";
  } else if (custType == 2) {
    return "审核未通过";
  } else if (custType == 3) {
    return "审核中";
  }
}

onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  getContract();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
