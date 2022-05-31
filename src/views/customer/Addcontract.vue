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
        <div><span style="font-weight: bold">新增合同</span></div>
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
                  label="Pick a date"
                  placeholder="Pick a date"
                />
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="contract.contractStopTime"
                  type="date"
                  label="Pick a date"
                  placeholder="Pick a date"
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
              :data="contract.product"
              stripe
              style="width: 100%"
              id="body-table"
              :border="true"
            >
              <el-table-column type="selection" width="55" />
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
            <span style="font-size: smaller"
              >已选中{{ contract.product.length }}件商品,</span
            >
            <span style="font-size: smaller"
              >总金额：<el-input-number
                class="mx-4"
                :min="1"
                :max="10"
                controls-position="right"
              />元</span
            >
          </div>
        </el-scrollbar>
        <div style="float: right">
          <el-button type="primary">取消</el-button>
          <el-button type="primary">保存草稿</el-button>
          <el-button type="primary" @click="tijiao">提交审核</el-button>
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
import AddProductsfrom from "./AddProducts.vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

const dialogShow = ref(false);
//获取父组件的数据
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});

//接收父组件的数据复制
const data = reactive({
  formData: {},
  emplist: []
});

//添加合同页面打开添加商品组件
const AddProducts = () => {
  dialogShow.value = true;
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
  contract.product=val
  console.log(val);
  console.log(val2);
};

const pObj = toRefs(props).rowInfo;

//获取表单信息
const contract = reactive({
  custId: pObj.value.customerDetail.custId,
  product:[]
});

//提交合同
const tijiao = () => {
  console.log(contract);
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

const emits = defineEmits(["update:dialogShow"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emits("update:dialogShow", false);
};
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  allEmp();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
