<template>
    <div id="home">
        <nav-bar class="home-nav">
            <template v-slot:center>购物街</template>        
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <fashion-view></fashion-view>
        <tab-control class="tabcontrol" :titles="['流行','精选','新款']"
        @tabClick="tabClick"></tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list> 
        <back-top></back-top>
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
import BackTop from 'components/content/backTop/BackTop'
//方法
import {
    getHomeMultidata,
    getHomeGoods,
    } from 'network/home'


export default {
    components:{
        //顺序与上面的引入保持一致
        HomeSwiper,RecommendView,FashionView,
        NavBar,TabControl,GoodsList,BackTop
    },
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
            saveY:0
        }
    },
    created(){
        //1.请求多个数据
        this.getHomeMultidata();      //方法具体实现封装在methods中 

        //2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

    },
    methods:{
        /**
         * 事件监听相关方法
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
        },

        /**
         * 网络请求相关方法
         */
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                // console.log(res);
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
            })
        }    
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
}
.tabcontrol{
    position:sticky;
    top:44px;
    background-color: #fff;
    z-index:9
}
</style>