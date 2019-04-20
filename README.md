# webpack4-learning

**Webpack<br>**
模块化打包工具，默认只能处理JavaScript模块文件<br>

**Entry<br>**
指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。每个依赖项随即被处理，最后输出到称之为 bundles 的文件中 [了解更多](https://webpack.js.org/concepts/entry-points)<br>

**Output<br>**
告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件 [了解更多](https://webpack.js.org/concepts/output)<br>

**Loaders<br>**
让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理 [了解更多](https://webpack.js.org/concepts/loaders/)<br>
* file-loader：打包图片资源，字体等文件.  [了解更多](https://webpack.js.org/loaders/file-loader)<br>
* url-loader：功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL，图片资源较小时适合使用url-loader，可以减少http请求，图片过大会导致打包生成的js文件过大，导致页面加载慢  [了解更多](https://webpack.js.org/loaders/url-loader)<br>
* css-loader：处理文件中@import 的特点,处理css文件  [了解更多](https://webpack.js.org/loaders/css-loader)<br>
* style-loader：将解析的css内容用style标签的形式挂载到页面  [了解更多](https://webpack.js.org/loaders/style-loader)<br>
* less-loader：将less文件编译为css文件  [了解更多](https://www.webpackjs.com/loaders/less-loader)<br>
* postcss-loader：自动添加浏览器前缀  [了解更多](https://webpack.js.org/loaders/postcss-loader)<br>

**Plugins<br>**
插件目的在于解决 loader 无法实现的其他事，让打包的过程更加便捷，可以在webpack运行到某个时刻的时候，帮你做一些事情。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量 [了解更多](https://webpack.js.org/concepts/plugins)<br>
* html-webpack-plugin：打包之后自动生成一个 HTML 文件， 并把打包生成的js文件自动引入到这个html文件中  [了解更多](https://webpack.js.org/loaders/file-loader)<br>
* clean-webpack-plugin：用于打包之前，删除/清除构建文件夹  [了解更多](https://www.npmjs.com/package/clean-webpack-plugin)<br>
* HotModuleReplacementPlugin：启用热替换模块(Hot Module Replacement)，也被称为 HMR，实时预览修改后的页面，无需重新加载整个页面  [了解更多](https://webpack.js.org/plugins/hot-module-replacement-plugin)  [API调用](https://webpack.js.org/api/hot-module-replacement)<br> 

**Mode<br>**
通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化 [了解更多](https://webpack.js.org/configuration/mode/)<br>

**devtool<br>**
此选项控制是否生成，以及如何生成 source-map [了解更多](https://webpack.js.org/configuration/devtool)<br>
* source-map：定义源码以及打包后的代码的映射关系 [介绍](https://blog.teamtreehouse.com/introduction-source-maps)<br>

**devServer<br>**
webpack-dev-server 能够用于快速开发应用程序，会将打包后的文件保存在内存中，不会放在指定文件夹，从而提升打包速度 [了解更多](https://webpack.js.org/configuration/dev-server/)<br>
每次要编译代码时，手动运行 npm run build 就会变得很麻烦。webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：<br>

* webpack's Watch Mode [了解更多](https://webpack.js.org/guides/development/#using-watch-mode)<br>
* webpack-dev-server [了解更多](https://webpack.js.org/guides/development/#using-webpack-dev-server)<br>
* webpack-dev-middleware [了解更多](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)<br>

# 转换es6

**Babel <br>**
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中 [了解更多](https://babeljs.io/docs/en/)<br><br>
[让Babel与你所使用的工具协同工作](https://babeljs.io/setup)<br>
* babel-loader：结合webpack实现es6语法转化 <br>
* babel/core：Babel核心库，babel-loader内部会调用@babel/core进行转化 <br>
* babel-preset-env：包含es6、7等版本的语法转化规则 [了解更多](https://babeljs.io/docs/en/babel-preset-env)<br>
* babel-polyfill：Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片 [了解更多](https://babeljs.io/docs/en/babel-polyfill)<br>
* babel-polyfill缺点：<br>
    1：可能会增加很多根本没有用到的polyfill；[解决方法](https://babeljs.io/docs/en/babel-preset-env#usebuiltins)<br>
    2：可能会污染子模块的局部作用域，严重的或许会导致冲突，旨在用于应用程序，业务逻辑而不是库/工具；<br>
* babel/plugin-transform-runtime：将开发者依赖的全局内置对象等，抽取成单独的模块，并通过模块导入的方式引入，避免了对全局作用域的修改（污染），同时能按需注入polyfill；[了解更多](https://babeljs.io/docs/en/babel-plugin-transform-runtime)<br>

# 打包React代码
**babel/preset-react [了解更多](https://babeljs.io/docs/en/babel-preset-react)<br>**

# Tree Shaking
移除 JavaScript 上下文中的未引用代码；基于 ES6 的[静态引用]，tree shaking 通过扫描所有 ES6 的 export，找出被 import 的内容并添加到最终代码中。 webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理。源码必须遵循 ES6 的模块规范 (import & export)，如果是 CommonJS 规范 (require) 则无法使用 [了解更多](https://webpack.js.org/guides/tree-shaking)<br>





