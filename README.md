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
    1：可能会增加很多根本没有用到的polyfill；[useBuiltIns 解决方法](https://babeljs.io/docs/en/babel-preset-env#usebuiltins)<br>
    2：可能会污染子模块的局部作用域，严重的或许会导致冲突，旨在用于应用程序，业务逻辑而不是库/工具；<br>
* babel/plugin-transform-runtime：将开发者依赖的全局内置对象等，抽取成单独的模块，并通过模块导入的方式引入，避免了对全局作用域的修改（污染），同时能按需注入polyfill；[了解更多](https://babeljs.io/docs/en/babel-plugin-transform-runtime)<br>

# 打包React代码
**babel/preset-react [了解更多](https://babeljs.io/docs/en/babel-preset-react)<br>**

# Tree Shaking
移除 JavaScript 上下文中的未引用代码；基于 ES6 的[静态引用]，tree shaking 通过扫描所有 ES6 的 export，找出被 import 的内容并添加到最终代码中。 webpack 的实现是把所有 import 标记为有使用/无使用两种，在后续压缩时进行区别处理。源码必须遵循 ES6 的模块规范 (import & export)，如果是 CommonJS 规范 (require) 则无法使用 [了解更多](https://webpack.js.org/guides/tree-shaking)<br>
* sideEffects：如果我们引入的 包/模块 被标记为 sideEffects: false 了，那么不管它是否真的有副作用，只要它没有被调用，整个 模块/包 都会被完整的移除 [演示代码](./tree_shaking)<br>

# 区分生产环境/开发环境
开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置 [了解更多](https://webpack.js.org/guides/production)  [演示代码](./development_production)<br>

# Code Splitting
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间 [了解更多](https://webpack.js.org/guides/code-splitting) [演示代码](./code_splitting)<br><br>
有三种常用的代码分离方法：<br>

* 入口起点：使用 entry 配置手动地分离代码。 [了解更多](https://webpack.js.org/guides/code-splitting/#entry-points)<br> 
    这种方法存在一些问题:<br>
    * 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。<br>
    * 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。<br>
* 防止重复：使用 SplitChunksPlugin 去重和分离 chunk。 [了解更多](https://webpack.js.org/plugins/split-chunks-plugin/)<br>
    * chunks：表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial、async、all 之外，还可以通过函数来过滤所需的 chunks。<br>
    * minSize：表示抽取出来的文件在压缩前的最小大小，默认为30000，需要进行代码分离的代码块要大于30000，否则不生成新chunk。<br>
    * maxSize：表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小。<br>
    * minChunks：表示module在打包后的chunks（打包后的代码文件）中被引用的次数，默认为1，大于等于该次数才会进行代码分割<br>
    * maxAsyncRequests：最大的按需(异步)加载次数，默认为 5，超过该值，其他的module不会进行代码分割<br>
    * maxInitialRequests：入口文件最大的初始化加载次数，默认为 3，超过该值，其他的module不会进行代码分割<br>
    * automaticNameDelimiter：分割出来的文件的自动生成名字的分割符，默认为 ~<br>
    * name：chunk的名字，如果设成true，会根据被提取的chunk自动生成。<br>
    * cacheGroups： 缓存组才是我们配置的关键。它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk。要禁用默认缓存组，请将default设置为false。<br>
        * test：用来决定提取哪些module，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中。<br>
        * priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，分割到priority高的cacheGroups<br>
        * reuseExistingChunk: 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的.<br>
* 动态导入：通过模块的内联函数调用来分离代码。 [了解更多](https://webpack.js.org/guides/code-splitting/#dynamic-imports)<br> 

# Lazy Loading
懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。 [了解更多](https://webpack.js.org/guides/lazy-loading) [演示代码](./lazy_loading)<br>







