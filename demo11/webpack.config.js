/**
 * 1. file-loader: 处理图片
 * 1. url-loader: 处理图片, 字体文件，Base64编码
 * 2. img-loader: 压缩图片. 不同类型的图片配合不同的插件, 例如: png配合imagemin-pngquant
 * 3. postcss-loader 与 postcss-sprites: 合成雪碧图, 减小HTTP请求. 注意合成后的图片文件大小.
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css文件  有时会报错 需要安装webpack到开发依赖

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
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/", //2 为了使资源保持正确的路径，必须设置 webpack 配置中的 output.publicPath 属性，以便生成绝对路径
    },
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [{
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
                    }, 
                    { //注意：postcss-loader 需要放在less-loader之前 并且是匹配css，less等文件 不能放在处理图片文件规则中
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require("postcss-sprites")({
                                    retina:true,//开启retina
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
                    //         publicPath: './assets/imgs/', //影响图片的调用路径=output.path+publicPath
                    //         outputPath: './assets/imgs/', //影响文件的打包路径=output.path+outputPath
                    //         useRelativePath:true,//影响文件的打包路径
                    //     }
                    // }
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024, //将文件加载为base64编码的URL
                            publicPath: './assets/imgs/', //影响图片的调用路径=output.path+publicPath
                            outputPath: './assets/imgs/', //影响文件的打包路径=output.path+outputPath
                            // useRelativePath: true, //影响文件的打包路径
                        }
                    },
                    {//压缩图片   
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false,
                                    optimizationLevel:3,
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
                        publicPath: '../dist/assets/fonts/', //影响图片的调用路径=output.path+publicPath
                        outputPath: '', //影响文件的打包路径=output.publicPath+outputPath
                        useRelativePath: true //影响文件的打包路径
                    }
                }]
            },
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