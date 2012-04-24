
module.exports = function (chai, _) {

  function Timer (start, stop) {
    start = ('undefined' === typeof start) ? null : start;
    stop = ('undefined' === typeof stop) ? null : stop;
    _.flag(this, 'start', start);
    _.flag(this, 'stop', stop);
  };

  Timer.prototype.start = function () {
    _.flag(this, 'start', new Date());
  };

  Timer.prototype.stop = function () {
    _.flag(this, 'stop', new Date());
  };

  Object.defineProperty(Timer.prototype, 'elapsed',
    { get: function () {
        var start = _.flag(this, 'start').getTime()
          , stop = _.flag(this, 'stop').getTime();
        return stop - start;
      }
    , configurable: true
  });

  chai.timer = function () {
    return new Timer();
  };

  _.addProperty(chai.Assertion, 'timer', function () {
    var obj = _.flag(this, 'object');

    this.assert(
        obj instanceof Timer
      , 'expected #{this} to be a chai timer'
      , 'expected #{this} to not be a chai timer' );

    return this;
  });

};
