module.exports = (process && process.env && process.env.CHAI_TIMERS_COV)
  ? require('./lib-cov/chai-timers')
  : require('./lib/chai-timers');
