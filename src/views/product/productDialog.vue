<!-- 这是商品新增插件 -->
<template>
  <el-dialog
    :model-value="dialogVisible"
    width="30%"
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
      <el-scrollbar height="550px">
        <span style="font-weight: bold">{{ Tittle }}</span>
        <!-- form表单 -->
        <el-form :model="form" label-width="120px" ref="formRef" :rules="rules">
          <el-form-item label="产品名" prop="productName">
            <el-input v-model="form.productName" />
          </el-form-item>
          <el-form-item label="户型" prop="productType">
            <el-select placeholder="请选择户型" v-model="form.productType">
              <el-option
                v-for="item in productTy"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="房子类型" prop="houseType">
            <el-select placeholder="请选择类型" v-model="form.houseType">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="房屋数量" prop="productQuantity">
            <el-input-number v-model="form.productQuantity" />
          </el-form-item>
          <el-form-item label="单位" prop="productUnit">
            <el-select placeholder="请选择装修类型" v-model="form.productUnit">
              <el-option
                v-for="item in unit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="报价" prop="productPrice">
            <el-input-number v-model="form.productPrice" :precision="2" />
          </el-form-item>
          <el-form-item label="面积" prop="productArea">
            <el-input-number v-model="form.productArea" :precision="2" />
          </el-form-item>
          <el-form-item label="月租" prop="rentalPrices">
            <el-input-number v-model="form.rentalPrices" :precision="2" />
          </el-form-item>
          <el-form-item label="房源" prop="productCustId">
            <el-select
              ref="count"
              v-model="form.productCustId"
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
          <el-form-item label="产品状态" prop="productStatus">
            <el-radio-group v-model="form.productStatus">
              <el-radio :label="1">上架</el-radio>
              <el-radio :label="0">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房子地址" prop="productAddress">
            <el-input v-model="form.productAddress" />
          </el-form-item>
          <el-form-item label="出售方式" prop="productSell">
            <el-select
              placeholder="请选择装修类型"
              v-model="form.productSell"
              disabled
            >
              <el-option
                v-for="item in productSellTy"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="装修类型" prop="productDecorateType">
            <el-select
              placeholder="请选择装修类型"
              v-model="form.productDecorateType"
            >
              <el-option
                v-for="item in productDecorateTy"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="empId">
            <el-select
              ref="count"
              v-model="form.empId"
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
          <el-form-item label="介绍" prop="productIntroduce">
            <el-input type="textarea" v-model="form.productIntroduce" />
          </el-form-item>

          <el-form-item label="图片上传" prop="">
            <el-upload
              :action="imgSRC"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList"
              :auto-upload="false"
              :headers="headers"
              ref="uploadRef"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <!-- 上传图片放大 -->
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="height: 100%; width: 100%"
        />
      </el-dialog>
      <div style="padding: 20px; float: right">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="addProduct()">提交</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  defineEmits,
  defineProps,
  watch,
  toRefs,
} from "vue";
import { addProducts } from "@/api/system/product";
import { CustomerSearch } from "@/api/customer/index.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import {
  Search,
  Plus,
  Delete,
  Download,
  ZoomIn,
} from "@element-plus/icons-vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
const emits = defineEmits(["update:modelValue", "AddData", "updateDate"]);
const data = reactive({
  CustIdlist: [],
    emplist: [],
});
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
});
//下拉菜单的点击事件
const getCustId = (value) => {
  data.CustIdlist.forEach((item) => {
    if (item.custId == value) {
      form.productCustId = item.custId;
    }
  });
  console.log(form.productCustId);
};
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
//接收父组件传过了的值
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
  dialogTableValue: {
    type: Object,
    default: {},
  },
  mode: {
    type: Number,
    default: 0,
  },
});

//转为响应式
const Tittle = toRefs(props).dialogTittle;
const mode = toRefs(props).mode;
//useStore 获取store
const store = useStore();
//图片携带token
let getToken = store.state.employee.token;
const headers = { token: getToken };
//获取表单的ref中的数据
const formRef = ref();
//接收表单输入的数据
const form = reactive({
  productName: null,
  productType: null,
  houseType: null,
  productPrice: null,
  productStatus: 1,
  productAddress: "",
  productIntroduce: "",
  productValuation: 0,
  productSell: mode,
  productCustId: null,
  empId:null
});

//查询员工
const allEmp=()=> {
  api.customer.allEmp().then((response) => {
    if (response.code == 200) {
      data.emplist = response.data.records;
      console.log("加载成功");
    }
  });
}
//下拉菜单的点击事件 获取empId
const getempId = (value)=>{
  data.emplist.forEach(item=>{
    if(item.empId==value){
      console.log(item.empId)
      form.empId = item.empId
    }
  })
}


const unit = [
  {
    value: 1,
    label: "套",
  },
  {
    value: 2,
    label: "间",
  },
  {
    value: 3,
    label: "幢",
  },
  {
    value: 4,
    label: "栋",
  },
];
const options = [
  {
    value: "1 ",
    label: "普通商品房",
  },
  {
    value: "2",
    label: "经济适用房",
  },
  {
    value: "3",
    label: "小产权房",
  },
  {
    value: "4",
    label: "房改房",
  },
  {
    value: "5",
    label: "集资房",
  },
  {
    value: "6",
    label: "廉租房",
  },
  {
    value: "7",
    label: "公租房",
  },
  {
    value: "8",
    label: "安置房",
  },
];
const productTy = [
  {
    value: "平层",
    label: "平层",
  },
  {
    value: "错层",
    label: "错层",
  },
  {
    value: "跃层",
    label: "跃层",
  },
  {
    value: "复式",
    label: "复式",
  },
  {
    value: "loft",
    label: "loft",
  },
];
const productDecorateTy = [
  {
    value: "现代简约风格",
    label: "现代简约风格",
  },
  {
    value: "简欧风格",
    label: "简欧风格",
  },
  {
    value: "宜家风格",
    label: "宜家风格",
  },
  {
    value: "中式风格",
    label: "中式风格",
  },
  {
    value: "欧式风格",
    label: "欧式风格",
  },
  {
    value: "田园风格",
    label: "田园风格",
  },
  {
    value: "地中海风格",
    label: "地中海风格",
  },
  {
    value: "混搭风格",
    label: "混搭风格",
  },
  {
    value: "美式风格",
    label: "美式风格",
  },
  {
    value: "日式风格",
    label: "日式风格",
  },
  {
    value: "东南亚风格",
    label: "东南亚风格",
  },
  {
    value: "新古典风格",
    label: "新古典风格",
  },
];
const productSellTy = [
  {
    value: 1,
    label: "出售",
  },
  {
    value: 2,
    label: "出租",
  },
];
const onClose = () => {
  formRef.value.resetFields();
  emits("update:modelValue", false);
};

//获取图片数据
const uploadRef = ref();

//请求
const imgSRC = ref("http://localhost:8088/Attachment/uploadz");

//添加一条商品
const addProduct = () => {
  // form.productValuation
  formRef.value.validate(async (valid) => {
    if (!valid) return console.log("表单校验不通过");
    addProducts(form).then((res) => {
      if (res.data.productNo != 0) {
        ElMessage({
          message: "添加成功！！！！",
          type: "success",
        });
        imgSRC.value = imgSRC.value + "/" + res.data.productNo;
        uploadRef.value.submit();
        console.log(uploadRef.value);
        fileList.value = [];
        onClose();
        emits("AddData");
      }
    });
  });
};

//接收验证参数
const rules = reactive({
  productName: [{ required: true, message: "请输入产品名称", trigger: "blur" }], //产品名称
  productType: [{ required: true, message: "户型不能为空", trigger: "blur" }], //户型
  houseType: [{ required: true, message: "房子类型不能为空", trigger: "blur" }], //房子类型
  productPrice: [{ required: true, message: "报价不能为空", trigger: "blur" }], //报价
  rentalPrices: [{ required: true, message: "报价不能为空", trigger: "blur" }],
  productAddress: [
    { required: true, message: "房子地址不能为空", trigger: "blur" },
  ], //房子地址
  productDecorateType: [
    { required: true, message: "房子类型不能为空", trigger: "blur" },
  ], //房子类型
  productIntroduce: "", //介绍
  productArea: [{ required: true, message: "面积不能为空", trigger: "blur" }], //面积
});

//测试
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const fileList = ref([]);

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
  console.log(fileList.value);
};

const handleDownload = () => {
  console.log(file);
};

//挂载
onMounted(async () => {
  console.log("-----加载中开始调用查询方法-----");
  getCustIdBycustType();
  console.log(data.CustIdlist);
  allEmp();
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
