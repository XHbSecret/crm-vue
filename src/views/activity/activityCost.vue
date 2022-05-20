<template>
  <el-card>
    <div id="activityCost" ref="cost" />
    <div id="activityCost" ref="costs" />
  </el-card>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, reactive } from "vue";
import { getAll } from "@/api/system/activity";

const cost = ref(null);
let data_ = reactive({ activity: [] });

onMounted(() => {
  getCost();
});
// 获取后台数据
function getCost() {
  const costs = echarts.init(cost.value);
  const count = ref(0.0);
  const count1 = ref(0.0);
  getAll().then((response) => {
    data_.activity = response.data;
    for (let i = 0; i < data_.activity.length; i += 1) {
      count.value += data_.activity[i].activityCost;
      console.log(data_.activity[i].activityCost);
      console.log(data_.activity[i].activityName);
    }
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
  });
}
</script>

<style>
#activityCost {
  width: 600px;
  height: 600px;
  float: left;
}
</style>