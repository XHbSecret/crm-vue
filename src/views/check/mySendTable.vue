<template>
  <!-- 审批类型 -->
  <div style="margin-top: 15px; margin-bottom: 10px">
    <span>审批类型：</span>
    <el-radio-group v-model="type" class="ml-4">
      <el-radio label="0" size="large" @change="changeHaha()">全部</el-radio>
      <template v-for="type in checkType.data" :key="type.id">
        <el-radio :label="type.id" size="large" @change="changeHaha()">{{
          type.checkName
        }}</el-radio>
      </template>
    </el-radio-group>
  </div>

  <!-- 审批状态 -->
  <div>
    <span>审批状态：</span>
    <el-radio-group v-model="checkStatus" class="ml-4">
      <el-radio label="0" size="large" @change="changeHaha()">全部 </el-radio>
      <el-radio label="1" size="large" v-if="props.me!='isMe'" @change="changeHaha()"
        >审批通过</el-radio
      >
      <el-radio label="2" size="large"  v-if="props.me!='isMe'" @change="changeHaha()"
        >审批驳回</el-radio
      >
      <el-radio label="3" size="large" @change="changeHaha()">审批中</el-radio>
    </el-radio-group>
  </div>

  <!-- 表格 -->
  <el-table
    :data="checkRecord.data"
    height="320px"
    style="width: 100%; margin-top: 30px"
  >
    <el-table-column prop="checkRecord.id" label="编号" width="80" />

    <el-table-column
      prop="checkRecord.checkFlowId"
      label="审批类型"
      width="100"
    >
      <template v-slot="scope">
        <template v-for="ctype in checkType.data" :key="ctype.id">
          <span v-if="ctype.id == scope.row.checkRecord.checkFlowId">{{
            ctype.checkName
          }}</span>
        </template>
      </template>
    </el-table-column>

    <el-table-column prop="object.contractNo" label="审批文件" width="180">
      <template v-slot="scope">
        
        <!-- TODO -->
        <!-- 合同 -->
        <template v-if="scope.row.checkRecord.checkFlowId == 1">
          <el-link type="primary" @click="contractItemClick(scope.row)">
            {{ scope.row.object.contractNo }}
          </el-link>
        </template>

        <!-- 回款 -->
        <template v-if="scope.row.checkRecord.checkFlowId == 2">
          <el-link type="primary" @click="backItemClick(scope.row)">
            {{ scope.row.object.backId }}
          </el-link>
        </template>

       
      </template>
    </el-table-column>

    <el-table-column prop="checkSend.userName" label="申请人" />

    <el-table-column label="审批人">
      <template v-slot="scope">
        <span v-for="(u, index) in scope.row.records" :key="u.id">
          <span v-if="index == scope.row.records.length - 1">{{
            u.checkUserVO.userName
          }}</span>
          <span v-else> {{ u.checkUserVO.userName }}， </span>
        </span>
      </template>
    </el-table-column>

    <el-table-column label="审批状态">
      <template v-slot="scope">
        <el-tag type="success" v-if="scope.row.checkRecord.checkStatus == 1"
          >审批通过</el-tag
        >
        <el-tag type="danger" v-else-if="scope.row.checkRecord.checkStatus == 2"
          >审批驳回</el-tag
        >
        <el-tag v-else>审批中</el-tag>
      </template>
    </el-table-column>

    <!-- 操作 -->
    <el-table-column label="操作" width="250px" align="center">
      <template v-slot="scope">
        <template v-if="props.me == 'isMe'">
          <template v-for="rd in scope.row.records" :key="rd.id">
            <template
              v-if="
                rd.checkUserVO.userId ==
                  $store.state.employee.user.user.empId && rd.checkStatus == 3
              "
            >
              <el-button type="primary" @click="updateStatus(scope.row, 1)"
                >通过</el-button
              >
              <el-button type="primary" @click="reject(scope.row,2)"
                >驳回</el-button
              >
            </template>
          </template>
          <el-button type="primary" @click="itemClick(scope.row)"
            >查看</el-button
          >
        </template>
        <template v-else>
          <el-button type="primary" @click="itemClick(scope.row)"
            >查看</el-button
          >
        </template>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div style="float: right; margin: 15px 90px">
    <el-pagination
      background
      :page-size="page.pageSize"
      layout="prev, pager, next"
      :total="page.total"
      @current-change="handlerChange"
    />
  </div>

  <!-- 查看审批 -->
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <!-- 文件信息 -->
    <!-- <div>
      <div class="basic-info">合同信息</div>
      <div class="info">
        <span>合同编号</span>
        <span>{{ checkFile.data.contractNo }}</span>
      </div>
      <div class="info">
        <span>合同名称</span>
        <span>{{ checkFile.data.contractName }}</span>
      </div>
      <div class="info">
        <span>商品</span>
        <span>{{ checkFile.data.productId }}</span>
      </div>
      <div class="info">
        <span>客户</span>
        <span>{{ checkFile.data.custId }}</span>
      </div>
      <div class="info">
        <span>签约时间</span>
        <span>{{ checkFile.data.contractSignTime }}</span>
      </div>
      <div class="info">
        <span>合同佣金</span>
        <span>{{ checkFile.data.contractTotalCommission }} 元</span>
      </div>
      <div class="info">
        <span>签约时间</span>
        <span>{{ checkFile.data.contractSignTime }}</span>
      </div>
      <div class="info">
        <span>合同状态</span>
        <span>{{ checkFile.data.contractStatus }}</span>
      </div>
      <div class="info">
        <span>合同备注信息</span>
        <span>{{ checkFile.data.contractDescribe }}</span>
      </div>
    </div> -->

    <!-- 审批人时间线  1:通过审批  2：拒绝通过  3：待我审批（审批中）-->
    <div>
      <div class="basic-info check-info">审批人信息</div>
      <el-timeline class="info">
        <el-timeline-item
          v-for="(activity, index) in checkUserItem.data"
          :key="index"
          :timestamp="activity.checkTime"
          :color="
            activity.checkStatus == 1
              ? '#0bbd87'
              : activity.checkStatus == 2
              ? 'red'
              : '#e4e7ed'
          "
        >
          审批人：{{ activity.checkUserVO.userName }}&nbsp;&nbsp;&nbsp;&nbsp;
          <template v-if="activity.checkStatus == 2">
            <el-tag class="ml-2" type="danger"
              >拒绝通过，原因是：{{ activity.checkAdvice }}</el-tag
            >
          </template>
          <template v-else-if="activity.checkStatus == 1">
            <el-tag>审批通过</el-tag>
          </template>
          <template v-if="activity.checkStatus == 3">
            <el-tag class="ml-2" type="info">审批中...</el-tag>
          </template>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-drawer>

  <!-- 驳回的dialog框 -->
  <el-dialog
    v-model="dialogVisible"
    title="驳回意见"
    width="30%"
  >
    <!-- <span>驳回意见</span> -->
     <el-input
      v-model="suggest"
      :rows="2"
      type="textarea"
      placeholder="你的驳回意见..."
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="rejectOK()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 审批文件（回款） 抽屉 -->
  <el-drawer v-model="backDrawer" title="I am the title" :with-header="false" size="75%">
   <back-item :backId="backId" :backData="backData.data"/>
  </el-drawer>

  <!-- 审批文件（合同）抽屉 -->
  <el-drawer v-model="contractDrawer" title="I am the title" :with-header="false" size="75%">
   <contract-item :contractId="contractId" :contractData="contractData.data"/>
  </el-drawer>
</template>

<script setup>
import { onMounted, reactive, ref, toRaw, watch } from "@vue/runtime-core";
import {
  getAllCheckFlow,
  getRecordBySendId,
  getRecordByType,
  getRecordByMePage,
  updStatus,
} from "@/api/check/checkFlow";
import contractItem from './contractItem.vue'
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import backItem from './backItem.vue'
import {getRecordByCondition} from '@/api/check/checkFlow'
const store = useStore();

const emit = defineEmits(['update'])
const props = defineProps(["data", "me"]);
let checkType = reactive({ data: [] });
let checkStatus = ref("0");
let type = ref("0");
let checkRecord = reactive({ data: [] });
let checkRecordMeta = { data: [] };
let drawer = ref(false);
let backDrawer = ref(false);
let contractDrawer = ref(false);
let checkFile = reactive({ data: {} }); // 抽屉打开的文件
let checkUserItem = reactive({ data: [] });
let page = reactive({
  current:1,
  pageSize: 5,
  total: 2,
});
let dialogVisible = ref(false)
let suggest = ref("")
let backId = ref(0) ; // 子组件的传递的 回款id
let backData = reactive({data:{}}) ; // 子组件的传递的 回款id
let contractId = ref(0) ; // 子组件的传递的 合同id
let contractData = reactive({data:{}}) ; // 子组件的传递的 合同id
let method = ref(0);  

//分页
function handlerChange(val){
  page.current = val
   getMethod()
  getConditionData(method.value)
}

// 确定驳回按钮
function rejectOK(){
  console.log(suggest.value)
  dialogVisible.value = false
    let data = {
    id: 0,
    recordId: 0,
    checkAdvice: suggest.value,
    checkStatus: 0,
  };
  rejectData.records.forEach((e) => {
    if (e.checkUserVO.userId == store.state.employee.user.user.empId) {
      // 如果是我
      data.id = e.id;
      data.recordId = e.recordId;
      data.checkStatus = rejectStatus;
    }
  });
  checkInfoTo(data)
}

let rejectData 
let rejectStatus
// 驳回按钮
function reject (row,status){
  rejectData = {}
  rejectStatus = 0
  dialogVisible.value = true
  rejectData = toRaw(row)
  rejectStatus = status
}

// 通过审批，驳回审批，（修改审批详情的
function updateStatus(row, status) {
  let data = {
    id: 0,
    recordId: 0,
    checkAdvice: null,
    checkStatus: 0,
  };
  row.records.forEach((e) => {
    if (e.checkUserVO.userId == store.state.employee.user.user.empId) {
      // 如果是我
      data.id = e.id;
      data.recordId = e.recordId;
      data.checkAdvice = e.checkAdvice;
      data.checkStatus = status;
    }
  });
  checkInfoTo(data)
}

// 将审核信息数据发送给后端
function checkInfoTo(data){
  updStatus(data).then((res) => {
    if(res.data == true){
      ElMessage.success("审核完成！")
       getMethod()
       getConditionData(method.value)

    }else{
      ElMessage.error("审核失败！")
    }
    
  });
}

// 多条件改变
function changeHaha2() {
  checkRecord.data = [];
  if (type.value == "all" && checkStatus.value == "all") {
    // 都是全部
    checkRecordMeta.data.forEach((e) => {
      checkRecord.data.push(e);
    });
  } else if (type.value != "all" && checkStatus.value != "all") {
    checkRecordMeta.data.forEach((e) => {
      // 过滤类型
      if (
        e.checkRecord.checkFlowId == type.value &&
        e.checkRecord.checkStatus == checkStatus.value
      ) {
        checkRecord.data.push(e);
      }
    });
  } else if (type.value == "all" && checkStatus.value != "all") {
    checkRecordMeta.data.forEach((e) => {
      if (e.checkRecord.checkStatus == checkStatus.value) {
        checkRecord.data.push(e);
      }
    });
  } else {
    checkRecordMeta.data.forEach((e) => {
      if (e.checkRecord.checkFlowId == type.value) {
        checkRecord.data.push(e);
      }
    });
  }
}

// 多条件改变
function changeHaha() {
  checkRecord.data = [];
  console.log("duo条件改变")
  getMethod()
  getConditionData(method.value)

}

// 类型改变 废弃
function changeType() {
  checkRecord.data = [];
  if (type.value != "all") {
    checkRecordMeta.data.forEach((e) => {
      if (e.checkRecord.checkFlowId == type.value) {
        checkRecord.data.push(e);
      }
    });
    // getRecordByType(type.value).then((res) => {
    //   checkRecord.data = res.data;
    // });
  } else {
    checkRecordMeta.data.forEach((e) => {
      checkRecord.data.push(e);
    });
    // getRecordBySendId(store.state.employee.user.user.empId).then((res) => {
    //   checkRecord.data = res.data;
    //   checkRecordMeta.data = res.data;
    // });
  }
}

// 状态改变 废弃
function changeStatus() {
  checkRecord.data = [];
  if (checkStatus.value == "all") {
    checkRecordMeta.data.forEach((e) => {
      checkRecord.data.push(e);
    });
  } else {
    checkRecordMeta.data.forEach((e) => {
      if (e.checkRecord.checkStatus == checkStatus.value) {
        checkRecord.data.push(e);
      }
    });
  }
}

// 监视 角色数据不为空 去获取该角色的用户数据
watch(props, (newValue, oldValue) => {
  // console.log("ha");
  // console.log(oldValue);
  // console.log(newValue);
  // checkRecord.data = props.data;
  
  // if(props.data != null){
  //   getMeta(checkRecord.data);
  // }
});

// 生成源数据
function getMeta(data) {
  checkRecordMeta.data = [];
  for (let i = 0; i < data.length; i++) {
    console.log("eiei");
    checkRecordMeta.data.push(data[i]);
  }
}

// 访问方式
function getMethod(){
  console.log("props = ",props.me)
 if(props.me == "all"){// 全部
    method.value = 0
  }else if(props.me == "send"){ // 我发送
    method.value = 1
  }else if(props.me == "isMe"){ // 待我审批
    method.value = 2
  }else if(props.me == "aleary"){ //我已审批
    method.value = 3
  }
}

// 多条件获取数据
function getConditionData(method){
  console.log("xixi")
    console.log(method,type.value,checkStatus.value)
    getRecordByCondition(method,type.value,checkStatus.value,
    page.current,page.pageSize).then(res=>{
      if(res.data!=null){
        console.log("xixi  hei hei")
        console.log(res.data)
        checkRecord.data = res.data.records
        page.total = res.data.total
      }
    })
}

// 挂载
onMounted(() => {
  // checkRecord.data = props.data;
  // console.log("xixi")
  // if(props.data != null){
  //   getMeta(checkRecord.data);
  // }

// 获取数据
  getMethod()
  getConditionData(method.value)

  // 获取审批类型
  getAllCheckFlow(1, 100).then((res) => {
    checkType.data = res.data.records;
  });
});

// 表格 查看按钮触发
function itemClick(row) {
  drawer.value = true;
  checkFile.data = row.object;
  checkUserItem.data = row.records;
}

//表格 回款触发
function backItemClick(row){
  backDrawer.value = true
  backId.value = row.object.backId
  backData.data = row
}

//表格 合同触发
function contractItemClick(row){
  contractDrawer.value = true
  contractId.value = row.object.contractId
  contractData.data = row
} 


</script>

<style scoped>
 .el-drawer.rtl {
    background: #6aabc5;
  }
.info {
  margin-left: 20px;
  margin-top: 20px;
}
.info > span {
  margin-right: 80px;
}
.basic-info {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-left: 8px;
  padding-left: 10px;
  border-left: 4px solid blue;
  border-radius: 2px;
}
.check-info {
  margin-top: 40px;
}
</style>