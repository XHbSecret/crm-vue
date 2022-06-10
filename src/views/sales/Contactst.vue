<!--  -->
<template>
  <div class="Contactst">
    <button @click="addlxr">添加联系人</button>
    <el-table :data="data.custList" style="width: 100%">
      <el-table-column prop="contactName" label="联系人姓名" width="200" />
      <el-table-column prop="contactPhone" label="联系人电话" width="200" />
      <el-table-column
        prop="contactIsPolicy"
        :formatter="IsPolicy"
        label="是否决策人"
        width="200"
      />
      <el-table-column
        prop="contactRelation"
        :formatter="Relation"
        label="与客户的关系"
        width="200"
      />
      <el-table-column prop="contractDesc" label="客户联系人备注" width="200" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <!-- handleEdit触发事件：修改此表 -->
          <el-button type="text" size="small" @click="updateContactst(row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteContactst(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <addlxrs
      :title="addName"
      :rowInfo="rowInfo"
      :custId="custId"
      @addCustomerList="addCustomerList"
      v-if="addCustomer"
      v-model:addCustomer="addCustomer"
    ></addlxrs>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import addlxrs from "../customer/addCustomer.vue";
import { ElMessage, ElMessageBox } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

//挂载 点击时加载
onMounted(() => {
  GetContactst();
});
const addCustomer = ref(false);
const addName = ref("");
const rowInfo = ref({});
const custId = ref();
const addlxr = () => {
  addCustomer.value = true;
  addName.value = "新增";
  custId.value = pObj.value.custId;
  rowInfo.value = {};
};
const updateContactst = (val) => {
  addCustomer.value = true;
  addName.value = "修改";
  rowInfo.value = val;
};
//接收父组件的值
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const pObj = toRefs(props).rowInfo;
//定义分页初始值
const pagePlugs = reactive({
  page: 1,
  size: 5,
});
let data = reactive({
  custList: [],
});
//当添加联系人插件点击保存时 调用父组件查询方法
const addCustomerList = () => {
  GetContactst();
};
function GetContactst() {
  api.customer
    .selectContacts(pagePlugs.page, pagePlugs.size, pObj.value.custId)
    .then((response) => {
      if (response.code == 200) {
        data.custList = response.data.records;
      }
    });
}
const deleteContactst = (row) => {
  console.log(row);
  ElMessageBox.confirm("确认删除吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      api.customer.deleteCustomer(row.contactId).then((response) => {
        if (response.code == 200) {
          GetContactst();
          ElMessage({
            type: "success",
            message: "删除添加",
          });
        } else {
          ElMessage.error("删除失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      // catch error
    });
};

//是否决策人
function IsPolicy(rew, column) {
  let IsPolicy = rew.contactIsPolicy;
  if (IsPolicy == 0) {
    return "是";
  } else if (IsPolicy == 1) {
    return "否";
  }
}
//与客户关系
function Relation(rew, column) {
  let Relation = rew.contactRelation;
  if (Relation == 1) {
    return "亲戚";
  } else if (Relation == 2) {
    return "家属";
  } else if (Relation == 3) {
    return "朋友";
  } else if (Relation == 4) {
    return "同事";
  } else if (Relation == 5) {
    return "其他";
  }
}
defineExpose({
  addlxr,
});
</script>
<style></style>
