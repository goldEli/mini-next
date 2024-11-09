const path = require('path');


module.exports = {
    mode: 'development',
    target: 'node',
    entry: './build.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'build.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}