<template>
  <!-- 保存按钮 -->
  <el-row>
    <el-col :span="24">
      <el-button type="primary" style="float: right" @click="savePerms()">保存</el-button>
    </el-col>
  </el-row>

  <!-- 权限组 -->
  <el-row>
    <el-col :span="24">
      <el-scrollbar height="466px">
        <div class="custom-tree-node-container tree-title">
          <el-tree
            :props="prop"
            :data="props.perms"
            show-checkbox
            node-key="menuId"
            default-expand-all
            :default-checked-keys="props.checkedPerms"
            @check = "handleCheckChange"
          />
        </div>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive,ref, toRaw } from "@vue/reactivity";
import {updatePermsByRoleId} from "@/api/system/role";
import { ElMessage } from "element-plus";


const props = defineProps(["perms","checkedPerms","roleId"]);
let perms = reactive([
  {
    permNameId: 1,
    permName: "系统管理",
    status: 0,
    permChild: [
      {
        permNameId: 2,
        permName: "角色管理",
        status: 0,
        isPenultimate: true,
        permChild: [
          { permNameId: 3, permName: "添加角色", status: 0 },
          { permNameId: 4, permName: "1231324242424242  ", status: 0 },
          { permNameId: 5, permName: "添加角色", status: 0 },
          { permNameId: 6, permName: "添加角色", status: 0 },
          { permNameId: 7, permName: "添加角色", status: 0 },
          { permNameId: 8, permName: "添加角色", status: 0 },
          { permNameId: 9, permName: "添加角色", status: 0 },
          { permNameId: 10, permName: "添加角色", status: 0 },
          { permNameId: 11, permName: "删除角色", status: 0 },
        ],
      },
      {
        permNameId: 12,
        permName: "菜单管理",
        status: 0,
        isPenultimate: true,
        permChild: [
          { permNameId: 13, permName: "添加菜单", status: 0, },
          { permNameId: 14, permName: "删除菜单", status: 0, permChild: [] },
        ],
      },
    ],
  },
]);
let selectPerms = reactive({data:[]})
const emit = defineEmits(['flushPerms'])
let isSave = false;

// 保存
function savePerms(){
  console.log(isSave)
  if(isSave) {  // 是否修改了  修改了
  // 虽然修改了，但是修改过后的值依旧没法说改变，则不发送修改请求
    let copy = toRaw(props.checkedPerms);
    let copy2 = toRaw(selectPerms.data)
    let i = 0
    if(copy.length == 0 && copy2.length ==0){   // 都为空 不发送
       console.log("数据相同不发送")
    }else if(copy.length != copy2.length){    // 长度不一样，肯定修改了  要发送
       updatePerms()
    }else{                                    // 长度一样，但是数据可能不一样，所以遍历一下是否相同
      for(i=0;i<copy.length;i++){  
          if(copy[i] != copy2[i]){ // 查到有不同的数据
              console.log("发送给后端的数据2.0",selectPerms.data)
              updatePerms()
              break;
          }
        }
      if(i==copy.length){  // 遍历完了，都没发现不同，不修改。
      console.log("数据相同不发送")
      }
    }

  }else{
     console.log("没修改")
  }
}

// 发送请求给后台；
function updatePerms(){
  updatePermsByRoleId(props.roleId,selectPerms.data).then(res=>{
    if(res.code == 200 && res.data == true){
      ElMessage.success("保存成功")
    }else{
       ElMessage.success("保存失败")
    }
  })
}

// 选择权限后触发事件
function handleCheckChange(checkedNodes,checkedKeys ) {
  isSave = true
  selectPerms.data = []
  console.log(checkedKeys)
  // let permsCopy = toRaw(checkedKeys.checkedNodes)
  //  for(let i=0;i<permsCopy.length;i++){
  //   // console.log(permsCopy[i])
  //   if(permsCopy[i].childMenuList!=undefined && (permsCopy[i].childMenuList.length>0) ){ //  || (permsCopy[i].permChild.length>0
  //     continue; 
  //   }
  //   selectPerms.data.push(permsCopy[i].menuId)
  // }
  //  if(checkedKeys.halfCheckedNodes.length>0 && checkedKeys.halfCheckedNodes[0].menuId>0){
  //   selectPerms.data.push(checkedKeys.halfCheckedNodes[0].menuId)
  //  }

  selectPerms.data = checkedKeys.checkedKeys
  for(let i=0;i<checkedKeys.halfCheckedKeys.length;i++){
    // console.log(checkedKeys.halfCheckedKeys[i])
    selectPerms.data.push(checkedKeys.halfCheckedKeys[i])
  }
  console.log("发给后端的数据")
  console.log(selectPerms.data)
}



// 树形复选框  配置属性
const prop = {
  isPenultimate: false,
  label: "menuName",
  children: "childMenuList",
  class: (perms, node) => {
    // 制定样式
    if (perms.isPenultimate) {
      return "is-penultimate";
    }
    if (node.level == 1) {
      return "first-title";
    }
    // if (perms.children == undefined || perms.children.length <= 0) {
    if (perms.menuType=='B') {
      return "last-title";
    }
    return null;
  },
};
</script>

<style>
.el-tree-node__content:hover {
  color: #626af1;
  background-color: #fff;
}
.first-title {
  font-weight: 600;
}
.last-title {
  float: left;
  margin: 8px 0;
  font-weight: 400;
}
.is-penultimate > .el-tree-node__content {
  margin: 10px 0;
  font-weight: 600;
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: block;
}
.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>