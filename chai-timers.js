!function (name, definition) {
  if (typeof define == 'function' && typeof define.amd  == 'object') define(definition);
  else this[name] = definition();
}('chai_timers', function () {
  // CommonJS require()
  function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

  require.modules = {};

  require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

  require.register = function (path, fn){
    require.modules[path] = fn;
  };

  require.relative = function (parent) {
    return function(p){
      if ('.' != p[0]) return require(p);

      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();

      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };


require.register("timers", function (module, exports, require) {

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

}); // module timers
  return require('timers');
});

chai.use(chai_timers);
