<!--这是活动插件  -->
<template>
  <el-scrollbar height="400px">
    <div class="synthesis">
      <el-button size="small" @click="followUp"
        ><el-icon><CirclePlusFilled /></el-icon>写跟进</el-button
      >
      <el-card
        class="box-card"
        style="margin-top: 20px; align: center"
        v-if="followUpSwitch"
        :visible.sync="followUpSwitch"
      >
        <el-button
          size="small"
          :icon="Close"
          circle
          @click="guanbi"
          style="float: right; margin: -20px"
        />
        <el-select
          v-model="visit.oppVisitMethod"
          class="m-2"
          placeholder="选择跟进方式"
          style="width: 20%"
        >
          <el-option
            v-for="item in FollowUpMode"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="visit.oppVisitNextTime"
          class="m-2"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="下次跟进时间"
        />

        <el-input
          v-model="visit.oppVisitContent"
          :rows="2"
          type="textarea"
          placeholder="内容"
        />
        <el-upload
          class="upload-demo"
          action="http://localhost:8088/Attachment/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="UploadedSuccess"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
          :headers="headers"
        >
          <el-button type="primary">图片上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传图片,且单张图片大小不能超过500kb
            </div>
          </template>
        </el-upload>
        <el-button style="float: right" @click="addVisits">发布</el-button>
      </el-card>
      <el-timeline style="margin-top: 50px">
        <el-timeline-item
          v-for="(data, index) in Allvisit.data"
          :key="index"
          :timestamp="
            data.oppVisitTime
          "
          placement="top"
        >
          <el-card style="widows: 200px">
            <el-collapse :border="true">
              <el-collapse-item
                :title="
                  pObj.employee.employeeDatail.empName + '对该客户进行跟进'
                "
                name="1"
              >
                <div>
                  <el-descriptions title="跟进信息">
                    <el-descriptions-item label="客户姓名">{{
                      pObj.customerDetail.custDetailName
                    }}</el-descriptions-item>
                    <el-descriptions-item label="客户电话">{{
                      pObj.customerDetail.custDetailPhone
                    }}</el-descriptions-item>
                    <el-descriptions-item label="地址">{{
                      pObj.customerDetail.custDetailAddress
                    }}</el-descriptions-item>
                    <el-descriptions-item label="跟进方式">
                      <el-tag size="small" v-if="data.oppVisitMethod">{{
                        data.oppVisitMethod
                      }}</el-tag>
                      <span v-else>没有选择联系方式</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="跟进内容">
                      {{ data.oppVisitContent }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
                <div>
                  <div
                    v-for="(attachment, i) in data.attachments"
                    :key="i"
                    class="block"
                  >
                    <el-image
                      style="width: 50px; height: 50px"
                      :src="attachment.attName"
                      fit="cover"
                      :preview-src-list="[attachment.attName]"
                    >
                      <template #error>
                        <div class="image-slot" style="margin-top: 20px">
                          <span class="demonstration">无附件</span>
                        </div>
                      </template>
                    </el-image>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { CirclePlusFilled, Close, Delete } from "@element-plus/icons-vue";
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";
import { getOppVisits, addOppVisit } from "@/api/sales/index";
// api （axios管理的后端接口）
const api = getCurrentInstance()?.appContext.config.globalProperties.$API;
// 打开跟进卡片
let followUpSwitch = ref(false);
const followUp = () => {
  followUpSwitch.value = true;
};
// 关闭卡片
const guanbi = () => {
  followUpSwitch.value = false;
  Object.assign(visit, visit2);
};
//接收父组件的值
const props = defineProps({
  rowInfo: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["updateData"]);

// 跟进方式下拉框
const FollowUpMode = [
  {
    value: "打电话",
    label: "打电话",
  },
  {
    value: "发邮件",
    label: "发邮件",
  },
  {
    value: "发短信",
    label: "发短信",
  },
  {
    value: "见面拜访",
    label: "见面拜访",
  },
  {
    value: "活动",
    label: "活动",
  },
];

const datas = reactive({ data: {} });

//useStore 获取store
const store = useStore();
let empId = store.state.employee.user.user.empId;
console.log("empId =  ", empId);

let getToken = store.state.employee.token;
const headers = { token: getToken };

//图片上传成功钩子
const UploadedSuccess = (file) => {
  ElMessage({
    type: "success",
    message: "上传成功",
  });
  visit.attachments.push(file.data);
  console.log(file);
};
//图片超出限制时钩子
const handleExceed = () => {
  ElMessage.error("图片超出限制");
};

const pObj = toRefs(props).rowInfo;
//储存跟进信息
let visit = reactive({
  oppVisitEmpId: empId,
  oppVisitCustId: "",
  oppVisitMethod: "",
  oppVisitNextTime: "",
  oppVisitContent: "",
  oppVisitOppId: "",
  oppVisitDetailId: "",
  attachments: [],
});

let visit2 = reactive({
  oppVisitEmpId: empId,
  oppVisitCustId: "",
  oppVisitMethod: null,
  oppVisitNextTime: null,
  oppVisitContent: null,
  oppVisitOppId: null,
  oppVisitDetailId:null,
  attachments: [],
});

//添加一条跟进记录
const addVisits = () => {
  if (visit.oppVisitContent != "") {
    visit.oppVisitCustId = pObj.value.custId;
    visit.oppVisitOppId = pObj.value.oppId;
    console.log(visit);
    addOppVisit(visit).then((res) => {
      if (res.code == 200) {
        ElMessage.success("添加跟进成功");
        followUpSwitch.value = false;
        GetAllvisit();
        guanbi();
        emits("updateData")
      }
    });
  } else {
    ElMessage.error("请填写内容");
  }
};

//接收该客户的跟进信息 selectAllByOppId
let Allvisit = reactive({ data: [] });
const GetAllvisit = () => {
  getOppVisits(datas.data.oppId).then((response) => {
    if (response.code == 200) {
      Allvisit.data = response.data;
      console.log(response.data);
    }
  });
};

//挂载时
onMounted(() => {
  GetAllvisit();
});

watch(
  () => props.rowInfo,
  () => {
    datas.data = props.rowInfo;
    console.log(datas.data);
  },
  {
    deep: true,immediate:true
  }
);
</script>
<style lang="scss" scoped></style>
