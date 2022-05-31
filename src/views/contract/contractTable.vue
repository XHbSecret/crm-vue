<template>
  <!-- 合同状态 -->
  <div>
    <span>合同状态：</span>
    <el-radio-group v-model="checkStatus" class="ml-4">
      <el-radio label="all" size="large" >全部 </el-radio>
      <el-radio label="1" size="large" 
        >审批通过</el-radio
      >
      <el-radio label="2" size="large" 
        >审批驳回</el-radio
      >
      <el-radio label="3" size="large">审批中</el-radio>
      <el-radio label="4" size="large">已回款</el-radio>
    </el-radio-group>
  </div>

  <!-- 合同 表格 -->
  <el-table
    :data="contractList.data"
    height="300px"
    style="width: 100%; margin-top: 30px"
  >
    <el-table-column prop="checkRecord.id" label="合同编号" width="80" />

    <el-table-column
      prop="checkRecord.checkFlowId"
      label="合同佣金"
      width="100"
    />
      

    <el-table-column prop="object.contractNo" label="合同签约时间" width="180"/>
      


    <el-table-column label="合同客户"/>
    <el-table-column label="合同产品"/>
    <el-table-column label="合同负责人"/>
   
      
    <el-table-column prop="checkSend.userName" label="合同描述" />

    <el-table-column label="合同状态"/>

  
  </el-table>

</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import {getAllContractPage} from '@/api/contract/index'
const emit = defineEmits(['update'])
const props = defineProps(["me"]);
let checkStatus = ref("all");
let contractPage = reactive({
    currentPage:1,
    size:5,
    total:0
})
let contractList = reactive({data:[]})

onMounted(()=>{
    if(props.me == "isMe"){ // 我负责的合同

    }else{  // 全部合同
        getAllContractPage(contractPage.currentPage,contractPage.size).then(res=>{
            contractList.data = res.data.records
            contractPage.total = res.data.total
        })
    }
})
</script>

<style>

</style>