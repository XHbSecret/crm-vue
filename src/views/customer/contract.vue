<!--这是合同组件 -->
<template>
  <div class='contract'>
      <span>这个合同组件{{contractList.data}}</span>
  </div>
</template>

<script setup>
import {getContractByCustId} from '@/api/contract/index'
import { onMounted, reactive } from '@vue/runtime-core'

let contractList = reactive({data:[]})

onMounted(()=>{
  getContractByCustId(314).then(res=>{
    contractList.data = res.data
  })
})

</script>
<style lang='scss' scoped>
  //@import url(); 引入公共css类
</style>