const path = require('path');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }, 'sass-loader']
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../public'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true
    }
};