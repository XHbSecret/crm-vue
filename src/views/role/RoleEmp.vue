<template>
  <!-- 关联员工按钮 -->
  <el-row>
    <el-col :span="24">
      <el-button
        type="warning"
        style="float: right; background-color: #ff6a00"
        @click="relationEmp()"
        >关联员工</el-button
      >
    </el-col>
  </el-row>

  <!-- 关联员工表格 -->
  <el-row style="margin-top: 10px; margin-left: -10px">
    <el-col :span="24">
      <el-table :data="props.empList" height="400px" style="width: 100%">
        <el-table-column
          prop="employeeDatail.empName"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="employeeDatail.empAge"
          label="年龄"
          width="180"
        />
        <el-table-column prop="employeeDatail.empDescribe" label="描述" />
        <el-table-column prop="employeeDatail.empDescribe" label="操作" >
          <template v-slot='scope'>
            <el-icon size="20px" color='#2362fb' @click="delEmpBtn(scope.row.empId)"><DeleteFilled /></el-icon>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

    </el-col>
  </el-row>

  <!-- 分页 -->
  <!-- <el-row>
    <el-col :span="24" :offset="8"  >
     <div style="margin-bottom:20px">
          <el-pagination
          pager-count="3"
          v-model:currentPage="currentPage4"
          v-model:page-size="page.size"
          :small="small"
          :disabled="disabled"
          background
          layout="prev,pager,next"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
     </div>
    </el-col>
  </el-row> -->

  <!-- 关联员工dialog框 -->
  <el-dialog v-model="dialogVisible" title="关联员工"  @close="closeDialog()" width="600px">
    <!-- 选择关联的用户 -->
    <el-row>
      <el-col :span="4">
        <!-- <span>关联员工：</span> -->
      </el-col>
      <el-col :span="8">
        
        <!-- <el-select
          v-model="empIds"
          multiple
          placeholder="选择员工"
          style="width: 240px"
        >
          <div>
            <el-input v-model="searchEmp" placeholder="搜索员工" clearable @input="filterEmp()"/>
          </div>
         <template v-for="emp in empList.data" :key="emp.empId">
            <el-option
              v-show="emp.isShow!=0"
              :label="emp.employeeDatail.empName"
              :value="emp.empId"
            />
         </template>
        </el-select> -->
      </el-col>
    </el-row>
    <EmpDialog :roleId="props.roleId" @checked="selectEmpCom"/>
    <!-- 提交和取消按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRaw } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
import {getAllEmp} from "@/api/employee/login";
import {addEmpRole,getEmpByRoleId,delEmp} from "@/api/system/role";
import { ElMessage } from "element-plus";
import {DeleteFilled} from "@element-plus/icons-vue";
import EmpDialog from '../employee/EmpDialog.vue'


const props = defineProps(["empList","roleId"]);
let dialogVisible = ref(false); // 关联员工显示框
let empIds = ref([]);
let searchEmp = ref("")

let empList = reactive({data:[]});     // 搜索员工列表，从后台获取
let page = reactive({currentPage:1,size:5,total:0})

const emit = defineEmits(['flushEmp'])

let comCheckedEmpList = reactive({data:[]})
// 子组件传递过来的触发事件（选择的用户）
function selectEmpCom(data){
  console.log("传递过来的阐述")
  empIds.value = []
  for(let i=0;i<data.length;i++){
    empIds.value.push(data[i].empId)
  } 
  console.log(empIds.value)

}

// 挂载： 加载用户信息
onMounted(() => {});

// 删除员工
function delEmpBtn(empId){
  console.log("empId = ",empId,"roleId = ",props.roleId)
  let empRole = {empId:empId,roleId:props.roleId}
  delEmp(empRole).then(res=>{
    if(res.code == 200 && res.data == true){
      ElMessage.success("删除成功")
      emit("flushEmp",props.roleId)
    }
  })
}


// 监视props.empList 
// let empListC = computed({ 
//   get(){return props.empList },
//   set(value){empListC = value}
// })


// watch(props.empList,(newValue,oldValue)=>{
//   console.log("xixi")
//   console.log(newValue)
//   // empList.data = newValue.empList;
// })



// 关联员工按钮触发
function relationEmp(){
  dialogVisible.value = true
    empIds.value = []
  // 加载用户信息
  getAllEmp(1,1000).then(res=>{
    empList.data = res.data.records
  })
}

// 搜索过滤员工 
function filterEmp(){
  empList.data.forEach( (item,index) => {
    if(item.empName.indexOf(searchEmp.value)>-1) {
      empList.data[index].isShow = 1
    }else{
    empList.data[index].isShow = 0  
    }
  })
}

// 关联员工 提交
function submit() {
  dialogVisible.value = false;
  addEmpRole(props.roleId,empIds.value).then(res=>{
    ElMessage.success("添加成功")
    emit("flushEmp",props.roleId)
  })
}

//关闭dialog框
function closeDialog(){
  empIds.value = [] // 清空选择
}
</script>

<style>
</style>