<!-- 员工dialog -->
<template>
  <el-dialog
    :model-value="dialogVisible_emp"
    title="选择员工"
    width="60%"
    draggable
    @close="handClose"
  >
    <el-row class="row-margin">
      <el-col :span="8">
        <el-input
          placeholder="请输入姓名"
          class="input-with-select"
          v-model="searchContent.empName"
          clearable
        >
          <template #append>
            <el-button type="primary" :icon="Search" @click="searchLike()" />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          style="width: 100%"
          :data="tableDatas.datas"
          height="350"
          :page-size="5"
          ref="multipleTable"
          @selection-change="selectionChange"
          @select-all="selectAll"
          :row-key="empId"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            fixed
            label="姓名"
            width="120"
            prop="employeeDatail.empName"
          />
          <el-table-column
            label="电话"
            width="180"
            prop="employeeDatail.empPhone"
          />
          <el-table-column prop="empCreateTime" label="入职时间" width="180" />
          <el-table-column label="描述" prop="employeeDatail.empDescribe" />
        </el-table>
        <br />
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
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getAllEmp, search } from "@/api/employee/login";

let searchContent = reactive({ empName: "" });
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  emplist: {
    type: Object,
    default: {},
  },
});
const tableDatas = reactive({ datas: [] });
const multipleTable = ref(null);
const emplist = reactive({ data: [] });

let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});
onMounted(() => {
  getEmp();
});
function searchLike() {
  let content = searchContent.empName.replace(" ", "");
  if (content == "") {
    content = "all";
  }
  search(content, pagePlugs.data.currentPage, pagePlugs.data.pageSize).then(
    (res) => {
      tableDatas.datas = res.data.records;
      pagePlugs.data.total = res.data.total;
    }
  );
}
function handClose() {
  emits("update:modelValue", false);
}
// 获取员工
function getEmp() {
  getAllEmp(pagePlugs.data.currentPage, pagePlugs.data.pageSize).then(
    (response) => {
      tableDatas.datas = response.data.records;
      pagePlugs.data.total = response.data.total;
      console.log(tableDatas.datas);
    }
  );
}

function addOpps() {
  emits("update:modelValue", false);
  emits("getEmpList", emplist.data);
}
function selectionChange(selection, row) {
  if (selection.length == 1) {
    emplist.data = selection[0];
  } else if (selection.length > 1) {
    emplist.data = selection[1];
    let del_row = selection.shift();
    multipleTable.value.toggleRowSelection(del_row, false);
  }
  console.log(emplist.data);
}
function selectAll(selection) {
  if (selection.length > 1) {
    selection.length = 1;
  }
}
// 分页函数
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getAllEmp();
}
function handleCurrentChange(val) {
  pagePlugs.data.currentPage = val;
  getAllEmp();
}
watch(
  () => props.emplist,
  () => {
    console.log(props.emplist);
    props.emplist = tableDatas.datas;
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
:deep(.el-table__header-wrapper .el-checkbox) {
  display: none;
}
</style>