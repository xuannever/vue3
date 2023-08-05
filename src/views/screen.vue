<template>
<dv-full-screen-container>
  <!-- <dv-border-box-1 style="position:relative">
    </dv-border-box-1> -->
    <h2 style="margin:0;text-align:center;border-style:solid">复核看板</h2>
    <el-table
      :show-header=true
      :show-body=false
      height="50"
      border
      stripe
      class="custom-table-2 hidden-tbody"
      @cell-dblclick="getScreen"
      :header-cell-style="{background:'#409EFF',color:'black',height:'10px'}"
    >
      <el-table-column label="线体" prop="postId" width="70" />
      <!-- <el-table-column label="模组" prop="postName" width="60"/> -->
      <el-table-column label="站位" width="100">
        <template #default="scope">
          <i v-if="scope.row.status == 0" style="color:red">正常</i>
          <i v-if="scope.row.status == 1" style="color:red">停用</i>
        </template>
      </el-table-column>
      <el-table-column label="机器名" prop="createTime" width="100"/>
      <el-table-column label="飞达ID" prop="postId" />
        <el-table-column label="料号" prop="postId" >
      </el-table-column>
    <el-table-column label="物料料盘号" prop="postId" width="250"/>
    <el-table-column label="上料时间" prop="postId" width="150"/>
    <el-table-column label="复核时间" prop="postId"/>
    <el-table-column label="是否复核" prop="postId" width="100" />
    <el-table-column label="复核人" prop="postId" width="80"/>
    <el-table-column label="预估时间" prop="expectTime" />
    </el-table>
<div class="screen">

  </div>
  <div class="screen1">
  <vue-seamless-scroll :data="demoData" class="seamless-warp" :class-option="defaultOption">
  <el-table
      :show-header=false
      :data="demoData"
      border
      class="custom-table-2 hidden-tbody"
      style="width:100%,float:center"
      max-height="2000px"
      @cell-dblclick="getScreen"
     :row-style="rowState"
    >
      <el-table-column label="线体" prop="lineName" width="70" />
      <!-- <el-table-column label="模组" prop="module" width="60"/> -->
      <el-table-column label="站位" prop="station" width="100">
      </el-table-column>
      <el-table-column label="机器名"  prop="machineName" width="100"/>
      <el-table-column label="飞达ID" prop="feederId" />
        <el-table-column label="料号" prop="pn" >
      </el-table-column>
    <el-table-column label="物料料盘号" prop="allReelId" width="250"/>
    <el-table-column label="上料时间" prop="createTime" width="150"/>
    <el-table-column label="复核时间" prop="nuclearTime"/>
    <el-table-column label="是否复核" width="100">
        <template #default="scope">
          <i v-if="scope.row.loadStatus == 0"  >等待复核</i>
          <i v-if="scope.row.loadStatus == 1" >已锁机</i>
          <i v-if="scope.row.loadStatus == 2" >已复核</i>
        </template>
      </el-table-column>
    <el-table-column label="复核人" prop="user" width="80"/>
    <el-table-column label="预估时间" prop="expectTime" />
    </el-table>

	
  </vue-seamless-scroll>
  </div>
  <!-- <dv-border-box-1 style="position:relative">
    </dv-border-box-1> -->
    <h2 style="position:relative;margin:0;text-align:center;border-style:solid;background-color:white">余料看板</h2>
    <div class="screen">
<el-table
      :show-header=true
      :show-body=false
      height="50"
      border
      stripe
      class="custom-table-2 hidden-tbody"
      @cell-dblclick="getScreen"
      :header-cell-style="{background:'#409EFF',color:'black',height:'10px'}"
    >
      <el-table-column label="线体" prop="postId" />
      <!-- <el-table-column label="模组" prop="postName" /> -->
      <el-table-column label="站位" >
        <template #default="scope">
          <i v-if="scope.row.status == 0" style="color:red">正常</i>
          <i v-if="scope.row.status == 1" style="color:red">停用</i>
        </template>
      </el-table-column>
      <el-table-column label="机器名" prop="createTime" />
      <el-table-column label="feeder ID" prop="postId" />
        <el-table-column label="料号" prop="postId" >
      </el-table-column>
    <el-table-column label="物料料盘号" prop="postId" width="450"/>
    <el-table-column label="余料数量" prop="postId" />
    </el-table>
  </div>
    <vue-seamless-scroll :data="demoData1" :class-option="defaultOption" class="seamless-warp" >
  <el-table
      :show-header=false
      :data="demoData1"
      border
      class="custom-table-2 hidden-tbody"
      style="width:100%,float:center"
      max-height="2000px"
      @cell-dblclick="getScreen"
     :row-style="rowState"
    >
      <el-table-column label="线体" prop="lineName" />
      <!-- <el-table-column label="模组" prop="module" /> -->
      <el-table-column label="站位" prop="station" >
      </el-table-column>
      <el-table-column label="机器名" prop="machineName" />
      <el-table-column label="feeder ID" prop="feederId" />
        <el-table-column label="料号" prop="partNumber" >
      </el-table-column>
    <el-table-column label="物料料盘号" prop="allReelId" width="450"/>
    <el-table-column label="余料数量" prop="currentQty"/>
    </el-table>

	
  </vue-seamless-scroll>
</dv-full-screen-container>
</template>
<script setup>
import { getCodeImg , login ,getBoard,getReview,getSurplus} from "@/api/login" 
import Cookies from "js-cookie"
import { getToken ,removeToken } from "@/utils/auth";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUseStore from '@/store/modules/user'
import { onMounted, reactive, toRefs ,ref, defineComponent, computed, onBeforeUnmount} from "vue";
import {vueSeamless} from "vue-seamless-scroll";
const data = reactive({
  form: {
    postId: undefined,
    postCode: undefined,
    postName: undefined,
    postSort: 1,
    status: "0",
  },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    postCode: undefined,
    postName: undefined,
    status: undefined
  }
});
const demoData = ref([])
const demoData1 = ref([])
const value = ref('')
     const rowState = (arg) => {
      // console.log(arg)
      if(arg.row.loadStatus == 1  ){
        return {
        backgroundColor: '#ff0033',
        color: 'black'
      }
      }
      if(arg.row.loadStatus == 2){
        return {
          backgroundColor: '#3ab54a',
          color: 'black'
        }
      }
       if(arg.row.loadStatus == 0){
        return {
          backgroundColor: 'yellow',
          color: 'black'
        }
      }
      if(arg.row.currentQty < 1000  ){
        return {
        backgroundColor: '#ff0033',
        color: 'black'
      }
      }
    } 
// computed:{
//   vm(){
//     return{
//       step:0.2
//     }
//   }
// }
const state = reactive({
  time: 10,
  time1: 15,
  timer: null,
  timer1: 0
})

let defaultOption = computed(()=>{
  return {
     step: 0.2, // 数值越大速度滚动越快
                    limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                    hoverStop: true, // 是否开启鼠标悬停stop
                    direction: 1, // 0向下 1向上 2向左 3向右
                    openWatch: true, // 开启数据实时监控刷新dom
                    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                    waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
  }
})

onMounted(() =>{
  state.timer = setInterval(() =>{
    // state.time--;
    // if(!state.time) {
    //   state.time = 10;
    //   getScreen();
    //   state.timer = 0;
    // }
     getScreen();
  },10000);
  //  state.timer1 = setInterval(() =>{
  //   state.time1--;
  //   if(!state.time1) {
  //     state.time1 = 15;
  //     getScreen1();
  //     // clearInterval(state.timer1);
  //     state.timer1 = 0;
  //   }
  //  },1000)
});
onBeforeUnmount(()=>{
  console.log(123)
  clearInterval(state.timer)
  console.log(222)
    clearInterval(state.timer1)
    console.log(333)
    state.timer = null;
    state.timer1 = null;
})
// function getScreen() {
//     getBoard("1").then(res =>{
//         if(res){
//             demoData.value = res.rows
//             console.log(demoData.value)
//             // console.log(demoData.value)
//         }
//     })
// }

function getScreen() {
    getReview("1").then(res =>{
        if(res){
            demoData.value = res.data
            console.log(demoData.value)
            // console.log(demoData.value)
        }
    })
}

function getScreen1(){
  getSurplus("1").then(res =>{
    if(res){
      demoData1.value = res.data
    }
  })
}


getScreen();
getScreen1();
</script>
<style lang='scss' scoped>
.screen{
   display: flex;
  width: 100%!important;
  height: 100%!important;
  // background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
  background-attachment: fixed;
  position: absolute;
}
.screen1{
  height: 30%!important;
}
.el-table .cell{
  line-height:50px;
}
 .seamless-warp {
        height: 450px;
        line-height: 200px;
        overflow: hidden;
    }

.hidden-tbody.el-table {
    height: 100%px!important;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 32px;
    text-align: center;
    // background-color: aqua;
    tbody { //隐藏上面表格的tbody
      display: none;
      overflow: hidden;
    }
  }
  .auto-scorll-table {
    height: calc(100% - 34px);
    overflow: hidden;
  }
  .hidden-thead.el-table {
    border-top: none; //防止边框重叠
    thead { //隐藏下面表格的thead
      display: none;
      overflow: hidden;
    }
  }
  
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

</style>
