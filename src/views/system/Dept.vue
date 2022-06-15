<template>
  <div>
    <el-icon size="20px"><UserFilled /></el-icon> &nbsp;&nbsp;
    <span class="title">部门管理</span>

    <!-- 管理角色 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <!-- 左侧 -->
      <el-col :span="6" :offset="0">
        <el-card
          class="box-card"
          shadow="hover"
          :body-style="{ padding: '20px 0px' }"
        >
          <!-- 头部 -->
          <template #header>
            <div class="card-header" style="margin: -5px 0px">
              <span style="font-weight: 600">管理部门</span>
              <el-button
                size="default"
                :icon="CirclePlusFilled"
                type="text"
                class="create-role"
                @click="createDeptBtn()"
                >创建部门</el-button
              >
            </div>
          </template>

          <!-- 角色导航栏 -->
          <el-tree
            :data="deptList.data"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
          />
          <!-- <div class="dept-list" v-for="item in deptList.data" :key="item">
            {{item.deptName}}
          </div> -->
        </el-card>
      </el-col>

      <!-- 右侧 -->
      <el-col :span="6" :offset="0">
        <div class="bg-white right-box">
          <div>
            {{ selectDeptName }}<br><br>
            <el-row>
              <el-col :span="18">
                <template v-if="checkedEmpList.data.length>0">
                  <el-button @click="transferList()">转移部门</el-button>
                </template>
              </el-col>
              <el-col :span="6">
                <el-button @click="delDept()">删除部门</el-button>
                <el-button>修改部门</el-button>{{ selectDeptId }}
              </el-col>
            </el-row>
          </div>
          <el-tabs class="demo-tabs" v-model="activeTab">
            <el-tab-pane label="员工" name="first">
              <!-- 部门下的员工表格  -->
              <el-table
                :data="empList.data"
                :page-size="5"
                style="width: 100%"
                height="350px"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" />
                <el-table-column
                  fixed
                  prop="employeeDatail.empName"
                  label="姓名"
                  width="180"
                />
                <el-table-column
                  prop="employeeDatail.empPhone"
                  label="电话"
                  width="180"
                />
                <el-table-column
                  prop="empCreateTime"
                  label="入职时间"
                  width="180"
                />

                <el-table-column label="状态" width="180">
                  <template v-slot="scope">
                    <span v-if="scope.row.empStatus == 1"
                      ><el-tag class="ml-2" type="success">正常</el-tag></span
                    >
                    <span v-else
                      ><el-tag class="ml-2" type="danger">禁用</el-tag></span
                    >
                  </template>
                </el-table-column>

                <el-table-column
                  prop="employeeDatail.empDescribe"
                  width="180"
                  label="描述"
                />
                <el-table-column fixed="right" width="150px" label="操作">
                  <template v-slot="scope">
                    <el-button
                      :icon="Delete"
                      size="small"
                      type="text"
                      @click="transfer(scope.row)"
                      >转移部门</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <!-- 部门下的员工分页 -->
              <div style="float: right; margin-right: 20px">
                <el-pagination
                  background
                  :page-size="empPage.size"
                  layout="prev, pager, next"
                  :total="empPage.total"
                  @current-change="empHandleCurrentChange"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>

  <!-- 添加部门的 dialog 框 -->
  <el-dialog v-model="addDeptDialog" title="添加部门" width="30%">
    <el-form :model="deptForm.data">
      <el-form-item label="部门名称">
        <el-input
          v-model="deptForm.data.deptName"
          autocomplete="off"
          style="width: 250px"
        />
      </el-form-item>
      <!-- <el-form-item label="上级部门">
        <el-input
          v-model="deptForm.data.deptName"
          autocomplete="off"
          style="width: 250px"
        />
      </el-form-item> -->
      <el-form-item label="部门负责人">
        <el-input
          placeholder="点击选择负责人"
          v-model="deptForm.data.deptEmpName"
          autocomplete="off"
          style="width: 250px"
          :readonly="true"
          @click="selectDeptEmp()"
        />
      </el-form-item>
      <el-form-item label="部门描述">
        <el-input
          v-model="deptForm.data.deptDesc"
          :rows="3"
          type="textarea"
          autocomplete="off"
          style="width: 250px"
        />
      </el-form-item>
    </el-form>
    <!-- 提交和取消按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDeptDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 选择负责人的的dialog框 -->
  <el-dialog
    v-model="dialogVisible_SelectCustomer"
    title="选择客户"
    width="40%"
    draggable
  >
    <!-- 员工表格 -->
    <el-table
      :data="selectEmpList.data"
      :page-size="5"
      style="width: 100%"
      height="280px"
      highlight-current-row
      @current-change="selectHandleCurrentChange"
    >
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
    已选择：{{ selectEmp.empName }}
    <!-- 分页 -->
    <div style="float: right; margin-right: 20px">
      <el-pagination
        background
        :page-size="size"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 取消 确定 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_SelectCustomer = false"
          >取消</el-button
        >
        <el-button type="primary" @click="empConfirm()">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 部门转移 -->
  <el-dialog
    v-model="deptTransferDialog"
    title="重置部门"
    width="40%"
    draggable
  >
    部门：
    <el-select v-model="transferDeptId" class="m-2" placeholder="选择部门">
      <el-option
        v-for="item in deptList.data"
        :key="item.deptId"
        :label="item.deptName"
        :value="item.deptId"
      />
    </el-select>
    <!-- 取消 确定 按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deptTransferDialog = false">取消</el-button>
        <el-button type="primary" @click="transferSubmit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  ArrowDown,
  CirclePlusFilled,
  Lock,
  UserFilled,
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";
import { getAllEmp } from "@/api/employee/login";
import {
  getAllDeptPage,
  getEmpByDeptId,
  addDept,
  delDeptById,
  transferDept,
  transferDeptList,
} from "@/api/system/dept";
import { ElMessage } from "element-plus";
const activeTab = ref("first");
let addDeptDialog = ref(false);
let dialogVisible_SelectCustomer = ref(false);
let deptTransferDialog = ref(false);
let deptList = reactive({ data: [] });
let empList = reactive({ data: [] });
let selectEmpList = reactive({ data: [] });
let transferEmpIdList = reactive({ data: [] });
let transferDeptId = ref(0);
let empPage = reactive({
  page: 1,
  size: 5,
  total: 0,
});
let total = ref(0);
let size = ref(5);
let page = ref(1);
let deptForm = reactive({
  data: {
    deptName: "",
    dpetEmpId: 0,
    deptEmpName: "",
    deptDesc: "",
  },
});
const defaultProps = {
  children: "children",
  label: "deptName",
};

let checkedEmpList = reactive({ data: [] });
// 复选框选中
function handleSelectionChange(data) {
  checkedEmpList.data.length = 0;
  for (let i = 0; i < data.length; i++) {
    checkedEmpList.data.push(data[i].empId);
  }
  console.log(checkedEmpList.data);
}

//部门转移提交按钮
function transferSubmit() {
    console.log(transferEmpIdList.data);
    console.log(transferDeptId.value);
    deptTransferDialog.value = false;
  if(isTransList.value){
    transferDeptList(transferDeptId.value,checkedEmpList.data).then(res=>{
      if (res.data) {
        ElMessage.success("转移成功");
        getEmpListByDeptId(selectDeptId.value);
      } else {
        ElMessage.warning("转移失败list");
      }
    })
  }else{
    transferDept(transferDeptId.value, transferEmpIdList.data[0]).then((res) => {
      if (res.data) {
        ElMessage.success("转移成功");
        getEmpListByDeptId(selectDeptId.value);
      } else {
        ElMessage.warning("转移失败");
      }
    });
  }
  
}

let isTransList = ref(false)
// 批量部门转移按钮
function transferList(row) {
  deptTransferDialog.value = true;
  isTransList.value = true
  transferDeptId.value = selectDeptId.value;
}

// 单个部门转移按钮
function transfer(row) {
  transferEmpIdList.data = [];
  transferEmpIdList.data.push(row.empId);
  deptTransferDialog.value = true;
  transferDeptId.value = selectDeptId.value;
}

// 员工分页 处理
function empHandleCurrentChange(val) {
  empPage.page = val;
  getEmpListByDeptId(selectDeptId.value);
}

// 删除部门
function delDept() {
  delDeptById(selectDeptId.value).then((res) => {
    if (res.data == true) {
      ElMessage.success("删除成功");
      getAllDept();
    } else {
      ElMessage.error("删除失败");
      ElMessage.warning("请确保部门下没有员工");
    }
  });
}

// 添加部门 表单提交
function submitForm() {
  addDeptDialog.value = false;
  console.log(deptForm.data);
  addDept(deptForm.data).then((res) => {
    deptList.data.push(res.data);
  });
}

//负责人 确定
function empConfirm() {
  dialogVisible_SelectCustomer.value = false;
  deptForm.data.deptEmpName = selectEmp.empName;
  deptForm.data.dpetEmpId = selectEmp.empId;
}

let selectEmp = reactive({ empName: "", empId: 0 });
//分页 选中
function selectHandleCurrentChange(obj) {
  console.log(obj);
  if (obj != null && obj.employeeDatail != null) {
    selectEmp.empName = obj.employeeDatail.empName;
    selectEmp.empId = obj.empId;
  }
}

// 负责人 分页
function handleCurrentChange(val) {
  page.value = val;

  getAllEmp(page.value, size.value).then((res) => {
    // 获取所有的用户信息
    selectEmpList.data = res.data.records;
    total.value = res.data.total;
    size.value = res.data.size;
  });
}

// 部门负责人点击后 分页显示员工，选择
function selectDeptEmp() {
  dialogVisible_SelectCustomer.value = true;
  // 加载用户数据，分页显示
  getAllEmp(page.value, size.value).then((res) => {
    // 获取所有的用户信息
    selectEmpList.data = res.data.records;
    total.value = res.data.total;
    size.value = res.data.size;
  });
}

// 创建部门按钮
function createDeptBtn() {
  addDeptDialog.value = true;
}

let selectDeptId = ref(0);
let selectDeptName = ref("");
// 处理部门点击
function handleNodeClick(node) {
  selectDeptId.value = node.deptId;
  selectDeptName.value = node.deptName;
  getEmpListByDeptId(selectDeptId.value);
}

// 查询所有部门
function getAllDept() {
  getAllDeptPage(1, 10).then((res) => {
    deptList.data = res.data.records;
    selectDeptId.value = res.data.records[0].deptId;
    selectDeptName.value = res.data.records[0].deptName;
    getEmpListByDeptId(selectDeptId.value);
  });
}

function getEmpListByDeptId(deptId) {
  getEmpByDeptId(deptId, empPage.page, empPage.size).then((res) => {
    empList.data = res.data.records;
    empPage.total = res.data.total;
  });
}

// 挂载
onMounted(() => {
  getAllDept();
  // getEmpListByDeptId(selectDeptId.value);
});
</script>



<script>
export default {
  // 加载背景颜色
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
<style scoped>
.dept-list {
  margin-left: 20px;
  margin-bottom: 20px;
}
.right-box {
  width: 900px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.active {
  background-color: #f6f8fa;
  border-left: 2px solid red;
}
.click-none {
  background-color: #fff;
  border-left: 0px solid #fff;
}
.line {
  height: 40px;
  /* border-left: 2px solid red; */
  top: 40px;
  left: 180px;
  padding-left: 18px;
}
.text {
  font-size: 14px;
}
.item {
  height: 40px;
  line-height: 40px;
  /* margin-bottom: 18px; */
  color: #333;
  font-size: 13px;
}
.item:hover {
  background-color: #f6f8fa;
}
.item.active {
  background-color: #f6f8fa;
}
.create-role {
  font-size: 13px;
  font-weight: 400;
  float: right;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
.bg-white {
  background-color: #fff;
}
</style>