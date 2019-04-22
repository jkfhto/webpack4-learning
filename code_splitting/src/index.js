// 代码分割，和webpack无关
// webpack中实现代码分割，两种方式
// 1. 同步代码： 只需要在配置文件中中做optimization的配置即可
// 2. 异步代码(import): 异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中

//同步代码
import _ from "lodash";

var element = document.createElement('div');
element.innerHTML = _.join(['111', '222'], '-');
document.body.appendChild(element);

//异步代码(import)
// function getComponent() {
// 	return import( /* webpackChunkName: "lodash" */ 'lodash').then(({
// 				default: _
// 			}) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['111', '222'], '-');
// 		return element;
// 	})
// }

// getComponent().then(element => {
// 	document.body.appendChild(element);
// });
