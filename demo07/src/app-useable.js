import base from './css/base.css'
import common from './css/common.css'

var app = document.getElementById('app');
app.innerHTML = '<div class="'+ base.box +'"></div>'

import(/* webpackChunkName:'a' */ './components/a').then(function(a) {
    console.log(a)
})
base.use()
// base.unuse()

var flag = true;

setInterval(function(){
    if (flag) {
        base.unref()
    } else {
        base.ref()
    }
    flag = !flag
}, 1000)

