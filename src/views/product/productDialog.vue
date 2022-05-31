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
            <el-input v-model="form.productType" />
          </el-form-item>
          <el-form-item label="房子类型" prop="houseType">
            <el-select
              placeholder="请选择类型"
              v-model="form.houseType"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="报价" prop="productPrice">
            <el-input v-model="form.productPrice" />
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
          <el-form-item label="装修类型" prop="productDecorateType">
            <el-input v-model="form.productDecorateType" />
          </el-form-item>
          <el-form-item label="介绍" prop="productIntroduce">
            <el-input type="textarea" v-model="form.productIntroduce" />
          </el-form-item>
          <el-form-item label="面积" prop="productArea">
            <el-input v-model="form.productArea" />
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
            <!--  :on-remove="handleRemove" -->
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
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import {
  Search,
  Plus,
  Delete,
  Download,
  ZoomIn,
} from "@element-plus/icons-vue";
const emits = defineEmits(["update:modelValue", "updateDate"]);

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
});

//转为响应式
const Tittle = toRefs(props).dialogTittle;

//useStore 获取store
const store = useStore();
//图片携带token
let getToken = store.state.employee.token;
const headers = { token: getToken };
//获取表单的ref中的数据
const formRef = ref();
//接收表单输入的数据
const form = reactive({
  productName: "",
  productType: "",
  houseType: "",
  productPrice: "",
  productStatus: "",
  productAddress: "",
  productIntroduce: "",
  productArea: "",
});
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
const onClose = () => {
  formRef.value.resetFields();
  emits("update:modelValue", false);
};

//获取图片数据
const uploadRef = ref();

//请求
const imgSRC = ref("http://localhost:8088/Attachment/uploadz")

//添加一条商品
const addProduct = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return console.log("表单校验不通过");
    addProducts(form).then((res) => {
      console.log("============")
      console.log(res.data)
      console.log(res.data.productNo)
      console.log("============")
      if(res.data.productNo!=0){
      ElMessage({
        message: "添加成功！！！！",
        type: "success",
      });
      imgSRC.value=imgSRC.value+"/"+res.data.productNo
      uploadRef.value.submit();
      console.log(uploadRef.value)
      fileList.value=[]
      onClose();
      emits("updateDate");
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
  productStatus: "", //产品状态  是否上架
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
