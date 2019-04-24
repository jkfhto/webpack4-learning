//目标：第三方模块只打包一次 从而提升打包速度，效率
//1：第三方模块打包一次
//2：我们引入第三方模块时，要去使用dll文件引入

/**
 * DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles， 同时还大大提升了构建的速度
 * DllPlugin这个插件是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 bundle(dll-only-bundle)。 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的
 * DllReferencePlugin这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: { //需要打包的第三方模块
		vendors: ['lodash'],
		react: ['react', 'react-dom'],
		jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		})
	]
}