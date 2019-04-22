const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 代码分割，和webpack无关
// webpack中实现代码分割，两种方式
// 1. 同步代码： 只需要在webpack.common.js中做optimization的配置即可
// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中

module.exports = {
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: 'babel-loader',
		}, {
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			} 
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
				'sass-loader',
				'postcss-loader'
			]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}), 
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		})
	],
	optimization: {
		splitChunks: { //代码分割  同步代码，异步代码都可以配置 进行相关配置以及优化
			chunks: 'all', //可填 async, initial, all. 顾名思义，async针对异步加载的chunk做分割，initial针对初始chunk，all针对所有chunk
			minSize: 30000, //表示抽取出来的文件在压缩前的最小大小，默认为30000，需要进行代码分离的代码块要大于30000，否则不生成新chunk
			minChunks: 1, //表示module被引用次数，默认为1，大于等于该次数才会进行代码分割
			maxAsyncRequests: 5, //最大的按需(异步)加载次数，默认为 5，module数量超过该值，其他的module不会进行代码分割
			maxInitialRequests: 3, //入口文件最大的初始化加载次数，默认为 3，module数量超过该值，其他的module不会进行代码分割
			automaticNameDelimiter: '~', //分割出来的文件的自动生成名字的分割符，默认为 ~
			name: true,
			cacheGroups: { //缓存组才是我们配置的关键。它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test，priority 和 reuseExistingChunk。要禁用默认缓存组，请将default设置为false
				vendors: {
					test: /[\\/]node_modules[\\/]/, //用来决定提取哪些module，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中
					priority: -10, //表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，分割到priority高的cacheGroups
					// filename: 'vendors.js',
				},
				default: { //默认缓存组
					priority: -20,
					reuseExistingChunk: true, //表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
					filename: 'common.js'
				}
			}
		}
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
	}
}