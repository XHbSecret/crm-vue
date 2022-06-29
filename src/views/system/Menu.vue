<template>
  <!-- 搜索区域 -->
  <el-form :model="updateForm" :inline="true">
    <el-form-item label="菜单名称" prop="menuName" class="searchTitle">
      <el-input v-model="searchContent" placeholder="请输入菜单名称" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :icon="Search"
        size="small"
        @click="searchByMenuName()"
        >搜索</el-button
      >
    </el-form-item>
  </el-form>

  <!-- 添加菜单 -->
  <el-button type="primary" plain class="textSize" @click="showAdd(false)"
    v-show="$store.state.employee.perms.indexOf('menu/add')==-1?false:true"
    >添加菜单</el-button
  >

  <!-- 表格 -->
  <el-table
    :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
    table-layout="fixed"
    :data="menus.tree"
    style="width: 100%; margin-bottom: 20px; margin-top: 20px"
    class="tableBox"
    row-key="menuId"
    lazy
    element-loading-text="数据拼命加载中"
    :tree-props="{ children: 'childMenuList', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="menuName" label="菜单名称" sortable width="200px" />
    <!-- <el-table-column prop="menuIcon" label="图标" width="100px" /> -->
    <el-table-column prop="menuPerms" label="权限标识" />
    <el-table-column prop="menuComponent" label="组件路径" />
    <el-table-column prop="menuPath" label="路由地址" width="180px" />
    <el-table-column label="状态" sortable width="100px">
      <template v-slot="scope">
        <el-tag v-if="scope.row.menuStatus === 1">正常</el-tag>
        <el-tag v-else class="ml-2" type="warning">禁止</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="menuCreateTime"
      label="创建时间"
      sortable
      width="180px"
    />
    <el-table-column label="操作">
      <template v-slot="scope">
        <el-button
          :icon="Plus"
          size="small"
          type="text"
          @click="showAdd(scope.row)"
           v-show="$store.state.employee.perms.indexOf('menu/add')==-1?false:true"
          >添加</el-button
        >
        <el-button
          :icon="Edit"
          size="small"
          type="text"
          @click="showUpdMenu(scope.row)"
          >修改</el-button
        >
        <el-button
          :icon="Delete"
          size="small"
          type="text"
          @click="delMenu(scope.row, scope.$index)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 添加菜单 dialog框-->
  <el-dialog v-model="isAdd" title="添加菜单" width="50%">
    <el-form
      :model="addForm"
      label-width="100px"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="上级菜单">
        <el-col :span="22">
          <el-input disabled v-model="addForm.parentMenu" />
        </el-col>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="addForm.menuType" prop="menuType">
          <el-radio label="M">目录</el-radio>
          <el-radio label="C">菜单</el-radio>
          <el-radio label="B">按钮</el-radio>
        </el-radio-group>
        &nbsp;&nbsp;&nbsp;&nbsp;
         <el-tooltip
            class="box-item"
            effect="dark"
            content="目录：一级目录； 菜单：二级三级等目录；  按钮：普通按钮"
            placement="top-start"
          >
             <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
      </el-form-item>

      <el-form-item label="菜单名称" prop="menuName">
        <el-col :span="9">
          <el-input v-model="addForm.menuName" />
        </el-col>
      </el-form-item>

      <el-form-item label="路由地址">
        <el-col :span="9">
          <el-input v-model="addForm.menuPath" />
        </el-col> &nbsp;
          <el-tooltip
            class="box-item"
            effect="dark"
            content="示例：/abc（/必须有）"
            placement="top-start"
          >
             <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        <el-form-item label="路由组件" label-width="120px">
          <el-input v-model="addForm.menuComponent" style="width: 232px" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="权限字符" prop="menuPerms">
        <el-col :span="9">
          <el-input v-model="addForm.menuPerms" />
        </el-col>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select
          :teleported="false"
          v-model="addForm.roleId"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in roleList.data"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="菜单状态">
        <el-radio-group v-model="addForm.menuStatus">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item >
        <el-button type="primary" class="btns">添加</el-button>
        <el-button class="btns">取消</el-button>
      </el-form-item> -->
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addMenu()">添加</el-button>
        <el-button type="primary" @click="isAdd = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改菜单 dialog框-->
  <el-dialog v-model="isShowUpd" title="修改菜单" width="50%">
    <el-form
      :model="updateForm"
      label-width="100px"
      :rules="rules"
      ref="ruleFormRef"
    >
      <el-form-item label="上级菜单">
        <!-- <el-col :span="20"> -->
        <el-tree-select
          style="width: 585px"
          :teleported="false"
          v-model="updateForm.menuParentId"
          :props="defaultProps"
          :data="updateMenus.tree"
          accordion
          check-strictly
        />
        <!-- </el-col> -->
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="updateForm.menuType" prop="menuType">
          <el-radio label="M">目录</el-radio>
          <el-radio label="C">菜单</el-radio>
          <el-radio label="B">按钮</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单名称" prop="menuName">
        <el-col :span="9">
          <el-input v-model="updateForm.menuName" />
        </el-col>
      </el-form-item>

      <el-form-item label="路由地址">
        <el-col :span="9">
          <el-input v-model="updateForm.menuPath" />
        </el-col>
        <el-form-item label="路由组件" label-width="120px">
          <el-input v-model="updateForm.menuComponent" style="width: 232px" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="权限字符" prop="menuPerms">
        <el-col :span="9">
          <el-input v-model="updateForm.menuPerms" />
        </el-col>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select
          :teleported="false"
          v-model="updateForm.roleId"
          multiple
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in roleList.data"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="菜单状态">
        <el-radio-group v-model="updateForm.menuStatus">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateMenu()">修改</el-button>
        <el-button type="primary" @click="isShowUpd = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, toRaw } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "vue"; // 导入实例
import { ElMessage } from "element-plus";
import {
  QuestionFilled,
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // 找到api
let menus = reactive({ tree: [] });

let searchContent = ref("");
let isExpand = ref(false);
let isAdd = ref(false);
let isShowUpd = ref(false);
const ruleFormRef = ref(null);
let roleList = reactive({ data: [] });
let addForm = reactive({
  parentMenu: "主目录", // 父菜单
  menuType: "", // 菜单类型
  menuStatus: 1, // 菜单状态
  menuName: "", // 菜单名称
  menuPath: "", // 路由地址
  menuComponent: "", // 路由组件
  menuPerms: "", //权限字符
  menuParentId: 0,
  roleId: [],
});

let updateForm = reactive({
  menuId: 0,
  parentMenu: "", // 父菜单
  menuType: "", // 菜单类型
  menuStatus: 1, // 菜单状态
  menuName: "", // 菜单名称
  menuPath: "", // 路由地址
  menuComponent: "", // 路由组件
  menuPerms: "", //权限字符
  menuParentId: 0,
  roleId: [], // 角色ids
});

// 挂载
onMounted(() => {
  getMenus();
});

// 获取所有菜单 M B C
function getMenus() {
  api.menu
    .getAllMenu() // 使用接口，调用
    .then((response) => {
      // 响应对象
      console.log(response.data);
      menus.tree = response.data;
      // console.log(response)
    });
}

// 显示添加dialog
function showAdd(menu) {
  if (menu != false) {
    // 某一行触发的
    addForm.menuParentId = menu.menuId;
    addForm.parentMenu = menu.menuName;
  } else {
    // 按钮触发的
    addForm.menuParentId = 0;
    addForm.parentMenu = "主目录";
  }
  isAdd.value = true;

  if (roleList.data.length <= 0) {
    console.log("去请求角色了。。。");
    getRole();
  }
}

// 获取角色 信息
function getRole() {
  api.role.getAllRole().then((response) => {
    if (response.code == 200) {
      roleList.data = response.data;
    }
  });
}

// 添加菜单 表单提交
function addMenu() {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    isAdd.value = false;
    api.menu.addMenu(addForm).then((response) => {
      if (response.code == 200) {
        menus.tree = response.data;
        ElMessage({ showClose: true, message: "添加成功", type: "success" });
      }
    });
  });
}

// 删除
function delMenu(menu, index) {
  api.menu.delMenu(menu.menuId).then((response) => {
    if (response.code == 200 && response.data.length > 0) {
      menus.tree = response.data;
      ElMessage({ showClose: true, message: "删除成功", type: "success" });
    } else {
      ElMessage({ showClose: true, message: "删除失败", type: "error" });
    }
  });
}

const defaultProps = {
  children: "childMenuList",
  label: "menuName",
  value: "menuId",
};

let updateMenus = reactive({ tree: [] });
//显示修改菜单界面，赋初始值
async function showUpdMenu(menu) {
  console.log("行：");
  console.log(menu);
  updateMenus.tree = [];
  updateMenus.tree.push({
    menuId: 0,
    menuName: "主目录",
    menuParentId: 0,
    childMenuList: toRaw(menus.tree),
  });
  updateForm.menuId = menu.menuId;
  updateForm.menuName = menu.menuName;
  updateForm.menuComponent = menu.menuComponent;
  updateForm.menuPath = menu.menuPath;
  updateForm.menuPerms = menu.menuPerms;
  updateForm.menuStatus = menu.menuStatus;
  updateForm.menuType = menu.menuType;
  if (menu.menuParentId != 0) {
    // 不是一级目录
    updateForm.parentMenu = menu.parentMenu.menuName;
    updateForm.menuParentId = menu.parentMenu.menuId;
  } else {
    // 一级目录
    updateForm.menuParentId = 0;
  }
  updateForm.roleId = menu.menuType;
  isShowUpd.value = true;
  getRole(); // 获取角色
  // 获取菜单对应的角色
  api.role.getRoleByMenu(menu.menuId).then((response) => {
    if (response.code == 200) {
      updateForm.roleId = [];
      response.data.forEach((element) => {
        updateForm.roleId.push(element.roleId);
      });
    }
  });
  console.log("结束...");
  console.log(updateMenus);
}

// 修改数据发送给后端
async function updateMenu() {
  ruleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    isShowUpd.value = false;
    api.menu.updateMenu(updateForm).then((response) => {
      if (response.code == 200) {
        menus.tree = response.data;
        ElMessage({ showClose: true, message: "修改成功", type: "success" });
      }
    });
  });
}

// 搜索 提交
function searchByMenuName() {
  if (
    searchContent.value == null ||
    searchContent.value == "" ||
    searchContent.value == undefined
  ) {
    getMenus();
  } else {
    api.menu.searchMenus(searchContent.value).then((response) => {
      if (response.code == 200) {
        menus.tree = response.data;
        // ElMessage({ showClose: true, message: "修改成功", type: "success" });
      }
    });
  }
}

// 表单验证规则
let rules = reactive({
  menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  menuType: [{ required: true, message: "请选择类型", trigger: "blur" }],
  menuPerms: [{ required: true, message: "权限标识不能为空", trigger: "blur" }],
});
</script>




<style>
.textSize {
  font-size: 4px;
}
input::-webkit-input-placeholder {
  color: #c0c4cc;
  font-size: 12px;
}
.searchTitle {
  font-weight: 700;
  color: #606266;
  font-size: 14px;
}
.tableBox td {
  height: 48px;
}
.dialog-footer {
  margin-right: 35px;
}
.btns {
  position: relative;
  left: 370px;
}
</style>