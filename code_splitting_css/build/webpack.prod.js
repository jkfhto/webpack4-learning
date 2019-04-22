//注意：对css代码进行代码分割，需要配置sideEffects，消除tree shaking的影响  如果sideEffects：false，css代码会被过滤掉
//mini-css-extract-plugin：css文件代码分割
//optimize-css-assets-webpack-plugin：css代码优化压缩
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css文件代码分割
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules:[{
			test: /\.scss$/,
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
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader'
			]
		}]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		})
	]
}

module.exports = merge(commonConfig, prodConfig);