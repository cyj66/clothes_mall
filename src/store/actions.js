export default {
    //里面的context还可以写成{state,commit}
    addCart(context,payload){
        //之所以用到Promise,是为了成功后把消息传出去
        return new Promise((resolve,reject)=>{
                   // console.log(payload)
            //此处没有修改state，所以可以
            let oldProduct=context.state.cartList.find(item=>item.iid==payload.iid);  
            if(oldProduct){
                context.commit('addCounter',oldProduct)
                resolve('该商品数量+1')
            }else{
                context.commit('addToCart',payload)
                resolve('添加商品成功')
            }
        })
 
    }
}