<template>
  <el-card>
    <div id="activityCost" ref="cost" />
    <div id="activityCost" ref="costs" />
  </el-card>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, reactive } from "vue";
import { getAll, getAllAdss } from "@/api/system/activity";

const cost = ref(null);
const costs = ref(null);
let data_ = reactive({ activity: [] });
let datas = reactive({ activity: {} });

onMounted(() => {
  getCost();
  getCosts();
});
// 获取后台数据
async function getCost() {
  const costs = echarts.init(cost.value);
  const count = ref(0.0);
  const count1 = ref(0.0);
  await getAll().then((response) => {
    data_.activity = response.data;
    for (let i = 0; i < data_.activity.length; i += 1) {
      count.value += data_.activity[i].activityCost;
    }
  });
  await getAllAdss().then((response) => {
    datas.activity = response.data;
    for (let i = 0; i < response.data.length; i += 1) {
      count1.value += response.data[i].comProCost;
    }
  });
  const data = [
    { value: count1.value, name: "广告投放" },
    { value: count.value, name: "社交推广" },
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
        name: "类型/元",
        type: "pie",
        radius: "50%",
        data,
      },
    ],
  };

  costs.setOption(option);
}
// 获取后台数据
async function getCosts() {
  const cost = echarts.init(costs.value);
  const count = ref(0.0);
  const count1 = ref(0.0);
  await getAll().then((response) => {
    data_.activity = response.data;
    for (let i = 0; i < data_.activity.length; i += 1) {
      count.value += data_.activity[i].activityCost;
    }
  });
  await getAllAdss().then((response) => {
    datas.activity = response.data;
    for (let i = 0; i < response.data.length; i += 1) {
      count1.value += response.data[i].comProCost;
    }
  });
  const data = [
    {
      value: count1.value,
      name: "广告投放",
      itemStyle: {
        color: "green",
      },
    },
    { value: count.value, name: "社交推广" },
  ];
  const option = {
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      data: ["广告投放", "社交推广"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "类型/元",
        type: "bar",
        data,
      },
    ],
  };
  cost.setOption(option);
}
</script>

<style>
#activityCost {
  width: 600px;
  height: 600px;
  float: left;
}
</style>