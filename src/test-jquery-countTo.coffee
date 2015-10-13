# dependencies
assert = require 'assert'
env = require('jsdom').env
steps = 0

describe 'jquery-countTo Test Suite', ->
  before ->
    env '<html><body></body></html>', (err, window) ->
      return next err if err
      $ = require('jquery')(window)
      global.$ = $

      global.$timer = $("<span class='timer'></span>")
      $('html').append $timer

      previous_val = $timer.text()
      setInterval (->
        current_val = $timer.text()
        if previous_val isnt current_val
          previous_val = current_val
          $timer.trigger 'change'
      ), 1

  stepTest = (options, next) ->
    [next, options] = [options, {}] unless next
    steps = 0
    $timer.text '0'
    $timer.off('change').on 'change', -> steps++
    $timer.countTo 1000, options
    setTimeout (->
      next steps
    ), 1000

  decimalTest = (options, next) ->
    [next, options] = [options, {}] unless next
    options.decimals = options.decimals or 0
    options.duration = options.duration or 1

    $timer.text '0'
    $timer.off('change').on 'change', ->
      value = $timer.text().replace ',', ''
      return if value is '0'
      decimals = value.split('.')[1]?.length or 0

      if decimals isnt options.decimals
        throw "#{decimals} rendered."
    $timer.countTo 1000.023848, options

    setTimeout next, options.duration * 1000

  timeTest = (options, next) ->
    [next, options] = [options, {}] unless next
    options.duration = options.duration or 1
    {duration} = options
    upper_limit = (duration + (duration * 0.2)) * 1000
    lower_limit = (duration - (duration * 0.2)) * 1000


    start_time = Date.now()
    $timer.text '0'
    $timer.off('change').on 'change', ->
      value = $timer.text().replace ',', ''
      if value is '1000'
        time_elapsed = Date.now() - start_time
        if time_elapsed > upper_limit or time_elapsed < lower_limit
          throw "It took #{time_elapsed}ms to run."
        next()

    $timer.countTo 1000, options

  describe 'Plugin loading', ->
    it 'should load as a function type.', ->
      require '../build/jquery-countTo.js'
      plugin_type = typeof $().countTo
      assert.equal plugin_type, 'function'

  describe 'When animating with default settings', ->

    it 'there should be more then 1 steps', (done) ->
      stepTest (steps) ->
        throw "#{steps} steps occured." if steps < 10
        done()

    it 'there should be less than 100 steps', (done) ->
      stepTest (steps) ->
        throw "#{steps} steps occured." if steps > 100
        done()

    it 'all the numbers should be integers', (done) ->
      decimalTest done

  describe 'Setting options.decimals', ->
    it 'to 1 should display 1 decimal', (done) ->
      decimalTest {
        decimals: 1
        duration: 0.5
      }, done

    it 'to 5 should display 5 decimal', (done) ->
      decimalTest {
        decimals: 5
        duration: 0.5
      }, done

    it 'to 10 should display 10 decimal', (done) ->
      decimalTest {
        decimals: 10
        duration: 0.5
      }, done

  describe 'Setting options.duration', ->
    this.timeout 5000
    it 'to 0.5 should take 500ms to run the animation', (done) ->
      timeTest {duration: 0.5}, done

    it '3 should take 3s to run the animation', (done) ->
      timeTest {duration: 3}, done
