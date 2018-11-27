module.exports = {
    root: true,
    extends: 'standard',
    plugins: [
        // 'html'
    ],
    env: {
        browser: true,
        node: true
    },
    globals: {
        $: true
    },
    rules: { //覆盖extends设置的规则
        'indent': ['error', 4],
        'eol-last': ['error', 'never']
    }
}