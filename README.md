#ijeoma.js
 
A [fufu-powered](http://en.wikipedia.org/wiki/Fufu) Javascript library for creating animations which look and feel tasty :-J Ijeoma (ee-JOH-mah) means bon voyage in Igbo, a language from Nigeria. 

The code is based on [ijeomamotion for Java/Processing](https://github.com/ekeneijeoma/ijeomamotion) which I ported to JS for processing.js so it could be used in Processing cross-mode (between Java and JS modes with no changes to the code). The Java and JS library have been used in projects like Chromeweblab ["Data Tracer"](https://www.youtube.com/watch?v=RrgjufJhmwk#t=40), Nike Camp Victory ["Nike+ Heat Map"](https://www.youtube.com/watch?v=xtTGsYyR0Ng#t=140), [The Office of Creative Research's (OCR) "The room would be good enough for the time she had to stay"](https://vimeo.com/69681117) and more. 

While processing.js and Processing Javascript mode were sleeping and p5.js was born. ijeomamotion was being refactored to ijeoma.js which weights a lot less, has more muscle and is independent from processing.js and p5.js. Although there is an [addon for p5.js](https://github.com/ekeneijeoma/p5.ijeoma.js) because we still love Processing :) 

#Download 
Developement: [ijeoma.js](http://goo.gl/04mfZ7)

Production: [ijeoma.min.js](http://goo.gl/c5OR98)

#Examples  
[MOTION](http://ekeneijeoma.github.io/ijeoma.js/examples/Motion.html): counts from a starting time of 0 to an ending duration. 

[MOTION.Tween](http://ekeneijeoma.github.io/ijeoma.js/examples/Tween.html): eases multiple number variables and object properties from a starting value to an ending value within a duration. 

[MOTION.Parallel](http://ekeneijeoma.github.io/ijeoma.js/examples/Parallel.html): plays multiple tweens at the same time.

[MOTION.Sequence](http://ekeneijeoma.github.io/ijeoma.js/examples/Sequence.html): plays tweens one after the other.

[MOTION.Timeline](http://ekeneijeoma.github.io/ijeoma.js/examples/Timeline.html): plays Tweens, Parallels and Sequences any time using MOTION.Keyframes.

[Mouse](http://ekeneijeoma.github.io/ijeoma.js/examples/mouse.html)

[Gradients](http://ekeneijeoma.github.io/ijeoma.js/examples/gradients.html): shows how to create custom property for tweening colors

[Lines](http://ekeneijeoma.github.io/ijeoma.js/examples/lines.html)

[Pie Chart](http://ekeneijeoma.github.io/ijeoma.js/examples/pieChart.html)

[Circular Network](http://ekeneijeoma.github.io/ijeoma.js/examples/circularNetwork.html)

[Square](http://ekeneijeoma.github.io/ijeoma.js/examples/square.html): shows how to combine sequences and tweens in a timeline

#Getting Started 
###Creating tweens
Tweening a variable named x from 0 to 1024 in 1000 millseconds. 
```javascript 
//new MOTION.Tween(object, property, end, duration, [delay], [easing])
var x = 0;
var tween = new MOTION.Tween(window, "x", 1024, 1000).play(); // if no object is passed it will default to window
```
or
```javascript 
//new MOTION.Tween(property, [start,end], duration, [delay], [easing])
var tween = new MOTION.Tween("x", [0,1024],1000).play(); // object defaults to window and the variable x is defined in window with a starting value of 0
```

Tweening multiple variables and object properties
```javascript
//new MOTION.Tween(duration, [delay], [easing])
var tween = new MOTION.Tween(1000).add(window, "x", [0,1024]).add(window, "y", [0,768]).add(window, "size", [0,100]).play();
```
or
```javascript
//new MOTION.Tween(duration, [delay], [easing])
var tween = new MOTION.Tween(1000).add("x", [0,1024]).add("y", [0,768]).add("size", [0,100]).play(); // object defaults to window
```

You can also call play and stop on all motion objects using
```javascript
MOTION.playAll()
MOTION.stopAll()
```

##Destroying tweens
```javascript
Motion.remove(motion)
```

If you're creating and playing a lot of tweens that you're only using once you should can call useOnce() which will automatically destroy them after. It's set to false by default.
```javascript
new Motion(...).useOnce();
or
//applies call to all tween instances
MOTION.useOnce();
```

###Calling functions on start, update and end events 
```javascript
t = new MOTION.Tween(...).onStart(func).onUpdate(func).onEnd(func).play(); 
```

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
var tween = new MOTION.Tween("w", 1024, 1000, 500).play(); //delay for 500 milliseconds
```
or
```javascript
var tween = new MOTION.Tween("w", 1024, 1000).delay(500).play();
```
###Pausing, Resuming  
```javascript  
t.pause(); 
t.resume(); 
t.seek(position); 

MOTION.pauseAll();
MOTION.resumell();
MOTION.seekAll(position);
```
###Repeating
```javascript
var tween = new MOTION.Tween(...).repeat().play();

MOTION.repeatAll([duration]);
```
###Reversing
```javascript 
var tween = new MOTION.Tween(...).repeat().reverse().play();

MOTION.reverseAll();
```

###Changing speed/timescale
```javascript 
var tween = new MOTION.Tween(...).timeScale(2) //plays back twice as fast

MOTION.timeScaleAll(time);
```

###playing

##Playing back tweens in parallel
```javascript
var parallel = new MOTION.Parallel()
  .add(new MOTION.Tween(...)) 
  .add(new MOTION.Tween(...)) 
  .play(); 
``` 

##Playing back tweens in sequence
```javascript
var sequence = new MOTION.Sequence() 
  .add(new MOTION.Tween(...)) 
  .add(new MOTION.Tween(...))  
  .repeat()
  .play();
``` 

##Playing back tweens in a timeline
```javascript
var timeline = new MOTION.Timeline()
  .add(new MOTION.Tween(...), 1000) //creates a keyframe at 1000 milliseconds and adds that tween object
  .add(new MOTION.Tween(...), 2000)
  .repeat()
  .play();
``` 
or
```javascript
var timeline = new MOTION.Timeline();
var keyframe1 = new MOTION.Keyframe(1000).add(new MOTION.Tween(...))
var keyframe2 = new MOTION.Keyframe(2000).add(new MOTION.Tween(...))
timeline.add(k1).add(k2).play();
``` 

##Going to and playing or stopping at a keyframe
```javascript
timeline.play(time)
timeline.stop(time)
```

