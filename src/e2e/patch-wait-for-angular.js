require('protractor/built/clientsidescripts').waitForAngular = (_, callback) => {
  var testabilities = window.getAllAngularTestabilities();
  var count = testabilities.length;
  var decrement = function () {
    count--;
    if (count === 0) {
      callback();
    }
  };
  testabilities.forEach(function (testability) {
    if (testability._isZoneStable) {
      decrement();
    } else {
      testability.whenStable(decrement);
    }
  });
};
