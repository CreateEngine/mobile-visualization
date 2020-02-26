const path = require('path');
const merge = require('webpack-merge');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const base = require('./webpack.base');

const prod = {
    module: {
        rules: [
            // 处理css link less
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    // style-loader 把css直接写入html中style标签
                    fallback: 'style-loader',
                    // css-loader css中import支持
                    // loader执行顺序 从右往左执行
                    use: ['css-loader', 'less-loader']
                }),
                exclude: /node_modules/
            },]
    },
    plugins: [
        // 文档: https://github.com/gdborton/webpack-parallel-uglify-plugin
        new WebpackParallelUglifyPlugin(
            {
                uglifyJS: {
                    mangle: false,
                    output: {
                        beautify: false,
                        comments: false
                    },
                    compress: {
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true
                    },
                    warnings: false,
                }
            }
        ),
    ]
}
module.exports = merge(base, prod);