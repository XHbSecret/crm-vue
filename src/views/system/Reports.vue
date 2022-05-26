<template>
  <el-card body-style="width:1250px">
    <h3>
      <el-icon><List /></el-icon>销售简报
    </h3>
    <el-row :gutter="24" style="margin: 20px">
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="icon">
            <el-icon size="20px"><Avatar /></el-icon>
            <span>新增客户（人）</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="icon">
            <el-icon size="20px"><DocumentAdd /></el-icon>
            <span>新增合同（个）</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="icon">
            <el-icon size="20px"><Money /></el-icon>
            <span>合同总金额（元）</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="icon">
            <el-icon size="20px"><Money /></el-icon>
            <span>回款总金额（元）</span>
          </div>
        </el-card></el-col
      >
    </el-row>
  </el-card>
  <el-row style="margin-top: 30px">
    <el-col :span="10"
      ><el-card shadow="hover">
        <h6>
          <el-icon><Histogram /></el-icon>员工销售排行
        </h6>
      </el-card></el-col
    >
  </el-row>
  <el-row style="margin-top: 30px">
    <el-col :span="10"
      ><el-card shadow="hover">
        <h6>
          <el-icon><Avatar /></el-icon>客户职业分布
        </h6>
        <div id="occupation" ref="occupations" /></el-card
    ></el-col>
  </el-row>
  <el-row style="margin-top: 30px">
    <el-col :span="10"
      ><el-card shadow="hover">
        <h6 style="float: left">
          <el-icon><OfficeBuilding /></el-icon>公司总销售额
        </h6>
        <el-select
          class="m-2"
          placeholder="选择"
          size="small"
          style="width: 100px; float: right"
          v-model="value"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          /> </el-select></el-card
    ></el-col>
  </el-row>
</template>

<script setup>
import {
  Histogram,
  Avatar,
  DocumentAdd,
  Money,
  List,
  OfficeBuilding,
} from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const value = ref("");
const options = [
  {
    value: "年",
    label: "年",
  },
  {
    value: "月",
    label: "月",
  },
  {
    value: "日",
    label: "日",
  },
];
const occupations = ref(null);
onMounted(() => {
  getOccupation();
});
// 客户职业
function getOccupation() {
  const vocation = echarts.init(occupations.value);
  const data = [
    { value: 635, name: "IT工程师" },
    { value: 205, name: "厨师" },
    { value: 136, name: "幼师" },
    { value: 360, name: "大学教授" },
  ];
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "职业/人数",
        type: "pie",
        radius: "50%",
        data,
      },
    ],
  };
  vocation.setOption(option);
}
</script>

<style>
#icon {
  width: 150px;
  height: 50px;
}

#occupation {
  width: 400px;
  height: 400px;
}
</style>