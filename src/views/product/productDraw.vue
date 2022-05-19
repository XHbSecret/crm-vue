<template>
  <el-drawer model-value="drawer" @close="onClose()"> </el-drawer>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
function onClose() {
  emits("update:modelValue");
}
</script>

<style>
</style>