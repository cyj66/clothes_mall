//mutations中每个方法尽可能单一
export default {
    addCounter(state,payload){
        // console.log(payload)
        payload.count++;
    },
    addToCart(state,payload){
        payload.count=1;
        payload.checked=true;
        state.cartList.push(payload)
    }
}