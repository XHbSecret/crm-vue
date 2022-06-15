<template>
  <el-drawer
    model-value="drawer"
    :title="dialogTittle"
    @close="onclose"
    @opened="getFlowDetails"
    size="60%"
  >
    <div>
      <h3>基本详情</h3>
      <el-row class="rows">
        <el-col :span="4"><p>流程名</p></el-col>
        <el-col :span="6">{{flowDetail.flowName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><p>流程状态</p></el-col>
        <el-col :span="6"
          ><el-switch 
          v-model="flowDetail.flowStatus"
            active-text="启用"
            inactive-text="禁用"
            @click.stop="changStatus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><p>创建时间</p></el-col>
        <el-col :span="6">{{flowDetail.flowTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><p>修改时间</p></el-col>
        <el-col :span="6">{{flowDetail.flowLastTime}}</el-col>
      </el-row>
    </div>

    <el-tabs>
      <el-tab-pane label="流程步骤">
        <el-button type="primary" @click="addDetail" style="float: right"
          >添加步骤</el-button
        >
        <el-table
          :data="details.datas"
          row-key="flowDetailsId"
          style="width: 100%"
          height="300"
          stripe
        >
          <el-table-column
            prop="flowDetailsName"
            label="流程步骤名"
            width="150px"
            fixed
          />

          <el-table-column
            prop="flowOrder"
            label="顺序"
            width="150px"
            type="index"
            sortable
          />
          <el-table-column
            prop="flowDetailsDesc"
            label="说明"
            width="150px"
            fixed
          />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button @click="editFlowDetail(row)" type="text" :icon="Edit"
                >修改</el-button
              >
              <el-button
                @click="delFlow(row.flowDetailsId)"
                type="text"
                :icon="Delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="修改详情" v-model="edit" @close="cancle">
      <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
        <el-form-item label="步骤名" prop="flowDetailsName">
          <el-input v-model="form.flowDetailsName" />
        </el-form-item>
        <el-form-item label="是否审核" prop="flowIsCheck">
          <el-input type="textarea" v-model="form.flowIsCheck" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.flowDetailsDesc" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="confirm()">修改</el-button>
        <el-button type="info" @click="cancle()">取消</el-button>
      </template>
    </el-dialog>
  </el-drawer>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
  defineEmits,
  defineProps,
  watch,
} from "vue";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

const formRef = ref(null);
const edit = ref(false);
const emits = defineEmits(["update:modelValue", "insertDetail"]);
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
  dialogValue: {
    type: Object,
    default: () => {},
  },
});
const flowDetail = ref({
  flowname: "",
  flowTime: "",
  flowLastTime: "",
  flowId: 0,
  flowDetails: {},
});
const form = ref({});
let details = reactive({ datas: [] });

let getFlowDetails = () => {
  details.datas = flowDetail.value.flowDetails;
  console.log(details.datas);
};
const onclose = () => {
  emits("update:modelValue", false);
};
const editFlowDetail = (row) => {
  edit.value = true;
  form.value = row;
};
const confirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      api.flow.editDetails(form.value).then(() => {
        edit.value = false;
        ElMessage({
          message: "修改成功！！！！",
          type: "success",
        });
      });
    } else {
      ElMessage.error("校验不通过！！！");
      return false;
    }
  });
};
const cancle = () => {
  edit.value = false;
  formRef.value.resetFields();
};
const delFlow = (flowDetailsId) => {
  api.flow.delDetails(flowDetailsId).then(() => {
    ElMessage({
      message: "删除成功！！！！",
      type: "success",
    });
  });
};
const addDetail = () => {
  console.log();
  emits("insertDetail", flowDetail.value.flowId);
};

watch(
  () => props.dialogValue,
  () => {
    console.log(props.dialogValue);
    flowDetail.value = props.dialogValue;
    flowDetail.value.flowId = props.dialogValue.flowId;
    console.log(flowDetail.value.flowId);
  }
);
const rules = reactive({
  flowDetailsName: [
    { required: true, message: "详情名不能为空！！", trigger: "blur" },
    { pattern: "[\u4e00-\u9fa5]", message: "只能输入中文", trigger: "blur" },
  ],
  flowIsCheck: [{ required: true, message: "请选择是否审查", trigger: "blur" }],
  flowOrder: [{ required: true, message: "请输入顺序", trigger: "blur" }],
});
</script>

<style scoped>
 p{
  font-size:large;
}
</style>