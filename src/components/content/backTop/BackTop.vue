<template>
  <div class="back-top" @click="backClick" v-show="isShowBackTop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
import {bestScrollY} from 'common/utils.js'
	export default {
    name: "BackTop",
    data(){
      return {
        isShowBackTop:true
      }
    },
    methods: {
      backClick(){
        console.log(window.pageYOffset)
        bestScrollY(0,10)
      },
      ShowBackTop(){
        window.onscroll=function(){
          // console.log('scroll')
          if(window.pageYOffset>=1000){
            return true;
          }
          else{
            return false;
          }
        }
      }
    },
    mounted(){
      //监听窗口事件可在mounted中监听
      window.onscroll=()=>{
        if(window.pageYOffset>1000){
          this.isShowBackTop=true
        }else{
          this.isShowBackTop=false
        }
      }
    }
  }
 
</script>

<style scoped>
.back-top{
    position:fixed;
    right:5px;
    bottom:50px;
}
.back-top img {
    width: 43px;
    height: 43px;
  }
</style>
