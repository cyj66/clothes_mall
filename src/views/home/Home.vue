<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:center>购物街</template>        
        </nav-bar>
        <!-- 完成吸顶效果，没办法better-scroll导致太多失效 -->
        <tab-control class="tabcontrol" :titles="['流行','新款','精选']"
                @tabClick="tabClick" ref='tabControl2'
                v-show='isShowTab'></tab-control>
        <!-- 父传子属性需要改为驼峰，子传父自定义事件名不需要改为驼峰,不加:则会把字符串传过去-->
        <scroll class="content" ref="scroll" 
                :probe-type="3" @scrollPos="scrollPos"
                :pull-up-load="true" @pullingUp='loadMore'>
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <fashion-view></fashion-view>
            <tab-control class="tabcontrol" :titles="['流行','新款','精选']"
                        @tabClick="tabClick" ref='tabControl'
                        v-show='!isShowTab'></tab-control>
            <goods-list :goods="goods[currentType].list"></goods-list> 
        </scroll> 
       
        <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>

</template>

<script>
//子组件
import HomeSwiper from './childComps/HomeSwiper'
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
import RecommendView from './childComps/RecommendView'
import FashionView from './childComps/FashionView' 
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
//方法
import {
    getHomeMultidata,
    getHomeGoods,
    } from 'network/home' 
import {debounce} from 'common/utils'
import {itemImageLoad,backTopMixin} from 'common/mixin'

export default {
    components:{
        //顺序与上面的引入保持一致
        HomeSwiper,RecommendView,FashionView,
        NavBar,TabControl,GoodsList,Scroll
    },
    mixins:[itemImageLoad,backTopMixin],   //混入
    data(){     //用于保存返回的数据
        return {
            // result:null
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            //isShow:false,
            tabOffsetTop:0,
            isShowTab:false,
            saveY:0
        }
    },
    //生命周期监听
    created(){
        //1.请求多个数据
        this.getHomeMultidata();      //方法具体实现封装在methods中 

        //2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    mounted(){
        //1.监听goodsitem中图片加载完成
        const refresh=debounce(this.$refs.scroll.refresh,200)  //要进行防抖处理
        this.$bus.$on('homeItemImageLoad',()=>{
            refresh()     
        })
      console.log('home mounted')
        //2.获取tabControl的offsetTop来实现吸顶效果，注意不可以直接获取，因为图片不一定加载好
        //所有组件都有一个属性$el,用于获取组件中的元素!!!!!!!!!!!!!!!!!!!
        //console.log(this.$refs.tabControl)
        //console.log(this.$refs.tabControl.$el.offsetTop)  

    },
    activated(){
       this.$refs.scroll.refresh()    //多次点击后会出现一些滚动bug
       this.$refs.scroll.scroll.scrollTo(0,this.saveY,0) 
    },
    deactivated(){
        this.saveY=this.$refs.scroll.scroll.y
        //console.log(this.saveY)   
    },
    methods:{
        /**
         * 1、事件监听相关方法
         */
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop'
                    break
                case 1:
                    this.currentType='new'
                    break
                case 2:
                    this.currentType='sell'
                    break
            }
            this.$refs.tabControl.currentIndex=index
            this.$refs.tabControl2.currentIndex=index
        },
        // backClick(){
        //     this.$refs.scroll.scroll.scrollTo(0,0,500)     //x,y坐标及毫秒数
        // },
        scrollPos(position){
            //1.判断backTop是否显示
            this.isShow=position.y<-1000
            //2.决定tabControl是否吸顶
            if(position.y<=-this.tabOffsetTop){
                this.isShowTab=true
            }else{
                this.isShowTab=false
            }
        },
        loadMore(){
            this.getHomeGoods(this.currentType)
            this.$refs.scroll.scroll.refresh()   //每次上拉加载完刷新高度
        },
        swiperImageLoad(){
            //console.log(this.$refs.tabControl.$el.offsetTop)
            this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
        },
        /**
         * 2、网络请求相关方法
         */
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                console.log(res);
                // this.result=res;
                this.banners=res.data.banner.list;    //本来是有两层data，但是响应拦截返回了一层所以只剩一层
                this.recommends=res.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1;   //只能用[],因为type是变量
            getHomeGoods(type,page).then(res=>{
                console.log(res);
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page+=1;

                this.$refs.scroll.scroll.finishPullUp()    //重置上拉加载事件，放在loadMore()中亦可
            })
        },
       
    }
}
</script>

<style scoped>
.home-nav{
    /* css居然也可以用变量了！！！ */
    background-color: var(--color-tint); 
    position:fixed;
    top:0;
    width:100%;
    z-index:999;

}
#home{  
    padding-top:44px;
    height:100vh;
}
/* 用了better-scroll后失效 */
.tabcontrol{
    /*position:absolute;*/
    /*top:44px*/
    background-color: #fff;
    width:100%
} 
.content{
    height:calc(100vh - 49px);
    overflow:hidden;
}

</style>