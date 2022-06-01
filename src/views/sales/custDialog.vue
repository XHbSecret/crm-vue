<template>
  <el-dialog
    :model-value="dialogVisible_cust"
    @close="handClose"
    title="选择客户"
    width="60%"
    draggable
  >
    <el-row class="row-margin">
      <el-col :span="8">
        <el-input placeholder="请输入关键字" style="width: 20%" clearable>
          <template #append>
            <el-button type="primary" :icon="Search" @click="searchLike()" />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      border
      stripe
      style="width: 100%"
      height="350"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      @selection-change="handleSelectionChange"
      :data="tableData.cust"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        fixed
        label="客户名称"
        width="120"
        prop="customerDetail.custDetailName"
        sortable
      >
      </el-table-column>
      <el-table-column prop="custCreateTime" label="创建时间" sortable />
      <el-table-column
        prop="custType"
        label="客户类型"
        sortable
        :formatter="cuType"
      />
      <el-table-column
        prop="customerDetail.custDetailPhone"
        label="电话"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailWechat"
        label="微信"
        sortable
      />
      <el-table-column
        prop="customerDetail.custDetailJob"
        label="客户行业"
        sortable
      />
    </el-table>
    <el-button type="info" @click="handClose()">取消</el-button>
    <el-button type="primary" @click="addOpps()">添加</el-button>
    <!-- 分页 -->
    <el-pagination
      v-model:currentPage="pagePlugs.data.currentPage"
      v-model:page-size="pagePlugs.data.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagePlugs.data.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="float: right; height: 60px; line-height: 60px"
    />
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { findCust } from "@/api/sales/index";
import { Search } from "@element-plus/icons-vue";
const emits = defineEmits(["update:modelValue"]);
const tableData = reactive({ cust: [] });
let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});

onMounted(() => {
  findCusts();
});

function handClose() {
  emits("update:modelValue", false);
}

function findCusts() {
  findCust(pagePlugs.data.currentPage, pagePlugs.data.pageSize).then((res) => {
    tableData.cust = res.data.records;
    pagePlugs.data.total = res.data.total;
    console.log(tableData.cust);
  });
}

function handleSelectionChange(val) {
  console.log(val);
}
</script>

<style>
</style>