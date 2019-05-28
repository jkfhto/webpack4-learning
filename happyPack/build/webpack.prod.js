const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HappyPack = require('happypack');

const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
			use: 'HappyPack/loader?id=scss' //使用HappyPack打包scss，id：标识符
			// use: [
			// 	MiniCssExtractPlugin.loader, 
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
			// 	MiniCssExtractPlugin.loader,
			// 	'css-loader',
			// 	'postcss-loader'
			// ]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		}),
		new HappyPack({
			id: 'scss', //表示打包jsx
			//use：对应具体类型模块的loader配置
			use: [
				MiniCssExtractPlugin.loader,
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
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}),
	],
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports = merge(commonConfig, prodConfig);