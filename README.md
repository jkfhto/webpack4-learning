# webpack4-learning

**webpack<br>**
模块化打包工具，默认只能处理JavaScript模块文件<br>

**loader<br>**
让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理<br>
* file-loader - 打包图片资源，字体等文件.  [详情](https://webpack.js.org/loaders/file-loader)<br>
* url-loader - 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL，图片资源较小时适合使用url-loader，可以减少http请求，图片过大会导致打包生成的js文件过大，导致页面加载慢  [详情](https://webpack.js.org/loaders/url-loader)<br>
* css-loader - 处理文件中@import 的特点,处理css文件  [详情](https://webpack.js.org/loaders/css-loader)<br>
* style-loader - 将解析的css内容用style标签的形式挂载到页面  [详情](https://webpack.js.org/loaders/style-loader)<br>
* less-loader - 将less文件编译为css文件  [详情](https://www.webpackjs.com/loaders/less-loader)<br>
* postcss-loader - 自动添加浏览器前缀  [详情](https://webpack.js.org/loaders/postcss-loader)<br>

**plugins<br>**
插件目的在于解决 loader 无法实现的其他事，让打包的过程更加便捷，可以在webpack运行到某个时刻的时候，帮你做一些事情<br>
* html-webpack-plugin - 打包之后自动生成一个 HTML 文件， 并把打包生成的js文件自动引入到这个html文件中  [详情](https://webpack.js.org/loaders/file-loader)<br>
* clean-webpack-plugin - 用于打包之前，删除/清除构建文件夹  [详情](https://www.npmjs.com/package/clean-webpack-plugin)<br>

**devtool<br>**
此选项控制是否生成，以及如何生成 source-map<br>
* source-map - 定义源码以及打包后的代码的映射关系 [介绍](https://blog.teamtreehouse.com/introduction-source-maps)


