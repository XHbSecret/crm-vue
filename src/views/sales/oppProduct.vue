<template>
  <!-- {{ tables.tableData }} -->
  <!-- <p>{{ tables.tableData }}</p> -->
  <!-- <p>房名：{{tables.tableData.product.productName}}</p>
  <p>位置：{{tables.tableData.product.productAddress}}}</p> -->
  <el-row>
    <el-col :span="6">房名：{{tables.tableData.product.productName}}</el-col>
    <el-col :span="6">来源：{{tables.tableData.product.productName}}</el-col>
  </el-row>
  <el-row>
    <el-col :span="6">房子类型：{{tables.tableData.product.houseType}}</el-col>
    <el-col :span="6">装修类型：{{tables.tableData.product.productDecorateType}}</el-col>

  </el-row>
  <el-row>
        <el-col :span="6">户型：{{tables.tableData.product.productType}}</el-col>
    <el-col :span="6">位置：{{tables.tableData.product.productAddress}}</el-col>

  </el-row>
  <el-row>
        <el-col :span="6">面积/(平方米)：{{tables.tableData.product.productArea}}</el-col>
    <el-col :span="6">介绍：{{tables.tableData.product.productIntroduce}}</el-col>
    
  </el-row>
  <el-row>
    <el-col :span="6"></el-col>
  </el-row>
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
    immediate:true
  }
);
</script>

<style>
</style>