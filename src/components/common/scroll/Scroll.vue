<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot> 
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null   //保存scroll
        }
    },
    mounted(){
        //1.创建bsroll对象
        //由于wrapper在多个地方被引用，因此一般不这样获取元素
        //let wrapper=document.getElementsByClassName('wrapper')[0]
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,  //是否要实时监听
            pullUpLoad:this.pullUpLoad
        })
        //2.监听滚动的位置
        if(this.probeType===2||this.probeType===3){
            this.scroll.on('scroll',position=>{
                this.$emit('scrollPos',position)    //实时监听滚动并发送到页面中
            })
        }
        //3.监听scroll滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                //console.log('到底')
                this.$emit('pullingUp')
            })
        }
        //3.监听上拉加载
        // this.scroll.on('pullingUp',()=>{
        //     this.$emit('pullingUp')
        // })
    },
    methods:{
        refresh(){
            //console.log('防抖刷新')
            this.scroll&&this.scroll.refresh()    //判断是否挂载上
        }
    }
}
</script>

<style>

</style>