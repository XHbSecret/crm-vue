<!--  -->
<template>
  <div class="customeRallot">
    <el-dialog
      :model-value="true"
      width="50%"
      :title="title"
      @close="onClose"
      close-on-press-escape
    >
      <!-- {{ data.emplist[1] }} -->
      <el-form-item label="请选择">
        <el-select
          ref="count"
          v-model="data.form.region"
          placeholder="请选中"
          @change="getempId"
        >
          <el-option
            v-for="item in data.emplist"
            :key="item.empId"
            :label="item.employeeDatail.empName"
            :value="item.empId"
          />
        </el-select>
      </el-form-item>
      <button @click="distribution">确认</button>
      <button @click="onClose">取消</button>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
onMounted(async () => {
  console.log("-----加载中开始调用查询方法-----");
  allEmp();
});
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  rallot: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => [],
  },
  pd: {
    type: Number,
  },
});
const data = reactive({
  form: {
    region: [],
  },
  emplist: [],
});
const pObj = toRefs(props).rowInfo;
const titles = toRefs(props).title;
const allEmp = () => {
  api.customer.allEmp().then((response) => {
    if (response.code == 200) {
      for (let index = 0; index < response.data.records.length; index++) {
         if(response.data.records[index].empId !=props.rowInfo.empId){
            data.emplist.push(response.data.records[index])
         }
      }
       console.log("加载成功");
    }
  });
};
//下拉菜单的点击事件 获取empId
const getempId = (value) => {
  data.emplist.forEach((item) => {
    if (item.empId == value) {
      console.log(item.empId);
      associates.empId = item.empId;
    }
  });
};
//用于储存协作人的信息
const associates = reactive({
  empId: 0,
  custId: props.rowInfo.custId,
  assPrincipal: props.rowInfo.empId,
  employee: props.rowInfo.employee,
  customerDetail: props.rowInfo.customerDetail,
});

//绑定在确认按钮上的方法   根据父组件传值来判断使用什么方法
const distribution = () => {
  // 如果 props.pd = 1 就是使用分配方法
  if (JSON.stringify(props.pd) == "1") {
    ElMessageBox.confirm("是否进行批量分配?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        api.customer
          .updateEmpIdBatchByid(pObj.value, data.form.region)
          .then((response) => {
            if (response.code == 200) {
              emit("ceshi");
              onClose();
              ElMessage({
                type: "success",
                message: "分配成功",
              });
            } else {
              ElMessage.error("分配失败，请联系管理员");
            }
          });
      })
      .catch(() => {
        // catch error
      });
  } else if (JSON.stringify(props.pd) == "2") {
    // 如果 props.pd = 2 就是使用转让方法
    ElMessageBox.confirm("是否进行批量转让?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        api.customer
          .updateEmpIdBatchByid(pObj.value, data.form.region)
          .then((response) => {
            if (response.code == 200) {
              emit("ceshi");
              onClose();
              ElMessage({
                type: "success",
                message: "转让成功",
              });
            } else {
              ElMessage.error("转让失败，请联系管理员");
            }
          });
      })
      .catch(() => {
        // catch error
      });
  } else if (JSON.stringify(props.pd) == "3") {
    // 如果 props.pd = 3 就是使用添加协作人方法
    ElMessageBox.confirm("是否进行协作人添加?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        api.customer.addAssociates(associates).then((response) => {
          if (response.data == 1) {
            emit("ceshi");
            onClose();
            ElMessage.error("请勿重复添加协作人");
          } else {
            emit("ceshi");
            onClose();
            ElMessage({
              type: "success",
              message: "协作人添加成功",
            });
          }
        });
      })
      .catch(() => {
        // catch error
      });
  } else if (JSON.stringify(props.pd) == "4") {
    // 如果 props.pd = 3 就是使用添加协作人方法
    ElMessageBox.confirm("是否进行团队负责人转让?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        // api.customer.addAssociates(associates).then((response) => {
        //   if (response.data == 1) {
        //     emit("ceshi");
        //     onClose();
        //     ElMessage.error("请勿重复添加协作人");
        //   } else {
        //     emit("ceshi");
        //     onClose();
        //     ElMessage({
        //       type: "success",
        //       message: "协作人添加成功",
        //     });
        //   }
        // });
        console.log("转让成功！")
      
      })
      .catch(() => {
        // catch error
      });
  }
};
const emit = defineEmits(["update:rallot", "ceshi", "sxkh"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:rallot", false);
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
