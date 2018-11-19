/**
 * requir.ensure(): 只是加载模块但是并不执行
 * import(): 加载模块并且自动执行
 */

 require.include("./moduleA.js"); // 提取subPageA和subPageB的公共代码moduleA  单个entry

import( /* webpackChunkName: 'subPageA'*/ "./subPageA").then(function (subPageA) {
    console.log(subPageA);
});

import( /* webpackChunkName: 'subPageB'*/ "./subPageB").then(function (subPageB) {
    console.log(subPageB);
});

import( /* webpackChunkName: 'lodash'*/ "lodash").then(function (_) {
    console.log(_.join(["1", "2"]));
});

// require.ensure(
//   ["./subPageA.js", "./subPageB.js"],
//   function () {
//     //需要执行require 代码才会执行
//     var subPageA = require("./subPageA");
//     var subPageB = require("./subPageB");
//   },
//   "subPage"
// );

// require.ensure(
//   ["lodash"],
//   function () {
//     var _ = require("lodash");
//     _.join(["1", "2"]);
//   },
//   "vendor"
// );

export default "page";