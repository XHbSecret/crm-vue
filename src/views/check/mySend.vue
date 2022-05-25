<template>
  <div class="title">
    <el-tabs v-model="activeName" class="demo-tabs title-border">
      <el-tab-pane label="全部" name="first" lazy><mySendTable :data="checkRecord.data"/></el-tab-pane>
      <el-tab-pane label="我发起的" name="second" lazy>
        <mySendTable :data="checkRecord.mySend" />
      </el-tab-pane>
      <el-tab-pane label="待我审批" name="third" lazy>
        <mySendTable :data="checkRecord.needMe" me="isMe"/>
      </el-tab-pane>
      <el-tab-pane label="我已审批" name="fourth" lazy>
        <mySendTable :data="checkRecord.already"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import mySendTable from './mySendTable.vue'
import {
  getAllCheckFlow,
  getRecordBySendId,
  getRecordByType,
  getRecordByPage,
  getRecordByMePage,
  getAlreadyCRecordByMePage,
} from "@/api/check/checkFlow";
import { useStore } from "vuex";
const store = useStore();

const activeName = ref('first')
let checkRecord = reactive({ data: [],mySend:[],needMe:[] ,already:[]});

onMounted(()=>{
    // 获取全部审批记录
  getRecordByPage(1,10).then((res) => {
    checkRecord.data = res.data.records;
  });

  // 获取我发起的审批记录
  getRecordBySendId(store.state.employee.user.user.empId).then((res) => {
     checkRecord.mySend = res.data;
  });


  // 获取待我审批的审批记录
  getRecordByMePage(store.state.employee.user.user.empId,1,10).then(res=>{
    if(res.data!=null){
      checkRecord.needMe = res.data.records;
    }
  })

  // 获取我已审批的审批记录
  getAlreadyCRecordByMePage(store.state.employee.user.user.empId,1,10).then(res=>{
    if(res.data!=null){
      checkRecord.already = res.data.records;
    }
   
  })
})
</script>

<script>
export default {
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style>
.content-border{
    border-top: 5px solid #e4e7ed;
}
.title-border{
    padding-left: 20px;
    border: 1px solid #e4e7ed;
    background-color: #fff;
}
.title {
  margin: 20px 50px;
  width: 90%;
}
</style>