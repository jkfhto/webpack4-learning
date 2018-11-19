// es module
import sum from './src/sum'

// commonjs
var minus = require('./src/minus')

// amd  异步会单独生成一个chunk
require(['./src/muti'], function (muti) {
    console.log('muti(2, 3) =', muti(2, 3))
})

console.log('sum(23, 24) =', sum(23, 24))
console.log('minus(24, 17) =', minus(24, 17))
