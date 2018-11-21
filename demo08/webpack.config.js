var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css文件  有时会报错 需要安装webpack到开发依赖

/**
 * 使用purifycss-webpack，glob-all进行css tree-shaking 需要将css-loader modules设置为false
 */
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");

let purifyCSS = new PurifyCSS({
    paths: glob.sync([
        // 要做CSS Tree Shaking的路径文件
        path.resolve(__dirname, "./*.html"),
        path.resolve(__dirname, "./src/*.js")
    ])
});


module.exports = {
    mode: "production", //webpack4 设置为production即可进行JS代码压缩以及tree shaking
    entry: {
        app: "./src/app.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "./dist/", //2 为了使资源保持正确的路径，必须设置 webpack 配置中的 output.publicPath 属性，以便生成绝对路径
    },
    module: {
        rules: [{
            test: /\.(c|le)ss$/,
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
                    loader: "css-loader", //1
                    // loader: "file-loader", //2
                    // loader: "css-loader", //3
                    options: {
                        // import: false,//设置false modules: true,失效
                        // modules: true,// css tree-shaking 不能开启模块化
                        // minimize: true || { /* CSSNano Options */ }, //最新版已经弃用
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    }
                }, {
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
        }),
        purifyCSS
    ],
}