<template>
    <swiper>
        <!-- 现在v-for必须搭配:key,每一项绑定唯一的key值，目的是为了更高效地更新虚拟dom
        v-for会根据key值判断某个值是否修改，如果修改则重新渲染这一项,否则复用之前的元素 -->
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" @load="swiperImageLoad">
            </a>
        </swiper-item>
    </swiper> 
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'     //可以不用写index
export default {
    components:{
        Swiper,SwiperItem  
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            isLoad:false
        }
    },
    methods:{
        swiperImageLoad(){
            if(!this.isLoad){
                this.$emit('swiperImageLoad')   //总共有四张图片会发送四次，但其实发送一次就够了
                this.isLoad=true                //直接在自定义事件中加.once亦可
            }
        }
    }
}
</script>

<style>

</style>