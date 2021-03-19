//混入，针对的是对象，混入后会与私有东西合并
import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemImageLoad={
    data(){
      return {
        newRefresh:null
      }
    },
    mounted(){
      this.newRefresh=debounce(this.$refs.scroll.refresh,200)  //要进行防抖处理
      //console.log('吾乃混入内容')
    }
}

//回到顶部按钮的混入
export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return {
      isShow:false
    }
  },
  //methods里面的函数不会互相混入，只会覆盖，而生命周期函数可以
  methods:{
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,500)     //x,y坐标及毫秒数
    },
  }
}