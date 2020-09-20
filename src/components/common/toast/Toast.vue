<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    props:{
        //封装后不需要通过组件的方式传
        // message:{
        //     type:String,
        //     default:''
        // },
        // show:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return {
            message:'',
            isShow:false
        }
    },
    methods:{
        //给默认参数
        show(message,duration=1500){
            //duration=duration||1500
            this.isShow=true;
            this.message=message;
            setTimeout(()=>{
                this.isShow=false;
                this.message=''
            },duration)
        }
    }
}
</script>

<style>
.toast{
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    padding:8px 10px;   
    color:white;
    background-color: rgba(0,0,0,.8);
    z-index:999
}
</style>