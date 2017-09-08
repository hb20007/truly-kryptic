const wallabyWebpack = require('wallaby-webpack');
const webpackPostprocessor = wallabyWebpack({});

module.exports = function () {

    return {
        files: [
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.spec.ts', ignore: true}
        ],

        tests: [
            {pattern: 'src/**/*.spec.ts', load: false}
        ],

        postprocessor: webpackPostprocessor,

        setup: function () {
            window.__moduleBundler.loadTests();
        }
    };
};