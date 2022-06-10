<!-- 合同抽屉组件 -->
<template>
  <div class="contractCT">
    <!-- 抽屉 -->
    <el-drawer
      :model-value="true"
      @close="onClose()"
      :with-header="false"
      size="75%"
    >
    <!-- {{data.formData}} -->
      <el-scrollbar height="700px">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-weight: bold">合同详情</span>
            </div>
          </template>
          <span style="font-weight: bold">房子信息</span>
          <el-form :model="data.formData" :inline="true">
            <el-form-item label="产品名称">
              <span>{{ data.formData.product[0].productName }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ data.formData.product[0].productAddress }}</span>
            </el-form-item>
            <el-form-item label="面积/㎡">
              <span>{{ data.formData.product[0].productArea }}</span>
            </el-form-item>
            <el-form-item label="售价￥/㎡">
              <span>{{ data.formData.product[0].productPrice }}</span>
            </el-form-item>
            <el-form-item label="售价/￥">
              <span>{{ data.formData.product[0].productValuation }}</span>
            </el-form-item>
             <el-form-item label="出售方式">
                  <span>{{
                    data.formData.product[0].productSell == 1 ? "出售" : "出租"
                  }}</span>
                </el-form-item>
          </el-form>
          <span style="font-weight: bold">签约人</span>
          <el-form :model="data.CustData" :inline="true">
            <el-form-item label="客户名称">
              <span>{{ data.CustData.customerDetail.custDetailName }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ data.CustData.customerDetail.custDetailPhone }}</span>
            </el-form-item>
          </el-form>
          <span style="font-weight: bold">房源</span>
          <el-form :model="data.Client" :inline="true">
            <el-form-item label="房源名称">
              <span>{{ data.Client.customerDetail.custDetailName }}</span>
            </el-form-item>
            <el-form-item label="联系人电话">
              <span>{{ data.Client.customerDetail.custDetailPhone }}</span>
            </el-form-item>
          </el-form>
          <span style="font-weight: bold">负责人</span>
          <el-form :model="data.Emp" :inline="true">
            <el-form-item label="负责人名称">
              <span>{{ data.Emp.employeeDatail.empName }}</span>
            </el-form-item>
            <el-form-item label="负责人电话">
              <span>{{ data.Emp.employeeDatail.empPhone }}</span>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card" style="margin-top: 50px">
          <template #header>
            <div class="card-header">
              <span style="font-weight: bold">详细信息</span>
            </div>
          </template>
          <el-collapse :border="true" accordion>
            <el-collapse-item :title="'房子信息'" name="1">
              <el-form :model="data.formData" :inline="true">
                <el-form-item label="产品名称">
                  <span>{{ data.formData.product[0].productName }}</span>
                </el-form-item>
                <el-form-item label="出售方式">
                  <span>{{
                    data.formData.product[0].productSell == 1 ? "出售" : "出租"
                  }}</span>
                </el-form-item>
                <el-form-item label="户型">
                  <span>{{ data.formData.product[0].productType }}</span>
                </el-form-item>
                <el-form-item label="装修类别">
                  <span>{{ data.formData.product[0].productDecorateType }}</span>
                </el-form-item>
                <el-form-item label="地址">
                  <span>{{ data.formData.product[0].productAddress }}</span>
                </el-form-item>
              </el-form>
              <el-form :model="data.formData" :inline="true">
                <el-form-item label="单位">
                  <span>
                    {{
                      data.formData.product[0].productUnit == 1
                        ? "套"
                        : data.formData.product[0].productUnit == 2
                        ? "间"
                        : data.formData.product[0].productUnit == 3
                        ? "幢"
                        : data.formData.product[0].productUnit == 4
                        ? "栋"
                        : "无"
                    }}</span
                  >
                </el-form-item>
                <el-form-item label="面积/㎡">
                  <span>{{ data.formData.product[0].productArea }}</span>
                </el-form-item>
                <el-form-item label="售价￥/㎡">
                  <span>{{ data.formData.product[0].productPrice }}</span>
                </el-form-item>
                <el-form-item label="售价/￥">
                  <span>{{ data.formData.product[0].productValuation }}</span>
                </el-form-item>
              </el-form>
              <el-form :model="data.formData" :inline="true">
                <el-form-item label="介绍">
                  <span>{{ data.formData.product[0].productIntroduce }}</span>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item :title="'签约人信息'" name="2">
              <el-form :model="data.CustData" :inline="true">
                <el-form-item label="客户名称">
                  <span>{{ data.CustData.customerDetail.custDetailName }}</span>
                </el-form-item>
                <el-form-item label="电话">
                  <span>{{
                    data.CustData.customerDetail.custDetailPhone
                  }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{
                    data.CustData.customerDetail.custSex == 1
                      ? "男"
                      : data.CustData.customerDetail.custSex == 2
                      ? "女"
                      : "未知"
                  }}</span>
                </el-form-item>
                <el-form-item label="客户地址">
                  <span>{{
                    data.CustData.customerDetail.custDetailAddress != null
                      ? data.CustData.customerDetail.custDetailAddress
                      : "无"
                  }}</span>
                </el-form-item>
                <el-form-item label="职业">
                  <span>{{
                    data.CustData.customerDetail.custDetailJob != null
                      ? data.CustData.customerDetail.custDetailJob
                      : "无"
                  }}</span>
                </el-form-item>
                <el-form-item label="客户备注">
                  <span>{{
                    data.CustData.customerDetail.custDetailDescribe != null
                      ? data.CustData.customerDetail.custDetailDescribe
                      : "无"
                  }}</span>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="3" title="房源信息">
              <el-form :model="data.Client" :inline="true">
                <el-form-item label="房源名称">
                  <span>{{ data.Client.customerDetail.custDetailName }}</span>
                </el-form-item>
                <el-form-item label="联系人电话">
                  <span>{{ data.Client.customerDetail.custDetailPhone }}</span>
                </el-form-item>
                <el-form-item label="客户地址">
                  <span>{{
                    data.Client.customerDetail.custDetailAddress != null
                      ? data.Client.customerDetail.custDetailAddress
                      : "无"
                  }}</span>
                </el-form-item>
                <el-form-item label="客户备注">
                  <span>{{
                    data.Client.customerDetail.custDetailDescribe != null
                      ? data.Client.customerDetail.custDetailDescribe
                      : "无"
                  }}</span>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="4" title="公司签约人信息">
              <!-- {{ data.formData.empId }}
            {{ data.Emp }} -->
              <el-form :model="data.Emp" :inline="true">
                <el-form-item label="负责人名称">
                  <span>{{ data.Emp.employeeDatail.empName }}</span>
                </el-form-item>
                <el-form-item label="负责人电话">
                  <span>{{ data.Emp.employeeDatail.empPhone }}</span>
                </el-form-item>
                <el-form-item label="负责人简介">
                  <span>{{ data.Emp.employeeDatail.empDescribe }}</span>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { getCustomerById } from "@/api/customer/index.js";
import { getEmpById } from "@/api/employee/login.js";
//接收父组件的值
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["update:contractDrawer", "upData"]);
function onClose() {
  emits("update:contractDrawer", false);
}

//接收表单数据
const data = reactive({
  formData: {},
  CustData: {
    customerDetail: {
      custDetailName: null,
      custDetailPhone: null,
      custSex: null,
      custDetailAddress: null,
      custDetailDescribe: null,
      custDetailJob: null,
    },
  },
  Client: {
    customerDetail: {
      custDetailName: null,
      custDetailPhone: null,
      custSex: null,
      custDetailAddress: null,
      custDetailDescribe: null,
      custDetailJob: null,
    },
  },
  Emp: {
    employeeDatail: {
      empName: null,
      empPhone: null,
      empDescribe: null,
      empDescribe: null,
    },
  },
});

const getCustrById = () => {
  getCustomerById(data.formData.customerDetail.custId).then((res) => {
    data.CustData = res.data;
    console.log(data.CustData);
  });
};
const getClientById = () => {
  getCustomerById(data.formData.product[0].productCustId).then((res) => {
    data.Client = res.data;
    console.log(data.CustData);
  });
};
const getEmp = () => {
  getEmpById(data.formData.empId).then((res) => {
    data.Emp = res.data;
    console.log(data.Emp);
  });
  console.log("haha");
};

//挂载
onMounted(() => {
  // data.formData = Object.assign({}, props.rowInfo);
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  getCustrById();
  getClientById();
  getEmp();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.el-form-item {
  width: 150px;
}
</style>
