# webpack4-learning

**webpack<br>**
模块化打包工具，默认只能处理JavaScript模块文件<br>

**loader<br>**
让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理 [详情](https://webpack.js.org/loaders)<br>
* file-loader - 打包图片资源，字体等文件.  [详情](https://webpack.js.org/loaders/file-loader)<br>
* url-loader - 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL，图片资源较小时适合使用url-loader，可以减少http请求，图片过大会导致打包生成的js文件过大，导致页面加载慢  [详情](https://webpack.js.org/loaders/url-loader)<br>
* css-loader - 处理文件中@import 的特点,处理css文件  [详情](https://webpack.js.org/loaders/css-loader)<br>
* style-loader - 将解析的css内容用style标签的形式挂载到页面  [详情](https://webpack.js.org/loaders/style-loader)<br>
* less-loader - 将less文件编译为css文件  [详情](https://www.webpackjs.com/loaders/less-loader)<br>
* postcss-loader - 自动添加浏览器前缀  [详情](https://webpack.js.org/loaders/postcss-loader)<br>

**plugins<br>**
插件目的在于解决 loader 无法实现的其他事，让打包的过程更加便捷，可以在webpack运行到某个时刻的时候，帮你做一些事情 [详情](https://webpack.js.org/plugins)<br>
* html-webpack-plugin - 打包之后自动生成一个 HTML 文件， 并把打包生成的js文件自动引入到这个html文件中  [详情](https://webpack.js.org/loaders/file-loader)<br>
* clean-webpack-plugin - 用于打包之前，删除/清除构建文件夹  [详情](https://www.npmjs.com/package/clean-webpack-plugin)<br>
* HotModuleReplacementPlugin - 启用热替换模块(Hot Module Replacement)，也被称为 HMR，实时预览修改后的页面，无需重新加载整个页面  [详情](https://webpack.js.org/plugins/hot-module-replacement-plugin)  [API调用](https://webpack.js.org/api/hot-module-replacement)<br> 

**devtool<br>**
此选项控制是否生成，以及如何生成 source-map [详情](https://webpack.js.org/configuration/devtool)<br>
* source-map - 定义源码以及打包后的代码的映射关系 [介绍](https://blog.teamtreehouse.com/introduction-source-maps)<br>

**devServer<br>**
webpack-dev-server 能够用于快速开发应用程序，会将打包后的文件保存在内存中，不会放在指定文件夹，从而提升打包速度 [详情](https://webpack.js.org/configuration/dev-server/)<br>
每次要编译代码时，手动运行 npm run build 就会变得很麻烦。webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：<br>

* webpack's Watch Mode [详情](https://webpack.js.org/guides/development/#using-watch-mode)<br>
* webpack-dev-server [详情](https://webpack.js.org/guides/development/#using-webpack-dev-server)<br>
* webpack-dev-middleware [详情](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)<br>

# 转换es6

**Babel <br>**
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中[详情](https://babeljs.io/docs/en/)<br>



