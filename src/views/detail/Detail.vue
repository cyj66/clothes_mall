<template>
<div>
  <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
  <div class="detail">
    <detail-swiper :top-images="topImages" class="detail-swiper"></detail-swiper>
    <detail-base-info :goods="goodsInfo"></detail-base-info> 
    <detail-shop-info :shop="shopInfo"></detail-shop-info>
    <detail-image-info :detail-info="detailInfo"></detail-image-info> 
    <detail-params-info :param-info="paramInfo" ref="params"></detail-params-info>
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommend"></goods-list>  
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top></back-top>
    
    <!-- <h1>详情页:{{$route.params.iid}}</h1> -->
    <!-- <h1>详情页:{{$route.query.iid}}</h1> -->
  </div>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailImageInfo from './childComps/DetailImageInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'


import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,getRecommend} from 'network/detail'

import {bestScrollY} from 'common/utils'

import {mapActions} from 'vuex'

export default {
  name:"Detail",
  components:{
    DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,
    DetailImageInfo,DetailParamsInfo,DetailCommentInfo,GoodsList,
    DetailBottomBar,BackTop
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goodsInfo:{},
      shopInfo:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTops:[],
    } 
  },
  created(){
    //组件创建时就请求数据
    //1.获取iid
      this.iid=this.$route.query.iid;
    //2.请求详情数据
      getDetail(this.iid).then(res=>{
         console.log(res.result)
        //取出轮播图数据
        this.topImages=res.result.itemInfo.topImages
        //创建商品对象,取出商品信息
        this.goodsInfo=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //取出店铺信息
        this.shopInfo=res.result.shopInfo;
        //取出详情信息
        this.detailInfo=res.result.detailInfo
        //取出参数信息
        this.paramInfo=res.result.itemParams;
        //取出评论信息
        if(res.result.rate.cRate!==0){
          this.commentInfo=res.result.rate.list[0];
        }
      })
    //3.请求详情中的推荐数据
      getRecommend().then(res=>{
        console.log(res);
        this.recommends=res.data.list
      })

        //第一次获取出错，压根不能获取元素
        // this.themeTops=[];
        // this.themeTops.push(0);
        // this.themeTops.push(this.$refs.params.$el.offsetTop);
        // this.themeTops.push(this.$refs.comment.$el.offsetTop);
        // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTops);

      //dom渲染完回来回调这个函数
      this.$nextTick(()=>{
        //第三次获取出错，图片没有渲染好，只有在连图片都渲染好后才能获取
        //此时dom渲染好，但图片没加载完(offsetTop不包含图片)
        // this.themeTops=[]
        // this.themeTops.push(0);
        // this.themeTops.push(this.$refs.params.$el.offsetTop);
        // this.themeTops.push(this.$refs.comment.$el.offsetTop);
        // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTops)
      })

      
  },
  methods:{
    // ...mapActions(['addCart']),
    titleClick(index){
      // console.log(index)
      bestScrollY(this.themeTops[index],10)
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      const product={};
      product.image=this.topImages[0]
      product.title=this.goodsInfo.title
      product.price=this.goodsInfo.realPrice
      product.iid=this.iid
      product.desc=this.goodsInfo.desc

      //2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      //这样才可保证添加成功
      this.$store.dispatch('addCart',product)
      .then(res=>{
           this.$toast.show(res,1500)
      })
      //与getters相同，actions也可以映射
      // this.addCart(product).then(res=>{
      //   console.log(res)   
      // })

    }
  },
  mounted(){
    //第二次出错，此时数据不一定都请求好了，应该放在数据请求完成的后面
    // this.themeTops.push(0);
    // this.themeTops.push(this.$refs.params.$el.offsetTop);
    // this.themeTops.push(this.$refs.comment.$el.offsetTop);
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTops)
  },
  updated(){
     this.themeTops.push(0);
     this.themeTops.push(this.$refs.params.$el.offsetTop);
     this.themeTops.push(this.$refs.comment.$el.offsetTop);
     this.themeTops.push(this.$refs.recommend.$el.offsetTop);
     console.log(this.themeTops)
  }
}
</script>

<style scoped>
.detail{
  position:relative;
  top: 44px;
}
</style>