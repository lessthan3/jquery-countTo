# jQuery countTo

jQuery countTo animates countups and countdowns within target DOM elements. 

# Simple Example
```html
<span class="timer-a">0</span>
<span class="timer-b">0</span>
<span class="timer-c">5</span>
<span class="timer-d">10</span>

<script type="text/javascript">

    // count to 100
    $(".timer-a").countTo(100);

    // count to 100 over 5 seconds (default is 1s)
    $(".timer-b").countTo(100, {"duration": 5});

    // count to 30.5, displaying one decimal to the right
    $(".timer-c").countTo(30.5, {"decimals": 1});

    // count to 10 in no more than 10 steps
    $(".timer-d").countTo(20, {"max_steps": 10});

</script>
```

# Usage

1. Include jQuery:
    ```html
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    ```

2. Include plugin's code:
    ```html
    <script src="build/jquery-countTo.min.js"></script>
    ```

3. Call the plugin:
    ```html
    <script type="text/javascript">
        $('.my-element').countTo(42);
    </script>
    ```

# Requirements
- jQuery v1.0+
