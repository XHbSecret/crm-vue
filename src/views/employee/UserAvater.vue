<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="800px" @close="close">
    <!-- 头像 -->
    <el-row>
      <!-- 裁剪区 -->
      <el-col :xs="24" :md="12" :style="{ height: '350px' }">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
          v-if="visible"
        />
      </el-col>

      <!-- 预览区 -->
      <el-col :xs="24" :md="12" :style="{ height: '350px' }">
        <div class="avatar-upload-preview">
          <img
            :src="options.previews.url"
            :style="options.previews.img"
            class="img-yl"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 操作区 -->
    <el-row>
      <el-col :lg="2" :md="2">
        <el-upload
          action="#"
          :http-request="requestUpload"
          :show-file-list="false"
          :before-upload="beforeUpload"
        >
          <el-button>
            选择&nbsp;&nbsp;
           <el-icon><upload-filled /></el-icon>
          </el-button>
        </el-upload>
      </el-col>
       <el-col :lg="{ span: 1, offset: 2 }" :md="2">
        <el-button :icon="Plus" @click="changeScale(1)"></el-button>
      </el-col>
      <el-col :lg="{ span: 1, offset: 1 }" :md="2">
        <el-button :icon="Minus" @click="changeScale(-1)"></el-button>
      </el-col>
      <el-col :lg="{ span: 1, offset: 1 }" :md="2">
        <el-button :icon="RefreshLeft" @click="rotateLeft()"></el-button>
      </el-col>
      <el-col :lg="{ span: 1, offset: 1 }" :md="2">
        <el-button :icon="RefreshRight" @click="rotateRight()"></el-button>
      </el-col>
      <el-col :lg="{ span: 2, offset: 6 }" :md="2">
        <el-button type="primary" @click="uploadImg()">提 交</el-button>
      </el-col>
    </el-row>
    <br />

    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateMenu()">提交</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted,getCurrentInstance } from "@vue/runtime-core";
import { computed } from "vue";
import { ElMessage } from "element-plus";
import { VueCropper } from "vue-cropper";
import { uploadHead } from "@/api/employee/login";
import {
  UploadFilled,
  Plus,
  RefreshRight,
  RefreshLeft,
  Search,
  Minus,
} from "@element-plus/icons-vue";
const props = defineProps(["open"]);
const emit = defineEmits(["cancel"]);
const visible = ref(true);
//图片裁剪数据
const options = reactive({
    // img: "https://gitee.com/aDaMi/crm-picture-bed/raw/master/demo/c2be7d2a-5931-46aa-86db-d316d56ae99dnull",
  img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654915274&t=87246910715eb0d8d61c0c1acaed0157", // 裁剪图片的地址
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 200, // 默认生成截图框宽度
  autoCropHeight: 200, // 默认生成截图框高度
  fixedBox: true, // 固定截图框大小 不允许改变
  previews: {}, //预览数据
});

const { proxy } = getCurrentInstance();
/** 实时预览 */
function realTime(data) {
  options.previews = data;
}

/** 向左旋转 */
function rotateLeft() {
  proxy.$refs.cropper.rotateLeft();
};
/** 向右旋转 */
function rotateRight() {
  proxy.$refs.cropper.rotateRight();
};
/** 图片缩放 */
function changeScale(num) {
  num = num || 1;
  proxy.$refs.cropper.changeScale(num);
};
/** 覆盖默认上传行为 */
function requestUpload() {
};
/** 上传预处理 */
function beforeUpload(file) {
  if (file.type.indexOf("image/") == -1) {
      ElMessage.error("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.img = reader.result;
    };
  }
};
/** 文件上传 */
function uploadImg(){
  proxy.$refs.cropper.getCropBlob(data => {
      let formData = new FormData();
      formData.append("file", data);
      uploadHead(formData).then(response=>{
          console.log(response.data)
      })
  })
  cancel()
}

// 挂载
onMounted(() => {
  dialogVisible = props.open;
});

// 取消 dialog框
function cancel() {
  dialogVisible = !props.open;
  emit("cancel", dialogVisible);
}

// 改变 props.open
let dialogVisible = computed({
  get() {
    return props.open;
  },
  set(value) {
    dialogVisible = value;
  },
});

// dialog关闭时 触发
function close() {
  dialogVisible = false;
  emit("cancel", dialogVisible);
}
</script>

<style lang='scss' scoped>
.img-yl {
  height: 198px;
  width: 198px;
}
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}

.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>