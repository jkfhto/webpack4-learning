/**
 * 1. clean-webpack-plugin: 一个webpack插件，用于在构建之前删除/清除构建文件夹
 * 2. CMD 运行 webpack -w --progress --display-reasons --color: 开启watch模式, 并且可以清晰地看到打包过程
 */

/**
  * 使用purifycss-webpack，glob-all，purify-css进行css tree-shaking 需要将css-loader modules设置为false
  */
var PurifyWebpack = require('purifycss-webpack')
var MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css文件  有时会报错 需要安装webpack到开发依赖
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var glob = require('glob-all')
let pathsToClean = [
    './dist'
]
let cleanOptions = {
    root: path.resolve(__dirname, '../dist')
}
module.exports = {
    plugins: [
        new PurifyWebpack({
            paths: glob.sync([
                './*.html',
                './src/*.js'
            ])
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // }),

        // new HtmlInlinkChunkPlugin({
        //     inlineChunks: ['manifest']
        // }),

        // new webpack.optimize.UglifyJsPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
}