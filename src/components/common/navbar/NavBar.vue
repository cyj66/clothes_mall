<template>
<!-- 导航栏在多处会用到，因此不用id -->
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>    
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-bar{
    display:flex;
    height: 44px;
    line-height:44px;
    text-align: center;
    font-size:20px;
    position:fixed;
}
.left,.right{
    width: 60px;
}
.center{
    flex:1;
    color:white;  
}
</style>