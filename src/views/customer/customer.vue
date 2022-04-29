<template>
  <div style="padding: 10px">
    <!-- 功能区域 -->
    <div style="margin: 10px 0">
      <el-button type="primary">新增</el-button>
      <el-upload
        method="post"
        action="http://localhost:8088/customer/importexcel.do"
        :limit="3"
        :on-exceed="handleExceed"
        accept=".xlsx,.xls"
        :show-file-list="false"
        :on-success="success"
        name="files"
        style="display: inline-block; margin: 0 10px"
      >
        <el-button type="primary">文件上传</el-button>
      </el-upload>
      <el-button  type="primary">导出</el-button>
    </div>

    <!-- 搜索区域 -->
    <div style="margin: 10px 0">
      <!-- search模糊查询 -->
      <el-input
        v-model="search"
        placeholder="请输入关键字"
        style="width: 20%"
      />
      <el-button type="primary" style="margin-left: 5px">确认</el-button>
    </div>

    <!-- 数据展示区域 -->
    <!--border边框  stripe斑马纹 -->
    <el-table :data="custList.d" border stripe style="width: 100%" height="480"
    :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}">
     <el-table-column type="selection"/>
     <el-table-column fixed prop="custCreateTime" label="创建时间" :formatter="DateFormat" width="150" sortable/>
     <el-table-column prop="customerDetail.custDetailName" label="客户名称" width="120">
       <!-- <template scope="scope">
                <a @click="drawer(scope.row)">{{scope.row.customerDetail.custDetailName}}</a>
        </template> -->
     </el-table-column>
     <el-table-column prop="" label="跟进记录" width="120"/>
     <el-table-column prop="" label="客户类型" width="120"/>
     <el-table-column prop="" label="最后一次跟进时间" width="120"/>
     <!-- sexFormat性别格式  -->
     <el-table-column prop="customerDetail.custDetailPhone" label="电话" width="120"/>
     <el-table-column prop="customerDetail.custDetailWechat" label="微信" width="120"/>
     <el-table-column prop="customerDetail.custDetailJob" label="客户行业" width="120"/>
     <el-table-column prop="customerDetail.custDetailAddress" label="省,市,区/县" width="120"/>
     <el-table-column prop="" label="下一次联系时间" width="120"/>
     <el-table-column prop="" label="负责人" width="120"/>
     <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <!-- handleEdit触发事件：修改此表 -->
          <el-button type="text" size="small" @click="handleEdit"
            >编辑</el-button
          >
          <el-popconfirm title="是否放弃此用户?">
            <template #reference>
              <el-button type="text" size="small">放弃</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div style="margin: 10px 0">
      <el-pagination
        v-model:currentPage="pagePlugs.data.page"
        v-model:page-size="pagePlugs.data.size"
        :page-sizes="[5, 10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagePlugs.data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="float: right"
      />
    </div>
  </div>
  <!-- 抽屉区 -->
   <el-drawer
    v-model="drawerDate.data.drawer"
    title="I have a nested table inside!"
    direction="rtl"
    size="50%"
  >
  </el-drawer>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive,ref } from "vue";
import {useStore} from 'vuex'
const api = getCurrentInstance()?.appContext.config.globalProperties.$API; // api （axios管理的后端接口）

let drawerDate = reactive({data:{
  drawer:false
}});
let store = useStore()
let empId = store.state.employee.user.user.empId
let pagePlugs = reactive({
  data:{
    page:1,
    size:5,
    total:0,
  }
})
let custList = reactive({d:[]})

 onMounted(()=>{
   GetList()
 })
    //测试添加
    function GetList(){
        api.customer.getCustomers(pagePlugs.data.page,pagePlugs.data.size,1).then(response=>{
          if(response.code==200){
            console.log("xixi")
            custList.d = response.data.records
            pagePlugs.data.total = response.data.total
            console.log(custList)
            console.log("---------")
            console.log(response.data.total)
            console.log("---------")
          }
        })
    }
    // 性别格式
    function sexFormat(row,column){
        if(row.customerDetail.custSex == 0){
            return '女'
        }else if(row.customerDetail.custSex == 1){
            return '男'
        }else if(row.customerDetail.custSex == 3){
            return "未知"
        }
    }
    //时间格式
    function DateFormat(row,column){
      // 获取单元格数据
          let data = row[column.property]
          if(data == null) {
              return null
          }
          let dt = new Date(data)
          return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()

    }
    //当分页插件做出改变时
    function handleSizeChange (val){
      pagePlugs.data.size = val
      GetList()
      console.log(`${val} items per page`)
    }
    function handleCurrentChange(val) {
      pagePlugs.data.page = val
      GetList()
      console.log(`current page: ${val}`)
    }
    function drawer(row){
      this.drwer = false
    }
</script>

<style>
</style>