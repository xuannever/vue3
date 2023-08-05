<template>
<dv-full-screen-container>
    <h2 style="position:relative;margin:0;text-align:center;border-style:solid;background-color:white">余料看板</h2>
    <h2 style="position:relative;margin:0;text-align:center;background-color:white"><span style="background-color:#00cc00;">缘色</span>表示正常生产<span style="background-color: yellow;">黄色</span>表示快打完<span style="background-color: #ff0033;">红色</span>表示已打完要换料</h2>
    <div class="screen">
<el-table
      :show-header=true
      height="100%"
      :data="demoData"
      border
      class="custom-table-2 hidden-tbody"
      @cell-dblclick="getScreen"
      :row-style="rowState"
      :header-cell-style="{background:'#409EFF',color:'black',height:'10px',size:'25px'}"
    >
      <el-table-column label="線別" prop="lineName"  width="70"/>
      <!-- <el-table-column label="工單" >
        <template #default="scope">
          <i v-if="scope.row.status == 0" style="color:red">正常</i>
          <i v-if="scope.row.status == 1" style="color:red">停用</i>
        </template>
      </el-table-column> -->
      <el-table-column label="工單" prop="workOrderCode" />
      <el-table-column label="面次" prop="tb" width="70"/>
      <el-table-column label="站位" prop="station" />
        <el-table-column label="原料料號" prop="partNumbers" width="150">
      </el-table-column>
    <el-table-column label="Reel ID" prop="reelId" width="200"/>
    <el-table-column label="料盘数量" prop="quantity" />
    <el-table-column label="上料時間" prop="createTime" width="200"/>
    <el-table-column label="總上料数量" prop="qntys" width="100"/>
    <el-table-column label="已用数量" prop="usedQty" width="80"/>
    <el-table-column label="剩餘数量" prop="currentQty" width="80"/>
    </el-table>
  </div>
    <!-- <vue-seamless-scroll :data="demoData" :class-option="defaultOption" class="seamless-warp" >
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
      <el-table-column label="站位" prop="station" >
      </el-table-column>
      <el-table-column label="机器名" prop="machineName" />
      <el-table-column label="feeder ID" prop="feederId" />
        <el-table-column label="料号" prop="partNumber" >
      </el-table-column>
    <el-table-column label="物料料盘号" prop="allReelId" width="450"/>
    <el-table-column label="余料数量" prop="currentQty"/>
    </el-table>

	
  </vue-seamless-scroll> -->
</dv-full-screen-container>
</template>
<script setup>
import { getCodeImg , login ,getBoard,getReview,getSurplus,getWare} from "@/api/login" 
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
      if(arg.row.status == 1){
        return {
          backgroundColor: '#ff0033',
          color:'black'
        }
      }
      if(arg.row.status == 2){
        return {
          backgroundColor:'yellow',
          color:'black'
        }
      }
      if(arg.row.status == 3){
        return {
          backgroundColor:'#00cc00',
          color:'black'
        }
      }
      if(arg.row.status == 4){
        return {
          backgroundColor:'#409eff',
          color:'black'
        }
      }
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
    //   if(arg.row.currentQty < 1000  ){
    //     return {
    //     backgroundColor: '#ff0033',
    //     color: 'black'
    //   }
    //   }
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
    getWare().then(res =>{
        if(res){
            demoData.value = res.data
            console.log(demoData.value)
            // console.log(demoData.value)
        }
    })
}

// function getScreen1(){
//   getSurplus("1").then(res =>{
//     if(res){
//       demoData1.value = res.data
//     }
//   })
// }


getScreen();
// getScreen1();
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
  font-weight: bold;
  text-align: center!important;
}
.screen1{
  height: 30%!important;
}
.el-table .cell{
  line-height:50px;
}
 .seamless-warp {
        height: 100%;
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
 .el-table .el-table__cell {
  text-align: center!important;
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
