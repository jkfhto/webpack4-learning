/**
 * webpack-dev-server:
 * 1:live reloading 触发自动刷新页面
 * 2:不能打包文件 运行webpack-dev-server整体文件打包在运行内存中，不能直接打包文件
 * 3:路径重定向
 * 4:支持https
 * 5:帮助在浏览器中显示编译错误
 * 6:接口代理 devServer.proxy 进行跨域代理设置 集成自http-proxy-middleware
 * 7:模块热更新 HotModuleReplacementPlugin && NamedModulesPlugin 注意：css进行模块热更新需要使用style-loader
 * 8. 开启 HTML5 History API : devServer.historyApiFallback
 */

/**
 * devtool: 选择源映射样式以增强调试过程。 这些值可以显着影响构建和重建速度(不同的loader也应该打开对应的sourcemap选项)
 * https: //webpack.js.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx
 */
const webpack = require('webpack')
const proxy = require('./proxy')
const historyFallback = require('./historyfallback')

module.exports = {
    devtool: 'cheap-module-source-map',

    devServer: {
        port: 6288,
        overlay: true,
        hot: true,
        hotOnly: true,

        proxy: proxy,
        historyApiFallback: historyFallback
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin()
    ]
}