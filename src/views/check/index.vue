<template>
  <!-- title区 -->
  <div>
    <el-icon size="20px"><Stamp /></el-icon>&nbsp;&nbsp;
    <span class="title">审批流程</span>
  </div>

  <!-- 表格区 -->
  <div>
    <el-table :data="flowList.data" style="width: 100%">
      <el-table-column prop="id" label="流程编号" width="180" />
      <el-table-column prop="checkName" label="审批流程名" width="180">
        <template v-slot="scope">
          <el-link type="primary" @click="itemClick(scope.row)">{{
            scope.row.checkName
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="checkDesc" label="审批流程描述" />
      <el-table-column prop="checkCreateTime" label="创建时间" />
    </el-table>
  </div>

  <!-- 抽屉区 -->
  <el-drawer v-model="drawer" title="审核流程" :with-header="false">
    <div>
      <div class="basic-info">基本信息</div>
      <div class="info">
        <span>审批名称</span><span>{{ flowInfo.flowName }}</span>
      </div>
      <div class="info">
        <span>审批说明</span><span>{{ flowInfo.flowDesc }}</span>
      </div>
    </div>

    <div style="margin-top: 70px">
      <div class="basic-info">
        <span>审批人</span>

        <el-button
          type="primary"
          size="small"
          plain
          style="margin-left: 80px"
          @click="saveCheckUser(flowInfo.id)"
          >保存</el-button
        >
      </div>
      <div class="info">
        <template v-for="user in checkUser.data" :key="user.userId">
          <div class="head img-wrap" @mouseenter="cha = true" @mouseleave="cha=false">
            <span class="close" v-show="cha" @click="delCheckUser(user)">&times;</span>
            <el-avatar :size="50" :src="user.head" />
            <div style="text-align: center">{{ user.userName }}</div>
          </div>
          <div class="head">
            <div style="text-align: center;margin-top:20px">---</div>
          </div>
        </template>

        <!-- end 添加审批人-->
        <div class="head">
          <el-button style="border: none;margin-top:20px;" @click="addCheckEmp()"
            ><el-icon size="50px"><CirclePlus /></el-icon
          ></el-button>
          <!-- <el-avatar :size="50" :icon="Stamp"/> -->
        </div>
      </div>
    </div>
  </el-drawer>

  <!-- 选择审批人 dialog框 -->
  <el-dialog
    v-model="dialogVisible"
    title="选择审批人"
    width="600px"
    @close="closeDialog()"
  >
    <!-- -->
    <el-row>
      <el-col :span="4">
        <span>审批人</span>
      </el-col>
      <el-col :span="8">
        <el-select v-model="emp" placeholder="选择审批人" style="width: 240px">
          <!-- <div>
            <el-input
              v-model="searchEmp"
              placeholder="搜索员工"
              clearable
              @input="filterEmp()"
            />
          </div> -->
          <template v-for="emp in empList.data" :key="emp.empId">
            <el-option
              v-show="emp.isShow != 0"
              :label="emp.employeeDatail.empName"
              :value="emp.empId"
            />
          </template>
        </el-select>
      </el-col>
    </el-row>
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
import { Stamp, CirclePlus } from "@element-plus/icons-vue";
import { getAllCheckFlow, getCheckUserByCheckId,updateCheckUser } from "@/api/check/checkFlow";
import { getAllEmp } from "@/api/employee/login";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { ElMessage } from "element-plus";

let cha = ref(false)

let flowList = reactive({ data: [] });
let checkUser = reactive({ data: [] });
let drawer = ref(false);
let flowInfo = reactive({
  id:0,
  flowName: "",
  flowDesc: "",
});
let circleUrl = ref("src/assets/11.png");
let dialogVisible = ref(false);
let empList = reactive({ data: [] }); // 搜索员工列表，从后台获取
let emp = ref();



// 删除审批人
function delCheckUser(user){
  console.log(user.userId)
  checkUser.data.forEach(e=>{
    if(e.userId == user.userId){
      checkUser.data.splice(checkUser.data.indexOf(e),1)
      return ;
    }
  })
}

// 审批人 保存按钮
function saveCheckUser(checkId){
  console.log(checkId)
  let userIds = []
  checkUser.data.forEach(e=>{
    userIds.push(e.userId)
  })
  console.log("保存提交前的数据：",userIds)
  updateCheckUser(checkId,userIds).then(res=>{
    ElMessage.success("保存成功")
  })
}

// dialog 提交后
function submit() {
  dialogVisible.value = false;

  let empInfo = {};
  empList.data.forEach((e) => {
    // 找到选中的用户对象
    if (e.empId == emp.value) {
      empInfo = e;
    }
  });

  // 查询是否已经添加过了
  let flag = true;
  checkUser.data.forEach((e) => {
    if (e.userId == emp.value) {
      flag = false;
      ElMessage.error("不能重复添加。。。");
      return;
    }
  });

  if (flag) {
    checkUser.data.push({
      // 添加到页面的数组里
      userId: empInfo.empId,
      head: empInfo.employeeDatail.empHead,
      userName: empInfo.employeeDatail.empName,
    });
  }
}

// 添加审批人 按钮触发
function addCheckEmp() {
  dialogVisible.value = true;
  // 加载用户信息
  getAllEmp(1, 1000).then((res) => {
    empList.data = res.data.records;
  });
}

// 挂载
onMounted(() => {
  getAllCheckFlow(1, 10).then((res) => {
    flowList.data = res.data.records;
  });
});

// 审核流程名 触发
function itemClick(row) {
  drawer.value = true;
  flowInfo.id = row.id
  flowInfo.flowName = row.checkName;
  flowInfo.flowDesc = row.checkDesc;
  getCheckUserByCheckId(row.id).then((res) => {
    checkUser.data = res.data;
  });
}

//选择审批人 dialog框关闭
function closeDialog() {
  emp.value = "";
}
</script>

<style>
.img-wrap {
    position: relative;
}
.img-wrap .close {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: -8px;
    right: -8px;
    z-index: 100;
    color: #FFF;
    background-color: red;
    border-radius:15px ;
    text-align: center;
}
.head {
  float: left;
  display: inline-block;
  width: 50px;
  height: 50px;

}
.info {
  margin-left: 20px;
  margin-top: 40px;
}
.info > span {
  margin-right: 80px;
}
.basic-info {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-left: 8px;
  padding-left: 10px;
  border-left: 4px solid blue;
  border-radius: 2px;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
</style>