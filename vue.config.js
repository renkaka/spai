const webpack = require('webpack')
const Version = new Date().getTime()
module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  // publicPath: process.env.NODE_ENV === "production" ? "/public/" : "./",
  publicPath: './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'sapi',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8083,
    https: false,
    hotOnly: false,
    proxy: {
      '/proxyApi': {
        target: process.env.VUE_APP_PROXY_TARGET, // 服务器api地址
        changeOrigin: true,
        ws: true, // proxy websockets
        pathRewrite: {
          '^/proxyApi': ''
        }
      }
    }
  },
  configureWebpack: {
    // 引入jquery
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ],
    /* 打包配置版本号 */
    output: { /* 模块名称+时间戳 */
      filename: `[name].${Version}.js`,
      chunkFilename: `[name].${Version}.js`
    }
  },
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
