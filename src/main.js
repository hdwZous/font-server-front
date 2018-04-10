// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import vueResource from 'vue-resource'
import 'babel-polyfill' //IE浏览器兼容
import 'eventsource-polyfill'

import ElementUI from 'element-ui'
import {Loading, Message} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/style/public.css';
Vue.use(ElementUI);

//vuex
import Vuex from 'vuex'
import store from './vuex/store'
Vue.use(Vuex);
import axios from 'axios'
Vue.prototype.$http = axios;

//vue-bus
import VueBus from 'vue-bus'
Vue.use(VueBus)

//swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
require('swiper/dist/css/swiper.css')

//数组转换为树结构对象
Vue.prototype.arryToTree = function (data, rootId, idName, idParent) {
  var result = []
  var temp = []
  for (var i = 0; i < data.length; i++) {
    if (data[i][idParent] === rootId) {
      var obj = data[i]
      temp = this.arryToTree(data, obj[idName], idName, idParent)
      if (temp.length > 0) {
        obj.list = temp
      }
      result.push(obj)
    }
  }
  return result
};

//日期格式化
Vue.prototype.formatDate = function (time) {
  var year = time.getFullYear();
  var month = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1);
  var date = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate())
  var hour = (time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours());
  var minute = (time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes());
  var second = (time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds());
  return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

//路由判断是否登录
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.clear();
  }
  let user = sessionStorage.getItem('user');
  if (!user && to.path != '/login') {
    next({path: '/login'})
  } else {
    next()
  }

  //通过导航钩子，判断是否进入/离开 字体购买量/购买量页面
  // if (to.path == '/main') {
  //   sessionStorage.setItem('toPath','fontManage');
  // }

  // var regexFm = /fontManage/g,
  //     regexFa = /fontAuthor/g,
  //     regexDm = /dataManage/g;
  // if (regexFm.test(to.path)) {
  //   sessionStorage.setItem('toPath','fontManage');
  //   Vue.bus.emit('toSideBar','fm');
  // }else if (regexFa.test(to.path)) {
  //   sessionStorage.setItem('toPath','fontAuthor')
  //   Vue.bus.emit('toSideBar','fa');
  // }else if (regexDm.test(to.path)){
  //   if (to.path.indexOf('fontBuy') != -1) {
  //     sessionStorage.setItem('toPath','dataManage/buy')
  //     Vue.bus.emit('toSideBar','dm/buy');
  //   }else if (to.path.indexOf('fontDown') != -1){
  //     sessionStorage.setItem('toPath','dataManage/down')
  //     Vue.bus.emit('toSideBar','dm/down');
  //   }else {
  //     sessionStorage.setItem('toPath','dataManage')
  //     Vue.bus.emit('toSideBar','dm');
  //   }
  // }
  if (to.path == '/main') {
    sessionStorage.setItem('toPath','main-index');
    Vue.bus.emit('toHeader','main-index')
  }else {
    sessionStorage.setItem('toPath','else');
    Vue.bus.emit('toHeader','else')
  }
});

//vue-resource拦截器
/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件

// 超时时间
axios.defaults.timeout = 120000;
// http请求拦截器
var loadinginstace;
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = Loading.service({fullscreen: true});
  config.headers.token = sessionStorage.getItem('token');  //将接口返回的token信息配置到接口请求中
  return config
}, error => {
  loadinginstace.close();
  Message.error({
    message: '加载超时'
  });
  return Promise.reject(error)
});

// http响应拦截器
axios.interceptors.response.use(res => {// 响应成功关闭loading
  loadinginstace.close();
  if (res.data.code == 401) {
    sessionStorage.clear();
    router.push({path:"/login"});
  }
  return res
}, error => {
  loadinginstace.close();
  Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
});

if (!sessionStorage.getItem('user')) {
  sessionStorage.clear();
  router.push({path:"/login"});
};

