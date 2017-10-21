let { signUp } = require('./shared');

describe('Level List', () => {
    beforeEach(() => {
        signUp();
        browser.wait(() => $('.hint').isPresent());
    });

    // Implements: #TST-level-guesses
    it('guesses can be submitted', () => {
        $('.form-input').sendKeys('asdf');
        $('[type=submit]').click();
        browser.wait(() => $('.guess').isPresent());
        expect($('.guess').getText()).toBe('asdf');
    });

    // Implements: #TST-level-hint
    it('will display default as well as additional hints when close guesses are made', () => {
        expect($('.hint-image').isPresent()).toBe(true);
        expect($$('.hint').count()).toBe(4);

        $('.form-input').sendKeys('help');
        $('[type=submit]').click();

        browser.wait(() => $$('.hint').count().then(c => c == 5));
        expect($('.hint-trigger').getText()).toBe('help');
    });

    // Implements: #TST-level-solution_input
    it('will allow users to continue to the next level when the correct answer is entered', () => {
        $('.form-input').sendKeys('hallway');
        $('[type=submit]').click();

        browser.wait(() => $('.guess-answer').isPresent());

        $('.level-continue-next').click();

        browser.wait(() => $('.level-number').getText().then(t => t == 'Level 2'));

        // We should be able to go back with the arrow keys
        browser.actions().sendKeys(protractor.Key.ARROW_LEFT).perform();
        browser.wait(() => $('.level-number').getText().then(t => t == 'Level 1'));
    });
});