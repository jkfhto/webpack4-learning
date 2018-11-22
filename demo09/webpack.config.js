/**
 * 1. file-loader: 处理图片
 * 2. url-loader: 处理图片, Base64编码
 */
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
    mode: "development", //webpack4 设置为production即可进行JS代码压缩以及tree shaking
    entry: {
        app: "./src/app.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"), //所有输出文件的目标路径 对应一个绝对路径
        filename: "[name].bundle.js",
        publicPath: "./dist/", //2 该配置能帮助你为项目中的所有资源指定一个基础路径 基础路径是指项目中引用css，js，img等资源时候的一个基础路径
    },
    module: {
        rules: [
            {
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
            },
            {//打包处理图片文件
                test: /\.(png|jpg|jpeg|gif)$/,
                use:[
                    // {
                    //     loader:"file-loader",
                    //     options: {
                    //         // name: '[path][name].[ext]',
                    //         publicPath: 'assets/imgs/', //影响图片的调用路径=output.publicPath+publicPath
                    //         outputPath: '', //影响文件的打包(输出)路径=output.path+outputPath
                    //         useRelativePath:true,
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //将文件加载为base64编码的URL
                            publicPath: 'assets/imgs/', //影响图片的调用路径=output.publicPath+publicPath
                            outputPath: '', //影响文件的打包(输出)路径=output.path+outputPath
                            useRelativePath:true,
                        }
                    }
                ]
            }
        ]
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