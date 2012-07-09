var Timer = require('./timer');

module.exports = function (chai, _) {
  var Assertion = chai.Assertion;

  chai.Timer = Timer;

  chai.timer = function (name) {
    return new Timer(name);
  };

  Assertion.addProperty('timer', function () {
    this.assert(
        this._obj instanceof Timer
      , 'expected #{this} to be a chai timer'
      , 'expected #{this} to not be a chai timer' );
  });

  [ 'started', 'stopped', 'created' ].forEach(function (when) {
    Assertion.overwriteProperty(when, function (_super) {
      return function () {
        if (this._obj instanceof Timer) {
          _.flag(this, 'timer_when', when);
        } else {
          _super.call(this);
        }
      }
    });
  });

  Assertion.overwriteMethod('before', function (_super) {
    return function assertBefore (timer2, when2) {
      var timer1 = this._obj;
      new Assertion(timer1).to.be.a.timer;
      new Assertion(timer2).to.be.a.timer;

      var when1 = _.flag(this, 'timer_when') || 'started';
      when2 = when2 || when1;
      var time1 = timer1[when1].getTime()
        , time2 = timer2[when2].getTime();

      this.assert(
          time1 < time2
        , 'expected timer {' + timer1.name + '} to have been ' + when1 + ' before timer {' + timer2.name + '} was ' + when2
        , 'expected timer {' + timer1.name + '} to not have been ' + when1 + ' before timer {' + timer2.name + '} was ' + when2
      );
    };
  });

  Assertion.overwriteMethod('after', function (_super) {
    return function assertBefore (timer2, when2) {
      var timer1 = this._obj;
      new Assertion(timer1).to.be.a.timer;
      new Assertion(timer2).to.be.a.timer;

      var when1 = _.flag(this, 'timer_when') || 'started';
      when2 = when2 || when1;
      var time1 = timer1[when1].getTime()
        , time2 = timer2[when2].getTime();

      this.assert(
          time1 > time2
        , 'expected timer {' + timer1.name + '} to have been ' + when1 + ' after timer {' + timer2.name + '} was ' + when2
        , 'expected timer {' + timer1.name + '} to not have been ' + when1 + ' after timer {' + timer2.name + '} was' + when2
      );
    };
  });

};
