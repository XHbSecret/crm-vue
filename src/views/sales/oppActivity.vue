<template>
  <el-scrollbar height="100%">
    <div id="activity_main">
      <!-- （商机流程记录表） -->
      <div id="activity_body">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in oppLogs.list"
            :key="index"
            :timestamp="item.logTime"
            placement="top"
          >
            <p v-if="index < 1">
              {{ item.employeeDatail.empName }}创建了商机：{{
                item.opportunity.oppName
              }}
            </p>
            <p v-if="index >= 1">
              {{ item.employeeDatail.empName }}将商机：{{
                item.opportunity.oppName
              }}的阶段变更为：{{ item.flowDetails.flowDetailsName }}
            </p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { addOpp, findEmps, findOppLogs } from "@/api/sales/index";
import { CirclePlusFilled, Close, Delete } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, defineEmits, watch, defineProps } from "vue";
import { ElMessage } from "element-plus";
const oppLogs = reactive({ list: [] });
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const data = reactive({
  formData: {
    customerDetail: {},
    employee: {},
    employeeDatail: {},
    flowDetals: {},
  },
});
// 打开跟进卡片
let followUpSwitch = ref(false);
const followUp = () => {
  followUpSwitch.value = true;
};
watch(
  () => props.rowInfo,
  () => {
    console.log(props.rowInfo);
    data.formData = props.rowInfo;
    getOppLog();
    console.log("复制父组件的对象" + data.formData);
  },
  { deep: true, immediate: true }
);

function getOppLog() {
  findOppLogs(data.formData.oppId).then((res) => {
    oppLogs.list = res.data;
    console.log(oppLogs.list);
  });
}
</script>

<style scoped>
#activity_main {
  height: 100%;
}

#activity_body {
  height: 60%;
}
</style>