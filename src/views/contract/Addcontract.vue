<!--  -->
<template>
  <div class="Addcontract">
    <el-dialog
      :model-value="true"
      width="50%"
      @close="onClose"
      :fullscreen="true"
    >
      <el-card
        shadow="always"
        style="
          width: 50%;
          height: 650px;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
        "
      >
        <div>
          <span style="font-weight: bold">{{ title }}</span>
        </div>
        <el-scrollbar height="550px">
          <div style="margin-top: 20px; margin-left: 20px">
            <span style="font-weight: bold">基本信息</span>
            <el-form
              :inline="true"
              :model="contract"
              class="demo-form-inline"
              style="margin-left: 20px"
              label-position="left"
              label-width="100px"
            >
              <el-form-item label="合同编号">
                <el-input
                  placeholder="Approved by"
                  v-model="contract.contractNo"
                  disabled
                />
              </el-form-item>
              <el-form-item label="合同类型">
                <el-select
                  v-model="contract.contractType"
                  class="m-2"
                  placeholder="Select"
                  size="large"
                  @change="haha"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="合同名称">
                <el-input
                  placeholder="Approved by"
                  disabled
                  v-model="contract.contractName"
                />
              </el-form-item>
            </el-form>
            <el-form
              :inline="true"
              :model="contract"
              class="demo-form-inline"
              style="margin-left: 20px"
              label-position="left"
              label-width="100px"
            >
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="contract.contractStartTime"
                  type="date"
                  label="结束时间"
                  placeholder="开始时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="contract.contractStopTime"
                  type="date"
                  label="结束时间"
                  placeholder="结束时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="客户">
                <span class="select-input">
                  <el-input
                    :readonly="true"
                    v-model="contract.custName"
                    @click="openSelectCustomer()"
                  />
                </span>
              </el-form-item>
              <el-form-item label="联系人">
                <el-select
                  ref="count"
                  v-model="contract.contactId"
                  placeholder="请选中"
                  @change="getcontactId"
                  style="width: 200px"
                >
                  <el-option
                    v-for="item in data.ContactsList"
                    :key="item.contactId"
                    :label="item.contactName"
                    :value="item.contactId"
                  >
                    <span>{{ item.contactName }}</span>
                    <el-tag
                      class="mx-1"
                      type="danger"
                      style="float: right; margin-top: 5px"
                      v-if="item.contactIsPolicy == 0"
                      >主要联系人</el-tag
                    >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="公司签约人">
                <el-select
                  ref="count"
                  v-model="contract.empId"
                  placeholder="请选中"
                  @change="getempId"
                >
                  <el-option
                    v-for="item in data.emplist"
                    :key="item.empId"
                    :label="item.employeeDatail.empName"
                    :value="item.empId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="房源" prop="companyId">
                <el-select
                  ref="count"
                  v-model="contract.companyId"
                  placeholder="请选中"
                  @change="getCustId"
                >
                  <el-option
                    v-for="item in data.CustIdlist"
                    :key="item.custId"
                    :label="item.customerDetail.custDetailName"
                    :value="item.custId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  style="width: 500px"
                  v-model="contract.contractDescribe"
                />
              </el-form-item>
              <!-- {{data.CustIdlist}} -->
            </el-form>
          </div>
          <div style="margin-top: 20px; margin-left: 20px">
          {{data.rowInfo.custType }}
            <p style="font-weight: bold">产品</p>
            <el-button @click="AddProducts">添加产品</el-button>
            <el-table
              :data="product.data"
              stripe
              style="width: 100%"
              id="body-table"
              :border="true"
            >
              <el-table-column
                fixed
                prop="productName"
                label="产品名"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="productType" label="户型" width="180" />
              <el-table-column prop="houseType" label="房子类型" width="180">
                <template v-slot="scope">
                  <p v-if="scope.row.houseType == 1">普通商品房</p>
                  <p v-else-if="scope.row.houseType == 2">经济适用房</p>
                  <p v-else-if="scope.row.houseType == 3">小产权房</p>
                  <p v-else-if="scope.row.houseType == 4">房改房</p>
                  <p v-else-if="scope.row.houseType == 5">集资房</p>
                  <p v-else-if="scope.row.houseType == 6">廉租房</p>
                  <p v-else-if="scope.row.houseType == 7">公租房</p>
                  <p v-else-if="scope.row.houseType == 8">安置房</p>
                </template>
              </el-table-column>
              <el-table-column prop="productPrice" label="报价" width="180" />
              <el-table-column prop="productArea" label="面积" width="180" />
              <el-table-column
                prop="productValuation"
                label="估价/￥"
                width="180"
              />
              <el-table-column
                prop="productIntroduce"
                label="介绍"
                width="180"
              />
              <el-table-column
                prop="productAddress"
                label="房子地址"
                width="180"
              />
              <el-table-column
                prop="productDecorateType"
                label="装修类型"
                width="180"
              />
            </el-table>
            <div
              style="margin-top: 20px; margin-left: 20px"
              v-if="contract.contractType == 3"
            >
              <p style="font-weight: bold">卖房收费模式</p>
              <p style="font-size: 5px">
                最高租买房中介费总额不可超过成交额的3%
              </p>
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio :label="1" size="large" @click="chargeReset"
                  >客户单项收费</el-radio
                >
                <el-radio :label="2" size="large" @click="chargeReset"
                  >房源单项收费</el-radio
                >
                <el-radio :label="3" size="large" @click="chargeReset"
                  >双项收费</el-radio
                >
              </el-radio-group>
              <div v-if="radio1 == 1">
                <span style="font-size: smaller"
                  >已选中{{ product.data.length }}件商品,</span
                >
                <span style="font-size: smaller"
                  >总金额：{{ contract.contractMoney }}元,</span
                >
                <div></div>
                <span style="font-size: smaller"
                  >收取中介费：<el-input-number
                    class="mx-4"
                    :min="0"
                    :max="3"
                    v-model="ratio2"
                    controls-position="right"
                    @change="contServiceCharge"
                  />%</span
                >
                <span style="font-size: smaller"
                  >向客户收取中介费：{{
                    contract.contractServiceCharge
                  }}元,</span
                >
              </div>
              <div v-if="radio1 == 2">
                <span style="font-size: smaller"
                  >已选中{{ product.data.length }}件商品,</span
                >
                <span style="font-size: smaller"
                  >总金额：{{ contract.contractMoney }}元,</span
                >
                <div></div>
                <span style="font-size: smaller"
                  >收取佣金：<el-input-number
                    class="mx-4"
                    :min="0"
                    :max="3"
                    v-model="ratio"
                    controls-position="right"
                    @change="handleChange"
                  />%</span
                >
                <span style="font-size: smaller"
                  >向房源收取佣金：{{
                    contract.contractTotalCommission
                  }}元,</span
                >
              </div>
              <div v-if="radio1 == 3">
                <span style="font-size: smaller"
                  >已选中{{ product.data.length }}件商品,</span
                >
                <span style="font-size: smaller"
                  >总金额：{{ contract.contractMoney }}元,</span
                >
                <div>
                  <span style="font-size: smaller"
                    >共收金额：<el-input-number
                      class="mx-4"
                      :min="0"
                      :max="3"
                      v-model="ratio3"
                      controls-position="right"
                      @change="commonServiceCharge1"
                    />%</span
                  >
                  <span style="font-size: smaller">共收金额：{{ zsk }}元,</span>
                  <div></div>
                  <span style="font-size: smaller"
                    >收取中介费：<el-input-number
                      class="mx-4"
                      :min="0"
                      :max="100"
                      v-model="ratio5"
                      controls-position="right"
                      @change="commonServiceCharge3"
                    />%</span
                  >
                  <span style="font-size: smaller"
                    >向客户收取中介费：{{
                      contract.contractServiceCharge
                    }}元,</span
                  >
                  <div></div>
                  <span style="font-size: smaller"
                    >收取佣金：<el-input-number
                      class="mx-4"
                      :min="0"
                      :max="100"
                      v-model="ratio4"
                      controls-position="right"
                      @change="commonServiceCharge2"
                    />%</span
                  >
                  <span style="font-size: smaller"
                    >向房源收取佣金：{{
                      contract.contractTotalCommission
                    }}元,</span
                  >
                </div>
              </div>
            </div>
            <div
              style="margin-top: 20px; margin-left: 20px"
              v-if="contract.contractType == 2"
            >
              <p style="font-weight: bold">租房收费模式</p>
              <p style="font-size: 5px">最高租房中介费总额不可超过一万</p>
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio :label="1" size="large" @click="chargeReset"
                  >客户单项收费</el-radio
                >
                <el-radio :label="2" size="large" @click="chargeReset"
                  >房源单项收费</el-radio
                >
                <el-radio :label="3" size="large" @click="chargeReset"
                  >双项收费</el-radio
                >
              </el-radio-group>
              <div v-if="radio1 == 1">
                <span style="font-size: smaller"
                  >已选中{{ product.data.length }}件商品,</span
                >
                <div></div>
                <span style="font-size: smaller"
                  >收取中介费：<el-input-number
                    class="mx-4"
                    :min="0"
                    :max="10000"
                    v-model="ratio2"
                    controls-position="right"
                    @change="contServiceCharge"
                  />%</span
                >
                <span style="font-size: smaller"
                  >向客户收取中介费：{{
                    contract.contractServiceCharge
                  }}元,</span
                >
              </div>
              <div v-if="radio1 == 2">
                <span style="font-size: smaller"
                  >已选中{{ product.data.length }}件商品,</span
                >
                <div></div>
                <span style="font-size: smaller"
                  >收取佣金：<el-input-number
                    class="mx-4"
                    :min="0"
                    :max="10000"
                    v-model="ratio"
                    controls-position="right"
                    @change="handleChange"
                  />%</span
                >
                <span style="font-size: smaller"
                  >向房源收取佣金：{{
                    contract.contractTotalCommission
                  }}元,</span
                >
              </div>
              <div v-if="radio1 == 3">
                <span style="font-size: smaller"
                  >已选中{{ product.data.length }}件商品,</span
                >
                <div>
                  <span style="font-size: smaller"
                    >共收金额：<el-input-number
                      class="mx-4"
                      :min="0"
                      :max="10000"
                      v-model="ratio3"
                      controls-position="right"
                      @change="commonServiceCharge1"
                    />%</span
                  >
                  <span style="font-size: smaller">共收金额：{{ zsk }}元,</span>
                  <div></div>
                  <span style="font-size: smaller"
                    >收取中介费：<el-input-number
                      class="mx-4"
                      :min="0"
                      :max="10000"
                      v-model="ratio5"
                      controls-position="right"
                      @change="commonServiceCharge3"
                    />%</span
                  >
                  <span style="font-size: smaller"
                    >向客户收取中介费：{{
                      contract.contractServiceCharge
                    }}元,</span
                  >
                  <div></div>
                  <span style="font-size: smaller"
                    >收取佣金：<el-input-number
                      class="mx-4"
                      :min="0"
                      :max="10000"
                      v-model="ratio4"
                      controls-position="right"
                      @change="commonServiceCharge2"
                    />%</span
                  >
                  <span style="font-size: smaller"
                    >向房源收取佣金：{{
                      contract.contractTotalCommission
                    }}元,</span
                  >
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
        <div style="float: right">
          <el-button type="primary" @click="qvxiao">取消</el-button>
          <el-button type="primary" @click="tijiao">保存</el-button>
        </div>
      </el-card>
    </el-dialog>
    <AddProductsfrom
      v-if="dialogShow"
      v-model:dialogShow="dialogShow"
      @addproducts="add"
      :custId="contract.companyId"
      :rowInfo="data.rowInfo"
    ></AddProductsfrom>
  </div>
  <!-- 选择客户的dialog框 -->
  <el-dialog
    v-model="dialogVisible_SelectCustomer"
    title="选择客户"
    width="40%"
    draggable
  >
    <!-- 客户 -表格 -->
    <el-table
      :data="customerList.data"
      height="200px"
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="客户名称" prop="customerDetail.custDetailName" />
      <el-table-column
        prop="customerDetail.custDetailPhone"
        label="电话"
        sortable
      />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="custPage.currentPage"
      v-model:page-size="custPage.size"
      layout="prev, pager, next"
      background
      :total="custPage.total"
      @current-change="handleCustPage"
    />

    <!-- 取消 确定 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_SelectCustomer = false"
          >取消</el-button
        >
        <el-button type="primary" @click="customerConfirm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
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
import { ElMessage, ElMessageBox } from "element-plus";
import AddProductsfrom from "../customer/AddProducts.vue";
import { addContractTo } from "@/api/contract/index";
import { useStore } from "vuex";
import { CustomerSearch } from "@/api/customer/index.js";
import { nanoid } from "nanoid";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//获取父组件的数据
const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  //   rowInfo: {
  //     type: Object,
  //     default: () => {},
  //   },
  //   rowData: {
  //     type: Object,
  //     default: () => {},
  //   },
});
const product = reactive({ data: [] });
//获取表单信息
const contract = reactive({
  custId: null,
  empName: null,
  contractName: null,
  contractMoney: 0,
  contractNoPay: 0,
  contractServiceCharge: 0,
  contractTotalCommission: 0,
  contractStatus: 0,
  companyId: null,
  contractNo: nanoid(),
});
//接收父组件的数据复制
const data = reactive({
  formData: {},
  emplist: [],
  ContactsList: [],
  CustIdlist: [],
  rowInfo: {
    custType: null,
  },
});
const emits = defineEmits(["update:dialogShow", "GetContract"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emits("update:dialogShow", false);
  emits("GetContract");
};
//useStore 获取store
const store = useStore();
let Customerterm = reactive({
  empId: null,
  custType: 1,
  custStatus: 4,
  custShared: 1,
});
let pagePlugs = reactive({
  data: {
    page: 1,
    size: 10,
    total: 0,
  },
});
//从token 获取empid 查询房源信息
const getCustIdBycustType = () => {
  Customerterm.empId = store.state.employee.user.user.empId;
  CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm).then(
    (response) => {
      if (response.code == 200) {
        data.CustIdlist = response.data.records;
        console.log("haha");
        console.log(response.data.records);
      }
    }
  );
};
let custPage = reactive({
  currentPage: 1,
  size: 5,
  total: 0,
});
const dialogShow = ref(false);

const radio1 = ref(1);
//收取佣金的百分比
let ratio = ref(0);
let ratio2 = ref(0);
let ratio3 = ref(0);
let ratio4 = ref(0);
let ratio5 = ref(0);
const chargeReset = () => {
  (ratio.value = 0),
    (ratio2.value = 0),
    (ratio3.value = 0),
    (ratio4.value = 0),
    (ratio5.value = 0),
    (contract.contractTotalCommission = null),
    (contract.contractServiceCharge = null),
    (zsk.value = 0);
};

//房源单项收费
const handleChange = (value) => {
  if (contract.contractType == 3) {
    contract.contractTotalCommission =
      contract.contractMoney * (ratio.value / 100);
  } else {
    contract.contractTotalCommission = value;
  }

  console.log(value);
};
//客户单项收费
const contServiceCharge = (value) => {
  if (contract.contractType == 3) {
    contract.contractServiceCharge =
      contract.contractMoney * (ratio2.value / 100);
  } else {
    contract.contractServiceCharge = value;
  }

  console.log(value);
};

let zsk = ref();
//总收款
const commonServiceCharge1 = (value) => {
  if (contract.contractType == 3) {
    zsk.value = contract.contractMoney * (ratio3.value / 100);
  } else {
    zsk.value = value;
  }
};
//房源双向收费
const commonServiceCharge2 = (value) => {
  contract.contractTotalCommission = zsk.value * (ratio4.value / 100);
  console.log(value);
};
//客户双向收费
const commonServiceCharge3 = (value) => {
  contract.contractServiceCharge = zsk.value * (ratio5.value / 100);
  console.log(value);
};

//添加合同页面打开添加商品组件
const AddProducts = () => {
  if (contract.companyId != null) {
    dialogShow.value = true;
  } else {
    ElMessage.error("请选择房源，在进行添加商品操作");
  }
};

//房源的下拉框
const getCustId = (value) => {
  data.CustIdlist.forEach((item) => {
    if (item.custId == value) {
      contract.companyId = item.custId;
    }
  });
};
//下拉菜单的点击事件
const getempId = (value) => {
  data.emplist.forEach((item) => {
    if (item.empId == value) {
      console.log(item.empId);
      contract.empId = item.empId;
      contract.empName = item.employeeDatail.empName;
    }
  });
};
//查询员工信息
const allEmp = () => {
  api.customer.allEmp().then((response) => {
    if (response.code == 200) {
      data.emplist = response.data.records;
      console.log("加载成功");
    }
  });
};
//保存草稿
const tijiao = () => {
  addContractTo(contract) // 使用接口，调用
    .then((response) => {
      if (response.code == 200) {
        ElMessage({
          type: "success",
          message: "成功添加",
        });
        onClose();
      } else {
        ElMessage.error("添加失败，请联系管理员");
      }
    });
  console.log(contract);
  console.log(product);
};

//取消点击事件
const qvxiao = () => {
  emits("update:dialogShow", false);
};
const input = ref("haha");
//向表格添加数据
const add = (val, val2) => {
  product.data = val;
  contract.productId = product.data[0].productNo;
  contract.contractMoney = product.data[0].productValuation; //合同金额
  contract.contractNoPay = product.data[0].productValuation; //合同未支付金额
};
let dialogVisible_SelectCustomer = ref(false);
let Customer = reactive({
  empId: null,
  custType: 3,
  custStatus: 3,
  custShared: 1,
});
// 选择客户input 点击 查询客户信息
function openSelectCustomer() {
  dialogVisible_SelectCustomer.value = true;
  Customer.empId = store.state.employee.user.user.empId;
  CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customer).then(
    (response) => {
      if (response.code == 200) {
        customerList.data = response.data.records;
        console.log("haha");
        console.log(customerList.data);
      }
    }
  );
}
const customerList = reactive({ data: [] });
let selectCustomer = { name: "", id: 0 };
//客户分页
function handleCustPage() {
  customerList.data = [];
  CustomerSearch(custPage.currentPage, custPage.size, Customer).then((res) => {
    customerList.data = res.data.records;
    custPage.total = res.data.total;
  });
}
function handleCurrentChange(row) {
  console.log("row");
  console.log(row);
  if (row != null) {
    selectCustomer.id = row.custId;
    selectCustomer.name = row.customerDetail.custDetailName;
  }
}
function customerConfirm() {
  dialogVisible_SelectCustomer.value = false;
  if (selectCustomer != 0) {
    contract.custId = selectCustomer.id;
    contract.custName = selectCustomer.name;
    api.customer.selectCustomerContacts(contract.custId).then((response) => {
      if (response.code == 200) {
        console.log("加载成功");
        data.ContactsList = response.data;
      }
    });
  }
}

const value = ref();

const haha = () => {
  if (contract.contractType == 2) {
    contract.contractName = "租房合同";
  } else if (contract.contractType == 3) {
    contract.contractName = "售房合同";
  }
};
//合同类型
const options = [
  {
    value: 2,
    label: "租房合同",
  },
  {
    value: 3,
    label: "售房合同",
  },
];

onMounted(() => {
  //   data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  //   allEmp();
  getCustIdBycustType();
  allEmp();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
