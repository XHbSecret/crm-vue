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
              <el-form-item label="合同名称">
                <el-input
                  placeholder="Approved by"
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
              <el-form-item label="客户签约人">
                <el-input v-model="input" disabled placeholder="Please input" />
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
            </el-form>
          </div>
          <div style="margin-top: 20px; margin-left: 20px">
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
            <span style="font-size: smaller"
              >已选中{{ product.data.length }}件商品,</span
            >
            <span style="font-size: smaller"
              >总金额：{{ contract.contractMoney }}元,</span
            >
            <span style="font-size: smaller"
              >收取佣金：<el-input-number
                class="mx-4"
                :min="0"
                :max="100"
                v-model="ratio"
                controls-position="right"
                @change="handleChange"
              />%</span
            >
            <span style="font-size: smaller"
              >佣金：{{ contract.contractTotalCommission }}元,</span
            >
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
import AddProductsfrom from "./AddProducts.vue";
import { addContractTo } from "@/api/contract/index";
import { useStore } from "vuex";
import { CustomerSearch } from "@/api/customer/index.js";
import { nanoid } from "nanoid";
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
});

//接收父组件的数据复制
const data = reactive({
  formData: {},
  emplist: [],
  CustIdlist: [],
});

//添加合同页面打开添加商品组件
const AddProducts = () => {
  if(contract.companyId!=null){
    dialogShow.value = true;
  }else{
    ElMessage.error("请选择房源，在进行添加商品操作");
  }
  
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
    }
  });
};

//向表格添加数据
const add = (val, val2) => {
  product.data = val;
  contract.productId = product.data[0].productNo;
  contract.contractMoney = product.data[0].productValuation; //合同金额
  contract.contractNoPay = product.data[0].productValuation; //合同未支付金额
};

const pObj = toRefs(props).rowInfo;

//获取表单信息
const contract = reactive({
  custId: pObj.value.customerDetail.custId,
  empName: pObj.value.employeeDatail.empName,
  contractMoney: 0,
  contractTotalCommission: 0,
  contractStatus: 0,
  companyId:null,
  contractNo:nanoid()
});

//收取佣金的百分比
let ratio = ref(0);

const handleChange = (value) => {
  contract.contractTotalCommission =
    contract.contractMoney * (ratio.value / 100);
  console.log(value);
};

const product = reactive({ data: [] });
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
const input = ref(pObj.value.customerDetail.custDetailName);

//选择合同类型
const houseType = [
  {
    value: "1",
    label: "定价合同",
  },
  {
    value: "2",
    label: "购房合同",
  },
  {
    value: "3",
    label: "租赁合同",
  },
  {
    value: "4",
    label: "房屋转让",
  },
];

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
});
let pagePlugs = reactive({
  data: {
    page: 1,
    size: 10,
    total: 0,
  },
});
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
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  allEmp();
  getCustIdBycustType();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
