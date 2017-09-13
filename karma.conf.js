const webpackConfig = require('./webpack.config');

// Karma configuration
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            { pattern: 'src/**/*.spec.ts', watched: false }
        ],

        preprocessors: {
            'src/**/*.spec.ts': ['webpack', 'sourcemap'],
        },

        webpack: { ...webpackConfig, output: undefined, entry: undefined, devtool: 'inline-source-map' },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        browsers: ['PhantomJS']
    });
};