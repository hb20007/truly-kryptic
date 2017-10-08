exports.config = {
  allScriptsTimeout: 1500,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['src/e2e/**/*.e2e.js'],

  baseUrl: 'http://localhost:8080/',

  framework: 'jasmine',
};