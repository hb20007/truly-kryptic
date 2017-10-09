require('./src/e2e/patch-wait-for-angular');

exports.config = {
  allScriptsTimeout: 3500,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/e2e/tests.e2e.js'],

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

  capabilities: {
    browserName: 'chrome',

    chromeOptions: {
      args: ["--incognito"]
    }
  }
};