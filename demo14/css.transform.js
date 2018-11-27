module.exports = function (css) {
    console.log(css)
    console.log(window.innerWidth)
    if (window.innerWidth >= 768) {
        return css.replace('red', 'green')
    } else {
        return css.replace('red', 'orange')
    }
}