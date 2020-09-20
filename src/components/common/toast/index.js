//toast插件封装
import Toast from './Toast.vue'
const obj={}

//默认可以传Vue
obj.install=function(Vue){
    // console.log('执行了插件的install',Vue)
    //1.创建组件构造器
    const toastConstructor=Vue.extend(Toast)

    //2.new的方式，根据组件构造器创建组件对象
    const toast=new toastConstructor()

    //3.将组件对象手动挂载到某一元素上
    toast.$mount(document.createElement('div'))

    //4.此时toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    
    Vue.prototype.$toast=toast
}
export default obj