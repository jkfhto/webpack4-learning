第三方库以 node\_modules 为代表，它们庞大得可怕，却又不可或缺。

处理第三方库的姿势有很多，其中，Externals 不够聪明，一些情况下会引发重复打包的问题；而 CommonsChunkPlugin 每次构建时都会重新构建一次 vendor；出于对效率的考虑，我们这里为大家推荐 DllPlugin。

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。**这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包**。

用 DllPlugin 处理文件，要分两步走：

*   [基于 dll 专属的配置文件，打包 dll 库](./build/webpack.dll.js)
*   基于 webpack.config.js 文件，打包业务代码
