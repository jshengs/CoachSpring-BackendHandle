const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/app7.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true
}