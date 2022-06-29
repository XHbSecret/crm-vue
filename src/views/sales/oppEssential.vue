<!--  -->
<template>
  <el-scrollbar height="400px">
    <div class="essential1">
      <span>基本信息</span>
      <button @click="edit()">编辑</button>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="商机名">
          <span v-if="formSwitch.flag">{{ data.formData.oppName }}</span>
          <el-input v-else @change="input()" v-model="data.formData.oppName" />
        </el-form-item>
        <el-form-item label="客户名">
          <span v-if="formSwitch.flag">{{
            data.formData.customerDetail.custDetailName
          }}</span>
          <el-input
            v-else
            @change="input()"
            v-model="data.formData.customerDetail.custDetailName"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="服务" prop="flow.flowName" style="width: 300px">
          <span v-if="formSwitch.flag">{{ data.formData.flow.flowName }}</span>
          <el-input
            v-else
            @change="input()"
            v-model="data.formData.flow.flowName"
          />
        </el-form-item>
        <el-form-item
          label="所到阶段"
          prop="flowDetails.flowDetailsName"
          style="width: 300px"
        >
          <span v-if="formSwitch.flag">{{
            data.formData.flowDetails.flowDetailsName
          }}</span>
          <el-input
            v-else
            @change="input()"
            v-model="data.formData.flowDetails.flowDetailsName"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="商机金额/元" prop="oppMoney" style="width: 300px">
          <span v-if="formSwitch.flag">{{ data.formData.product.productPrice*data.formData.product.productArea }}</span>
          <el-input v-else @change="input()" v-model="data.formData.oppMoney" />
        </el-form-item>
        <el-form-item
          label="预计成交日"
          prop="oppStopTime"
          style="width: 300px"
        >
          <span v-if="formSwitch.flag">{{ data.formData.oppStopTime }}</span>
          <el-input
            v-else
            @change="input()"
            v-model="data.formData.oppStopTime"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="备注" prop="oppNotes" style="width: 300px">
          <span v-if="formSwitch.flag">{{
            data.formData.oppNotes == null ? "空" : data.formData.oppNotes
          }}</span>
          <el-input
            v-else
            @change="input()"
            type="textarea"
            v-model="data.formData.oppNotes"
          />
        </el-form-item>
      </el-form>
      <el-form>
        <el-button
          type="primary"
          @click="submitForm()"
          :style="{ display: Buttonstyle.visibleCancel }"
          >保存</el-button
        >
        <el-button
          @click="cancel()"
          :style="{ display: Buttonstyle.visibleCancel }"
          >取消</el-button
        >
      </el-form>
    </div>
    <div class="emp">
      <span>系统信息</span>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="负责人">
          <span>{{ data.formData.employee.employeeDatail.empName }}</span>
        </el-form-item>
        <el-form-item label="创建人">
          <span>{{ data.formData.employee1.employeeDatail.empName }}</span>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="data.formData">
        <el-form-item label="创建时间">
          <span>{{ data.formData.oppStartTime }}</span>
        </el-form-item>
        <el-form-item label="最后跟进时间">
          <span>{{ data.formData.custLastTime }}</span>
        </el-form-item>
      </el-form>

      <el-form :inline="true" :model="data.formData">
        <el-form-item label="更新时间">
          <span>{{ data.formData.oppUpdateTime }}</span>
        </el-form-item>
      </el-form>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { getCurrentInstance, watch, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//接收父组件的值
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
    flow: {},
    flowDetals: {},
  },
});
const cancel = () => {
  formSwitch.flag = true;
  Buttonstyle.visibleCancel = "none";
};
const submitForm = () => {};

const formSwitch = reactive({
  flag: true,
});
const customerFrom = ref(null);
const Buttonstyle = reactive({
  visibleCancel: "none",
});
const edit = () => {
  formSwitch.flag = false;
  Buttonstyle.visibleCancel = "";
};

watch(
  () => props.rowInfo,
  () => {
    console.log(props.rowInfo);
    data.formData = props.rowInfo;
    console.log("复制父组件的对象" + data.formData);
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.el-form-item {
  width: 250px;
}
</style>
