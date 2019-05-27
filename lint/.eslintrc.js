module.exports = {
    "extends": "airbnb-base",
    "rules": {
        // 禁止 console，要用写 eslint disbale
        "no-console": 2,
        // 禁止 debugger，防止上线
        "no-debugger": 2,
        // 禁止 alert，要用写 eslint disable
        "no-alert": "error",
        // 不用的 var，要删除，手动 tree shaking，要洁癖
        "no-unused-vars": "error",
        // 没定义就用的就别用，全局的要用 写 eslint global
        "no-undef": 2
    }
}