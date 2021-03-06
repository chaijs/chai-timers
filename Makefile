
TESTS = test/*.js
REPORTER = spec

all: clean
	@node support/compile.js

clean:
	@rm -f chai-timers.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

test-cov: lib-cov
	@CHAI_TIMERS_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@rm -rf lib-cov
	@jscoverage lib lib-cov

.PHONY: all clean test test-cov lib-cov
