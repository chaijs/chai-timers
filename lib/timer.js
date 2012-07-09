
module.exports = Timer;

function Timer (name) {
  this.name = name || 'timer';
  this.created = new Date();
  this.marks = [];
  this.started = null;
  this.stopped = null;
};

Object.defineProperty(Timer.prototype, 'elapsed',
  { get: function () {
      var start = this.started.getTime()
        , stop = this.stopped.getTime();
      return stop - start;
    }
});

Timer.prototype.start = function (date) {
  this.started = date || new Date();
  return this;
};

Timer.prototype.stop = function (date) {
  this.stopped = date || new Date();
};

Timer.prototype.mark = function (date) {
  this.marks.push(date || new Date());
};
