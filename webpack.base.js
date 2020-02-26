const path = require('path');
// const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
    mode: 'development', // production development
    entry: {
        index: './src/index.js',
        login: './src/login/login.js',
        register: './src/register/register.js'
    },
    // 提取公共模块，包括第三方库和自定义工具库等
    // optimization: {
    //     // 找到chunk中共享的模块,取出来生成单独的chunk
    //     splitChunks: {
    //         chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
    //         cacheGroups: {
    //             vendors: {  // 抽离第三方插件
    //                 test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
    //                 name: "vendors",
    //                 priority: -10                       // 抽取优先级
    //             },
    //             utilCommon: {   // 抽离自定义工具库
    //                 name: "common",
    //                 minSize: 0,     // 将引用模块分离成新代码文件的最小体积
    //                 minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
    //                 priority: -20
    //             }
    //         }
    //     },
    //     // 为 webpack 运行时代码创建单独的chunk
    //     // runtimeChunk: {
    //     //     name: 'manifest'
    //     // }
    // },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash:8].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.json'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'index',
            inject: 'body',
            chunks: ['index'],
            hash: true,
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            title: 'login',
            chunks: ['login'],
            hash: true,
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'register.html',
            title: 'register',
            chunks: ['register'],
            hash: true,
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new ExtractTextPlugin('[name].[md5:contenthash:hex:8].css'),
        // 优化 并行处理子进程
        new HappyPack({
            id: 'babel',
            threads: 4,
            loaders: ['babel-loader']
        }),
        new HardSourceWebpackPlugin(),
        new CopyWebpackPlugin([ //支持输入一个数组
            {
                from: path.resolve(__dirname, 'src/assets'), //将src/assets下的文件
                to: './public' // 复制到publiv
            }
        ]),
    ],
    module: {
        rules: [
            // 处理js jsx
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets: ["@babel/react", "@babel/preset-env"]
                      }
                }
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        query: {
                            // 阈值 单位byte
                            limit: '8192',
                            name: 'images/[name]_[hash:7].[ext]',
                        }
                    }
                }]
            },
            // 处理json
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            //   }
        ]
    }
}