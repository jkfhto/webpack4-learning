import base from './css/base.less'

var app = document.getElementById('app');
var div = document.createElement('div');
div.className = 'smallBox'
app.appendChild(div)

import { a } from './common/util'
console.log(a())

import { chunk } from 'lodash-es'
console.log(chunk([1,2,3,4,5,6,7], 2))