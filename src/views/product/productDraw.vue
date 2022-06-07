<template>
  <el-drawer
    :model-value="true"
    @close="onClose()"
    destroy-on-close
    size="50%"
    :with-header="false"
    style="height: 100%"
  >
    <el-container class="container1">
      <el-header class="ct">
        <!-- 抽屉头部第一层 -->
        <div
          class="vux-flexbox t-section vux-flex-row"
          style="align-items: stretch"
        >
          <el-row :gutter="20">
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RkJENTRDN0RBOTYxMUU5QkE1ODgxNUFCQkRCNzRBNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RkJENTRDOERBOTYxMUU5QkE1ODgxNUFCQkRCNzRBNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGQkQ1NEM1REE5NjExRTlCQTU4ODE1QUJCREI3NEE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGQkQ1NEM2REE5NjExRTlCQTU4ODE1QUJCREI3NEE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+X5quNAAAA9VJREFUeNrsmUloE2EUx/+ZpLFpNk1qm7pV0dblYkFBEfFQpaLiQb1VEAVPUj2oh2LBY6i49aAnrVJUxB29VEU9iAdFvIhLccGqoTVttmZtms33xkZq7Waaydhh/vCSy2S++c33vfe9/xdN9ZsPIFVRNFNsoLBgaitI8YiikeKjjj4WUzynmA5liCdoO0UtxWqBPpwKghsqZnIKg8tSqaoTFJBzY8kkQOFSAVVAFVAFVAFVwDGkk3oADbdKFhN226djuaGY3qgGHfE4bvj7cNMfRCKTkXZ8chMZqcDWm01oKLNhafG0Ea/pTiRxwevHdYLtT2emBuBEwIbLk0zhvMePawQaTaf/X8B1JiMOltsnDDZcgVQKrQR6xdeHSJ5A8wK41lSCA2V2McfyoVAqjUu+AM4R7GRndNKAjY5S7LHPkCR/XkVjqP/ikm+bKNVpqTpKA8daUWJApb5IPkCtRiMWFamUpC3ET3kpG6CbynybNyAJXIoSp/mHB8FUWv4is4yqZgMVmfVm46TB+GHa+0Jo6fHi60BC3k6Gc3CTxYwQVbpDrm4s0OtzBs2Cne31wZVIYCN1P7zttAdD4j5Z8BksEQS0L6qEo+jXO+pJJtHi9uJOIIgl/zijj0MRnHZ78Ck+gC1WMw6Xl6Ji8L4/KA02f/qa876Ycw7W0J6XhWOV6XRwzi7H3YXzYKOZ3fetC9s+f8ODYBiZMcD4Gr6WX9jVBXNxco7jNxyLx6gpKS78EuUHGknVNHutlbPxLBzFMZqVA9+7sWiaHruo2V5JZZ9/9ToWR5vPj7f0zQAnCGorzdxoMmgEeXJwvO5mjWke7pBjOE0F42hXz58PLWiwn5bxXtpHiwXpNhtJ/SDffMcMC+5XVYrAWa0yGvCwaj4aZtokhSuY4TXRcm6ZUwGLVhDjzNxZYs4qwvBmZSawWrJRLIZUjKMfKqs4g1r1TEYFVAHzAJhGpmAPmZzEWDkDvqEuJFUARh6DO56CA3JzfdHrlxzwsi+AXhpLlm3iVI9HdNzckRiE/KazlywSe0I+IJatyPDy4fPMDR87cYt6znysWD7p5nvW0T35QDgjV5EZKjakR7rcovV5EYmN81JGf2S2VpvI+x0nFxLO07loXjuZ9/1x7Op0UUtmRKNj5l8nYp3xhOgihusd/c7Z3YuX0djUaNWekJF9Sn5wp82KegqbVifm0tNwRDyJuxcIYbPVBDcVDz6iYEuVlqhISfbni9rJqIAqoAqoAqqAKuD/ARhUMF+YAR8pGPAhAzZRBBQIx0xNDNhBsZriNkVIAWChQRZm6vgpwADCQWwnTL97rgAAAABJRU5ErkJggg=="
                  />
                </div></div
            ></el-col>
            <el-col :span="12">
              <div class="t-section__bd">
                <div class="type-name">产品</div>
                <div class="vux-flexbox type-content vux-flex-row">
                  <div class="el-tooltip name">
                    {{ props.rowInfo.productName }}
                  </div>
                  <div class="el-button-group wk-header-page-btn"></div>
                </div>
              </div>
            </el-col>
            <el-col :span="8"
              ><div class="t-section__ft" style="text-align: right">
                <el-button type="success" @click="rallotSwitch">转让</el-button>
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
                <div class="h-title">房产类别</div>
                <div class="h-value text-one-line">
                  {{
                    props.rowInfo.houseType == 1
                      ? "普通商品房"
                      : props.rowInfo.houseType == 2
                      ? "经济适用房"
                      : props.rowInfo.houseType == 3
                      ? "小产权房"
                      : props.rowInfo.houseType == 4
                      ? "房改房"
                      : props.rowInfo.houseType == 5
                      ? "集资房"
                      : props.rowInfo.houseType == 6
                      ? "廉租房"
                      : props.rowInfo.houseType == 7
                      ? "公租房"
                      : props.rowInfo.houseType == 8
                      ? "安置房"
                      : "无"
                  }}
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">单位</div>
                <div class="h-value text-one-line">
                  {{
                    props.rowInfo.productUnit == 1
                      ? "套"
                      : props.rowInfo.productUnit == 2
                      ? "间"
                      : props.rowInfo.productUnit == 3
                      ? "幢"
                      : props.rowInfo.productUnit == 4
                      ? "栋"
                      : "无"
                  }}
                </div>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title">负责人</div>
                <div class="h-value text-one-line">
                  {{ props.rowInfo.employeeDatail.empName }}
                </div>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="vux-flexbox-item h-item">
                <div class="h-title" v-if="props.rowInfo.productSell == 1">
                  房产报价
                </div>
                <div class="h-title" v-else>月租</div>
                <div
                  class="h-value text-one-line"
                  v-if="props.rowInfo.productSell == 1"
                >
                  {{ props.rowInfo.productPrice + "/平方米" }}
                </div>
                <div class="h-title" v-else>
                  {{ props.rowInfo.rentalPrices + "/月" }}
                </div>
              </div></el-col
            >
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <el-tabs type="border-card">
            <el-tab-pane label="基本信息">
              <el-scrollbar height="480px">
                房产信息
                <button @click="edit()">编辑</button>
                <!-- {{ data.formData }} -->
                <el-form :model="data.formData" :inline="true">
                  <el-form-item label="产品名称">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productName
                    }}</span>
                    <el-input
                      v-else
                      @change="input()"
                      v-model="data.formData.productName"
                    />
                  </el-form-item>
                  <el-form-item label="出售方式">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productSell == 1 ? "出售" : "出租"
                    }}</span>
                    <el-select
                      placeholder="请选择装修类型"
                      v-model="data.formData.productSell"
                      v-else
                    >
                      <el-option
                        v-for="item in productSellTy"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :model="data.formData" :inline="true">
                  <el-form-item label="户型">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productType
                    }}</span>
                    <el-select
                      placeholder="请选择户型"
                      v-model="data.formData.productType"
                      v-else
                    >
                      <el-option
                        v-for="item in productTy"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="装修类别">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productDecorateType
                    }}</span>
                    <el-select
                      placeholder="请选择装修类型"
                      v-model="data.formData.productDecorateType"
                      v-else
                    >
                      <el-option
                        v-for="item in productDecorateTy"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form :model="data.formData" :inline="true">
                  <el-form-item label="地址">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productAddress
                    }}</span>
                    <el-input
                      v-else
                      @change="input()"
                      v-model="data.formData.productAddress"
                    />
                  </el-form-item>
                  <el-form-item label="面积/㎡">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productArea
                    }}</span>
                    <el-input-number
                      v-else
                      @change="input()"
                      v-model="data.formData.productArea"
                      :precision="2"
                    />
                  </el-form-item>
                </el-form>
                <el-form :model="data.formData" :inline="true">
                  <el-form-item label="房屋数量">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productQuantity
                    }}</span>
                    <el-input-number
                      v-else
                      @change="input()"
                      v-model="data.formData.productQuantity"
                    />
                  </el-form-item>
                  <el-form-item label="单位">
                    <span v-if="formSwitch.flag">
                      {{
                        props.rowInfo.productUnit == 1
                          ? "套"
                          : props.rowInfo.productUnit == 2
                          ? "间"
                          : props.rowInfo.productUnit == 3
                          ? "幢"
                          : props.rowInfo.productUnit == 4
                          ? "栋"
                          : "无"
                      }}</span
                    >
                    <el-select
                      placeholder="请选择装修类型"
                      v-model="data.formData.productUnit"
                      v-else
                    >
                      <el-option
                        v-for="item in unit"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form
                  :model="data.formData"
                  :inline="true"
                  v-if="props.rowInfo.productSell == 1"
                >
                  <el-form-item label="售价/平方米">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productPrice
                    }}</span>
                    <el-input-number
                      v-else
                      @change="input()"
                      v-model="data.formData.productPrice"
                      :precision="2"
                    />
                  </el-form-item>
                  <el-form-item label="预售价">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productValuation
                    }}</span>
                    <el-input-number
                      v-else
                      @change="input()"
                      v-model="data.formData.productValuation"
                      :precision="2"
                    />
                  </el-form-item>
                </el-form>
                <el-form :model="data.formData" :inline="true">
                  <el-form-item label="介绍">
                    <span v-if="formSwitch.flag">{{
                      data.formData.productIntroduce
                    }}</span>
                    <el-input
                      v-else
                      @change="input()"
                      v-model="data.formData.productIntroduce"
                    />
                    <!-- 按钮区 -->
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="updataPD"
                        :style="{ display: Buttonstyle.visibleCancel }"
                        >保存</el-button
                      >
                      <el-button
                        @click="cancel()"
                        :style="{ display: Buttonstyle.visibleCancel }"
                        >取消</el-button
                      >
                    </el-form-item>
                  </el-form-item>
                </el-form>
                <span>提供者/提供商</span>
                <!-- {{ data.formData.customerDetail }} -->
                <el-form :model="data.formData.customerDetail" :inline="true">
                  <el-form-item label="房源名称">
                    <span>{{ data.formData.customerDetail.custDetailName }}</span>
                  </el-form-item>
                  <el-form-item label="房源电话">
                    <span>{{ data.formData.customerDetail.custDetailPhone }}</span>
                  </el-form-item>
                   <el-form-item label="房源地址">
                    <span>{{ data.formData.customerDetail.custDetailAddress }}</span>
                  </el-form-item>
                  <el-form-item label="房源简介">
                    <span>{{ data.formData.customerDetail.custDetailDescribe }}</span>
                  </el-form-item>
                  </el-form>
                <span>负责人</span>
                <!-- {{ data.formData.employeeDatail }} -->
                <el-form :model="data.formData.employeeDatail" :inline="true">
                  <el-form-item label="负责人名称">
                    <span>{{ data.formData.employeeDatail.empName }}</span>
                  </el-form-item>
                  <el-form-item label="负责人电话">
                    <span>{{ data.formData.employeeDatail.empPhone }}</span>
                  </el-form-item>
                  <el-form-item label="负责人简介">
                    <span>{{ data.formData.employeeDatail.empDescribe }}</span>
                  </el-form-item>
                  </el-form>
                <span>图片</span>
                <div
                  v-for="(imgs, index) in props.rowInfo.attachments"
                  :key="index"
                  class="block"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="imgs.attName"
                  />
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <!-- <el-tab-pane label="附件">附件
            </el-tab-pane> -->
            <el-tab-pane label="操作记录" name="操作记录"
              >操作记录
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </el-drawer>
     <pTransfer
        v-if="rallot"
        v-model:rallot="rallot"
        :rowInfo="data.formData"
        @gbDraw="onClose"
        :title="title"
      ></pTransfer>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { updateProduct } from "@/api/system/product";
import pTransfer from "./productTransfer.vue"
//接收父组件的值
const props = defineProps({
  chouti: {
    type: Boolean,
    default: () => false,
  },
  rowInfo: {
    type: Object,
    default: () => {},
  },
});

//接收表单数据
const data = reactive({
  formData: {},
});

// 控制详情表的输入框
const formSwitch = reactive({
  flag: true,
});
const Buttonstyle = reactive({
  visibleCancel: "none",
});
const edit = () => {
  formSwitch.flag = false;
  Buttonstyle.visibleCancel = "";
};
const cancel = () => {
  formSwitch.flag = true;
  Buttonstyle.visibleCancel = "none";
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
};

const emits = defineEmits(["update:drawer", "upData"]);
function onClose() {
  emits("update:drawer", false);
  emits("upData")
}
onMounted(() => {
  // data.formData = Object.assign({}, props.rowInfo);
  data.formData = JSON.parse(JSON.stringify(props.rowInfo));
  console.log(data.formData);
});

//打开商品转让
//打开分配
const rallot = ref(false);
const title = ref("");
const rallotSwitch = () => {
  console.log("转让组件被打开");
  title.value = "产品转让";
  rallot.value = true;
};


//修改商品详情
const updataPD = () => {
  data.formData.productValuation =
    data.formData.productArea * data.formData.productPrice;
  updateProduct(data.formData).then((res) => {
    if ((res.code = 200)) {
      ElMessage({
        message: "修改成功！！！！",
        type: "success",
      });
      formSwitch.flag = true;
      Buttonstyle.visibleCancel = "none";
      emits("upData");
    }
  });
};

//下拉框数据
const productSellTy = [
  {
    value: 1,
    label: "出售",
  },
  {
    value: 2,
    label: "出租",
  },
];
const productDecorateTy = [
  {
    value: "现代简约风格",
    label: "现代简约风格",
  },
  {
    value: "简欧风格",
    label: "简欧风格",
  },
  {
    value: "宜家风格",
    label: "宜家风格",
  },
  {
    value: "中式风格",
    label: "中式风格",
  },
  {
    value: "欧式风格",
    label: "欧式风格",
  },
  {
    value: "田园风格",
    label: "田园风格",
  },
  {
    value: "地中海风格",
    label: "地中海风格",
  },
  {
    value: "混搭风格",
    label: "混搭风格",
  },
  {
    value: "美式风格",
    label: "美式风格",
  },
  {
    value: "日式风格",
    label: "日式风格",
  },
  {
    value: "东南亚风格",
    label: "东南亚风格",
  },
  {
    value: "新古典风格",
    label: "新古典风格",
  },
];
const productTy = [
  {
    value: "平层",
    label: "平层",
  },
  {
    value: "错层",
    label: "错层",
  },
  {
    value: "跃层",
    label: "跃层",
  },
  {
    value: "复式",
    label: "复式",
  },
  {
    value: "loft",
    label: "loft",
  },
];
const unit = [
  {
    value: "1",
    label: "套",
  },
  {
    value: "2",
    label: "间",
  },
  {
    value: "3",
    label: "幢",
  },
  {
    value: "4",
    label: "栋",
  },
];
</script>

<style lang="scss" scoped>
.ct {
  color: #333;
  padding: 0;
  height: 200px;
  background: beige;
}

.el-main {
  height: 100%;
  width: 100%;
  padding: 0;
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
.container1 {
  height: 100%;
  margin: -20px;
}
.el-form-item {
  width: 250px;
}
</style>
