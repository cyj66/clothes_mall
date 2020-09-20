<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item">
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodList",
    components: {GoodsListItem},
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom:50px
  }
</style>