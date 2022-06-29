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
          <el-form ref="form" :model="form" label-width="80px">
            <!-- <el-form-item
              label="用户名称"
              prop="userName"
              :rules="{
                required: true,
                message: '请输入用户名称',
                trigger: 'blur',
              }"
            >
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item
              label="值"
              prop="value"
              :rules="{
                required: true,
                message: '当前项为必填项',
                trigger: 'blur',
              }"
            >
              <el-input v-model="form.userName"></el-input>
            </el-form-item> -->
            <!-- {{data.Client.customerDetail.custDetailName}} -->
            <el-form-item>
              <el-button
                style="background-color: #1094cb"
                type="primary"
                @click="exportWord"
                v-if="data.formData.contractType == 2"
                >导出出租合同</el-button
              >
               <el-button
                style="background-color: #1094cb"
                type="primary"
                @click="exportWord2"
                v-if="data.formData.contractType == 3"
                >导出买房合同</el-button
              >
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
                  <span>{{
                    data.formData.product[0].productDecorateType
                  }}</span>
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
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { getCustomerById } from "@/api/customer/index.js";
import { getEmpById } from "@/api/employee/login.js";
import JSZipUtils from "jszip-utils";
import JSZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
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
    text();
  });
};
const getEmp = () => {
  getEmpById(data.formData.empId).then((res) => {
    data.Emp = res.data;
    console.log(data.Emp);
    temp.empName = data.Emp.employeeDatail.empName;
    temp.empPhone = data.Emp.employeeDatail.empPhone;
  });
  console.log("haha");
};

const cont = reactive({
  contract: {
    custDetailName: null,
    contractType: 1,
  },
});
let temp = reactive({
  custDetailName: null,
  FYcustDetailName: null,
  FYcustDetailPhone: null,
  empName: null,
  empPhone: null,
  productAddress: null,
  productType: null,
  productArea: null,
  contractLease: null,
  contractStartTime: null,
  contractStopTime: null,
  contractRent: null,
  day: null,
  contractWay: null,
  contractTotalCommission: null,
  contractServiceCharge: null,
  moenyWay: null,
  custDetailPhone: null,
  systemTime: null,
  productPrice: null,
  productValuation:null
});

//给模板赋值
function text() {
  (temp.custDetailName = data.formData.customerDetail.custDetailName),
    (temp.custDetailPhone = data.CustData.customerDetail.custDetailPhone);
  temp.productArea = data.formData.product[0].productArea;
  (temp.productAddress = data.formData.product[0].productAddress),
    (temp.productType = data.formData.product[0].productDecorateType),
    (temp.FYcustDetailName = data.Client.customerDetail.custDetailName),
    (temp.FYcustDetailPhone = data.Client.customerDetail.custDetailPhone);
  temp.contractTotalCommission = data.formData.contractTotalCommission;
  temp.contractServiceCharge = data.formData.contractServiceCharge;
  temp.productPrice = data.formData.product[0].productPrice;
  temp.productValuation = data.formData.product[0].productValuation
  console.log(temp);
}
//详情
function exportWord() {
  JSZipUtils.getBinaryContent(
    "../public/房屋租赁合同.docx",
    function (error, content) {
      // 抛出异常
      if (error) {
        throw error;
      }
      // 创建一个JSZip实例，内容为模板的内容
      let zip = new JSZip(content);
      // 创建并加载docxtemplater实例对象
      let doc = new Docxtemplater().loadZip(zip);
      // 设置模板变量的值
      doc.setData({
        temp,
      });
      try {
        // 用模板变量的值替换所有模板变量
        doc.render();
      } catch (error) {
        // 抛出异常
        console.log("导出报表失败");
        throw error;
      }
      let out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "applicationnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      // 将目标文件对象保存为目标类型的文件，并命名
      if (data.formData.contractType == 2) {
        cont.contract.custDetailName = "租房合同";
        saveAs(out, cont.contract.custDetailName + ".docx");
      } else if (data.formData.contractType == 3) {
        cont.contract.custDetailName = "买房合同";
        saveAs(out, cont.contract.custDetailName + ".docx");
      }
      ElNotification({
        title: "成功",
        message: "导出合同成功!",
        type: "success",
      });
    }
  );
}
function exportWord2() {
  JSZipUtils.getBinaryContent(
    "../public/房屋出售合同.docx",
    function (error, content) {
      // 抛出异常
      if (error) {
        throw error;
      }
      // 创建一个JSZip实例，内容为模板的内容
      let zip = new JSZip(content);
      // 创建并加载docxtemplater实例对象
      let doc = new Docxtemplater().loadZip(zip);
      // 设置模板变量的值
      doc.setData({
        temp,
      });
      try {
        // 用模板变量的值替换所有模板变量
        doc.render();
      } catch (error) {
        // 抛出异常
        console.log("导出报表失败");
        throw error;
      }
      let out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "applicationnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      // 将目标文件对象保存为目标类型的文件，并命名
      if (data.formData.contractType == 2) {
        cont.contract.custDetailName = "租房合同";
        saveAs(out, cont.contract.custDetailName + ".docx");
      } else if (data.formData.contractType == 3) {
        cont.contract.custDetailName = "买房合同";
        saveAs(out, cont.contract.custDetailName + ".docx");
      }
      ElNotification({
        title: "成功",
        message: "导出合同成功!",
        type: "success",
      });
    }
  );
}




//挂载
onMounted(() => {
  // data.formData = Object.assign({}, props.rowInfo);
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  // temp = JSON.parse(JSON.stringify(props.rowInfo));
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
