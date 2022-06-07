<template>
  <el-scrollbar height="350px">
    <div class="title-info">基本信息</div>
    <div style="height:350px">
      <el-row class="row">
        <el-col :span="3">合同编号</el-col>
        <el-col :span="8"> 123456 </el-col>
        <el-col :span="3"> 合同名称 </el-col>
        <el-col :span="3"> hah </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3">客户名称</el-col>
        <el-col :span="8"> 客户111 </el-col>
        <el-col :span="3"> 商机名称 </el-col>
        <el-col :span="3"> 商机名称111 </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3">签约时间</el-col>
        <el-col :span="8"> 2021-1-1 </el-col>
        <el-col :span="3"> 合同佣金 </el-col>
        <el-col :span="3"> 100 </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="3">备注</el-col>
        <el-col :span="8"> 123456 </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>

<script setup>
</script>

<style scoped>
.row {
  margin: 30px 10px;
}
.title-info {
  border-left: 3px solid #2362fb;
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-left: 8px;
  padding-left: 10px;
}
</style>