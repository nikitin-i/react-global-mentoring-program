const { merge } = require('webpack-merge');

const commonConfig = require('./config/webpack.common');

module.exports = (env) => {
    const mode = env.development ? 'dev' : 'prod';
    const config = require('./config/webpack.' + mode);

    return merge(commonConfig, config);
};