let { signUp } = require('./shared');

/// Implements: #TST-level-list
describe('Level List', () => {
    beforeEach(() => {
        signUp();
        browser.get('/#/level-list');
    });

    it('shows levels', () => {
        browser.wait(() => $('.level-item').isPresent());
    });

    /// Implements: #TST-level-list-totals
    it('shows times completed which increase when level is completed', () => {
        browser.wait(() => $('.level-item').isPresent());

        let startCount = $$('.sublevel .level-item').get(3).getText();

        browser.get('/#/level/0/0');
        browser.wait(() => $('.hint').isPresent());

        $('.form-input').sendKeys('hallway');
        $('[type=submit]').click();

        browser.wait(() => $('.guess-answer').isPresent());

        browser.get('/#/level-list');
        browser.wait(() => $('.level-item').isPresent());

        let endCount = $$('.sublevel .level-item').get(3).getText();

        Promise.all([startCount, endCount]).then(([start, end]) => {
            expect(start).toBeLessThan(end);
        });
    });
});