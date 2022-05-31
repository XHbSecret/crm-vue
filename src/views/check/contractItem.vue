<template>
  <div class="con-item">
    <!-- 标题 -->
    <div class="level">
      <el-card shadow="always">
        <el-row>
          <!-- 图标 -->
          <el-col :span="22">
            <img src="src/assets/backMoney.png" alt="" width="30" height="30" />
            <a class="con-title">{{props.contractData.object.contractNo}}</a>
          </el-col>
          <!-- 编辑按钮 -->
          <el-col :span="2">
            <el-button type="primary">编辑</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 审批信息 -->
    <div class="level">
      <el-card shadow="always" style="padding-bottom:20px">
        <div>
          <div
            style="
              display: inline-block;
              width: 20px;
              height: 20px;
              background-color: #1cbaf5;
              border-radius: 3px;
            "
          >
            <el-icon size="20px" color="white"><Stamp /></el-icon>
          </div>
          <span class="check-info">审批流信息</span>
        </div>
        <div style="margin-top: 20px;">
          <!-- 创建者 -->
          <template v-if="props.contractData.checkSend.userName!=''">
            <div class="check-icon">
                <el-icon size="25px" color="#46cdcf"><CirclePlusFilled /></el-icon>
            </div>
            <div class="check-user">
                <span style="margin-left: 5px">{{props.contractData.checkSend.userName}}</span>
                <span style="margin-left: 6px; font-size: 10px">创建</span>
            </div>
          </template>

          <!-- 审批者 -->
          <template v-for="c in props.contractData.records" :key="c">
            <div class="check-icon">
                <el-icon size="25px"><DArrowRight /></el-icon>
            </div>
            <template v-if="c.checkStatus == 0"><!-- 未审核 -->
                <div class="check-icon">
                    <el-icon size="25px" color="#fd5b4a"><RemoveFilled /></el-icon>
                </div>
                <div class="check-user">
                    <span style="margin-left: 5px">{{c.checkUserVO.userName}}</span>
                    <span style="margin-left: 6px; font-size: 10px">审核被终止</span>
                </div>
            </template>
            <template v-else-if="c.checkStatus == 1"><!-- 通过审核 -->
                <div class="check-icon">
                    <el-icon size="25px" color="#46cdcf"><CircleCheckFilled /></el-icon>
                </div>
                <div class="check-user">
                    <span style="margin-left: 5px">{{c.checkUserVO.userName}}</span>
                    <span style="margin-left: 6px; font-size: 10px">审核通过</span>
                </div>
            </template>
            <template v-else-if="c.checkStatus == 2"><!-- 通过不审核 -->
                <div class="check-icon">
                    <el-icon size="25px" color="#fd5b4a"><RemoveFilled /></el-icon>
                </div>
                <div class="check-user">
                    <span style="margin-left: 5px">{{c.checkUserVO.userName}}</span>
                    <span style="margin-left: 6px; font-size: 10px">审核未通过</span>
                </div>
            </template>
            <template v-else-if="c.checkStatus == 3"><!-- 通过审核 -->
                <div class="check-icon">
                    <el-icon size="25px" color="#fd715a"><Timer /></el-icon>
                </div>
                <div class="check-user">
                    <span style="margin-left: 5px">{{c.checkUserVO.userName}}</span>
                    <span style="margin-left: 6px; font-size: 10px">审核中</span>
                </div>
            </template>
          </template>
        </div>
      </el-card>
    </div>

    <!-- 合同信息 -->
    <div class="level">
      <el-tabs type="border-card" style="height:400px">
        <el-tab-pane label="详细资料" lazy>
            <contractInfo/>
        </el-tab-pane>
        <el-tab-pane label="产品" lazy>
            <productInfo/>
        </el-tab-pane>
        <el-tab-pane label="回款" lazy>Role</el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from "@vue/runtime-core";
import contractInfo from './contractInfo.vue'
import productInfo from './productInfo.vue'
import {
  Stamp,
  Timer,
  CirclePlus,
  CirclePlusFilled,
  DArrowRight,
  CircleCheckFilled,
  RemoveFilled,
  
} from "@element-plus/icons-vue";
const props = defineProps(["contractId","contractData"]);

// 挂载
onMounted(() => {
  // 加载合同信息
  // 合同id props.contractId  
});
</script>


<script>
export default {
  // 加载背景颜色
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "background:#f5f6f9");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style scoped>
.check-user {
  float: left;
  padding-top: 2px;
}
.check-icon {
  float: left;
  margin-left: 15px;
}
.check-info {
  margin-left: 10px;
  font-weight: 600;
  color: #333;
}
.level {
  margin-bottom: 15px;
  padding: 8px 10px;
}
.con-item {
  width: 100%;
  height: 100%;
}
.con-title {
  vertical-align: super;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 600;
}
.row {
  /* margin-bottom: 15px; */
  padding: 8px 10px;
}
</style>