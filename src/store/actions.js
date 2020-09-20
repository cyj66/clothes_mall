export default {
    //里面的context还可以写成{state,commit}
    addCart(context,payload){
        return new Promise((resolve,reject)=>{
                   // console.log(payload)
            let oldProduct=context.state.cartList.find(item=>item.iid==payload.iid);
            if(oldProduct){
                context.commit('addCounter',oldProduct)
                resolve('添加商品成功')
            }else{
                context.commit('addToCart',payload)
                resolve('添加商品成功')
            }
        })
 
    }
}