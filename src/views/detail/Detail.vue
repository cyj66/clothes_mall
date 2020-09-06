<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <!-- <h1>详情页:{{$route.params.iid}}</h1> -->
    <!-- <h1>详情页:{{$route.query.iid}}</h1> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import {getDetail} from 'network/detail'
export default {
  name:"Detail",
  components:{
    DetailNavBar,DetailSwiper
  },
  data(){
    return {
      iid:null,
      topImages:[]
    } 
  },
  created(){
    //组件创建时就请求数据
    //1.获取iid
      this.iid=this.$route.query.iid;
    //2.请求详情数据
      getDetail(this.iid).then(res=>{
        //取出轮播图数据
        this.topImages=res.result.itemInfo.topImages
      })
  }
}
</script>

<style scoped>

</style>