<template>
<!-- <dv-full-screen-container>content</dv-full-screen-container> -->
<!-- <dv-loading>Loading...</dv-loading> -->
<dv-border-box-3><dv-water-level-pond :config="demo" style="width:150px;height:200px" /></dv-border-box-3>
 <dv-border-box-1 style="position:relative"><dv-scroll-board :config="config" style="width:500px;height:220px;left:200px" /></dv-border-box-1>
<!-- <dv-border-box-1 style="width:100%px,height:100%">dv-border-box-5</dv-border-box-1> -->





</template>

<script>
export default {
  name: 'myForm',
  data(){
    return{
      config:{
       data: [
    ['行1列1', '行1列2', '行1列3'],
    ['行2列1', '行2列2', '行2列3'],
    ['行3列1', '行3列2', '行3列3'],
    ['行4列1', '行4列2', '行4列3'],
    ['行5列1', '行5列2', '行5列3'],
    ['行6列1', '行6列2', '行6列3'],
    ['行7列1', '行7列2', '行7列3'],
    ['行8列1', '行8列2', '行8列3'],
    ['行9列1', '行9列2', '行9列3'],
    ['行10列1', '行10列2', '行10列3']
  ]
      },
      demo:{
        data:[10]
      }
    }
  },
  methods:{
    
   
  }
}
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