const path = require('path');

module.exports = {
    entry: './client.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname),
        filename: 'index.js',
    },
    module: {
        rules: [{
            test: /\.js|jsx$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env', [
                        '@babel/preset-react', {
                            runtime: 'automatic'
                        }
                    ]],
                },
            }
        }],
    },
};
