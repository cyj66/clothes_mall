<template>
  <div class="tab-control">
      <!-- 只是文字不同，没必要用插槽 -->
      <div v-for="(item,index) in titles" :key="index" class="tab-control-item" 
      :class="{active:index===currentIndex}" @click="tabClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        //index参数也需要传入
        tabClick(index){
            this.currentIndex=index;
            this.$emit('tabClick',index);   //子传父
        }
    }
}
</script>

<style scoped>
/* 加上scoped则CSS样式就只能作用于当前的组件 */
.tab-control{
    display:flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
}
.tab-control-item{
    flex:1;
}
.active{
    color:var(--color-high-text);
}
.active span{
    border-bottom:3px solid var(--color-tint);
    padding: 5px;
}
</style>