const path = require('path');
//externals：防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖 
module.exports = {
	mode: 'production',
	entry: './src/index.js',
	externals: 'lodash', //防止将lodash打包到library，而是在使用library时import lodash
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'library.js',
		library: 'root',
		libraryTarget: 'umd'
	}
}