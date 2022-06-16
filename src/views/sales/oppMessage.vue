<template>
  <el-scrollbar height="450px">
    <div class="essential1">
      <ul>
        <li class="li1">
          <p>商机名:</p>
          <span>{{ data.formData.oppName }}</span>
        </li>
        <li>
          <P>客户名:</P>
          <span>{{ data.formData.customerDetail.custDetailName }}</span>
        </li>
        <li>
          <p>服务:</p>
          <span>{{ data.formData.flow.flowName }}</span>
        </li>
        <li>
          <p>所到阶段:</p>
          <span>{{ data.formData.flowDetails.flowDetailsName }}</span>
        </li>
        <li>
          <p>商机金额:</p>
          <span>{{ data.formData.oppMoney }}元</span>
        </li>
        <li>
          <p>预计成交日:</p>
          <span>{{ data.formData.oppStopTime }}</span>
        </li>
        <li>
          <p>备注:</p>
          <span>{{
            data.formData.oppNotes == null ? "空" : data.formData.oppNotes
          }}</span>
        </li>
        <li>
          <p>负责人:</p>
          <span>{{ data.formData.employee.employeeDatail.empName }}</span>
        </li>
        <li>
          <p>创建人:</p>
          <span>{{ data.formData.employee1.employeeDatail.empName }}</span>
        </li>
        <li>
          <p>创建时间:</p>
          <span>{{ data.formData.oppStartTime }}</span>
        </li>
        <li>
          <p>最后跟进时间:</p>
          <span>{{ data.formData.custLastTime }}</span>
        </li>
        <li>
          <p>更新时间:</p>
          <span>{{ data.formData.oppUpdateTime }}</span>
        </li>
        <li>
          <p>所选房子:</p>
          <a href="#" @click.prevent="showProduct">{{
            data.formData.product.productName
          }}</a>
        </li>
      </ul>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { watch, reactive, defineProps } from "vue";
const data = reactive({
  formData: {},
});
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
watch(
  () => props.rowInfo,
  () => {
    data.formData = props.rowInfo;
    console.log(props.rowInfo);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped>
.essential1 ul li {
  font-size: small;
  margin-top: 40px;
}

.essential1 ul .li1 {
  margin: 0;
}
a {
  text-decoration: none;
}
</style>