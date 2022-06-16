<template>
  <el-drawer
    model-value="drawer"
    title="基本详情"
    @close="onclose"
    @opened="getFlowDetails"
    size="60%"
  >
    <el-scrollbar height="450">
      <div style="height: 150px">
        <ul>
          <li>
            <p>流程名</p>
            <span>{{ flowDetail.flowName }}</span>
          </li>

          <li>
            <p>创建时间</p>
            <span>{{ flowDetail.flowTime }}</span>
          </li>
          <li>
            <p>修改时间</p>
            <span>{{ flowDetail.flowLastTime }}</span>
          </li>
          <li>
            <p>流程状态</p>
            <span
              ><el-switch
                v-model="flowDetail.flowStatus"
                active-text="启用"
                inactive-text="禁用"
                @click.stop="changStatus(flowDetail)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
            /></span>
          </li>
        </ul>
      </div>

      <!-- 流程步骤 -->
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
    </el-scrollbar>

    <!-- 添加步骤 -->
    <insertDetails
      v-model="visible_details"
      v-if="visible_details"
      :dialogEditValue="dialogEditValue"
      :dialogTittle="dialogTittles"
      @updateData="getFlowDetails"
    >
    </insertDetails>
  </el-drawer>
</template>

<script setup>
import insertDetails from "./insertDetails.vue";
import { editFlowStatus } from "@/api/system/flow";
import {
  ref,
  reactive,
  getCurrentInstance,
  defineEmits,
  defineProps,
  watch,
} from "vue";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;

const visible_details = ref(false);
const dialogTittles = ref("");
const dialogEditValue = ref({});
const formRef = ref(null);
const edit = ref(false);
const emits = defineEmits(["update:modelValue", "insertDetail", "updateData"]);
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
  flowName: "",
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
  visible_details.value = true;
  dialogEditValue.value = row;
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

const delFlow = (flowDetailsId) => {
  api.flow.delDetails(flowDetailsId).then(() => {
    ElMessage({
      message: "删除成功！！！！",
      type: "success",
    });
  });
};
const addDetail = () => {
  emits("insertDetail", flowDetail.value.flowId);
};
const changStatus = (row) => {
  console.log(row);
  editFlowStatus(row)
    .then(() => {
      ElMessage.success("修改成功！！！");
      emits("updateData");
    })
    .catch(() => {
      ElMessage.error("修改失败！！！");
    });
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
ul {
  width:900px;
  margin-top: 40px;
}
ul li {
  width: 200px;
  float: left;
  list-style: none;
}
ul li span {
  font-size: small;
}
</style>