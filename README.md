#ijeomamotion.js
 
A Javascript library for creating animations. Ijeoma (ee-JOH-mah) means bon voyage in Igbo, a language from Nigeria. This library based on [ijeomamotion for Java/Processing](https://github.com/ekeneijeoma/ijeomamotion) which I ported to JS for processing.js so it could be used in Processing cross-mode (between Java and JS modes with no changes to the code). This is a refactor of the JS port for which designed more of a JS-style and is independent from processing.js and p5.js although there is an [addon for p5.js](https://github.com/ekeneijeoma/p5.ijeomamotion.js).

#Download 
Developement: [ijeomamotion.js](https://raw.githubusercontent.com/ekeneijeoma/ijeomamotion.js/master/build/ijeomamotion.js)

Production: [ijeomamotion.min.js](https://raw.githubusercontent.com/ekeneijeoma/ijeomamotion.js/master/build/ijeomamotion.min.js)

#Examples  
[MOTION](http://ekeneijeoma.github.io/ijeomamotion.js/examples/Motion.html): counts from a starting time of 0 to an ending duration. 

[MOTION.Tween](http://ekeneijeoma.github.io/ijeomamotion.js/examples/Tween.html): eases multiple number variables and object properties from a starting value to an ending value within a duration. 

[MOTION.Parallel](http://ekeneijeoma.github.io/ijeomamotion.js/examples/Parallel.html): plays multiple tweens at the same time.

[MOTION.Sequence](http://ekeneijeoma.github.io/ijeomamotion.js/examples/Sequence.html): plays tweens one after the other.

[MOTION.Timeline](http://ekeneijeoma.github.io/ijeomamotion.js/examples/Timeline.html): plays Tweens, Parallels and Sequences any time using MOTION.Keyframes.

[Circular Network](http://ekeneijeoma.github.io/ijeomamotion.js/examples/circularNetwork.html)

#Getting Started 
 
Tweening a variable named x from 0 to 1024 in 1000 millseconds. 
```javascript 
var x = 0;
var t = new MOTION.Tween(window, "x", 1024, 1000).play(); // if no object is passed it will default to window
```
or
```javascript 
var t = new MOTION.Tween("x", [0,1024],1000).play(); // object defaults to window and the variable x is defined in window with a starting value of 0
```

Tweening multiple variables and object properties
```javascript
var t = new MOTION.Tween(1000).add(window, "x", [0,1024]).add(window, "y", [0,768]).add(window, "size", [0,100]).play();
```
or
```javascript
var t = new MOTION.Tween(1000).add("x", [0,1024]).add("y", [0,768]).add("size", [0,100]).play(); // object defaults to window
```

###Callbacks 
```javascript
t = new MOTION.Tween(...).onStart(func).onUpdate(func).onEnd(func).play(); 
```

##How to playback Tweens 
###Updating
```javascript 
MOTION.update(time) //best used with requestAnimationFrame
```
or
```javascript 
MOTION.update() //will use performance.now() or Date.now() if not supported.
```

###Delaying
```javascript
var t = new MOTION.Tween("w", 1024, 1000, 500).play(); //delay for 500 milliseconds
```
or
```javascript
var t = new MOTION.Tween("w", 1024, 1000).delay(500).play();
```
###Pausing, Resuming  
```javascript  
t.pause(); 
t.resume(); 
t.seek(time); 
```
###Repeating
```javascript
var t = new MOTION.Tween(...).repeat().play();
```
###Reversing
```javascript 
var t = new MOTION.Tween(...).repeat().reverse().play();
```

##How to playback tweens in parallel
```javascript
var p = new MOTION.Parallel()
  .add(new MOTION.Tween(...)) 
  .add(new MOTION.Tween(...)) 
  .play(); 
``` 

##How to playback tweens in a sequence
```javascript
var s = new MOTION.Sequence() 
  .add(new MOTION.Tween(...)) 
  .add(new MOTION.Tween(...))  
  .repeat()
  .play();
``` 

##How to playback tweens in a timeline
```javascript
var t = new MOTION.Timeline()
  .add(new MOTION.Tween(...), 1000) //creates a keyframe at 1000 milliseconds and adds that tween object
  .add(new MOTION.Tween(...), 2000)
  .repeat()
  .play();

//or

var t = new MOTION.Timeline();
var k1 = new MOTION.Keyframe(100).add(new MOTION.Tween(...))
var k2 = new MOTION.Keyframe(200).add(new MOTION.Tween(...))
t.add(k1).add(k2).play();
``` 
