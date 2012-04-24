module.exports = (process && process.env && process.env.CHAI_TIMERS_COV)
  ? require('./lib-cov/timers')
  : require('./lib/timers');
