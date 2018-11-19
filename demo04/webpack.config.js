/**
 * 代码分割常见场景
 * 1. 分离业务代码 和第三方依赖
 * 2. 分离业务代码 和业务公共代码 和第三方依赖
 * 3. 分离首次加载 和访问后加载的代码
 */

/**
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
 */
// const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode:"development",
    entry: {
        page: "./src/page.js" //
    },
    output: {
        publicPath: __dirname + "/dist/",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    }
};