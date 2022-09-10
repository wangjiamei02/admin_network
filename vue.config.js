const { defineConfig } = require('@vue/cli-service')
//在进行path路径相关的操作前,需要先引入该模块
const path = require('path')

//这里的 webpack配置 会和 webpack默认配置 进行合并
module.exports = defineConfig({
  //基本路径
  // 执行 npm run build 统一配置文件路径
  // NODE_ENV：Node.js 暴露给执行脚本的系统环境变量。通常用于确定在开发环境还是生产环境
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
  //输出文件目录
  //当运行 npm run build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  //放置生成静态资源 (js、css、img) 的目录
  assetsDir: 'static',
  //设置是否在保存的时候使用 eslint-loader 进行检查
  lintOnSave: false,
  //node_modules 中的文件需要bable-loader转义
  transpileDependencies: true,
  //生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  //通过 webpack-merge 合并到最终的配置
  configureWebpack: (config) => {
    config.module.rules.push({
      //配置处理.less文件的loader
      //style-loader要放到第一位，因为loader都是从下往上执行
      //最后全部编译完成挂载到style上,没有style-loader无法完成挂载
      test:'/\.less$/',
      use:[{
        loader:'style-loader',
      },{
        loader:'css-loader',
      },{
        loader:'less-loader',
      }],
      //配置处理.css文件的loader 同上
      test:'/\.css$/',
      use:[{
        loader:'style-loader',
      },{
        loader:'css-loader',
      }],
      //配置编译.vue文件的loader
      test:'/\.vue$\/',
      use:[{
        loader:'vue-loader',
      }],
      //配置处理.vue文件的 iview-loader
      test:'/\.vue$/',
      use:[{
        loader:'vue-loader',
      },{
        loader:'iview-loader',
        options:{
          prefix:false
        }
      }],
    })
    if (process.env.NODE_ENV === 'production') {
      //为生产环境修改配置...
      config.mode = 'production'
    } else {
      //为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config,{
      //开发生产共同配置
      resolve:{
        //在项目中引入 js vue json 文件不需要写后缀名了
        extensions:['.js','.vue','.json'],
        //别名配置
        alias:{
          //其中:@代表根目录,@c代表 src/components 文件夹,等
          //path.resolve（[...path]）是将一系列路径或路径段解析为绝对路径
          //重点是给定的路径顺序是从右到左处理的，直到构建出绝对路径为止
          //path.resolve() 方法是以程序为根目录,作为起点,根据参数解析出一个绝对路径
          //__dirname 总是指向被执行 js 文件的绝对路径
          // * 例如当你在 /d1/d2/myscript.js 文件中写了 __dirname， 它的值就是 /d1/d2
          // * 所以此时的 __dirname 值为 /
          //__dirname:返回当前文件所在文件夹的绝对路径，但是返回值不包含文件
          //__dirname:在哪里使用,就是表示当前文件所在的路径
          '@': path.resolve(__dirname,'src'), //获取sr的绝对路径
          '@c': path.resolve(__dirname,'src/components'),
          '@v': path.resolve(__dirname,'src/views')
        }
      }
    })
  },
  //是一个函数,会接收一个基于 webpack-chain 的 ChainableConfig 实例。
  //允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {},
  //css相关配置
  css: {
    //是否将组件中的 CSS 提取至一个独立的 CSS文件中(使用css分离插件 ExtractTextPlugin)
    extract: true,
    //是否为 CSS 开启 source map
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项
    loaderOptions: {
      less: {}, //这里的选项会传递给 less-loader
    }
  },
  //webpack-dev-server 相关配置
  devServer: {
    host: 'localhost',  //允许外部ip访问
    port: 8080, //端口号
    https: false, //启用https
    open : true,  //自动启动浏览器
    hot: true,  //热更新
    // proxy: 'http://localhost:9000' // 配置跨域处理,只有一个代理

    // 配置多个代理
    proxy: {
      "/XX/*": {  // 拦截以 /XX 开头的url接口
      target: "http://192.168.0.101:8080",  //目标接口域名
      changeOrigin: true,  //是否跨域
      },
    }
  },
  //第三方插件配置选项
  pluginOptions: {}
})
