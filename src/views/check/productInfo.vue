<template>
  <div>
    <el-table
      :data="productList.data"
      stripe
      style="width: 100%"
      height="500"
      id="body-table"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="productName" label="产品名" width="180">
        <template v-slot="scope" default="{row}">
          <a href="#" @click.prevent="clickData(scope.row)">{{
            scope.row.productName
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="productType" label="户型" width="180" />
      <el-table-column prop="houseType" label="房子类型" width="180">
        <template v-slot="scope">
          <p v-if="scope.row.houseType == 1">普通商品房</p>
          <p v-else-if="scope.row.houseType == 2">经济适用房</p>
          <p v-else-if="scope.row.houseType == 3">小产权房</p>
          <p v-else-if="scope.row.houseType == 4">房改房</p>
          <p v-else-if="scope.row.houseType == 5">集资房</p>
          <p v-else-if="scope.row.houseType == 6">廉租房</p>
          <p v-else-if="scope.row.houseType == 7">公租房</p>
          <p v-else-if="scope.row.houseType == 8">安置房</p>
        </template>
      </el-table-column>
      <el-table-column prop="productPrice" label="报价" width="180" />
      <el-table-column prop="productIntroduce" label="介绍" width="180" />
      <el-table-column prop="productStatus" label="产品状态" width="180">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.productStatus == 1"
            >上架</el-tag
          >
          <el-tag type="info" v-else>下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="productAddress" label="房子地址" width="180" />
      <el-table-column
        prop="productDecorateType"
        label="装修类型"
        width="180"
      />
      <el-table-column prop="productArea" label="面积" width="180" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";

let productList = reactive({data:[]})
</script>

<style>
</style>