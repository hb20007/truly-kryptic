const wallabyWebpack = require('wallaby-webpack');
const baseWebpackConfig = require('./webpack.config');

const webpackPostprocessor = wallabyWebpack({ ...baseWebpackConfig, module: undefined });

module.exports = function () {

    return {
        files: [
            { pattern: 'node_modules/core-js/shim.js', instrument: false },
            { pattern: 'src/**/*.ts', load: false },
            { pattern: 'src/**/*.spec.ts', ignore: true }
        ],

        tests: [
            { pattern: 'src/**/*.spec.ts', load: false }
        ],

        postprocessor: webpackPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        }
    };
};