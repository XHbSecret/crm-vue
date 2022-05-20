<template>
  <el-dialog
    :title="dialogTittle"
    width="50%"
    :model-value="dialogVisible"
    @close="onclose"
  >
    <el-form label-width="120px" ref="formRef">
      <el-form-item label="产品名">
        <template v-slot="scope">
          <el-select placeholder="请选择产品">
            <el-option :value="scope.row"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="投放公司">
        <template v-slot="scope">
          <el-select placeholder="请选择公司">
            <el-option :value="scope.row"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="投放日期">
        <template v-slot="scope">
          <el-date-picker
            v-model="scope.row"
            type="datetime"
            placeholder="选择日期"
          />
        </template>
      </el-form-item>
      <el-form-item label="投放状态">
        <template v-slot="scope">
          <el-radio-group v-model="scope.row">
            <el-radio :label="3">Option A</el-radio>
            <el-radio :label="6">Option B</el-radio>
            <el-radio :label="9">Option C</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
      <el-form-item label="投放方式">
        <template v-slot="scope">
          <el-select placeholder="请选择方式">
            <el-option :value="scope.row"></el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="价格">
        <el-input placeholder="请输入价格" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">投放</el-button>
        <el-button @click="onclose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
const formRef = ref(null);
const emits = defineEmits(["update:modelValue", "updateDate"]);
const props = defineProps({
  dialogTittle: {
    type: String,
    default: "",
  },
});
const onclose = () => {
  emits("update:modelValue", false);
  formRef.value.resetFields();
};
const onSubmit = () => {
  emits("update:modelValue", false);
};
</script>

<style>
</style>