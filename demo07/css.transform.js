module.exports = function (css) {
    // Here we can change the original css
    console.log(css)
    // return false;
    // const transformed = css.replace('.classNameA', '.classNameB')
    if(window.innerWidth<768){
        return css.replace("blue","yellow")
    }else{
        return css.replace("blue", "green")
    }
    
    
}