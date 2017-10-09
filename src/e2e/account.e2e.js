let { randomString, signUp, logout, login, isLoggedOut } = require('./shared');

describe('Account', () => {
    describe('Auth', () => {
        it('allows sign up, logout, and login', () => {
            browser.get('/#/');
            let { testEmail, testPassword } = signUp();
            logout();
            login(testEmail, testPassword);
        });
    });

    // Implements: #TST-account
    describe('Settings', () => {
        let cred;

        beforeEach(() => {
            cred = signUp();
            browser.get('/#/account');
            browser.wait(() => $('account').isPresent());
        });

        // Implements: #TST-account-title
        it('displays the account name', () => {
            expect($('.user-credentials.email').getText()).toEqual(cred.testEmail);
        });

        // Implements: #TST-account-change_password
        it('allows password to be changed', () => {
            let newPass = randomString(20);

            $('#oldPassword').sendKeys(cred.testPassword);
            $('#password').sendKeys(newPass);
            $('#confirmPassword').sendKeys(newPass);

            $('button[type=submit]').click();

            browser.wait(() => $('.form-error').getText().then(t => t == 'Password changed successfully'))

            logout();

            login(cred.testEmail, newPass);
        });

        // Implements: #TST-account-delete
        it('allows account to be deleted', () => {
            expect($(' .form-action.unclickable').isPresent()).toBe(true);

            $('label[for=checkbox]').click();

            $('#currentDeletePassword').sendKeys(cred.testPassword);
            // Form action should no longer have 'unclickable' class
            expect($$('.acc-section-two .form-action.unclickable').count()).toBe(0);

            $('.acc-section-two .form-action').click();

            browser.wait(isLoggedOut);
        });
    });
});