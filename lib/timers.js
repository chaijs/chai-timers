
module.exports = function (chai, _) {

  chai.Timer = function (name) {
    this.name = name || 'timer';
    this.created = new Date();
    this.marks = [];
    this.started = null;
    this.stopped = null;
  };

  chai.Timer.prototype.start = function (date) {
    this.started = date || new Date();
    return this;
  };

  chai.Timer.prototype.stop = function (date) {
    this.stopped = date || new Date();
  };

  chai.Timer.prototype.mark = function (date) {
    this.marks.push(date || new Date());
  };

  Object.defineProperty(chai.Timer.prototype, 'elapsed',
    { get: function () {
        var start = this.started.getTime()
          , stop = this.stopped.getTime();
        return stop - start;
      }
    , configurable: true
  });

  Object.defineProperty(chai.Timer.prototype, 'marks',
    { get: function () {
        var marks = _.flag(this, 'marks');
        return marks;
      }
    , configurable: true
  });

  _.addProperty(chai.Assertion, 'timer', function () {
    var obj = _.flag(this, 'object');

    this.assert(
        obj instanceof chai.Timer
      , 'expected #{this} to be a chai timer'
      , 'expected #{this} to not be a chai timer' );

    return this;
  });

  [ 'started', 'stopped', 'created' ].forEach(function (when) {
    _.overwriteProperty(chai.Assertion, when, function (_super) {
      return function () {
        var obj = _.flag(this, 'object');
        if (obj instanceof chai.Timer) {
          _.flag(this, 'timer_when', when);
        } else {
          _super.call(this);
        }
        return this;
      }
    });
  });

  _.overwriteMethod(chai.Assertion, 'before', function (_super) {
    return function assertBefore (timer2, when2) {
      var timer1 = _.flag(this, 'object')
      new chai.Assertion(timer1).to.be.a.timer;
      new chai.Assertion(timer2).to.be.a.timer;

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

  _.overwriteMethod(chai.Assertion, 'after', function (_super) {
    return function assertBefore (timer2, when2) {
      var timer1 = _.flag(this, 'object')
      new chai.Assertion(timer1).to.be.a.timer;
      new chai.Assertion(timer2).to.be.a.timer;

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
