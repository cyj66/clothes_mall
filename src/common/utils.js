//1.将时间戳格式化函数
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

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
export function bestScrollY(indey,time){
    let timer=null;
    clearInterval(timer);
    timer=setInterval(()=>{
      let step=(indey-window.pageYOffset)/10;
      step=step>0?Math.ceil(step):Math.floor(step);
      if(window.pageYOffset==indey){
        clearInterval(timer);
      }
      else{
        window.scroll(0,window.pageYOffset+step)
      }
    },time)
}

