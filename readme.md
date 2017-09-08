[![Build Status](https://travis-ci.org/gijsroge/tilt.js.svg?branch=master)](https://travis-ci.org/gijsroge/tilt.js)

# Tilt.js
A tiny requestAnimationFrame powered 60+fps lightweight parallax tilt effect for jQuery. 

Weights just ⚖**1.71kb Gzipped**
![Tilt.js demo gif](http://gijsroge.github.io/tilt.js/tilt.js.gif)

#### Take a look at the **[landing page](http://gijsroge.github.io/tilt.js/)** for demos.

### Usage

```html
<!DOCTYPE html>
<body>
    <div data-tilt></div> <!-- Tilt element -->
    <script src="jquery.js" ></script> <!-- Load jQuery first -->
    <script src="tilt.js"></script> <!-- Load Tilt.js library -->
</body>
```

### Options
```js
maxTilt:        20,
perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
speed:          300,    // Speed of the enter/exit transition.
transition:     true,   // Set a transition on enter/exit.
disableAxis:    null,   // What axis should be disabled. Can be X or Y.
reset:          true,   // If the tilt effect has to be reset on exit.
glare:          false,  // Enables glare effect
maxGlare:       1       // From 0 - 1.
```

### Events
```js
const tilt = $('.js-tilt').tilt();
tilt.on('change', callback);  // parameters: event, transforms
tilt.on('tilt.mouseLeave', callback); // parameters: event
tilt.on('tilt.mouseEnter', callback); // parameters: event
```

### Methods
```js
const tilt = $('.js-tilt').tilt();

// Destroy instance
tilt.tilt.destroy.call(tilt);

// Get values of instance
tilt.tilt.getValues.call(tilt); // returns [{},{},etc..]

// Reset instance
tilt.tilt.reset.call(tilt);
```

### Install
- **yarn:** `yarn add tilt.js`
- **npm:** `npm install --save tilt.js`

### CDN
- https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.1.21/tilt.jquery.min.js
- https://unpkg.com/tilt.js@1.1.21/dest/tilt.jquery.min.js

### Alternatives
- **Vanilla JS:** https://github.com/micku7zu/vanilla-tilt.js
- **React:** https://github.com/jonathandion/react-tilt
- **Polymer:** https://github.com/YingshanDeng/polymer-tilt
