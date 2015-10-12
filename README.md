# jQuery countTo

jQuery countTo is a jQuery plugin that renders a countup or countdown animation inside a target DOM element.

# Quick Examples
```html
<span class="timer-one">0</span>
<div class="timer-two">25</div>
<a  class="timer-three" href="http://www.github.com">4.5</a>
<label class="timer-four">0</label>
<script type="text/javascript">
    
    // count to 100
    $(".timer-one").countTo(100);

    // count to 100 over 5 seconds (default is 1s)
    $(".timer-two").countTo(100, {"duration": 5});

    // count to 101.5, displaying one decimal to the right
    $(".timer-three").countTo(101.5, {"decimals": 1});

    // count to 10 in no more than 10 steps
    $(".timer-four").countTo(10, {"max_steps": 10});
</script>
```


