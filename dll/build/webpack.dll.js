//目标：第三方模块只打包一次 从而提升打包速度，效率
//1：第三方模块打包一次
//2：我们引入第三方模块时，要去使用dll文件引入
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: { //打包第三方模块
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
		jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [ //引入第三方模块时，要去使用dll文件引入
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}