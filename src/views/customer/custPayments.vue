<!-- 这是回款组件 -->
<template>
  <div class="payments">
    <span>这是回款组件</span>
     <el-table :data="data.backData" height="420px" stripe style="width: 100%">
      <el-table-column prop="backNo" label="回款编号" fixed width="180px">
      </el-table-column>
      <el-table-column prop="customer.custDetailName" label="客户名称" width="120px"/>
      <el-table-column prop="contract.contractNo" label="合同编号" width="120px"/>
      <el-table-column prop="backMethod" label="回款方式" width="120px"/>
      <el-table-column prop="backMoney" label="回款金额" width="120px"/>
      <el-table-column prop="backDescribe" label="备注" width="120px"/>
      <el-table-column prop="employeeDatail.empName" label="负责人" width="120px"/>
      <el-table-column prop="backTime" label="回款时间" width="120px"/>
      <el-table-column prop="backStatus" label="回款状态" width="120px">
        <!-- <template v-slot="scope">
          <el-popover
            placement="top-start"
            title="审核进度"
            :width="200"
            trigger="hover"
            @show="showStatus(scope.row.backId,scope.row.backStatus)"
            @hide="disableStatus"
          >
            <template v-slot>
              <el-timeline class="info">
              <el-timeline-item
                v-for="(activity, index) in checkUser.data.records"
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
            </template>

            <template #reference>
              <div v-if="scope.row.backStatus == 0">
                <div class="cycle check-draft"></div>
                <span>未审核</span>
              </div>
              <div v-else-if="scope.row.backStatus == 1">
                <div class="cycle check-ok"></div>
                <span>审核通过</span>
              </div>
              <div v-else-if="scope.row.backStatus == 3">
                <div class="cycle check-wait"></div>
                <span>审核中</span>
              </div>
              <div v-else-if="scope.row.backStatus == 2">
                <div class="cycle check-no"></div>
                <span>审核未通过</span>
              </div>
            </template>
          </el-popover>
          
        </template> -->
      </el-table-column>
      <el-table-column  label="操作" fixed="right" align="center" width="120px">
        <!-- <template v-slot="scope">
          <template v-if="scope.row.backStatus ==0">
            <el-button type="primary" @click="backBtn(scope.row.backId)">回款（审核）</el-button>
          </template>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
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
import { getBackMoneyByCustomerId } from "@/api/check/checkFlow";
//继承
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});

//接收父组件的数据复制
const data = reactive({
  formData: {},
 backData: [],
});

const getChenkData = () => {
  getBackMoneyByCustomerId(data.formData.custId) // 使用接口，调用
    .then((response) => {
      if (response.code == 200) {
        data.backData = response.data;
        console.log("回款加载成功");
        console.log(data.CheckData);
      }
    });
};
//挂载
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  getChenkData();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
