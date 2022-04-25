<script>
export default {
  created: function() {
    //全局监听，页面刷新的时候将store里state的值存到sessionStorage中，
    //然后从sessionStorage中获取，再赋值给store。然后再把session里面
    //存的删除即可，相当于中间件的作用。在页面加载时读取sessionStorage
    //里的状态信息
    console.group("in main.js created............................begin")
    if (sessionStorage.getItem("state")) {
      //替换 store 的根状态，状态合并
      //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性
      //，复制到目标对象（target）。Object.assign(target, source1, source2);
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state.employee,
          JSON.parse(sessionStorage.getItem("state"))
        )
      )
     
    }
    console.log("in main.js created............................end")
    console.groupEnd()
  },
  mounted: function() {
    window.addEventListener('beforeunload', () => {  // 添加window卸载 侦听事件，
      //刷新前将目前登录的用户保存到sessionStorage中
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  }
}
  
</script>
<script setup>

// import{onMounted,onBeforeUnmount} from 'vue'
// import { useStore } from "vuex"

//   const store=useStore()   // store 
//   console.log(store," = store")
//   console.log("token",store.state.employee)
//   console.log("token",store.state.employee.token )

	// onBeforeMount(()=>{    // 挂载前
	// 	if (sessionStorage.getItem("state")) {   
	// 		  store.replaceState(
	// 			Object.assign(
	// 			  store.state.employee,
	// 			  JSON.parse(sessionStorage.getItem("state"))
	// 			)
	// 		  )
	// 	   sessionStorage.removeItem("state")
	// 	}
	// })

  // onBeforeUnmount(()=>{   // 卸载前 将 vuex的数据存在sessionstorage
  //   console.log("卸载...") 
  //   alert("haha")
	// 	// window.addEventListener('beforeunload', () => {
	// 	  //刷新前将目前登录的用户保存到sessionStorage中		  
	// 		// if(store.state.user.userName!=""){
	// 			sessionStorage.setItem('state', JSON.stringify(store.state))//JSON.stringify(store.state.employee)
			// }
		// })
  // })

	// onMounted(()=>{   // 挂载完成
  //   if (sessionStorage.getItem("state")) {    // sessionstorage 有state
	// 		  store.replaceState(
	// 			Object.assign(
	// 			  store.state,
	// 			  JSON.parse(sessionStorage.getItem("state"))
	// 			)
	// 		  )
	// 	  //  sessionStorage.removeItem("state")
	// 	}
	// })

</script>

<template>
    <router-view></router-view>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
