<!--  -->
<template>
  <div class="customeRallot">
    <el-dialog
      :model-value="true"
      width="50%"
      title="批量分配"
      @close="onClose"
      close-on-press-escape
    >
      <!-- {{ data.emplist[1] }} -->
      <el-form-item label="请选择">
        <el-select v-model="data.form.region" placeholder="请选中">
          <el-option
            v-for="item in data.emplist"
            :key="item.empId"
            :label="item.employeeDatail.empName"
            :value="item.empId"
          />
        </el-select>
        {{ data.form }}
        {{pObj}}
      </el-form-item>
      <button @click="distribution">确认</button>
      <button>取消</button>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
onMounted(async () => {
  console.log("-----加载中开始调用查询方法-----");
  allEmp();
});
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

const props = defineProps({
  rallot: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => [],
  },
});
const data = reactive({
  form: {
    region: [],
  },
  emplist: [],
});
const pObj = toRefs(props).rowInfo;
const allEmp=()=> {
  api.customer.allEmp().then((response) => {
    if (response.code == 200) {
      data.emplist = response.data.records;
      console.log("加载成功");
    }
  });
}
const distribution = ()=>{
 ElMessageBox.confirm("是否进行批量分配?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // console.log("xixi")
      // console.log(pObj.value)
      // console.log(data.form.region)
      api.customer.updateEmpIdBatchByid(pObj.value,data.form.region).then((response) => {
        if (response.code == 200) {
          // custList.d.splice(custList.d.indexOf(val), 1);
          onClose()
          ElMessage({
            type: "success",
            message: "分配成功",
          });
        } else {
          ElMessage.error("分配失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
}
const emit = defineEmits(["update:rallot","ceshi"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:rallot", false);
  emit("ceshi");
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
