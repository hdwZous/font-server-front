import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/components/fontManage/index'
import fontManage from '@/components/fontManage/fontManage'
import updateFont from '@/components/fontManage/updateFont'
import fontDetail from '@/components/fontManage/fontDetail'
import form from '@/components/fontManage/form'
//作者管理
import authorManage from '@/components/authorManage/index'

import Login from '@/components/login'
import Main from '@/components/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: form
      // hidden: true
    },
    {
      path: '/main',
      component: Main,
      children: [
        { path: '', component: index },
        { path: 'fontManage', component: fontManage },
        { path: 'fontManage/fontDetail/:fontId', component: fontDetail },
        { path: 'fontManage/updateFont/:fontId', component: updateFont },
        { path: 'authorManage/:fontId', component: authorManage }
      ]
    },
  ]
})
