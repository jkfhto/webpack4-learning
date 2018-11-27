import './css/base.less'

import { a } from "./common/util";
a()

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)

$('div').addClass('new')