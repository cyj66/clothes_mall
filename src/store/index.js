import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state={
    cartList:[]
}
const store=new Vuex.Store({
    state,mutations,actions,getters
        // //mutations里面的方法尽量单一,可将if和else里面的操作分开
        // addCart(state,payload){
        //     let oldProduct=state.cartList.find(item=>item.iid==payload.iid);
        //     if(oldProduct){
        //         oldProduct.count+=1;
        //     }else{
        //         payload.count=1;
        //         state.cartList.push(payload)
        //     }
        // }
})

export default store