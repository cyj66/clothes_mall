//1.将时间戳格式化函数——别人封装
// export function formatDate(date, fmt) {
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
//   }
//   let o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds()
//   };
//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + '';
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
//     }
//   }
//   return fmt;
// };
// function padLeftZero (str) {
//   return ('00' + str).substr(str.length);
// };


//2.将时间戳格式化函数——自己封装
export function formatDate(date,fmt){
  //年
  if(/(y{4})/.test(fmt)){
    fmt=fmt.replace(/y{4}/,date.getFullYear())
  }
  else if(/(y{2})/.test(fmt)){
    fmt=fmt.replace(/y{2}/,(date.getFullYear()+'').substr(2))
  }
  //其他
  let obj={
    'MM':date.getMonth()+1,
    'dd': date.getDate(),
    'hh': date.getHours(),
    'mm': date.getMinutes(),
    'ss': date.getSeconds()
  }
  for(let k in obj){
    obj[k]=obj[k]>9?obj[k]+'':'0'+obj[k]
     if((new RegExp(`(${k})`)).test(fmt)){
      fmt=fmt.replace(RegExp.$1,obj[k])
     }
  }
  return fmt
}


//2.防抖函数
export function debounce(func,delay){
  let timer=null;
  return function(...args){
    clearTimeout(timer);
    timer=setTimeout(()=>{
      func(...args)
    },delay)
  }
}

//3.网页滚动函数
// export function bestScrollY(indey,time){
//     let timer=null;
//     clearInterval(timer);
//     timer=setInterval(()=>{
//       let step=(indey-window.pageYOffset)/10;
//       step=step>0?Math.ceil(step):Math.floor(step);
//       if(window.pageYOffset==indey){
//         clearInterval(timer);
//       }
//       else{
//         window.scroll(0,window.pageYOffset+step)
//       }
//     },time)
// }

