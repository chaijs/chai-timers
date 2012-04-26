if (!chai) {
  var chai = require('chai')
    , timers = require('..');
  chai.use(timers);
}

var should = chai.should();

describe('Chai Timers', function () {

  it('should attach to chai', function () {
    chai.expect(chai).to.respondTo('Timer');
  });

  it('should know an object is a timer', function () {
    var timer = new chai.Timer();
    timer.should.be.a.timer;
    'hello world'.should.not.be.a.timer;

    timer.should.respondTo('start');
    timer.should.respondTo('stop');

    (function () {
      'hello world'.should.be.a.timer;
    }).should.throw(chai.AssertionError, /expected \'hello world\' to be a chai timer/);
  });

  it('should correctly store start and end times', function (done) {
    var timer = new chai.Timer();
    should.equal(timer.started, null);
    should.equal(timer.stopped, null);

    timer.start();
    timer.started.should.be.a('date');
    should.equal(timer.stopped, null);

    setTimeout(function () {
      timer.stop();
      timer.started.should.be.a('date');
      timer.stopped.should.be.a('date');
      timer.created.should.be.a('date');

      timer.should.have.property('elapsed')
        .to.be.a('number').above('9');
      done();
    }, 10);
  });

  it('should be able to assert `before`', function (done) {
    var timer1 = new chai.Timer('timer1');
    timer1.start();

    setTimeout(function () {
      var timer2 = new chai.Timer('timer2');
      timer1.stop();
      timer2.start();

      timer1.should.have.been.created.before(timer2);
      timer2.should.have.not.been.created.before(timer1)

      timer1.should.have.started.before(timer2);
      timer2.should.have.not.started.before(timer1);

      (function () {
        timer1.should.have.not.started.before(timer2);
      }).should.throw(chai.AssertionError, /to not have been started before/);

      (function () {
        timer2.should.have.started.before(timer1);
      }).should.throw(chai.AssertionError, /to have been started before/);

      setTimeout(function () {
        timer2.stop();
        timer1.should.have.stopped.before(timer2);
        timer2.should.have.not.stopped.before(timer1);
        done();
      }, 10);
    }, 10);
  });

  it('should be able to assert `after`', function (done) {
    var timer1 = new chai.Timer('timer1');
    timer1.start();

    setTimeout(function () {
      var timer2 = new chai.Timer('timer2');
      timer1.stop();
      timer2.start();

      timer2.should.have.been.created.after(timer1);
      timer1.should.have.not.been.created.after(timer2)

      timer2.should.have.started.after(timer1);
      timer1.should.have.not.started.after(timer2);

      (function () {
        timer2.should.have.not.started.after(timer1);
      }).should.throw(chai.AssertionError, /to not have been started after/);

      (function () {
        timer1.should.have.started.after(timer2);
      }).should.throw(chai.AssertionError, /to have been started after/);

      setTimeout(function () {
        timer2.stop();
        timer2.should.have.stopped.after(timer1);
        timer1.should.have.not.stopped.after(timer2);
        done();
      }, 10);
    }, 10);
  });
});
