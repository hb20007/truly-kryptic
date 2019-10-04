const webpackConfig = require('./webpack.config');

// Karma configuration
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

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

            { pattern: 'src/**/*.spec.ts', watched: false }
        ],

        preprocessors: {
            'src/**/*.spec.ts': ['webpack', 'sourcemap'],
        },

        webpack: { ...webpackConfig, output: undefined, entry: undefined, devtool: 'inline-source-map' },

        webpackMiddleware: {
            stats: 'errors-only'
        },

        browsers: ['PhantomJS'],

        client: {
            useIframe: false
        }
    });
};
