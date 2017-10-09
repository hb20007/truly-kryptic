let { baseUrl } = require('./shared');
let uniq = require('lodash/uniq');
let { getNavBarLinks, signUp } = require('./shared');

// Implements: #TST-nav_bar
describe('Navigation', function () {

    describe('Unauthenticated', () => {

        beforeEach(() => {
            browser.get('/#/');
        });

        it('displays correct links in nav bar when logged out', () => {
            expect(getNavBarLinks()).toEqual([
                "/login",
                "/hof",
                "/getting-started",
                "/",
            ]);
        });

        it('starts at home page when logged out', () => {
            // Implements: #TST-landing
            expect($('landing-page').isPresent()).toBe(true);

            // Implements: #TST-landing-site_description
            expect($('.website-info').isPresent()).toBe(true);

            // Implements: #TST-landing-sign_up
            expect($('sign-up-form').isPresent()).toBe(true);
        });

        // Implements: #TST-getting_started
        it('can open getting started', () => {
            browser.get('#/getting-started');
            expect($('getting-started').isPresent()).toBe(true);
        });

        it('opens the main page when the logo is clicked', function () {
            browser.get('#/getting-started');
            $('#logo').click();
            expect(browser.getCurrentUrl()).toMatch(/\/#\/$/);
        });
    });

    describe('Authenticated', () => {
        beforeEach(() => {
            signUp();
        });

        it('displays correct links in nav bar when logged in', () => {
            expect(getNavBarLinks()).toEqual([
                "/account",
                "/level-list",
                "/hof",
                "/getting-started",
                "/",
            ]);
        });
    });
});