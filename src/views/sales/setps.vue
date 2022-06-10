<template></template>

<script setup>
import { watch, defineProps, reactive, ref, defineEmits, onMounted } from "vue";
import { getFlowRecords } from "@/api/sales/index";
import { getFlowDetails } from "@/api/system/flow";

const active = ref(0);

const datas = reactive({ list: [] });
const flowLists = reactive({ list: [] });

//接收父组件的值
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
  nums1: {
    type: Number,
    default: () => 0,
  },
});
const emits = defineEmits(["result1", "result2"]);

onMounted(() => {
  getFlowDetailss();
  getFlowRecord();
  console.log(active.value);
});

watch(
  () => (props.rowInfo, props.nums1),
  () => {
    console.log(props.rowInfo);
    console.log(props.nums1);
    datas.list = props.rowInfo;
    active.value = props.nums1;
    console.log("复制父组件的对象" + datas.list);
  },
  { deep: true, immediate: true }
);
</script>

<style>
</style>