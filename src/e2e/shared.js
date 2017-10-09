const getNavBarLinks = () =>
    $$('nav-bar [routerlink]')
        .filter(el => el.isDisplayed())
        .map((els) => els.getAttribute('routerlink'));

const signUp = function () {
    this.testEmail = `asdf@${randomString(20)}.com`;
    this.testPassword = randomString(20);

    browser.get('/#/');
    $('#signUpEmail').sendKeys(this.testEmail);
    $('#signUpPassword').sendKeys(this.testPassword);
    $('button[type=submit]').click();

    // we can't trust firebase sync to work due to the wait patch
    browser.wait(() => $('[routerlink="/level-list"]').isPresent());
}

const randomString = (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = { randomString, signUp, getNavBarLinks };