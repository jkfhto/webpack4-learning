/**
 * 开发环境
 * 1:模块热更新HMR
 * 2:sourceMap
 * 3:接口代理
 * 4:代码规范检查
 * .
 * 生产环境
 * 1:提取共用代码
 * 2:压缩混淆
 * 3:文件压缩或是base64编码
 * 4:去除无用代码 tree-shaking
 * .
 * 共同点
 * 同样的入口
 * 同样的代码处理(loader处理)
 * 同样的解析配置
 */
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
 * eslint-loader 检查代码格式
 */

const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')// 该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css文件  有时会报错 需要安装webpack到开发依赖
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const generateConfig = env => {
    const scriptLoader = ['babel-loader']
        .concat(env === 'production'
            ? []
            : [{
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }]
        )
    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                sourceMap: env === 'development'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: env === 'development',
                plugins: [
                    require('postcss-cssnext')()
                ].concat(
                    env === 'production'
                        ? require('postcss-sprites')({
                            spritePath: 'dist/assets/imgs/sprites',
                            retina: true
                        })
                        : []
                )
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development'
            }
        }
    ]
    const styleLoader = env === 'production'
        ? [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: ''
            }
        }].concat(cssLoaders)
        : [{
            loader: 'style-loader'
        }].concat(cssLoaders)

    const fileLoader = path => {
        return env === 'development'
            ? [{
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    outputPath: path
                }
            }]
            : [{
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    limit: 1000,
                    outputPath: path
                }
            }]
    }

    return {
        mode: env,
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'), // 所有输出文件的目标路径 对应一个绝对路径
            filename: '[name].bundle.js'
            // publicPath: '/' // 2 该配置能帮助你为项目中的所有资源指定一个基础路径 基础路径是指项目中引用css，js，img等资源时候的一个基础路径
        },

        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, '../src/libs/jquery.min.js')// 设置本地jquery的解析路径 处理第三方js
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, '../src')],
                    exclude: [path.resolve(__dirname, '../src/libs')],
                    use: scriptLoader
                },

                {
                    test: /\.(c|le)ss$/,
                    use: styleLoader
                },

                { // 打包处理图片文件
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader('./assets/imgs/').concat(
                        env === 'production'
                            ? [{
                                // 压缩图片
                                loader: 'img-loader',
                                options: {
                                    plugins: [
                                        require('imagemin-gifsicle')({
                                            interlaced: false,
                                            optimizationLevel: 3
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
                            }]
                            : []
                    )
                },

                {
                    // 处理字体文件
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 5000,
                            publicPath: './assets/fonts/', // 影响图片等静态资源的调用路径=output.publicPath+publicPath
                            outputPath: '', // 影响文件的打包(输出)路径=output.path+outputPath
                            useRelativePath: true // 影响文件的打包路径
                        }
                    }]
                },

                {// 自动生成HTML并在HTML中引入图片  webpack4:可以直接引入图片
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: ['img:data-src', 'img:src']
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [

            new HtmlWebpackPlugin({
                filename: './indexW.html', // 生成的html文件名称
                template: './index.html', // 模板文件
                inject: false,
                hash: true, // inject:false,将导致hash失效
                minify: {
                    // 压缩html代码
                    collapseWhitespace: false
                }
            }),

            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
    }
}

module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig

    return merge(generateConfig(env), config)
}