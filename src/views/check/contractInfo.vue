<template>
  <el-scrollbar height="350px">
    <!-- {{contractData.data}} -->
    <div class="title-info">基本信息</div>
    <div style="height:350px">
      <el-row class="row">
        <el-col :span="3">合同编号</el-col>
        <el-col :span="8"> {{contractData.data.contractNo}} </el-col>
        <el-col :span="3"> 合同名称 </el-col>
        <el-col :span="6"> {{contractData.data.contractName}} </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3">客户签约人</el-col>
        <el-col :span="8" v-if="contractData.data.customerDetail!=null"> {{contractData.data.customerDetail.custDetailName}} </el-col>
        <el-col :span="3"> 公司负责人 </el-col>
        <el-col :span="3"> {{contractData.data.empName}} </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3"> 房源签约人 </el-col>
        <el-col :span="8" v-if="contractData.data.company!=null"> {{contractData.data.company.custDetailName}} </el-col>
        <el-col :span="3"> 产品 </el-col>
        <el-col :span="8" v-if="contractData.data.product!=null"> {{contractData.data.product[0].productName}} </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3">签约时间</el-col>
        <el-col :span="8"> {{contractData.data.contractStartTime}}</el-col>
        <el-col :span="3"> 合同佣金 </el-col>
        <el-col :span="3"> {{contractData.data.contractTotalCommission}} </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3">备注</el-col>
        <el-col :span="8"> {{contractData.data.contractDescribe}} </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { onMounted, reactive } from "@vue/runtime-core";
import {getContractById} from "@/api/contract/index"; 
const contractData = reactive({data:{}})

  const props = defineProps(["contractId"]);
 
 onMounted(()=>{
  console.log("jiazai ")
    getContractById(props.contractId).then(res=>{
      console.log(res.data)
      contractData.data = res.data
    })
  })

</script>

<style scoped>
.row {
  margin: 30px 10px;
}
.title-info {
  border-left: 3px solid #2362fb;
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-left: 8px;
  padding-left: 10px;
}
</style>