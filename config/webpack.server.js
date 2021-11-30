const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    context: path.resolve(__dirname, '../src'),
    entry: {serverRenderer: './serverRenderer.js', main: './index.js'},
    output: {
        path: path.join(__dirname, '../built'),
        filename: 'js/[name].js',
        assetModuleFilename: 'images/[hash][ext][query]',
        publicPath: "/",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                            ['@babel/preset-react']
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }, 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    resolve: {
        extensions: ['.js']
    }
};