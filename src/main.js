import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

//安装toast插件,并执行插件中的install方法
Vue.use(toast)
//消除移动端点击300ms延迟问题
FastClick.attach(document.body)
//图片懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')   //占位图
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
