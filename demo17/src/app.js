import './css/base.less'

import {
    a
} from './common/util'
import {
    componentA
} from './components/a'

a()

var app = document.getElementById('one')
var list = componentA()
app.appendChild(list)

$('div').addClass('new')

if (process.env.NODE_ENV === 'development') {
    $.get('/api/comments/show', {
        id: '4193586758833502',
        page: 1
    }, function (data) {
        console.log(data)
    })
}

if (module.hot) { // 模块热更新
    module.hot.accept('./components/a', function () {
        app.removeChild(list)

        let ComponentA = require('./components/a').componentA
        let newlist = ComponentA()

        app.appendChild(newlist)
        list = newlist
    })
}