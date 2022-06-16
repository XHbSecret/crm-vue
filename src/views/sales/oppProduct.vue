<template>
  <!-- {{ tables.tableData }} -->
  {{ tables.tableData.product }}
</template>

<script setup>
import { watch, reactive, defineProps } from "vue";
const props = defineProps({
  rowInfo: {
    type: Array,
    default: () => [],
  },
});
const tables = reactive({
  tableData: [],
});
watch(
  () => props.rowInfo,
  () => {
    tables.tableData = props.rowInfo;
    console.log(props.rowInfo);
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style>
</style>