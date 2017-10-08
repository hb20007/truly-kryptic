let { baseUrl } = require('./shared');

describe('Navigation', function () {
    it('starts at home page when logged out', () => {
        browser.get('/#/');
        expect($('nav-bar').isPresent()).toBe(true);
    });

    // it('shows correct links when logged out', function () {
    //     browser.get(baseUrl);
    // });
});