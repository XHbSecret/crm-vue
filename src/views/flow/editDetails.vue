<template>
  <el-dialog
    model-value="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {defineProps,defineEmits} from "vue"

const emits = defineEmits(["update:modelValue", "updateDate"]);
function handleClose(){
    emits("update:modelValue",false)
}

</script>

<style>

</style>