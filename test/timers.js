if (!chai) {
  var chai = require('chai')
    , timers = require('..');
  chai.use(timers);
}

var should = chai.should();

describe('Chai Timers', function () {

  it('should attach to chai', function () {
    chai.expect(chai).to.respondTo('timer');
  });

  it('should know an object is a timer', function () {
    var timer = chai.timer();
    timer.should.be.a.timer;
    'hello world'.should.not.be.a.timer;

    timer.should.respondTo('start');
    timer.should.respondTo('stop');

    (function () {
      'hello world'.should.be.a.timer;
    }).should.throw(chai.AssertionError, /expected \'hello world\' to be a chai timer/);
  });

  it('should correctly store start and end times', function (done) {
    var timer = chai.timer();
    should.equal(timer.__flags.start, null);
    should.equal(timer.__flags.stop, null);

    timer.start();
    timer.__flags.start.should.be.a('date');
    should.equal(timer.__flags.stop, null);

    setTimeout(function () {
      timer.stop();
      timer.__flags.start.should.be.a('date');
      timer.__flags.stop.should.be.a('date');
      timer.should.have.property('elapsed')
        .to.be.a('number').above('9');
      done();
    }, 10);
  });

});
