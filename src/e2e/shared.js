const isLoggedIn = () => $('[routerlink="/level-list"]').isPresent()
const isLoggedOut = () => isLoggedIn().then(l => !l)

const getNavBarLinks = () =>
    $$('nav-bar [routerlink]')
        .filter(el => el.isDisplayed())
        .map((els) => els.getAttribute('routerlink'));

const signUp = function () {
    let testEmail = `asdf@${randomString(20).toLowerCase()}.com`;
    let testPassword = randomString(20);

    browser.get('/#/');
    $('#signUpEmail').sendKeys(testEmail);
    $('#signUpPassword').sendKeys(testPassword);
    $('button[type=submit]').click();

    // we can't trust firebase sync to work due to the wait patch
    browser.wait(isLoggedIn);

    return { testEmail, testPassword };
}
const login = function (testEmail, testPassword) {
    browser.get('/#/login');
    $('#loginEmail').sendKeys(testEmail);
    $('#loginPassword').sendKeys(testPassword);
    $('button[type=submit]').click();

    browser.wait(isLoggedIn);
};

const logout = () => {
    // too lazy to deal with dropdown focus to do an actual click :D
    browser.executeScript("document.querySelector('.dropdown-menu :nth-child(2)').click()");
    browser.wait(isLoggedOut);
};

const randomString = (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = { randomString, signUp, getNavBarLinks, logout, login, isLoggedIn, isLoggedOut };