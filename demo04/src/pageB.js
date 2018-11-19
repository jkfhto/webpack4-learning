import * as _ from 'lodash'
var page = 'subpageB'

if (page === 'subpageA') {
    import(/* webpackChunkName:'subpageA' */'./subPageA')
        .then(function(subPageA) {
            console.log(subPageA)
        })
} else if (page === 'subPageB') {
    import(/* webpackChunkName:'subpageB' */'./subPageB')
        .then(function(subPageB) {
            console.log(subPageB)
        })
}


export default 'pageB'