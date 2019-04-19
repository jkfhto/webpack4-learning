/**
 * 1. file-loader: 处理图片
 * 1. url-loader: 处理图片, 字体文件，Base64编码
 * 2. img-loader: 压缩图片. 不同类型的图片配合不同的插件, 例如: png配合imagemin-pngquant
 * 3. postcss-loader 与 postcss-sprites: 合成雪碧图, 减小HTTP请求. 注意合成后的图片文件大小.
 */

 /**
  * 引入第三方JS库
  * 1. webpack.ProvidePlugin
  * 2. imports-loader
  */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css文件  有时会报错 需要安装webpack到开发依赖
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin'); //该插件将为你自动生成一个 HTML 文件， 并把打包生成的js文件自动引入到这个html文件中

/**
 * 使用purifycss-webpack，glob-all，purify-css进行css tree-shaking 需要将css-loader modules设置为false
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
        path: path.resolve(__dirname, "dist"), //所有输出文件的目标路径 对应一个绝对路径
        filename: "[name].bundle.js",
        publicPath: "./dist/", //2 该配置能帮助你为项目中的所有资源指定一个基础路径 基础路径是指项目中引用css，js，img等资源时候的一个基础路径
    },
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, './src/libs/jquery.min.js'), //设置本地jquery的解析路径 
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    }
                }
            },
            {
                test: /\.(c|le)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: ''
                        }
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
                    },
                    { //注意：postcss-loader 需要放在less-loader之前 并且是匹配css，less等文件 不能放在处理图片文件规则中
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require("postcss-sprites")({
                                    retina: true, //开启retina
                                })
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                    }
                ]
            },
            { //打包处理图片文件
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader:"file-loader",
                    //     options: {
                    //         // name: '[path][name].[ext]',
                    //         publicPath: '', //影响图片等静态资源的调用路径=output.publicPath+publicPath
                    //         outputPath: './assets/imgs/', //影响文件的打包(输出)路径=output.path+outputPath
                    //         useRelativePath:true,//影响文件的打包路径
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024, //将文件加载为base64编码的URL
                            publicPath: '', //影响图片等静态资源的调用路径=output.publicPath+publicPath
                            outputPath: './assets/imgs/', //影响文件的打包(输出)路径=output.path+outputPath
                            // useRelativePath: true, //影响文件的打包路径
                        }
                    },
                    { //压缩图片   
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false,
                                    optimizationLevel: 3,
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    quality: 50,
                                    speed: 2
                                }),
                                require('imagemin-svgo')({
                                    plugins: [{
                                            removeTitle: true
                                        },
                                        {
                                            convertPathData: false
                                        }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            { //处理字体文件
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: 5000,
                        publicPath: './assets/fonts/', //影响图片等静态资源的调用路径=output.publicPath+publicPath
                        outputPath: '', //影响文件的打包(输出)路径=output.path+outputPath
                        useRelativePath: true //影响文件的打包路径
                    }
                }]
            },
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [{
                    // 使用 imports-loader 注入
                    loader: 'imports-loader',
                    options: {
                        $: 'jquery',
                        jQuery: 'jquery'
                    }
                }]
            },
            {//自动生成HTML并在HTML中引入图片
                test: /\.html$/,
                use: [
                    {
                        loader:"html-loader",
                        options:{
                            attrs: ['img:data-src', 'img:src'],
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
        // new webpack.ProvidePlugin({ //处理第三方js库 方式1：直接npm i jquery;方式2：本地文件，使用resolve设置jquery解析路径  问题：没有tree-shaking
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),
        new HtmlWebpackPlugin({
            filename: "../indexW.html", //生成的html文件名称 
            template: "./index.html", //模板文件
            // publicPath: '../', //影响图片等静态资源的调用路径=output.publicPath+publicPath
            inject: false,
            hash: true, // inject:false,将导致hash失效
            minify: { //压缩html代码
                collapseWhitespace: false,
            },
        }),
        purifyCSS
    ],
}