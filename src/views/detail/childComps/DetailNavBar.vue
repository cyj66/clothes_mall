<template>
    <nav-bar class="navbar">
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" class="title-item"
        :class="{active:currentIndex==index}" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    methods:{
        titleClick(index){
            this.currentIndex=index;
        },
        backClick(){
            this.$router.back();
        }
    }
}
</script>

<style>
.nav-bar{
  width:100%;
}
.nav-bar img{
  margin-top:12px ;
}
.title{
  display:flex;
}
.title-item{
  flex:1;
  color:black;
  font-size:15px
}
.active{
  color:red
}
</style>