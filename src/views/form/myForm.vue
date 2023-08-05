<template>
<!-- <dv-full-screen-container>content</dv-full-screen-container> -->
<!-- <dv-loading>Loading...</dv-loading> -->
<!-- <dv-border-box-3><dv-water-level-pond :config="demo" style="width:150px;height:200px" /></dv-border-box-3> -->
 <dv-border-box-1 style="position:relative"><dv-scroll-board :config="config" style="width:500px;height:220px;left:200px" /></dv-border-box-1>
<!-- <dv-border-box-1 style="width:100%px,height:100%">dv-border-box-5</dv-border-box-1> -->
<dv-capsule-chart :config="config" style="width:300px;height:200px" />





</template>

<script setup>
import { getBoard} from "@/api/login" 
import { arrowMiddleware } from "element-plus";
import { onMounted, reactive, toRefs ,ref, defineComponent, getCurrentInstance} from "vue";

const demoData = ref([])
const dataAry =ref([])
const z1 = ref([])
const z2 = ref([])
const nowData = ref([])
// const demoData1 = ref([
  
//     // ['行1列1', '行1列2', '行1列3'],
//     // ['行2列1', '行2列2', '行2列3'],
//     // ['行3列1', '行3列2', '行3列3'],
//     // ['行4列1', '行4列2', '行4列3'],
//     // ['行5列1', '行5列2', '行5列3'],
//     // ['行6列1', '行6列2', '行6列3'],
//     // ['行7列1', '行7列2', '行7列3'],
//     // ['行8列1', '行8列2', '行8列3'],
//     // ['行9列1', '行9列2', '行9列3'],
//     // ['行10列1', '行10列2', '行10列3']
  
//   ])
    const internalInstance = getCurrentInstance()
    const config = reactive({
      header: ['组件', '分支', '覆盖率'],
      data:[
					
					],
      // console.log("A"+data),
      rowNum: 7, //表格行数
      headerHeight: 35,
      headerBGC: '#0f1325', //表头
      oddRowBGC: '#0f1325', //奇数行
      evenRowBGC: '#171c33', //偶数行
      index: true,
      columnWidth: [50],
      align: ['center']
    })
    // return { config }
const { data } = toRefs(config);
// export default defineComponent{
//   name: 'myForm',
//   data(){
//     return{
//       config:{
//        data: [
//     demoData.value
//   ]
//       },
//       // demo:{
//       //   data:[10]
//       // }
//     }
//   },
//   methods:{
    
   
//   }
// }
function getScreen(){
  getBoard("1").then(res =>{
     data.value = [["1"],["2"],["3"]]
    // z2 =z1.value
    console.log(z1)
    if(res.code == 200){
      demoData.value = res.rows
      //  let { data } = res;
       console.log(res)
       console.log(demoData.value)
        let dataAry = [];
        let data = demoData.value
        JSON.parse(JSON.stringify(data))
        var demo = JSON.parse(JSON.stringify(data))
          console.log(JSON.parse(JSON.stringify(data)))
          for (let i = 0; i < demo.length; i++) {
            dataAry.push([demo[i].postId])
          }
          console.log(dataAry)
  //        config.data = (
  
  //   ['行1列1', '行1列2', '行1列3'],
  //   ['行2列1', '行2列2', '行2列3'],
  //   ['行3列1', '行3列2', '行3列3'],
  //   ['行4列1', '行4列2', '行4列3'],
  //   ['行5列1', '行5列2', '行5列3'],
  //   ['行6列1', '行6列2', '行6列3'],
  //   ['行7列1', '行7列2', '行7列3'],
  //   ['行8列1', '行8列2', '行8列3'],
  //   ['行9列1', '行9列2', '行9列3'],
  //   ['行10列1', '行10列2', '行10列3']
  
  // )
          // let demoData1 = {...dataAry}
          // const {proxy} = getCurrentInstance();
          // console.log(proxy)
          // let config = proxy.config
          // let nowData = config.value
          // const nowData = config
         let nowData = config.data
						nowData = dataAry
						// 这个地方必须这样写
						config.data = (
							['1','2']
            )
console.log(dataAry)
console.log({...dataAry})
        // config = {
        //   header: ['操作时间', '类型', '操作的仓库', '备注'],
        //   data: dataAry
        // }
    }
  })
}
getScreen()
</script>
  
<style lang="scss" scoped>
#hello {position: relative;}
#contextmenu {
  position:absolute;
  top: 0;
  left: 0;
  height:auto;
  width:120px;
  border-radius: 3px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
  padding: 10px;
  z-index: 12;
  button {display:block;margin:0 0 5px;}
}
.hideContextMenu {position:absolute;top:5px;right:5px;}
</style>