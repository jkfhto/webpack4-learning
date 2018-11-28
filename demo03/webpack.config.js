/**
 * 使用SplitChunksPlugin进行提取公共代码 用于多页面
 * https://webpack.js.org/plugins/split-chunks-plugin/#src/components/Sidebar/Sidebar.jsx
 * 1:减少代码冗余
 * 2:提高加载速度
 */
// var webpack = require('webpack')
var path = require('path')

module.exports = {
    mode: "development",
    //需要设置多个entry
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },

    optimization: {
        splitChunks: {
            minSize: 1,
            cacheGroups: {//拆分业务代码和第三方库
                // 注意: priority属性 优先处理priority大的
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
}