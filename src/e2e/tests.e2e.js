require('./account.e2e');
require('./navigation.e2e');

// Prevent login state and other data from persisting between tests
afterEach(() => {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
});
