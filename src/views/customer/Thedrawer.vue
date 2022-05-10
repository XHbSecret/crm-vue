<template>
  <div class="div1">
    <el-drawer
      v-model="drawer"
      @close="onClose"
      direction="rtl"
      destroy-on-close
      size="70%"
      :with-header="false"
      :modal="true"
    >
      <el-container style="height: 100%">
        <el-header class="ct">
          <!-- 抽屉头部第一层 -->
          <div
            class="vux-flexbox t-section vux-flex-row"
            style="align-items: stretch"
          >
            <el-row :gutter="20">
              <el-col :span="2"
                ><div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">1</div>
                </div></el-col
              >
              <el-col :span="12">
                <div class="t-section__bd">
                  <div class="type-name">客户</div>
                  <div class="vux-flexbox type-content vux-flex-row">
                    <div class="el-tooltip name">{{multipleTable.customerDetail.custDetailName}}</div>
                    <div class="el-button-group wk-header-page-btn"></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="8"
                ><div class="t-section__ft">
                    <el-button type="success">编辑</el-button>    
                    <el-button type="primary">更改成交状态</el-button>
                    <el-button>...</el-button>
                </div></el-col
              >
            </el-row>
          </div>
          <!-- 抽屉头部第二层 -->
          <div
            class="vux-flexbox h-section vux-flex-row"
            style="align-items: stretch"
          >
            <el-row :gutter="20">
              <el-col :span="6"
                ><div class="vux-flexbox-item h-item">
                  <div class="h-title">客户级别</div>
                  <div class="h-value text-one-line">2</div>
                </div>
              </el-col>
              <el-col :span="6"
                ><div class="vux-flexbox-item h-item">
                  <div class="h-title">成交状态</div>
                  <div class="h-value text-one-line">成交</div>
                </div>
              </el-col>
              <el-col :span="6"
                ><div class="vux-flexbox-item h-item">
                  <div class="h-title">负责人</div>
                  <div class="h-value text-one-line">肖胡斌</div>
                </div></el-col
              >
              <el-col :span="6"
                ><div class="vux-flexbox-item h-item">
                  <div class="h-title">创建时间</div>
                  <div class="h-value text-one-line">{{multipleTable.custCreateTime}}</div>
                </div></el-col
              >
            </el-row>
          </div>
        </el-header>
        <el-container>
          <el-main>
            <el-tabs type="border-card">
              <el-tab-pane label="活动">活动</el-tab-pane>
              <el-tab-pane label="详细资料">详细资料{{multipleTable}}</el-tab-pane>
              <el-tab-pane label="联系人">联系人
                <Contactst :data="multipleTable"/>
              </el-tab-pane>
              <el-tab-pane label="合同">合同</el-tab-pane>
              <el-tab-pane label="回款">回款</el-tab-pane>
              <el-tab-pane label="回访">回访
                <Visit :data="multipleTable"/>
              </el-tab-pane>
              <el-tab-pane label="附件">附件
                <Accessory :data="multipleTable"/>
                </el-tab-pane>
              <el-tab-pane label="操作记录">操作记录</el-tab-pane>
            </el-tabs>
          </el-main>
          <el-aside width="200px" style="background-color: blue"
            >Aside</el-aside
          >
        </el-container>
      </el-container>
    </el-drawer>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref ,toRefs } from "vue";
import  Contactst  from "./Contactst.vue";
import Visit from "./visit.vue"
import Accessory from "./Accessory.vue"
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

//接收父组件的值
const props = defineProps({
  drawer: {
    type: Boolean,
    default: () => false,
  },
  multipleTable:{}
});
const pObj = toRefs(props).multipleTable;
//监听
const emit = defineEmits(["update:drawer", "close"]);
const onClose = () => {
  // 关键句，父组件则可通过 v-model:visible 同步子组件更新后的数据
  emit("update:drawer");
  emit("close");
  };
</script>

<style lang="scss" scoped>


.ct {
  color: #333;
  padding: 0 !important;
  height: 200px !important;
  background:beige;
}

.el-main {
  height: 100%;
  padding: 0 !important;
  overflow: hidden;
  position: relative;
}
.el-tabs {
  height: 100%;
}


.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.h-section {
  position: relative;
  padding: 8px 20px 15px;
}

.t-section__bd .type-name {
  color: #999;
  font-size: 12px;
  margin-bottom: 5px;
}

.t-section {
  position: relative;
  padding: 30px 20px 5px;
  min-height: 60px;
}
</style>
