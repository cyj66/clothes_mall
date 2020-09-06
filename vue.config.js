
module.exports={
    configureWebpack:{
        resolve:{
            alias:{      //给路径起别名，如果是在html中运用，则前面还要加~  
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    }
}