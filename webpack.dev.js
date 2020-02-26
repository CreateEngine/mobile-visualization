const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const dev = {
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 8080,
        host: 'localhost',
        overlay: true,
        compress: true,
        open: true,
        hot: true,
        inline: true,
        progress: true,
        historyApiFallback: true
    },
    // devtool: 'inline-source-map',
    module: {
        rules: [
            // 兼容热替换
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
            {
                test: /(antd|antd-mobile).css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}
module.exports = merge(base, dev);