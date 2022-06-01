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
        <el-input placeholder="请输入姓名" class="input-with-select">
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
          @selection-change="handleSelectionChange"
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
import { reactive, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getAllEmp } from "@/api/employee/login";
const emits = defineEmits(["update:modelValue"]);
const tableDatas = reactive({ datas: [] });
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

function handClose() {
  emits("update:modelValue", false);
}

function getEmp() {
  getAllEmp(pagePlugs.data.currentPage, pagePlugs.data.pageSize).then(
    (response) => {
      tableDatas.datas = response.data.records;
      pagePlugs.data.total = response.data.total;
      console.log(tableDatas.datas);
    }
  );
}
function handleSelectionChange(val) {}
// 分页函数
function handleSizeChange(val) {
  pagePlugs.data.pageSize = val;
  getAllEmp();
}
function handleCurrentChange(val) {
  pagePlugs.data.currentPage = val;
  getAllEmp();
}
</script>

<style>
</style>