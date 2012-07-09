/*!
 * chai-spies :: browser build script
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Script dependancies
 */

var folio = require('folio');

/*!
 * Folio Definition
 */

folio('chai-timers')
  .root(__dirname, '..')
  .use('requires')
    .package('chai-timers')
    .dir('./lib')
    .entry('./chai-timers.js')
    .pop()
  .use('indent')
    .line('  ')
    .pop()
  .use('wrapper')
    .template('chai-requires')
    .package('chai-timers')
    .pop()
  .use('save')
    .file('./chai-timers.js')
    .pop()
  .compile();
