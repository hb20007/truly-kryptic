let { signUp } = require('./shared');

describe('Hall of Fame Form', () => {
    beforeEach(() => {
        signUp();
        browser.wait(() => $('.hint').isPresent());
        browser.get('/#/hof-form');
    });

    // partof: #TST-hof-form-comment
    it('displays correct input fields', () => {
        browser.wait(() => $('#hofComment').isPresent());
    });
});