const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin'); //在打包生成的html文件中引入额外的静态文件
const webpack = require('webpack');
const HappyPack = require('happypack');

const plugins = [
	new HtmlWebpackPlugin({
		template: 'src/index.html'
	}),
	new CleanWebpackPlugin(['dist'], {
		root: path.resolve(__dirname, '../')
	}),
	new HappyPack({
		id: 'jsx', //表示打包jsx
		//use：对应具体类型模块的loader配置
		use: [{
			loader: 'babel-loader'
		}]
	}),
	new HappyPack({
		id: 'pic', //表示打包jsx
		//use：对应具体类型模块的loader配置
		use: [{
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			}]
	})
];

// dll相关配置
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach(file => {
	if (/.*\.dll.js/.test(file)) {
		plugins.push(new AddAssetHtmlWebpackPlugin({ //引入对应的动态链接库
			filepath: path.resolve(__dirname, '../dll', file)
		}))
	}
	if (/.*\.manifest.json/.test(file)) { //引入动态链接库对应的清单
		plugins.push(new webpack.DllReferencePlugin({
			manifest: path.resolve(__dirname, '../dll', file)
		}))
	}
})

module.exports = {
	entry: {
		main: './src/index.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			include: path.resolve(__dirname, '../src'),
			use: 'HappyPack/loader?id=jsx' //使用HappyPack打包jsx，id：标识符
			// use: [{
			// 	loader: 'babel-loader'
			// }]
		}, {
			test: /\.(jpg|png|gif)$/,
			use: 'HappyPack/loader?id=pic' //使用HappyPack打包图片资源，id：标识符
			// use: {
			// 	loader: 'url-loader',
			// 	options: {
			// 		name: '[name]_[hash].[ext]',
			// 		outputPath: 'images/',
			// 		limit: 10240
			// 	}
			// }
		}, {
			test: /\.(eot|ttf|svg)$/,
			use: {
				loader: 'file-loader'
			}
		}]
	},
	plugins,
	optimization: {
		runtimeChunk: {
			name: 'runtime'
		},
		usedExports: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name: 'vendors',
				}
			}
		}
	},
	performance: false,
	output: {
		path: path.resolve(__dirname, '../dist')
	}
}