<!-- 这是新增合同界面 -->
<template>
  <div>
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
        <!-- {{data.contract}} -->
        <el-scrollbar height="550px">
          <div style="margin-top: 20px; margin-left: 20px">
            <span style="font-weight: bold">基本信息</span>
            <el-form
              :inline="true"
              :model="data.contract"
              class="demo-form-inline"
              style="margin-left: 20px"
              label-position="left"
              label-width="100px"
            >
              <el-form-item label="合同编号">
                <el-input
                  placeholder="Approved by"
                  v-model="data.contract.contractNo"
                  disabled
                />
              </el-form-item>
              <el-form-item label="合同类型">
                <el-select
                  v-model="data.contract.contractType"
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
                  v-model="data.contract.contractName"
                />
              </el-form-item>
            </el-form>
            <el-form
              :inline="true"
              :model="data.contract"
              class="demo-form-inline"
              style="margin-left: 20px"
              label-position="left"
              label-width="100px"
            >
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="data.contract.contractStartTime"
                  type="date"
                  label="结束时间"
                  placeholder="开始时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="data.contract.contractStopTime"
                  type="date"
                  label="结束时间"
                  placeholder="结束时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="客户签约人">
                <el-input v-model="input" disabled placeholder="Please input" />
              </el-form-item>
              <el-form-item label="联系人">
                <el-select
                  ref="count"
                  v-model="data.contract.contactId"
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
                  v-model="data.contract.empId"
                  placeholder="请选中"
                  @change="getempId"
                  disabled
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
                  v-model="data.contract.companyId"
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
                  v-model="data.contract.contractDescribe"
                />
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-top: 20px; margin-left: 20px">
            <p style="font-weight: bold">产品</p>
            <el-button @click="AddProducts">添加产品</el-button>
            <el-table
              :data="data.contract.product"
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
              <el-table-column prop="productArea" label="面积" width="180" />
            </el-table>
          </div>
          <div
            style="margin-top: 20px; margin-left: 20px"
            v-if="data.contract.contractType == 3"
          >
            <p style="font-weight: bold">卖房收费模式</p>
            <p style="font-size: 5px">最高租买房中介费总额不可超过成交额的3%</p>
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
                >已选中{{ data.contract.product.length }}件商品,</span
              >
              <span style="font-size: smaller"
                >总金额：{{ data.contract.contractMoney }}元,</span
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
                >向客户收取中介费：{{ data.contract.contractServiceCharge }}元,</span
              >
            </div>
            <div v-if="radio1 == 2">
              <span style="font-size: smaller"
                >已选中{{ data.contract.product.length }}件商品,</span
              >
              <span style="font-size: smaller"
                >总金额：{{ data.contract.contractMoney }}元,</span
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
                >向房源收取佣金：{{ contract.contractTotalCommission }}元,</span
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
            v-if="data.contract.contractType == 2"
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
                >向客户收取中介费：{{ contract.contractServiceCharge }}元,</span
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
                >向房源收取佣金：{{ contract.contractTotalCommission }}元,</span
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
    ></AddProductsfrom>
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
import { ElMessage, ElMessageBox } from "element-plus";
import AddProductsfrom from "../customer/AddProducts.vue";
import { updateContract, addContractTo } from "@/api/contract/index";
import { number } from "echarts";
import { useStore } from "vuex";
import { CustomerSearch } from "@/api/customer/index.js";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

const dialogShow = ref(false);
//获取父组件的数据
const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  rowInfo: {
    type: Object,
    default: () => {},
  },
  rowData: {
    type: Object,
    default: () => {},
  },
  judge: {
    type: Number,
    default: () => 0,
  },
});

//接收父组件的数据复制
const data = reactive({
  formData: {},
  emplist: [],
  ContactsList: [],
  contract: {
    contractName: null,
    contractMoney: 0,
    contractTotalCommission: 0,
    contractStatus: 0,
    product: [],
  },
  CustIdlist: [],
});

//添加合同页面打开添加商品组件
const AddProducts = () => {
  dialogShow.value = true;
};

let pagePlugs = reactive({
  data: {
    page: 1,
    size: 10,
    total: 0,
  },
});

let Customerterm = reactive({
  empId: null,
  custType: 1,
  custStatus: 4,
  custShared: 1,
});
//useStore 获取store
const store = useStore();
//从token 获取empid
const getCustIdBycustType = () => {
  Customerterm.empId = store.state.employee.user.user.empId;
  CustomerSearch(pagePlugs.data.page, pagePlugs.data.size, Customerterm).then(
    (response) => {
      if (response.code == 200) {
        data.CustIdlist = response.data.records;
      }
    }
  );
};
const getCustId = (value) => {
  data.CustIdlist.forEach((item) => {
    if (item.custId == value) {
      data.contract.companyId = item.custId;
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
//下拉菜单的点击事件
const getempId = (value) => {
  data.emplist.forEach((item) => {
    if (item.empId == value) {
      console.log(item.empId);
      contract.empId = item.empId;
    }
  });
};

//向表格添加数据
const add = (val, val2) => {
  data.contract.product = [];
  data.contract.product = val;
  data.contract.productId = data.contract.product[0].productNo;
};

const pObj = toRefs(props).rowData;

//获取表单信息
let contract = reactive({});


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
  if (data.contract.contractType == 3) {
    contract.contractTotalCommission =
      contract.contractMoney * (ratio.value / 100);
  } else {
    contract.contractTotalCommission = value;
  }

  console.log(value);
};
//客户单项收费
const contServiceCharge = (value) => {
  if (data.contract.contractType == 3) {
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
  if (data.contract.contractType  == 3) {
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


// const handleChange = (value) => {
//   data.contract.contractTotalCommission =
//     data.contract.contractMoney * (ratio.value / 100);
//   console.log(value);
// };

const product = reactive({ data: [] });
//修改合同
const tijiao = () => {
  if (JSON.stringify(props.judge) == "1") {
    updateContract(data.contract) // 使用接口，调用
      .then((response) => {
        if (response.code == 200) {
          console.log(data.contract);
          onClose();
          ElMessage({
            type: "success",
            message: "修改成功",
          });
        } else {
          ElMessage.error("修改失败，请联系管理员");
        }
      });
  } else if (JSON.stringify(props.judge) == "2") {
    data.contract.contractStatus = 0;
    addContractTo(data.contract) // 使用接口，调用
      .then((response) => {
        if (response.code == 200) {
          onClose();
          ElMessage({
            type: "success",
            message: "成功添加",
          });
        } else {
          ElMessage.error("添加失败，请联系管理员");
        }
      });
  }
};

const haha = () => {
  if (data.contract.contractType == 2) {
    data.contract.contractName = "租房合同";
  } else if (data.contract.contractType == 3) {
    data.contract.contractName = "售房合同";
  }
};

//取消点击事件
const qvxiao = () => {
  emits("update:UpdShow", false);
};
const input = ref(pObj.value.customerDetail.custDetailName);

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

const emits = defineEmits(["update:UpdShow", "GetContract"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emits("update:UpdShow", false);
  emits("GetContract");
};
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  allEmp();
  data.contract = JSON.parse(JSON.stringify(props.rowData));
  ratio.value =
    (data.contract.contractTotalCommission / data.contract.contractMoney) * 100;
  getCustIdBycustType();
  api.customer
    .selectCustomerContacts(pObj.value.customerDetail.custId)
    .then((response) => {
      if (response.code == 200) {
        console.log("加载成功");
        data.ContactsList = response.data;
      }
    });
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
