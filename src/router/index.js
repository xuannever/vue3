import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/demo',
    component: () => import('@/views/demo/demo'),
    name: 'demo',
    meta: { title: 'Demo', icon: 'form' }
  },
  {
    path:'/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path:'/login',
    component: () => import('@/views/login'),
    // hidden:true
  },
  {
   path:'/qc',
   component: () => import('@/views/qc')
  }
  ,
  {
    path:'/ware',
    component: () => import('@/views/ware')
  },
  {
    path:'/screen',
    component: () => import('@/views/screen')
  },
  {
    path:'/vm',
    component: () => import('@/views/vm')
  },
  {
    path:'/form',
    component: () => import('@/views/form/myForm'),
    name: 'form',
    meta: { title: 'Form',icon:' form'}
  },
  // {
  //     path: '/demo',
  //     component: () => import('@/views/demo/demo'),
  //     name: 'demo',
  //     meta: { title: 'Demo', icon: 'form' }
  //   }
]
  


const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
