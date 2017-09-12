describe('App Works', function () {
    it('is displayed', function () {
        browser.get('http://localhost:9090/index.html');
        expect($('h1').isPresent()).toBe(true);
    });
});