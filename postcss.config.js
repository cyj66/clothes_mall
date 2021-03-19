module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 默认值`px`，需要转换的单位
      viewportWidth: 375,//视窗的宽度，对应的是我们设计稿的宽度(一般为750)
      viewportHeight: 667, // 视窗的高度，该宽高对应iphone6
      unitPrecision: 5,//指定`px`转换为视窗单位值的小数位数，默认是5(很多时候无法整除)
      viewportUnit: 'vw',//指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: 'vw', //指定字体需要转换成的视窗单位，默认vw;
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],
      //指定不转换为视窗单位的类class,也可以将所有不需要转化的类都添加类名ignore
      minPixelValue: 1,// 小于或等于`1px`不转换为视窗单位
      mediaQuery: false,// 允许在媒体查询中转换`px`，默认false
      exclude:[/TabBar/] //忽略的文件，上面那个是忽略的类
    }
  }
}

