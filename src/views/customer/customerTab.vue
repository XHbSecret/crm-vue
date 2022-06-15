<!--  -->
<template>
  <div class="customerTab">
    <el-tabs
      type="border-card"
      :model-value="data.activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="客户">
        <Customer ref="listComp"></Customer>
      </el-tab-pane>
      <el-tab-pane label="公海" name="first">
        <CustomerSea ref="SeaComp" @Sealist="SealistComp"></CustomerSea>
      </el-tab-pane>
      <el-tab-pane label="商机">
        <Sales></Sales>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { defineAsyncComponent, reactive, ref } from "vue";
import Customer from "./customer.vue";
import Sales from "../sales/index.vue";
// let CustomerSea = defineAsyncComponent(() => import('./customerSea.vue'))//异步组件
import CustomerSea from "./customerSea.vue";
//tabs 的name
const data = reactive({
  activeName: "",
});
const listComp = ref(null); //获取客户子组件的方法 getlist.value.Getlist()
const SeaComp = ref(null); //获取子组件的方法

const SealistComp = () => {
  listComp.value.GetList();
  console.log(listComp.value);
  console.log("我被调用了");
};
const handleClick = (tab, event) => {
  // console.log(tab, event);
  //这样才能获取每个el-tab-pane的name属性
  //  console.log(tab.props.name);
  if (tab.props.name == "first") {
    // console.log(SeaComp.value)
    SeaComp.value.GetSeaList();
    console.log("haha" + SeaComp.value.GetSeaList());
  }
};
</script>
<style lang="scss" scoped>
.customerTab {
  height: 100%;
  margin: -20px;
}
</style>
