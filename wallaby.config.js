const webpack = require('webpack');
const wallabyWebpack = require('wallaby-webpack');
const path = require('path');

module.exports = function (wallaby) {

    const webpackConfiguration = {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                },
                {
                    test: /\.scss$/,
                    use: ['raw-loader', 'sass-loader'],
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify('development'),
            })
        ],
    };

    return {
        files: [
            'node_modules/core-js/client/shim.min.js',
            // Zone.js dependencies
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/jasmine-patch.js',

            { pattern: 'Notes/**/*.json', load: false },
            { pattern: 'src/**/*.scss', load: false },
            { pattern: 'src/**/*.html', load: false },
            { pattern: 'src/**/*.ts', load: false },
            { pattern: 'src/**/*.spec.ts', load: false, ignore: true }
        ],

        tests: [
            { pattern: 'src/**/*.spec.ts', load: false }
        ],

        postprocessor: wallabyWebpack(webpackConfiguration),

        setup: function () {
            window.__moduleBundler.loadTests();
        }
    };
};