import './css/base.less'

import { a } from "./common/util";
a()

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)

$('div').addClass('new');

$.get('/api/comments/show', {
    id: '4193586758833502',
    page: 1
}, function (data) {
    console.log(data)
})
