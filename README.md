#ijeomamotion-js
 
A Javascript library (which supports p5.js) for sketching animations. Ijeoma (ee-JOH-mah) means safe journey in Igbo, the language of my family from Nigeria. I started writing this a while back in Java for Processing then ported it to JS for processing.js and recently I've rewrote it for JS and p5.js.

#Download 
Developement: 
https://raw.githubusercontent.com/ekeneijeoma/ijeomamotion-js/master/build/ijeomamotion.js

Production: 
https://raw.githubusercontent.com/ekeneijeoma/ijeomamotion-js/master/build/ijeomamotion.min.js

#Examples
[Gradients](http://ekeneijeoma.github.io/ijeomamotion-js/examples/Gradient.html)

Circular Networks [1](http://ekeneijeoma.github.io/ijeomamotion-js/examples/CircularNetwork.html) and [2](http://ekeneijeoma.github.io/ijeomamotion-js/examples/CircularNetwork2.html)

[Pie Chart](http://ekeneijeoma.github.io/ijeomamotion-js/examples/PieChart2.html)

[Sequence](http://ekeneijeoma.github.io/ijeomamotion-js/examples/Sequence.html)

[Timeline](http://ekeneijeoma.github.io/ijeomamotion-js/examples/Timeline.html)

[Square](http://ekeneijeoma.github.io/ijeomamotion-js/examples/Square.html)

#Getting Started 
##How to create Tweens

###Numbers  
There are 4 ways to setup Tweens.
```javascript
new MOTION.Tween(duration,delay,easing) //object defaults to window
new MOTION.Tween(object, duration, delay, easing) 
new MOTION.Tween(object, property, end, duration, delay, easing)
new MOTION.Tween(property, end, duration, delay, easing) //object defaults to window
```

Say you want to tween x from 0 to 100 in 100 frames. 
```javascript
var x = 0;
var t = new MOTION.Tween(100).add("x", 100, 100).play();
```
or
```javascript
var x = 0;
var t = new MOTION.Tween(this,100).add("x", 100).play();
```

or
```javascript
var x = 0;
var t = new MOTION.Tween(this, "x", 100, 100).play();
```

The 2nd way lets you chain/add more properties to the Tween. Say we want to tween a var x from 0 to 100 and var y from 0 to 100 in 100 frames.
```javascript
var t = new MOTION.Tween(this).add("x", 100).add("y", 100).play();
```
 
###p5.Colors 
Say we want to tween a color var c from black to white in 100 frames.
```javascript
var c = color(0);
var t = new MOTION.Tween("c", color(255), 100).play();
```
 
###p5.Vectors
You can also tween PVectors. Say we want to tween PVectors `v1 = PVector(0,0)` and `v2 = PVector(0,0)` to `v1 = PVector(50, 50)` and `v2 = PVector(100, 100)`.
```javascript
var v = createVector(0,0);
var t = new MOTION.Tween("v", createVector(100,100), 100).play();
```

###All in 1!
You can also tween multiples properties of any type in 1 Tween.
```javascript
var t = new MOTION.Tween(100).add("x", 100).add("c", color(255)).add("v", createVector(100, 100)).play();
```

###Callbacks 
```javascript
t = new MOTION.Tween(100).onStart(func).onUpdate(func).onEnd(func).play(); 
```

##How to playback Tweens 
###Delaying
```javascript
var t = new MOTION.Tween("w", width, 50, 50).play(); //delay for 50 frames
```
or
```javascript
var t = new MOTION.Tween(this,50,50).add("w", width).delay(50).play();
```
###Pausing, Resuming  
```javascript  
t.pause(); 
t.resume(); 
t.seek(time); 
```
###Repeating
```javascript
var t = new MOTION.Tween("w", width, 100).repeat().play();
```
###Reversing
```javascript 
var t = new MOTION.Tween("w", width, 100).repeat().reverse().play();
```

##How to playback tweens in parallel
```javascript
var p = new MOTION.Parallel()
  .add(new MOTION.Tween(...)) 
  .add(new MOTION.Tween(...)) 
  .play(); 
```

or

```javascript
//p5.js way
timeMode(MOTION.FRAMES); //frames by default
p = beginParallel() // returns MOTION.Parallel() object
  tween(...) // same arguments and functions as new Motion.Tween()
  tween(...)
endParallel();
p.play()
//or play(p); 
```

##How to playback tweens in a sequence
```javascript
var s = new MOTION.Sequence() 
  .add(new MOTION.Tween(...)) 
  .add(new MOTION.Tween(...))  
  .repeat()
  .play();
```

```javascript
//p5.js way
var s = beginSequence(); // returns MOTION.Sequence() object
  tween(...)
  tween(...)
endSequence()
s.play();
```

##How to playback tweens in a timeline
```javascript
var t = new MOTION.Timeline()
  .add(new MOTION.Tween(...), 100) //creates a keyframe at 100 frames and adds that tween object
  .add(new MOTION.Tween(...), 200)
  .repeat()
  .play();

//or

var t = new MOTION.Timeline();
var k1 = new MOTION.Keyframe(100).add(new MOTION.Tween(...))
var k2 = new MOTION.Keyframe(200).add(new MOTION.Tween(...))
t.add(k1).add(k2).play();
```

```javascript
//p5.js way
var t = beginTimeline(); // returns MOTION.Timeline() object
  beginKeyframe(100);
    tween(...)
  endKeyframe();
  beginKeyframe(200);
    tween(...)
  endKeyframe();
endTimeline();
t.play();
```