<!--  -->
<template>
  <div class="cooperation">
    <div >
      <el-button type="warning" @click="addMin" v-if="props.rowInfo.empId ==props.rowInfo.assPrincipal">创建团队</el-button>
      <el-button @click="rallotSwitch" type="primary" v-if="props.rowInfo.empId ==props.rowInfo.assPrincipal">添加团队成员</el-button>
      <!-- <el-button type="primary" @click="rallotSwitch2">转让</el-button> -->
      <el-button type="" @click="jiesan" v-if="props.rowInfo.empId ==props.rowInfo.assPrincipal">解散团队</el-button>
    </div>

    <el-table :data="data.custList" style="width: 100%">
      <el-table-column
        prop="employeeDatail.empName"
        label="员工名称"
        width="200"
      />
      <el-table-column
        prop="employeeDatail.empPhone"
        label="联系电话"
        width="200"
      />
      <el-table-column
        prop="employeeDatail.empEmail"
        label="邮箱"
        width="200"
      />
      <el-table-column
        prop="employeeDatail.empWechat"
        label="微信"
        width="200"
      />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button
            type="text"
            size="small"
            @click="deleteCooperation(row)"
            v-if="props.rowInfo.empId ==props.rowInfo.assPrincipal&& row.employeeDatail.empId != tokempId"
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
import customeRallot from "./customeRallot.vue";
import { useStore } from "vuex";
const store = useStore();
//从token 获取empid
let tokempId = store.state.employee.user.user.empId;
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
  if (data.custList.length == 0) {
    ElMessage.error("请先创建团队在添加协作人");
  } else {
    console.log("新增协作人组件被打开");
    title.value = "协作人";
    rallot.value = true;
    pd.value = 3;
  }
};

// const rallotSwitch2 = () => {
//   if (data.custList.length == 0) {
//     ElMessage.error("您并未创建团队");
//   } else {
//     title.value = "转让团队负责人";
//     rallot.value = true;
//     pd.value = 4;
//   }
// };

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

let addAssociatesVo = reactive({
  empId: props.rowInfo.empId,
  custId: props.rowInfo.custId,
  assPrincipal: props.rowInfo.empId,
});
//添加团队
const addMin = () => {
  api.customer.addAssociateMain(addAssociatesVo).then((response) => {
    if (response.data == 1) {
      ElMessage.error("创建团队失败,请不要重复添加");
    } else {
      GetContactst();
      ElMessage({
        type: "success",
        message: "创建团队成功，快去邀请小伙伴吧",
      });
    }
  });
};
//解散团队
const jiesan = () => {
  const empid = tokempId;
  const custid = props.rowInfo.custId;
  api.customer.deleteAllAssociates(empid, custid).then((response) => {
    if (data.custList.length == 0) {
      ElMessage.error("请先创建团队");
    } else {
      GetContactst();
      ElMessage({
        type: "success",
        message: "解散成功",
      });
    }
  });
};

//回调函数 用于添加完成后刷新页面
const ceshi = () => {
  GetContactst();
};
//监听
const emits = defineEmits(["update:dialogShow", "haha"]);

//加载时调用查询方法 并且data.formData复制父组件传来的数据
onMounted(() => {
  GetContactst();
  data.formData = Object.assign({}, props.rowInfo);
});
</script>
<style lang="scss" scoped></style>
