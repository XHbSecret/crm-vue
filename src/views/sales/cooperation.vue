<!--  -->
<template>
  <div class="cooperation">
    <button @click="rallotSwitch">添加协作人</button>
    <el-table :data="data.custList" style="width: 100%">
      <el-table-column
        prop="employee.employeeDatail.empName"
        label="员工名称"
        width="200"
      />
      <el-table-column
        prop="employee.employeeDatail.empPhone"
        label="联系电话"
        width="200"
      />
      <el-table-column
        prop="employee.employeeDatail.empEmail"
        label="邮箱"
        width="200"
      />
      <el-table-column
        prop="employee.employeeDatail.empWechat"
        label="微信"
        width="200"
      />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <!-- handleEdit触发事件：修改此表 -->
          <el-button type="text" size="small" @click="deleteCooperation(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <customeRallot
      v-if="rallot"
      v-model:rallot="rallot"
      :rowInfo="data.formData"
      @ceshi="ceshi"
      :title="title"
      :pd="pd"
    ></customeRallot>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import customeRallot from "../customer/customeRallot.vue";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）
//接收父组件数据
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
//储存数据
let data = reactive({
  custList: [],
  formData: {},
});
//将props中的rowInfo转换为响应式
const pObj = toRefs(props).rowInfo;
//查询方法
function GetContactst() {
  api.customer.getAllAssociates(pObj.value.custId).then((response) => {
    if (response.code == 200) {
      data.custList = response.data.records;
    }
  });
}

//新增协作人的点击事件
const rallot = ref(false);
const title = ref("");
const pd = ref();
const rallotSwitch = () => {
  console.log("新增协作人组件被打开");
  title.value = "协作人";
  rallot.value = true;
  pd.value = 3;
};

//删除一条协作人数据 deleteAssociates
const deleteCooperation = (val) => {
  const assId = val.assId;
  ElMessageBox.confirm("是否删除此协作人?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log("haha");
      api.customer.deleteAssociates(assId).then((response) => {
        if (response.code == 200) {
          GetContactst();
          ElMessage({
            type: "success",
            message: "协作人删除成功",
          });
        } else {
          ElMessage.error("协作人删除失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
};

//回调函数 用于添加完成后刷新页面
const ceshi = () => {
  GetContactst();
};

//加载时调用查询方法 并且data.formData复制父组件传来的数据
onMounted(() => {
  GetContactst();
  data.formData = Object.assign({}, props.rowInfo);
});
</script>
<style lang="scss" scoped></style>
