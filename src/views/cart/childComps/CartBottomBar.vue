<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
        <check-button class="check-button" :is-checked="isSelectAll"
        @click.native="checkAll"></check-button><span>全选</span>       
    </div>
    <div>
        合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
        去计算({{totalLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return '￥'+this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,val)=>{
                return pre+val.price*val.count
            },0).toFixed(2)
        },
        totalLength(){
            return this.$store.state.cartList.filter(item=>item.checked).length
        },
       isSelectAll(){
            //return !(this.$store.state.cartList.filter(item=>!item.checked).length)
            if(this.$store.state.cartList.length==0) return false
            return !this.$store.state.cartList.some(item=>!item.checked)
        }
    },
    methods:{
         checkAll(){
             if(this.isSelectAll){
                 this.$store.state.cartList.forEach(item=>item.checked=false)
             }else{
                 this.$store.state.cartList.forEach(item=>item.checked=true)
             }
         },
         calcClick(){
            if(!this.$store.state.cartList.find(item=>item.checked)){
                this.$toast.show('您未添加任何商品',2000)
            }
        }
    },
   
}
</script>

<style>
    .cart-bottom-bar{
        position:fixed;
        bottom:44px;
    
        display:flex;
        justify-content: space-between;

        height:44px;
        width:100%;
        line-height:44px;
        background-color: #eee;
    }
    .check-all{
        display:flex;
        align-items: center;
        padding:8px 20px 8px 10px
    }
    .check-button{
        width: 20px;
        height:20px;
        /* 否则行高会继承，为40 */
        line-height: 20px;   
    }
    .calculate{
        text-align: center;
        width:90px;
        background-color:var(--color-tint);
        color:#eee
    }
</style>