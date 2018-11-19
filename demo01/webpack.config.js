/**
 * 使用common.js规范
 */
var path = require("path");

module.exports = {
    mode: 'development',
    entry: './app.js',
    output:{
        publicPath: "./dist/", // 需要设置保证amd规范打包代码正常引用
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    
};