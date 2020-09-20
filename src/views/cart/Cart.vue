<template>
  <div class="cart">
      <!-- 1.导航 -->
      <nav-bar class="nav-bar">
          <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <!-- 2.列表 -->
      <cart-list class="cart-list"></cart-list>
      <!-- 3.底部汇总 -->
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'    //辅助函数，将getters映射到局部计算属性computed

export default {
    components:{
        NavBar,CartList,CartBottomBar
    },
    computed:{
        ...mapGetters(['cartLength','cartList'])   //里面也可以是对象
    }
}
</script>

<style>
.nav-bar{
    background-color:var(--color-tint);
    color:white;
    width:100%;
    position:fixed;
    top:0;
}
.cart-list{
    margin-top:44px
}
</style>