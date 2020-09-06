<template>
    <swiper>
        <!-- 现在v-for必须搭配:key,每一项绑定唯一的key值，目的是为了更高效地更新虚拟dom
        v-for会根据key值判断某个值是否修改，如果修改则重新渲染这一项,否则复用之前的元素 -->
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image">
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
    }
}
</script>

<style>

</style>