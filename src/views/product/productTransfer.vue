<!-- 这是商品转移组件 -->
<template>
  <div class="Transfer">
    <el-dialog
      :model-value="true"
      width="50%"
      :title="title"
      @close="onClose"
      close-on-press-escape
    >
      这是商品转移组件
      {{ data.formData.empId }}
      <el-form-item label="请选择">
        <el-select
          ref="count"
          v-model="data.formData.empId"
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
      <button @click="distribution">确认</button>
      <button @click="onClose">取消</button>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  updateProduct
} from "@/api/system/product";
onMounted(async () => {
  console.log("-----加载中开始调用查询方法-----");
  allEmp();
});
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  rallot: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => [],
  },
});
//获取empid
const allEmp = () => {
  api.customer.allEmp().then((response) => {
    if (response.code == 200) {
      data.emplist = response.data.records;
      console.log("加载成功");
    }
  });
};
//下拉菜单的点击事件 获取empId
const getempId = (value) => {
  data.emplist.forEach((item) => {
    if (item.empId == value) {
      console.log(item.empId);
      data.formData.empId = item.empId;
    }
  });
};
const data = reactive({
    formData:{},
    emplist: [],
});

const distribution =()=>{
    updateProduct(data.formData).then(() => {
    ElMessage({
      message: "转让成功！！！！",
      type: "success",
    });
    onClose();
  });
}
const emit = defineEmits(["update:rallot"],"gbDraw");
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:rallot", false);
  emit("gbDraw")
};
onMounted(() => {
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  allEmp();
});
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
