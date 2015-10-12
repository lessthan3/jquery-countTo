# jQuery countTo

jQuery countTo is a jQuery plugin that renders a countup or countdown animation inside a target DOM element.

# Quick Examples
```html
<span class="timer">0</span>
<script type="text/javascript">
    
    // count to 100
    $('.timer').countTo(100);

    // count to 50 over 10 seconds (default is 1s)
    $('.timer').countTo(50, {"duration": 10});

    // count to 300.5, displaying one decimal to the right
    $('.timer').countTo(101.5, {"decimals": 1});
</script>
```

