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

/**
 * 1. clean-webpack-plugin: 一个webpack插件，用于在构建之前删除/清除构建文件夹
 * 2. CMD 运行 webpack -w --progress --display-reasons --color: 开启watch模式, 并且可以清晰地看到打包过程
 */

/**
 * webpack-dev-server: 
 * 1:live reloading 触发自动刷新页面
 * 2:不能打包文件 运行webpack-dev-server整体文件打包在运行内存中，不能直接打包文件
 * 3:路径重定向
 * 4:支持https
 * 5:帮助在浏览器中显示编译错误
 * 6:接口代理 devServer.proxy 进行跨域代理设置 集成自http-proxy-middleware
 * 7:模块热更新 HotModuleReplacementPlugin && NamedModulesPlugin
 * 8. SourceMap: 配置 devtool 选项( 不同的loader也应该打开对应的sourcemap选项 )
 * 9. 开启 HTML5 History API : devServer.historyApiFallback
 */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css文件  有时会报错 需要安装webpack到开发依赖
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
const CleanWebpackPlugin = require("clean-webpack-plugin");
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
    mode: "development", //webpack4 设置为production即可进行JS代码压缩以及tree shaking
    entry: {
        app: "./src/app.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"), //所有输出文件的目标路径 对应一个绝对路径
        filename: "[name].bundle.js",
        publicPath: "/" //2 该配置能帮助你为项目中的所有资源指定一个基础路径 基础路径是指项目中引用css，js，img等资源时候的一个基础路径
    },
    devServer: { //webpack4 mode设置为production会不停的编译 刷新页面 
        port: 6288,
        // inline: false,
        // HTML5 histroy API rewrite
        historyApiFallback: {
            rewrites: [{
                // 什么样的路径
                from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                // 转去哪里
                to: function (context) {
                    return '/' + context.match[1] + context.match[2] + '.html'
                }
            }]
        },
        proxy: {//代理远程接口
            '/api': {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',
                // pathRewrite: {
                //     '^/comments': '/api/comments'
                // },
                headers: {
                    'Cookie': '_T_WM=044532f80b8fabc6dc347fd417c33202; ALF=1517569014; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhQljxrwvAfCCZa_p.u8pB.5JpX5K-hUgL.Fo2cS0qRehBcSKM2dJLoI7HpqJ8XwBtt; SCF=AkQsXaaTywl0RziwnumQ0tVE_xW5udcpoGP43q7eb2tFW9lXRc4bVNOn9N5m_ZKwFc-Q2r4Hz5oMBAbVJuhI1uk.; SUB=_2A253SLARDeRhGedI7FQZ8CrKzjuIHXVUstBZrDV6PUJbktANLUXEkW1NVtAHXD7nHQtwFntsDZsmqj2nB17cClnd; SUHB=0k1zt1ckxYq3c6; H5_INDEX_TITLE=qbaty; H5_INDEX=0_all; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=oid%3D4193586758833502%26luicode%3D20000061%26lfid%3D4193594443440569%26uicode%3D20000061%26fid%3D4193586758833502'
                }
            }
        },
    },
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, "./src/libs/jquery.min.js") //设置本地jquery的解析路径
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
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
                            publicPath: ""
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
                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                        }
                    },
                    {
                        //注意：postcss-loader 需要放在less-loader之前 并且是匹配css，less等文件 不能放在处理图片文件规则中
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [
                                require("postcss-sprites")({
                                    retina: true //开启retina
                                })
                            ]
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                //打包处理图片文件
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
                        loader: "url-loader",
                        options: {
                            limit: 1024, //将文件加载为base64编码的URL
                            publicPath: "", //影响图片等静态资源的调用路径=output.publicPath+publicPath
                            outputPath: "./assets/imgs/" //影响文件的打包(输出)路径=output.path+outputPath
                            // useRelativePath: true, //影响文件的打包路径
                        }
                    },
                    {
                        //压缩图片
                        loader: "img-loader",
                        options: {
                            plugins: [
                                require("imagemin-gifsicle")({
                                    interlaced: false,
                                    optimizationLevel: 3
                                }),
                                require("imagemin-mozjpeg")({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require("imagemin-pngquant")({
                                    floyd: 0.5,
                                    quality: 50,
                                    speed: 2
                                }),
                                require("imagemin-svgo")({
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
            {
                //处理字体文件
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 5000,
                        publicPath: "./assets/fonts/", //影响图片等静态资源的调用路径=output.publicPath+publicPath
                        outputPath: "", //影响文件的打包(输出)路径=output.path+outputPath
                        useRelativePath: true //影响文件的打包路径
                    }
                }]
            },
            {
                test: path.resolve(__dirname, "src/app.js"),
                use: [{
                    // 使用 imports-loader 注入
                    loader: "imports-loader",
                    options: {
                        $: "jquery",
                        jQuery: "jquery"
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        attrs: ["img:data-src", "img:src"]
                    }
                }]
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
            filename: "./indexW.html", //生成的html文件名称
            template: "./index.html", //模板文件
            // publicPath: '../', //影响图片等静态资源的调用路径=output.publicPath+publicPath
            inject: false,
            hash: true, // inject:false,将导致hash失效
            minify: {
                //压缩html代码
                collapseWhitespace: false
            }
        }),
        new CleanWebpackPlugin(["dist"]),
        purifyCSS
    ]
};