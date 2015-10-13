(function() {
  var assert, env, steps;

  assert = require('assert');

  env = require('jsdom').env;

  steps = 0;

  describe('jquery-countTo Test Suite', function() {
    var decimalTest, stepTest, timeTest;
    before(function() {
      return env('<html><body></body></html>', function(err, window) {
        var $, previous_val;
        if (err) {
          return next(err);
        }
        $ = require('jquery')(window);
        global.$ = $;
        global.$timer = $("<span class='timer'></span>");
        $('html').append($timer);
        previous_val = $timer.text();
        return setInterval((function() {
          var current_val;
          current_val = $timer.text();
          if (previous_val !== current_val) {
            previous_val = current_val;
            return $timer.trigger('change');
          }
        }), 1);
      });
    });
    stepTest = function(options, next) {
      var _ref;
      if (!next) {
        _ref = [options, {}], next = _ref[0], options = _ref[1];
      }
      steps = 0;
      $timer.text('0');
      $timer.off('change').on('change', function() {
        return steps++;
      });
      $timer.countTo(1000, options);
      return setTimeout((function() {
        return next(steps);
      }), 1000);
    };
    decimalTest = function(options, next) {
      var _ref;
      if (!next) {
        _ref = [options, {}], next = _ref[0], options = _ref[1];
      }
      options.decimals = options.decimals || 0;
      options.duration = options.duration || 1;
      $timer.text('0');
      $timer.off('change').on('change', function() {
        var decimals, value, _ref1;
        value = $timer.text().replace(',', '');
        if (value === '0') {
          return;
        }
        decimals = ((_ref1 = value.split('.')[1]) != null ? _ref1.length : void 0) || 0;
        if (decimals !== options.decimals) {
          throw "" + decimals + " rendered.";
        }
      });
      $timer.countTo(1000.023848, options);
      return setTimeout(next, options.duration * 1000);
    };
    timeTest = function(options, next) {
      var duration, lower_limit, start_time, upper_limit, _ref;
      if (!next) {
        _ref = [options, {}], next = _ref[0], options = _ref[1];
      }
      options.duration = options.duration || 1;
      duration = options.duration;
      upper_limit = (duration + (duration * 0.2)) * 1000;
      lower_limit = (duration - (duration * 0.2)) * 1000;
      start_time = Date.now();
      $timer.text('0');
      $timer.off('change').on('change', function() {
        var time_elapsed, value;
        value = $timer.text().replace(',', '');
        if (value === '1000') {
          time_elapsed = Date.now() - start_time;
          if (time_elapsed > upper_limit || time_elapsed < lower_limit) {
            throw "It took " + time_elapsed + "ms to run.";
          }
          return next();
        }
      });
      return $timer.countTo(1000, options);
    };
    describe('Plugin loading', function() {
      return it('should load as a function type.', function() {
        var plugin_type;
        require('../build/jquery-countTo.js');
        plugin_type = typeof $().countTo;
        return assert.equal(plugin_type, 'function');
      });
    });
    describe('When animating with default settings', function() {
      it('there should be more then 1 steps', function(done) {
        return stepTest(function(steps) {
          if (steps < 10) {
            throw "" + steps + " steps occured.";
          }
          return done();
        });
      });
      it('there should be less than 100 steps', function(done) {
        return stepTest(function(steps) {
          if (steps > 100) {
            throw "" + steps + " steps occured.";
          }
          return done();
        });
      });
      return it('all the numbers should be integers', function(done) {
        return decimalTest(done);
      });
    });
    describe('Setting options.decimals', function() {
      it('to 1 should display 1 decimal', function(done) {
        return decimalTest({
          decimals: 1,
          duration: 0.5
        }, done);
      });
      it('to 5 should display 5 decimal', function(done) {
        return decimalTest({
          decimals: 5,
          duration: 0.5
        }, done);
      });
      return it('to 10 should display 10 decimal', function(done) {
        return decimalTest({
          decimals: 10,
          duration: 0.5
        }, done);
      });
    });
    return describe('Setting options.duration', function() {
      this.timeout(5000);
      it('to 0.5 should take 500ms to run the animation', function(done) {
        return timeTest({
          duration: 0.5
        }, done);
      });
      return it('3 should take 3s to run the animation', function(done) {
        return timeTest({
          duration: 3
        }, done);
      });
    });
  });

}).call(this);
