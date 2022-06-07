<template>
  <el-dialog
    :model-value="dialogVisible_cust"
    @close="handClose"
    title="选择客户"
    width="60%"
    draggable
  >
    <el-row class="row-margin">
      <el-col :span="10">
        <el-input
          placeholder="请输入关键字"
          clearable
          v-model="customers.custName"
        >
          <template #append>
            <el-button type="primary" :icon="Search" @click="searchLike()" />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.cust"
      stripe
      style="width: 100%"
      height="350"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      ref="multipleTable"
      @selection-change="selectionChange"
      @select-all="selectAll"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        fixed
        label="客户名称"
        width="120"
        prop="customerDetail.custDetailName"
        sortable
      >
      </el-table-column>
      <el-table-column prop="custCreateTime" label="创建时间" sortable />
      <el-table-column
        prop="custType"
        label="客户类型"
        sortable
        :formatter="cuType"
      />
      <el-table-column
        prop="customerDetail.custDetailPhone"
        label="电话"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailWechat"
        label="微信"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailJob"
        label="客户行业"
        sortable
      />
    </el-table>
    <el-button type="info" @click="handClose()">取消</el-button>
    <el-button type="primary" @click="addOpps()">添加</el-button>
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="pagePlugs.data.currentPage"
      v-model:page-size="pagePlugs.data.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagePlugs.data.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="float: right; height: 60px; line-height: 60px"
    />
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { findCust } from "@/api/sales/index";
import { CustomerSearch } from "@/api/customer/index";
import { Search } from "@element-plus/icons-vue";
import { useStore } from "vuex";
const multipleTable = ref(null);

const emits = defineEmits(["update:modelValue", "getCust"]);
const props = defineProps({
  custlist: {
    type: Object,
    default: {},
  },
});
const store = useStore();
//从token 获取empid
let empId = store.state.employee.user.user.empId;
console.log("empId =  ", empId);
const customers = reactive({
  empId: empId,
  custName: "",
});
const tableData = reactive({ cust: [] });
const custList = reactive({ data: [] });
let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});

onMounted(() => {
  findCusts();
});
function searchLike() {
  findCusts();
}
function handClose() {
  emits("update:modelValue", false);
}
function addOpps() {
  handClose();
  emits("getCust", custList.data);
}
function findCusts() {
  CustomerSearch(
    pagePlugs.data.currentPage,
    pagePlugs.data.pageSize,
    customers
  ).then((res) => {
    if (res.code == 200) {
      console.log("xixi");
      tableData.cust = res.data.records;
      pagePlugs.data.total = res.data.total;
      console.log(tableData.cust);
      console.log(res.data);
      console.log("-----查询方法调用结束-----");
    }
  });
}

function selectionChange(selection, row) {
  if (selection.length == 1) {
    custList.data = selection[0];
  } else if (selection.length > 1) {
    custList.data = selection[1];
    let del_row = selection.shift();
    multipleTable.value.toggleRowSelection(del_row, false);
  }
  console.log(custList.data);
}
function selectAll(selection) {
  if (selection.length > 1) {
    selection.length = 1;
  }
}

watch(
  () => props.custlist,
  () => {
    console.log(props.custlist);
    props.custlist = tableData.cust;
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
:deep(.el-table__header-wrapper .el-checkbox) {
  display: none;
}
</style>