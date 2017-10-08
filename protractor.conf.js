require('./src/e2e/patch-wait-for-angular');

exports.config = {
  allScriptsTimeout: 3500,
  seleniumAddress: 'http://localhost:4444',
  specs: ['src/e2e/**/*.e2e.js'],

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',

  capabilities: {
    browserName: 'chrome',
  
    chromeOptions: {
       args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
     }
  }
};