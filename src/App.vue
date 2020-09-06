<template>
  <div id="app">
    <!-- 详情页通过不同点击会跳转不同界面，需排除，否则created不会另外请求数据-->
    <keep-alive exclude="Detail"> 
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import './assets/css/base.css';
</style>
