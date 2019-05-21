const path = require('path');

function resolve(dir = '') {
  return path.join(__dirname, './src', dir);
}
//  https://blog.csdn.net/qq_39953537/article/details/83586004
//  https://blog.csdn.net/qq_36407748/article/details/82050976
//  https://ke.qq.com/webcourse/index.html#cid=279700&term_id=100331213&taid=2447955265340564&vid=r14288h3vj9
//  https://www.cnblogs.com/skylineStar/p/10036525.html 忽略第三方组件rem
console.log(process.env.NODE_ENV)
module.exports = {
    assetsDir: "static",
    publicPath:process.env.NODE_ENV == 'production' ? '/vadmin/' : '/',    // 资源 css images 等公共路径 如果服务器是放在子文件夹下 需要改路径为子文件夹名 默认为 /
    outputDir:'dist', // 不同的环境打不同包名
    productionSourceMap:true,  // 生产环境下css 分离文件
    devServer: {
      disableHostCheck: true,
      open: true, //是否自动开启浏览器
      port: 8081, //端口号
      https: false, //开启https请求，但是没上传证书就是警告
      hotOnly: false, //我们添加新模块的时候，能够更好的更新
    },
    configureWebpack:{  // 覆盖webpack默认配置的都在这里
      resolve: {
        alias: {
            core: resolve('core')
        }
      },
    }
}