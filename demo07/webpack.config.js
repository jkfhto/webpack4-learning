/**
 * 使用mini-css-extract-plugin 合并css，less代码
 * https://webpack.js.org/plugins/mini-css-extract-plugin/#src/components/Sidebar/Sidebar.jsx
 * 使用optimize-css-assets-webpack-plugin 优化，去重css，less代码
 * https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
 * 设置optimization.minimizer会覆盖webpack提供的默认值， 因此请务必同时指定JS minimalizer
 * uglifyjs-webpack-plugin
 * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
 */
var path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        app: "./src/app.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "./dist/" //2 为了使资源保持正确的路径，必须设置 webpack 配置中的 output.publicPath 属性，以便生成绝对路径
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.(le|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     // you can specify a publicPath here
                    //     // by default it use publicPath in webpackOptions.output
                    //     publicPath: '../'
                    // }
                },
                {
                    loader: "css-loader",
                    options: {
                        // import: false,//设置false modules: true,失效
                        modules: true,//开启css模块化
                        // minimize: true || { /* CSSNano Options */ }, //最新版已经弃用
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',//className
                    }
                },{
                    loader: "less-loader",
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
}