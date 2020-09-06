<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
	export default {
    name: "BackTop",
    methods: {
      backClick(){
        window.scroll(0,0);
      },
    }
  }
 
</script>

<style scoped>
.back-top{
    position:fixed;
    right:5px;
    bottom:50px;
}
.back-top img {
    width: 43px;
    height: 43px;
  }
</style>
