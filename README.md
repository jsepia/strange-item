# Strange Item

[![Build Status](https://travis-ci.org/jsepia/strange-item.svg?branch=master)](https://travis-ci.org/jsepia/strange-item) [![Coverage Status](https://coveralls.io/repos/github/jsepia/strange-item/badge.svg?branch=master)](https://coveralls.io/github/jsepia/strange-item?branch=master)

Ever wanted to auto-update a DOM element every time a certain JS value is changed? But you don't want to set up Angular or React just to do that? If so, **Strange Item** might be for you.

**Strange Item** is a utility class that:

* stores a value (preferably a `string` or `number`)
* exposes a getter and a setter for that value
* auto-updates a set of DOM elements whenever that value is changed

Strange Item is written in ES6 with ES6-style imports just because I don't want to have to go back and refactor when ES6 becomes mainstream. As a result, you need Node 7+ to build it. The good news is that, it generates ES5-compliant builds in AMD, CommonJS, IIFE and UMD formats. The unit tests run on the UMD version when run from the command line.

## Installation

  npm --save install strange-item

### For Typescript

  npm --save install @types/strange-item

## Basic usage

Let's say you're working on a web-based game and you want a frames-per-second counter.

### Include the JS library

Preferably use something like Webpack to bundle it with other libraries or with your code

```html
<script type="text/javascript" src="/path/to/strange-item.min.js"></script>
```

### Create a strange item to track your value

```js
var fps = new StrangeItem();
fps.set(0)

// or 

var fps = new StrangeItem(0);
```

### Create a DOM element to show the current value

```html
<span id=""></span>
```

### Bind the DOM element to the strange item

```js
fps.bind('fps-counter')
```

```js
lastTimestamp = performance.now();
requestAnimationFrame(function(timestamp) {
  var timeElapsed = timestamp - lastTimestamp;
  fps.set(1000 / timeElapsed);
})
```

## Manual updates

Not sure why you would need this since it defeats the entire purpose of using Strange Item.

```js
fps.autoUpdate = false
fps.update(); // updates all bound DOM elements at once
```

If you set `autoUpdate` to `false` then you don't need to call `set` either. You can just do `mySI.value = newValue`.

## Strange Item stores (not implemented yet)

A **store** lets you track multiple related values from a single object and bind/unbind/update them all at once.

```js
var playerStats = new StrangeItem.Store({
    hp: 100,
    mana: 0
}, {
    autoUpdate: false
});
playerStats.bind({
    hp: document.querySelector('#hpCounter'),
    mana: document.querySelector('#manaCounter')
});

function drinkManaPotion() {
    playerStats.set('mana', 100);
}

function getCurrentHP() {
    return playerStats.hp // playerStats.get('hp') works too
}

function receiveDamage(dmg) {
    playerStats.set('hp', getCurrentHP() - dmg);
}

function onFrameRendered() {
    playerStats.update();
}
```

## FAQ

### Why did you name this class "strange item"?

It's [a reference to ADOM](http://ancardia.wikia.com/wiki/Si).

### What if I need more complex functionality?

Use Angular or React.

## TODO

* Minification
* stores
* `unbind`
