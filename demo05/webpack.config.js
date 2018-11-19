var path = require("path");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/app.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "./dist/", //2 为了使资源保持正确的路径，必须设置 webpack 配置中的 output.publicPath 属性，以便生成绝对路径
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: "style-loader", //1 使用style标签添加css样式
                    // loader: "style-loader/url", //2 使用link标签添加css样式
                    // loader: "style-loader/useable", //3 卸载和加载css样式(use与unuse方法)
                    options: { //1
                        insertInto: '#app', //默认情况下，样式加载器将 <style> 元素插入到页面的 <head> 标签中。如果要将标签插入到其他位置，可以在这里为该元素指定 CSS 选择器
                        singleton: true, //如果已定义，则 style-loader 将重用单个 <style> 元素，而不是为每个所需的模块添加/删除单个元素(合并style标签)
                        transform: './css.transform.js', //transform 是一个函数，可以在通过 style-loader 加载到页面之前修改 css。 该函数将在即将加载的 css 上调用，函数的返回值将被加载到页面，而不是原始的 css 中。 如果 transform 函数的返回值是 falsy 值，那么 css 根本就不会加载到页面中
                    }
                },
                {
                    loader: "css-loader", //1
                    // loader: "file-loader", //2
                    // loader: "css-loader", //3
                },
            ]
        }]
    },
}