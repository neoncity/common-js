const failPlugin = require('webpack-fail-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: {
        index: './src/index.ts',
        tests: './tests/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'tests')
            ],
            loader: 'ts',
            query: {
                configFileName: 'tsconfig.json',
                silent: true
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'tests')
        ]
    },
    plugins: [
        failPlugin,
        new webpack.IgnorePlugin(/LICENSE/), // From moch
        new webpack.IgnorePlugin(/template.html/), // From mocha        
    ],
    devtool: 'source-map'
}
