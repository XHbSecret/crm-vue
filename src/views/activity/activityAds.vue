<template>
  <el-card shadow="hover" v-loading="loading" style="height: 95%">
    <el-row>
      <el-col :span="5">
        <h1>广告投放</h1>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-col :span="5">
        <el-input placeholder="输入搜索条件"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search"></el-button>
      <el-button type="primary" @click="addProduct">投放商品</el-button>
    </el-row>
    <el-row>
      <el-col>
        <el-table stripe style="width: 100%" border>
          <el-table-column prop="date" label="商品名" width="180" />
          <el-table-column prop="name" label="投放公司" />
          <el-table-column prop="name" label="投放日期" />
          <el-table-column prop="name" label="投放状态" />
          <el-table-column prop="name" label="投放方式" />
          <el-table-column prop="name" label="价格" />
        </el-table>
        <el-pagination
          v-model:currentPage="pagePlugs.currentPage"
          v-model:page-size="pagePlugs.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          small
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagePlugs.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
const loading = ref(false);
let pagePlugs = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100,
});
</script>

<style>
</style>