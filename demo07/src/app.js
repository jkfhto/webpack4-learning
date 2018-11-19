import cs from "./css/cs.css"
import cs2 from "./css/cs2.css"

// var flag = true;
// setInterval(() => {
//     if (flag){
//         cs.use();
//     }else{
//         cs.unuse();
//     }
//     flag = !flag;
// }, 500);
import base from './css/base.less'
import common from './css/common.less'
var app2 = document.getElementById('app2');

// // css Modules 的引用方法
app2.innerHTML = '<div class="' + base.box + '"></div>'



import(/* webpackChunkName:'a' */ './components/a').then(function(a) {
    console.log(a)
})

// var flag = true;

