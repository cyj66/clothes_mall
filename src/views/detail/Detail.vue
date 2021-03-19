<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <!-- <h1>详情页:{{$route.params.iid}}</h1> -->
    <!-- <h1>详情页:{{$route.query.iid}}</h1> -->
    <scroll class="content" ref='scroll' @scrollPos="contentScroll"
            :probe-type="3" >
      <detail-swiper :top-images="topImages" class="detail-swiper"></detail-swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info> 
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad2="detailImageLoad2"></detail-image-info> 
      <detail-params-info :param-info="paramInfo" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>  
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
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

//import BackTop from 'components/content/backTop/BackTop'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,getRecommend} from 'network/detail'

import {debounce} from 'common/utils'
import {itemImageLoad,backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'

export default {
  name:"Detail",
  components:{
    DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,
    DetailImageInfo,DetailParamsInfo,DetailCommentInfo,GoodsList,
    DetailBottomBar,Scroll
  },
  mixins:[itemImageLoad,backTopMixin],   //混入
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
      themeTopYs:[0,1000,2000,3000],
      getThemeTopY:null,   //为了防抖
      currentIndex:0
    } 
  },
  created(){
    //组件创建时就请求数据
    //1.获取iid
      this.iid=this.$route.query.iid;
    //2.请求详情数据
      getDetail(this.iid).then(res=>{
         //console.log(res.result)
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
        //console.log(res);
        this.recommends=res.data.list
      })

      //第三次，错误，$nextTick是指dom渲染完回调这个函数，但图片不一定加载完
      // this.$nextTick(()=>{
        // this.themeTops=[]
        // this.themeTops.push(0);
        // this.themeTops.push(this.$refs.params.$el.offsetTop);
        // this.themeTops.push(this.$refs.comment.$el.offsetTop);
        // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTops)
      //})

    //4.对getThemeTopY赋值并防抖
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs)
      },500) 
  },
  methods:{
    detailImageLoad2(){
      this.newRefresh()    //混入实现防抖（其实也可以直接写），也可以和之前一样在mounted中运用事件总线
      //第四次,正确，在图片加载完进行操作
      this.getThemeTopY()
    },
    titleClick(index){
      //console.log(index)
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      //console.log(position)
      //1.backTop组件的隐藏与消失
      this.isShow=position.y<-1000
      //2.滚动与顶部导航栏对应
      const positionY=-position.y
      //自己的简易版
      // if(positionY>=this.themeTopYs[0]){
      //   this.$refs.nav.currentIndex=0
      // }
      // if(positionY>=this.themeTopYs[1]){
      //   this.$refs.nav.currentIndex=1
      // }
      // if(positionY>=this.themeTopYs[2]){
      //   this.$refs.nav.currentIndex=2
      // }
      // if(positionY>=this.themeTopYs[3]){
      //   this.$refs.nav.currentIndex=3
      // }
      //why老师的专业版
      let length=this.themeTopYs.length
      for(let i=0;i<length;i++){
        if(this.currentIndex!==i     //防止赋值过于频繁
        &&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
        ||(i==length-1&&positionY>=this.themeTopYs[i]))){
          this.currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
    },
    // ...mapActions(['addCart']),
    addToCart(){
      //1.获取购物车需要展示的信息
      const product={};
      product.image=this.topImages[0]
      product.title=this.goodsInfo.title
      product.price=this.goodsInfo.realPrice
      product.iid=this.iid    //虽然不需要展示，但是作为商品唯一标识
      product.desc=this.goodsInfo.desc

      //2.将商品添加到购物车（知识点：promise+mapActions）
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
    //第一次，错误，此时数据不一定都请求完成,直接放在created也不行，此时元素还没渲染
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs)
    // console.log('detail mounted')
      const refresh=debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('detailItemImageLoad',()=>{
          refresh()     
      })
  },
  updated(){
    //第二次，正确，但是会因更新而计算多次
    // this.themeTopYs=[]
    //  this.themeTopYs.push(0);
    //  this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //  this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //  console.log(this.themeTopYs)
  }
}
</script>

<style scoped>
.detail{
  position:relative;
  z-index:99;
}
.content{
  position:relative;
  top:44px;
  background-color: #fff;
  height:calc(100vh - 44px);
  overflow: hidden;
}
</style>