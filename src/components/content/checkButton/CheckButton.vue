<template>
  <div class="check-button" :class="{check:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    props:{
        isChecked:{
            type:Boolean,
            //该商城默认选中的话应该在具体的模型对象（mutations）中修改，而不是在此处组件内修改
            default:false    
        }
    }
}
</script>

<style>
.check-button{
    border-radius: 50%;
    border:2px solid #aaa
}
.check{
    border-color:var(--color-tint);
    background-color:var(--color-tint);
}
</style>