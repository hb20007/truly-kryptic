let { signUp } = require('./shared');

describe('Level List', () => {
    beforeEach(() => {
        signUp();
    });

    it('shows levels', () => {
        browser.wait(() => $('.level-item').isPresent());
    });

    // fit('shows levels', () => {
    //     expect($$('.level-item').count()).toBeGreaterThan(0);
    // });
});