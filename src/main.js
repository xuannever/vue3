import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Cookies from 'js-cookie'
import App from './App.vue'
import router from './router'
import plugins from './plugins'
import pinia from '@/store/index'
// import dataV from '@jiaminghi/data-view'
import 'element-plus/dist/index.css'
import scroll from 'vue-seamless-scroll/src'
// import './permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
app.use(router)
app.use(scroll)
app.use(pinia)
app.use(plugins)
// Vue.use(dataV)
// app.use(dataV)
app.use(ElementPlus, {
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})
app.mount('#app')
// createApp(App).use(router).use(ElementPlus).mount('#app')

