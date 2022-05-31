<template>
  <div class="title">
    <el-tabs v-model="activeName" class="demo-tabs title-border">
      <el-tab-pane label="全部" name="first" lazy>
        <contractTable/>
      </el-tab-pane>
      <el-tab-pane label="我负责的合同" name="second" lazy>
        <contractTable me="isMe"/>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import contractTable from './contractTable.vue'
import {
  getAllCheckFlow,
  getRecordBySendId,
  getRecordByType,
  getRecordByPage,
  getRecordByMePage,
  getAlreadyCRecordByMePage,
} from "@/api/check/checkFlow";
import { useStore } from "vuex";
const store = useStore();

const activeName = ref('first')

</script>

<script>
export default {
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style>
.content-border{
    border-top: 5px solid #e4e7ed;
}
.title-border{
    padding-left: 20px;
    border: 1px solid #e4e7ed;
    background-color: #fff;
}
.title {
  margin: 20px 50px;
  width: 90%;
}

.info {
  margin-left: 20px;
  margin-top: 20px;
}
.info > span {
  margin-right: 80px;
}
.basic-info {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-left: 8px;
  padding-left: 10px;
  border-left: 4px solid blue;
  border-radius: 2px;
}
.check-info {
  margin-top: 40px;
}
</style>