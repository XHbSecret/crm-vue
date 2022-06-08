<template>
  <div class="con-item">
    <!-- 标题 -->
    <div class="level">
      <el-card shadow="always">
        <el-row>
          <!-- 图标 -->
          <el-col :span="22">
            <img src="src/assets/backMoney.png" alt="" width="30" height="30" />
            <a class="con-title">回款编号：{{ props.backData.object.backNo }}</a>
          </el-col>
          <!-- 编辑按钮 -->
          <el-col :span="2">
            <!-- <el-button type="primary">编辑</el-button> -->
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 审批信息 -->
    <div class="level">
      <el-card shadow="always" style="padding-bottom: 20px">
        <div>
          <div
            style="
              display: inline-block;
              width: 20px;
              height: 20px;
              background-color: #1cbaf5;
              border-radius: 3px;
            "
          >
            <el-icon size="20px" color="white"><Stamp /></el-icon>
          </div>
          <span class="check-info">审批流信息</span>
        </div>
        <div style="margin-top: 20px">
          <!-- 创建者 -->
          <template v-if="props.backData.checkSend.userName != ''">
            <div class="check-icon">
              <el-icon size="25px" color="#46cdcf"
                ><CirclePlusFilled
              /></el-icon>
            </div>
            <div class="check-user">
              <span style="margin-left: 5px">{{
                props.backData.checkSend.userName
              }}</span>
              <span style="margin-left: 6px; font-size: 10px">创建</span>
            </div>
          </template>

          <!-- 审批者 -->
          <template v-for="c in props.backData.records" :key="c">
            <div class="check-icon">
              <el-icon size="25px"><DArrowRight /></el-icon>
            </div>
            <template v-if="c.checkStatus == 0"
              ><!-- 未审核 -->
              <div class="check-icon">
                <el-icon size="25px" color="#fd5b4a"><Timer /></el-icon>
              </div>
              <div class="check-user">
                <span style="margin-left: 5px">{{
                  c.checkUserVO.userName
                }}</span>
                <span style="margin-left: 6px; font-size: 10px">待审核</span>
              </div>
            </template>
            <template v-else-if="c.checkStatus == 1"
              ><!-- 通过审核 -->
              <div class="check-icon">
                <el-icon size="25px" color="#46cdcf"
                  ><CircleCheckFilled
                /></el-icon>
              </div>
              <div class="check-user">
                <span style="margin-left: 5px">{{
                  c.checkUserVO.userName
                }}</span>
                <span style="margin-left: 6px; font-size: 10px">审核通过</span>
              </div>
            </template>
            <template v-else-if="c.checkStatus == 2"
              ><!-- 通过不审核 -->
              <div class="check-icon">
                <el-icon size="25px" color="#fd5b4a"><RemoveFilled /></el-icon>
              </div>
              <div class="check-user">
                <span style="margin-left: 5px">{{
                  c.checkUserVO.userName
                }}</span>
                <span style="margin-left: 6px; font-size: 10px"
                  >审核未通过</span
                >
              </div>
            </template>
            <template v-else-if="c.checkStatus == 3"
              ><!-- 通过审核 -->
              <div class="check-icon">
                <el-icon size="25px" color="#fd715a"><Timer /></el-icon>
              </div>
              <div class="check-user">
                <span style="margin-left: 5px">{{
                  c.checkUserVO.userName
                }}</span>
                <span style="margin-left: 6px; font-size: 10px">审核中</span>
              </div>
            </template>
          </template>
        </div>
      </el-card>
    </div>
    <!-- 回款信息 -->
    <div class="level">
      <el-tabs type="border-card" style="height: 400px">
        <el-tab-pane label="详细资料" lazy>
          <el-scrollbar height="350px">
            <div class="title-info">基本信息</div>
            <div style="height: 350px">
              <el-row class="info-row">
                <el-col :span="3">回款编号</el-col>
                <el-col :span="8"> {{props.backData.object.backNo}} </el-col>
                <el-col :span="3"> 合同编号 </el-col>
                <el-col :span="3" v-if="backData.data.contract!=null">
                  <el-link type="primary" @click="contractLink()">{{backData.data.contract.contractNo}}</el-link>
                </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :span="3" >客户名称</el-col>
                <el-col :span="8" v-if="backData.data.customer!=null"> {{backData.data.customer.custDetailName}} </el-col>
                <el-col :span="3"> 负责人 </el-col>
                <el-col :span="3" v-if="backData.data.employeeDatail!=null"> {{backData.data.employeeDatail.empName}}</el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :span="3">应收款金额</el-col>
                <el-col :span="8"> {{props.backData.object.backMoney}} </el-col>
                <el-col :span="3"> 实收款金额 </el-col>
                <el-col :span="3"> {{props.backData.object.backMoney}} </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :span="3">收款时间</el-col>
                <el-col :span="8"> {{props.backData.object.backTime}} </el-col>
              </el-row>
              <el-row class="info-row">
                <el-col :span="3">备注</el-col>
                <el-col :span="8"> {{props.backData.object.backDescribe}} </el-col>
              </el-row>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>


    <!-- 合同抽屉 -->
    <el-drawer v-model="contractDrawer" title="I am the title" :with-header="false" size="75%">
      <contractItem :contractId="contractId" :contractData="contractData.data"/>
    </el-drawer>

  </div>
</template>


<script setup>
import {
  Stamp,
  Timer,
  CirclePlus,
  CirclePlusFilled,
  DArrowRight,
  CircleCheckFilled,
  RemoveFilled,
} from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import {getBackMoneyById} from '@/api/back/backMoney'
import { getRecordByService } from "@/api/check/checkFlow";
import contractItem from './contractItem.vue'

const props = defineProps(["backId", "backData"]);
console.log("数据是： ", props.backId);

let backData = reactive({data:{
  contract:null,
}})

let contractDrawer = ref(false) // 合同抽屉

let contractData = reactive({data:{}})
let contractId = ref(0)

//点击合同连接
async function contractLink(){
  
  getRecordByService(1,backData.data.contract.contractId).then(res=>{
    contractData.data = res.data
    contractId.value = res.data.object.contractId
    console.log("heihei")
    console.log(contractData.data)
    console.log(contractId.value )
    contractDrawer.value = true
  })
}

onMounted(()=>{
  // 获取回款的相关信息
  console.log("hah",props.backId)
  getBackMoneyById(props.backId).then(res=>{
    backData.data = res.data
  })
})

</script>

<style scoped>
.info-row {
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
.check-user {
  float: left;
  padding-top: 2px;
}
.check-icon {
  float: left;
  margin-left: 15px;
}
.check-info {
  margin-left: 10px;
  font-weight: 600;
  color: #333;
}
.level {
  margin-bottom: 15px;
  padding: 8px 10px;
}
.con-item {
  width: 100%;
  height: 100%;
}
.con-title {
  vertical-align: super;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 600;
}
.row {
  /* margin-bottom: 15px; */
  padding: 8px 10px;
}
</style>