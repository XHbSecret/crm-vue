<template>
  <el-dialog
    :model-value="dialogVisible"
    title="变更负责人"
    width="45%"
    :before-close="handleClose"
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
        <el-button type="info" @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="editOpps()">确认</el-button>

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
import { reactive, onMounted, ref, watch,defineProps,defineEmits } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getAllEmp, search } from "@/api/employee/login";
import { editSales } from "@/api/sales/index";
import { ElMessage, ElMessageBox } from "element-plus";

let searchContent = reactive({ empName: "" });
const emits = defineEmits(["update:modelValue", "updateData"]);
const props = defineProps({
  emplist: {
    type: Array,
    default: [],
  },
});
const tableDatas = reactive({ datas: [] });
const multipleTable = ref(null);
const emplist = reactive({ data: [] });
const emplists = reactive({ data: [] });
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

function handleClose() {
  multipleTable.value.clearSelection();
  emits("update:modelValue", false);
  emits("updateData");
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

function editOpps() {
  ElMessageBox.confirm("你确认要变更这些商机的负责人吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning ",
  })
    .then(() => {
      editSales(emplist.data.empId, emplists.data).then(() => {
        ElMessage({
          message: "变更成功！！！！",
          type: "success",
        });
        handleClose();
      });
    })
    .catch(() => {
      ElMessage.info("取消转移");
    });
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
    emplists.data = props.emplist;
    console.log(emplists.data);
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
:deep(.el-table__header-wrapper .el-checkbox) {
  display: none;
}
</style>