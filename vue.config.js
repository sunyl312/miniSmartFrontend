const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath:"/minismart2/",   // 二级域名
  assetsDir:"static", //静态文件存放的位置，默认是在根目录
  outputDir:"./minismart2", // 输出的文件夹的名字，这个要修改，否则部署的时候会导致二级域名不对
  devServer:{
    proxy:{ // 跨域设置
      '/api': {
        target: 'http://192.168.118.225:7597/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //   '^/minismart2': ''//请求的时候使用这个api就可以写公共地址后的地址
        // },
        logLevel: 'debug' // 用于检查代理的真实地址
      }
    }
  }
})
