const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HappyPack = require('happypack');

const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: 'HappyPack/loader?id=scss' //使用HappyPack打包scss，id：标识符
			// use: [
			// 	'style-loader', 
			// 	{
			// 		loader: 'css-loader',
			// 		options: {
			// 			importLoaders: 2
			// 		}
			// 	},
			// 	'sass-loader',
			// 	'postcss-loader'
			// ]
		}, {
			test: /\.css$/,
			use: 'HappyPack/loader?id=css' //使用HappyPack打包css，id：标识符
			// use: [
			// 	'style-loader',
			// 	'css-loader',
			// 	'postcss-loader'
			// ]
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HappyPack({
			id: 'scss', //表示打包jsx
			//use：对应具体类型模块的loader配置
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
		}),
		new HappyPack({
			id: 'css', //表示打包jsx
			//use：对应具体类型模块的loader配置
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader'
			]
		}),
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
	}
}

module.exports = merge(commonConfig, devConfig);