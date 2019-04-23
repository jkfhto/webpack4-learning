const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	entry: {
		main: './src/index.js'
	},
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		hotOnly: true,
		proxy: {//配置代理实现请求转发
			'/react/api': { //请求到 /react/api 现在会被代理到请求target https://www.dell-lee.com
				target: 'https://www.dell-lee.com',
				secure: false,
				pathRewrite: {
					'header.json': 'demo.json' //重写target的url路径 
				},
				changeOrigin: true, // 如果接口跨域，需要进行这个参数配置为true
				headers: { //设置请求头
					host: 'www.dell-lee.com',
				}
			}
		}
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
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
}