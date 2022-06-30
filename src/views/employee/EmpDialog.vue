<template>

    <!-- 部门 -->
    <el-radio-group v-model="deptId" class="ml-4" @change="deptChange">
        <el-radio :label="0" size="large"> 全部</el-radio>
      <template v-for="item in deptList.data" :key="item">
         <el-radio :label="item.deptId" size="large"> {{item.deptName}}</el-radio>
      </template>
    </el-radio-group>

    <!-- 用户名搜索 -->
  <el-row class="row-margin">
    <el-input
        v-model="searchContent"
        placeholder="请输入姓名/电话"
        class="input-with-select"
      >
        <template #append>
          <el-button type="primary" :icon="Search" @click="searchLike()"/>
        </template>
    </el-input>
  </el-row>
    

    <!-- 员工表格 -->
    <el-table
      :data="selectEmpList.data"
      :page-size="5"
      style="width: 100%"
      height="280px"
      highlight-current-row
      @selection-change="selectHandleCurrentChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        fixed
        prop="employeeDatail.empName"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="employeeDatail.empPhone"
        label="电话"
        width="120"
      />
      <el-table-column prop="dept.deptName" label="部门" width="180">
        <template v-slot="scope">
          <span v-if="scope.row!=null && scope.row.dept!=null">
            <span >{{scope.row.dept.deptName}}</span>
            <el-tag v-if="scope.row.dept.dpetEmpId == scope.row.empId">负责人</el-tag>
          </span>
      </template>
      </el-table-column>
      <el-table-column prop="empCreateTime" label="入职时间" width="180" />

      <el-table-column label="状态" width="120">
        <template v-slot="scope">
          <span v-if="scope.row.empStatus == 1"
            ><el-tag class="ml-2" type="success">正常</el-tag></span
          >
          <span v-else><el-tag class="ml-2" type="danger">禁用</el-tag></span>
        </template>
      </el-table-column>

      <el-table-column
        prop="employeeDatail.empDescribe"
        width="180"
        label="描述"
      />
    </el-table>
    <!-- 已选择：{{ selectEmp.empName }} -->
    <!-- 分页 -->
    <div style="float: right; margin-right: 20px">
      <el-pagination
        background
        :page-size="page.size"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="handleCurrentChange"
      />
    </div>
</template>

<script setup>

import { getAllEmp } from "@/api/employee/login";
import { onMounted, reactive, toRaw ,ref} from "@vue/runtime-core";
import {getAllDeptPage} from "@/api/system/dept";
import {search2 } from "@/api/employee/login";
import {
  Search,
} from "@element-plus/icons-vue";
const emit = defineEmits(["checked"])
const props = defineProps(["roleId"]);
let selectEmpList = reactive({ data: [] });
let page = reactive({
    currentPage:1,
    size:5,
    total:0
})
let deptList = reactive({data:[]})
let deptId = ref(0)
let searchContent = ref("")

// 搜索
// 用户名搜索
let searchVo = reactive({
  deptId : deptId.value,
  empName : searchContent.value,
  empPhone : null,
  currentPage : page.currentPage,
  size : page.size,
})
function searchLike(){
  searchVo.deptId = deptId.value
  searchVo.empName = searchContent.value
  searchVo.currentPage = page.currentPage
  searchVo.size = page.size
  console.log("部门id：",deptId.value," 搜索内容:",searchContent.value)
  console.log(searchVo)

  search2(searchVo).then(res=>{
    selectEmpList.data = res.data.records
    page.total = res.data.total;
  })
}

// 部门改变
function deptChange(val){
  console.log(val)
}

// 加载所有部门
function getAllDept(){
  getAllDeptPage(1,100).then(res=>{
    if(res.data!=null && res.data.records.length>0){
      deptList.data = res.data.records
    }
  })
}

//分页 选中
function selectHandleCurrentChange(obj) {
  console.log(obj);
  let data = toRaw(obj)
  // console.log(data)
  emit("checked",data)
  // if (obj != null && obj.employeeDatail != null) {
  //   selectEmp.empName = obj.employeeDatail.empName;
  //   selectEmp.empId = obj.empId;
  // }
}

// 负责人 分页
function handleCurrentChange(val) {
  page.currentPage = val;

  getAllEmp(page.currentPage, page.size).then((res) => {
    // 获取所有的用户信息
    selectEmpList.data = res.data.records;
    page.total = res.data.total;
    page.size = res.data.size;
  });
}

onMounted(()=>{
  getAllDept()
  // 加载用户数据，分页显示
  getAllEmp(page.currentPage, page.size).then((res) => {
    // 获取所有的用户信息
    selectEmpList.data = res.data.records;
    page.total = res.data.total;
    page.size = res.data.size;
  });
})

</script>

<style>

</style>