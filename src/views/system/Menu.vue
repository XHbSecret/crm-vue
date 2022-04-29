<template>
  <!-- 表格 -->
  <el-table
    table-layout="fixed"
    :data="menus.tree"
    style="width: 100%; margin-bottom: 20px"
    row-key="menuId"
    lazy
    element-loading-text="数据拼命加载中"
    :tree-props="{ children: 'childMenuList', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="menuName" label="菜单名称" sortable width="120px" />
    <el-table-column prop="menuIcon" label="图标" sortable width="100px" />
    <el-table-column prop="menuPerms" label="权限标识" sortable />
    <el-table-column prop="menuComponent" label="组件路径" sortable />
    <el-table-column prop="menuPath" label="路由地址" sortable width="180px" />
    <el-table-column prop="menuStatus" label="状态" sortable width="100px" />
    <el-table-column
      prop="menuCreateTime"
      label="创建时间"
      sortable
      width="180px"
    />
    <el-table-column label="操作" sortable>
       <template v-slot="scope">
        <el-button :icon="Plus" size="small" type="text" @click="showAdd(scope.row)"
          >添加</el-button>
        <el-button :icon="Edit" size="small" type="text">修改</el-button>
        <el-button :icon="Delete" size="small" type="text">删除</el-button>
       </template>
    </el-table-column>
  </el-table>

  <!-- 添加菜单 dialog框-->
  <el-dialog v-model="isAdd" title="添加菜单" width='50%'>
    <el-form :model="addForm" label-width="100px"  :rules='rules'>
      <el-form-item label="上级菜单" >
        <el-col :span="9">
          <el-input disabled v-model="addForm.parentMenu" />
        </el-col>
      </el-form-item>
      <el-form-item label="菜单类型" >
        <el-radio-group v-model="addForm.menuType" prop='menuType'>
          <el-radio label="M" >目录</el-radio>
          <el-radio label="C" >菜单</el-radio>
          <el-radio label="B" >按钮</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单名称" prop='menuName'>
        <el-col :span="9">
          <el-input v-model="addForm.menuName" />
        </el-col>
      </el-form-item>

      <el-form-item label="路由地址" >
        <el-col :span="9">
          <el-input v-model="addForm.menuPath" />
        </el-col>
        <el-form-item label="路由组件" label-width="120px">
          <el-input v-model="addForm.menuComponent" style="width:232px"/>  
        </el-form-item>
      </el-form-item>
      <el-form-item label="权限字符" prop='menuPerms'>
        <el-col :span="9">
          <el-input v-model="addForm.menuPerms" />
        </el-col>
      </el-form-item>
      <el-form-item label="菜单状态" >
        <el-radio-group v-model="addForm.menuStatus">
          <el-radio :label="1" >正常</el-radio>
          <el-radio :label="0" >禁用</el-radio>
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

</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "vue"; // 导入实例
// import FormInstance  from 'element-plus';
import {
  Plus,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // 找到api

let menus = reactive({ tree: [] });

let isAdd = ref(false);

let addForm = reactive({
  // parentMenu: "", // 父菜单
  menuType: "", // 菜单类型
  menuStatus: 1, // 菜单状态
  menuName: "", // 菜单名称
  menuPath: "", // 路由地址
  menuComponent: "", // 路由组件
  menuPerms: "", //权限字符
  menuParentId:0,

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
      console.log(response.data + "xixi");
      menus.tree = response.data;
      // console.log(response)
    });
}

// 显示添加dialog
function showAdd(menu){
  addForm.menuParentId = menu.menuId
  // addForm.parentMenu = menu.menuName
  isAdd.value = true
}

// 添加菜单
function addMenu(){
  isAdd.value = false
  api.menu.addMenu(addForm).then((response)=>{

  })
}

// const ruleFormRef = ref(null);
// 表单验证规则
let rules = reactive({
  menuName: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
  ],
  menuType:[
    { required: true, message: '请选择类型', trigger: 'blur' },
  ],
  menuPerms:[
    { required: true, message: '权限标识不能为空', trigger: 'blur' },
  ]
})
</script>


<style>
.dialog-footer{
  margin-right:35px;
}
.btns{
  position: relative;
  left:370px
  }
</style>