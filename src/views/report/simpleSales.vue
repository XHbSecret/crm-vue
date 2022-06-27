<template>
  <el-dialog
    :model-value="dialogVisible_cust"
    @close="handClose"
    title="新增客户"
    width="60%"
  >
    <el-row class="row-margin">
      <el-col :span="10">
        <el-input placeholder="请输入客户名" v-model="keyWords" clearable>
          <template #append>
            <el-button type="primary" :icon="Search" @click="searchLike()" />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="cust.datas"
      stripe
      style="width: 100%"
      height="450"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" width="80" fixed>
        <template v-slot="scope">
          {{
            (pagePlugs.data.currentPage - 1) * pagePlugs.data.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="客户名称"
        width="120"
        prop="customerDetail.custDetailName"
      >
      </el-table-column>
      <el-table-column prop="custCreateTime" label="创建时间" sortable />
      <el-table-column prop="custType" label="客户类型" :formatter="cuType" />
      <el-table-column prop="customerDetail.custDetailPhone" label="电话" />
      <el-table-column prop="customerDetail.custDetailWechat" label="微信" />
      <el-table-column prop="customerDetail.custDetailJob" label="客户行业" />

    </el-table>
    <div>
      <el-button type="primary" @click="handClose">关闭</el-button>
    </div>
    <!-- 分页 -->
    <el-pagination
      small
      background
      layout="total"
      :total="pagePlugs.data.total"
      style="float: right"
    />
  </el-dialog>
</template>

<script setup>
import {
  Histogram,
  Avatar,
  DocumentAdd,
  Money,
  List,
  OfficeBuilding,
  Search,
} from "@element-plus/icons-vue";
import { defineProps, watch, reactive, ref,defineEmits } from "vue";
const cust = reactive({ datas: [] });
const newCust = reactive({ datas: [] });
const props = defineProps({
  custs: {
    type: Object,
    default: () => {},
  },
});
const emits=defineEmits(["update:modelValue"])
let pagePlugs = reactive({
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
});
const keyWords = ref("");
// 客户类型
function cuType(rew, column) {
  let custType = rew.custType;
  if (custType == 1) {
    return "房源";
  } else if (custType == 2) {
    return "租房";
  } else if (custType == 3) {
    return "买房";
  } else if (custType == 4) {
    return "居家装修";
  }
}

// 根据关键字查询数据
function searchLike() {
  if (keyWords.value != "") {
    cust.datas.forEach((item) => {
      if (item.customerDetail.custDetailName.indexOf(keyWords.value) != -1) {
        newCust.datas.push(item);
      } else {
        cust.datas = props.custs;
      }
    });
    cust.datas = [...new Set(newCust.datas)];
  } else {
    cust.datas = props.custs;
  }
}
function handClose() {
  emits("update:modelValue", false);
}

watch(
  () => props.custs,
  () => {
    cust.datas = props.custs;
    pagePlugs.data.total = props.custs.length;
    console.log(cust.datas);
  },
  { deep: true, immediate: true }
);
</script>

<style>
</style>