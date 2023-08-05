<template>
  <div class="common-layout" style="font-size=20px ">
    <el-container>
      <el-container>
        <el-header>
          <div id="app">
    <router-view />
  </div>
		  <!-- <div>Header</div> -->
		</el-header>
        <!-- <el-main>Main</el-main>
        <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import { Document, Menu, Location, Setting} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  /* font-size: 100px!important;
  color:rgb(191, 203, 217)!important; */
}
/* .el-menu-item {
  font-size: 13px;
  color: #aebbca;
  font-weight: bold;
}
.el-sub-menu__title {
  color: #aebbca;
} */
</style>