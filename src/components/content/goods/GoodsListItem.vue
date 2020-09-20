<template>
  <div class="goods-item" @click="itemClick">
    <!-- 添加了图片懒加载插件，不用":src"了，用v-lazy" -->
    <img v-lazy="showImage" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      itemClick(){
        // this.$router.push('/detail/'+this.goodsItem.iid)
        this.$router.push({
          path:'/detail',
          query:{
            iid:this.goodsItem.iid
          }
        });
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image||this.goodsItem.show.img   //有两个地方会用到该组件，取数据的方式不同
      },
    },
  }
</script>

<style scoped>
  .goods-item {
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    margin-bottom:35px
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>