const path = require('path');

/**
 * 场景：mode: 'production', import {cube, square} 但是没有调用相关函数
 * 1:：sideEffects不设置，看默认情况
 * 只有console.log("math has side effects");这句代码被打包进来，math.js中的其他两个函数都没有打包
 * 2：sideEffects: false
 * math中的任何代码都没有打进来， 和预期的一致： 这个选项告诉webpack， 我的文件没有任何副作用，正常进行tree shaking
 * 3：sideEffects: ["./math.js"]
 * 和第一种情况一样： 这里显式指明有副作用的文件， 这样webpack会把文件中没有用到的代码也打包进来
 * 
 * 场景：mode: 'production', import {cube, square} 且有调用相关函数
 * console.log("math has side effects");这句代码被打包进来，且调用的相关函数也会进行打包
 */
module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    // optimization: {
    //     usedExports: true,
    // }
}