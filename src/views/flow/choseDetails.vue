<template>
  <el-dialog title="追加步骤" model-value="visible_detail">
    <el-button type="primary" style="float: right" @click="addFlowDetails"
      >新增步骤</el-button
    >
    <el-form>
      <el-form-item label="步骤名">
        <el-select placeholder="请选择步骤" v-model="flowDetailIds" multiple>
          <el-option
            v-for="item in fDetails.datas"
            :key="item"
            :label="item.flowDetailsName"
            :value="item.flowDetailsId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="submit">添加</el-button>
      <el-button type="info" @click="cancle">取消</el-button>
    </el-form>
    <insertDetails
      v-model="visible_details"
      v-if="visible_details"
      :dialogEditValue="dialogEditValue"
      :dialogTittle="dialogTittles"
      @updateData="getFlowDetailss"
    >
    </insertDetails>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { getAllFlowDetailss, addDetail } from "@/api/system/flow";
import { ElMessage, ElMessageBox } from "element-plus";
import insertDetails from "./insertDetails.vue";
const fDetails = reactive({ datas: [] });
const visible_details = ref(false);
const flowDetailIds = ref("");
const flowIds = ref("");
const dialogTittles = ref("");
const emits = defineEmits(["update:modelValue", "updateData"]);
const props = defineProps({
  flowIds: {
    type: Number,
    default: () => {},
  },
});

onMounted(() => {
  getFlowDetailss();
});
async function getFlowDetailss() {
  await getAllFlowDetailss().then((res) => {
    fDetails.datas = res.data;
    console.log(fDetails.datas);
  });
}
// 添加新的流程步骤
function addFlowDetails() {
  visible_details.value = true;
  dialogTittles.value = "添加步骤";
}
// 添加步骤
function submit() {
  addDetail(flowDetailIds.value, flowIds.value)
    .then(() => {
      cancle();
      ElMessage.success("追加成功");
      emits("updateData");
    })
    .catch(() => {
      cancle();
      ElMessage.error("追加失败");
    });
}
// 取消
function cancle() {
  emits("update:modelValue", false);
}

watch(
  () => props.flowIds,
  () => {
    console.log(props.flowIds);
    flowIds.value = props.flowIds;
    console.log(flowIds.value);
  },
  { deep: true, immediate: true }
);
</script>

<style>
</style>