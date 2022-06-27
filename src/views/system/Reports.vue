<template>
  <el-card body-style="width:1250px">
    <h3>
      <el-icon><List /></el-icon>销售简报
      <el-button type="primary" @click="getTheMounth">本月</el-button>
      <el-button type="primary" @click="getTheQuerter">本季度</el-button>
      <el-button type="primary" @click="getThisYear">今年</el-button>
      <el-button type="primary" @click="getLastMounth">上个月</el-button>
    </h3>

    <el-row :gutter="24" style="margin: 20px">
      <el-col :span="6">
        <el-card shadow="hover" @click="showCustDialog">
          <div id="icon">
            <el-icon size="20px"><Avatar /></el-icon>
            <span>新增客户（人）</span>
            <p>{{ cust.data.length }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="showContract">
          <div id="icon">
            <el-icon size="20px"><DocumentAdd /></el-icon>
            <span>新增合同（个）</span>
            <p>{{ contract.data.length }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" @click="showContract">
          <div id="icon">
            <el-icon size="20px"><Money /></el-icon>
            <span>合同总金额（元）</span>
            <p>{{ contractMoney }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div id="icon">
            <el-icon size="20px"><Money /></el-icon>
            <span>回款总金额（元）</span>
            <p>{{backMoney}}</p>
          </div>
        </el-card></el-col
      >
    </el-row>
  </el-card>
  <el-card shadow="hover" style="width: 630px; height: 450px; float: left">
    <h6>
      <el-icon><Histogram /></el-icon>员工销售排行
      <el-select
        placeholder="选择"
        style="width: 120px"
        size="small"
        v-model="emps"
        @change="getEmps"
      >
        <el-option label="本月" value="0">本月</el-option>
        <el-option label="本季度" value="1">本季度</el-option>
        <el-option label="今年" value="2">今年</el-option>
      </el-select>
    </h6>
    <el-table :data="empData.data">
      <el-table-column label="排名" type="index" width="60px"></el-table-column>
      <el-table-column label="员工姓名">
        <template v-slot="scope">
          {{ scope.row.names }}
        </template>
      </el-table-column>
      <el-table-column label="成交次数">
        <template v-slot="scope">
          {{ scope.row.record }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-card style="width: 630px; height: 450px; float: right">
    <h6 style="float: left">
      <el-icon><OfficeBuilding /></el-icon>公司总销售额
    </h6>
    <div id="sales" ref="sales"></div>
  </el-card>
  <el-card style="width: 800px; height: 450px; float: left">
    <div id="occupation" ref="occupations" />
  </el-card>
  <el-card style="width: 450px; height: 450px; float: right" class="card_data">
    <el-row>
      <el-col :span="8"><h1>数据汇总</h1></el-col>
    </el-row>
    <el-row>
      <el-col>
        <p>客户汇总</p>
        <p>
          新增<span>{{ cust.data.length }}</span
          >个客户
        </p>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        <p>回款汇总</p>
        <p>回款金额为<span>0</span>元，预计回款金额为<span>{{backMoney}}</span>元</p>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        <p>合同汇总</p>
        <p>
          合同总金额<span>{{ contractMoney }}</span
          >元
        </p>
      </el-col>
    </el-row>
  </el-card>
  <custSales
    v-model="visible_cust"
    :custs="cust.data"
    v-if="visible_cust"
  ></custSales>
  <contracts
    v-model="visible_contract"
    :contracts="contract.data"
    v-if="visible_contract"
  ></contracts>
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
import {
  getCustJob,
  getCustAdd,
  getContractAdd,
  getContractMoney,
  getEmpByTimes,
  getBackMoney,
} from "@/api/echartss/index";
import { onMounted, ref, reactive } from "vue";
import custSales from "../report/simpleSales.vue";
import contracts from "../report/rcontract.vue";
import * as echarts from "echarts";
const value = ref("");
const occupations = ref(null);
const jobs = reactive({ job: [] });
const time = reactive({
  times: 0,
});

const visible_cust = ref(false);
const visible_contract = ref(false);
const cust = reactive({ data: [] });
const contract = reactive({ data: [] });
const contractMoney = ref(0.00);
const emps = ref("");
const empData = reactive({ data: [] });
const backMoney=ref(0.00)

// 挂载数据
onMounted(() => {
  getOccupation();
  getTheMounth();
});
// 客户职业
async function getOccupation() {
  const vocation = echarts.init(occupations.value);
  const jobList = reactive([]);
  const userClass = reactive({});
  const newData = reactive({ data: [] });
  await getCustJob(1, 1000000).then((response) => {
    console.log(response.data.records);
    for (let i = 0; i < response.data.records.length; i++) {
      const job = response.data.records[i].customerDetail.custDetailJob;
      jobs.job.push(job);
    }
    jobs.job.forEach((item) => {
      if (item != null) {
        if (jobList.indexOf(item) == -1) {
          jobList.push(item);
          userClass[item] = [item];
        } else {
          userClass[item].push(item);
        }
      }
    });
    for (let k in userClass) {
      let datas = {
        name: k,
        value: userClass[k].length,
      };
      newData.data.push(datas);
    }
  });
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      x: "left",
      y: "top",
    },
    title: {
      text: "客户职业分析", // 主标题文本，'\n'指定换行
      left: "center",
      textStyle: {
        fontFamily: "Arial",
        fontSize: 23,
        fontStyle: "normal",
        fontWeight: "bolder",
      },
    },
    series: [
      {
        name: "职业/人数",
        type: "pie",
        radius: "50%",
        data: newData.data,
      },
    ],
  };
  vocation.setOption(option);
}
// 获取当月的数据
function getTheMounth() {
  time.times = 0;
  getCustAdds(time.times);
  getContractAdds(time.times);
  getContractMoneys();
  getBackMoneys();
}
// 获取本季度的数据
function getTheQuerter() {
  time.times = 1;
  getCustAdds(time.times);
  getContractAdds(time.times);
  getContractMoneys();
  getBackMoneys();
}
// 获取今年的数据
function getThisYear() {
  time.times = 2;
  getCustAdds(time.times);
  getContractAdds(time.times);
  getContractMoneys();
  getBackMoneys();
}
// 获取上个月的数据
function getLastMounth() {
  time.times = 3;
  getCustAdds(time.times);
  getContractAdds(time.times);
  getContractMoneys();
  getBackMoneys();
}

// 显示客户dialog
function showCustDialog() {
  visible_cust.value = true;
}
// 显示合同dialog
function showContract() {
  visible_contract.value = true;
}

// 新增客户
async function getCustAdds() {
  console.log(time.times);
  await getCustAdd(1, 10000000, time.times).then((res) => {
    console.log(res.data.records);
    cust.data = res.data.records;
  });
}

// 新增合同
async function getContractAdds() {
  await getContractAdd(1, 10000000, time.times).then((res) => {
    console.log(res.data.records);
    contract.data = res.data.records;
  });
}
// 合同总金额
async function getContractMoneys() {
  await getContractMoney(1, 10000000, time.times).then((res) => {
    console.log(res.data);
    contractMoney.value = res.data;
  });
}
// 回款总金额
async function getBackMoneys() {
  await getBackMoney(1, 10000000, time.times).then((res) => {
    console.log(res.data);
    backMoney.value=res.data
  });
}

// 员工排行榜
async function getEmps() {
  await getEmpByTimes(emps.value).then((res) => {
    console.log(res.data);
    empData.data = res.data;
  });
}
</script>

<style scoped>
div {
  margin-top: 4px;
}
#icon {
  width: 150px;
  height: 50px;
}

#occupation {
  width: 800px;
  height: 450px;
}
#sales {
  width: 800px;
  height: 450px;
}
.card_data span {
  font-weight: bolder;
}
</style>