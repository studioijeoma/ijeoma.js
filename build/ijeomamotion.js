Back = function Back() {};

Back.easeIn = function(t, b, c, d) {
	var s = 1.70158;
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

Back.easeOut = function(t, b, c, d) {
	var s = 1.70158;
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

Back.easeBoth = function(t, b, c, d) {
	var s = 1.70158;
	if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.52)) + 1) * t - s)) + b;
	return c / 2 * ((t -= 2) * t * (((s *= (1.52)) + 1) * t + s) + 2) + b;
}

Bounce = function Bounce() {};

Bounce.easeIn = function(t, b, c, d) {
	return c - Bounce.easeOut(d - t, 0, c, d) + b;
}

Bounce.easeOut = function(t, b, c, d) {
	if((t /= d) < (1 / 2.7)) {
		return c * (7.562 * t * t) + b;
	} else if(t < (2 / 2.7)) {
		return c * (7.562 * (t -= (1. / 2.7)) * t + .7) + b;
	} else if(t < (2.5 / 2.75)) {
		return c * (7.562 * (t -= (2.2 / 2.7)) * t + .937) + b;
	} else {
		return c * (7.562 * (t -= (2.62 / 2.7)) * t + .98437) + b;
	}
}

Bounce.easeBoth = function(t, b, c, d) {
	if(t < d / 2) return Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
	else return Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
}

Circ = function Circ() {};

Circ.easeIn = function(t, b, c, d) {
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

Circ.easeOut = function(t, b, c, d) {
	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

Circ.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

Cubic = function Cubic() {};

Cubic.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t * t + b;
}

Cubic.easeOut = function(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}

Cubic.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t + 2) + b;
}

CubicBezier = function CubicBezier() {};

// Cubic Bezier tween from b to b+c, influenced by p1 & p2
// t: current time, b: beginning value, c: total change, d: duration
// p1, p2: Bezier control point positions
CubicBezier.easeIn = function(t, b, c, d, p1, p2) {
	return((t /= d) * t * c + 3 * (1 - t) * (t * (p2 - b) + (1 - t) * (p1 - b))) * t + b;
}

CubicBezier.easeOut = function(t, b, c, d, p1, p2) {
	return((t /= d) * t * c + 3 * (1 - t) * (t * (p2 - b) + (1 - t) * (p1 - b))) * t + b;
}

CubicBezier.easeBoth = function(t, b, c, d, p1, p2) {
	return((t /= d) * t * c + 3 * (1 - t) * (t * (p2 - b) + (1 - t) * (p1 - b))) * t + b;
}

Elastic = function Elastic() {};

Elastic.easeIn = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

Elastic.easeOut = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
}

Elastic.easeBoth = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d / 2) == 2) return b + c;
	var p = d * (.3 * 1.);
	var a = c;
	var s = p / 4;
	if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

Elastic = function Elastic() {};

Elastic.easeIn = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

Elastic.easeOut = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
}

Elastic.easeBoth = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d / 2) == 2) return b + c;
	var p = d * (.3 * 1.);
	var a = c;
	var s = p / 4;
	if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

Expo = function Expo() {};

Expo.easeIn = function(t, b, c, d) {
	return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

Expo.easeOut = function(t, b, c, d) {
	return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

Expo.easeBoth = function(t, b, c, d) {
	if(t == 0) return b;
	if(t == d) return b + c;
	if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

Linear = function Linear() {};

Linear.easeNone = function(t, b, c, d) {
	return c * t / d + b;
}

Linear.easeIn = function(t, b, c, d) {
	return c * t / d + b;
}

Linear.easeOut = function(t, b, c, d) {
	return c * t / d + b;
}

Linear.easeBoth = function(t, b, c, d) {
	return c * t / d + b;
}

Quad = function Quad() {};

Quad.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t + b;
}

Quad.easeOut = function(t, b, c, d) {
	return -c * (t /= d) * (t - 2) + b;
}

Quad.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t + b;
	return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

Quart = function Quart() {};

Quart.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t * t * t + b;
}

Quart.easeOut = function(t, b, c, d) {
	return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

Quart.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

Quint = function Quint() {};

Quint.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t * t * t * t + b;
}

Quint.easeOut = function(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

Quint.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

Sine = function Sine() {};

Sine.easeIn = function(t, b, c, d) {
	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

Sine.easeOut = function(t, b, c, d) {
	return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

Sine.easeBoth = function(t, b, c, d) {
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};usingP5 = (typeof p5 != "undefined") ? true : false

if (usingP5) {
    // p5.prototype.motions = []; 
    // p5.prototype.updateMotion = function(){
    //     console.log('asdf');
    // }

    // p5.prototype.registerMethod('update', p5.prototype.updateMotion);
    // p5.prototype.registerMethod('update', function() {
    //     console.log('asdf')
    //     console.log(p5.prototype.motions);   
    // });
}

MOTION = function(name, duration, delay, easing) {
    this._name = (name) ? name : "";

    this._calls = [];
    this._callMap = [];

    this._playTime = 0;
    this._playCount = 0;

    this._time = 0;
    this._timeScale = 1;

    this._duration = (duration) ? duration : 0;

    this._delay = (delay) ? delay : 0;

    this._easing = (easing) ? easing : Linear.easeIn;

    this._repeatCount = 0;
    this._repeatDuration = 0;

    this._isPlaying = false;
    // this._isDelaying = false;
    this._isRepeating = false;
    this._isRepeatingDelay = false;
    this._isReversing = false;

    this._isAutoUpdating = true;

    this._isRegistered = false;

    this._reverseTime = 0;

    this._order = 0;

    this._onBegin, this._onEnd, this._onChange, this._onRepeat;

    this.setup(name, duration, delay, easing);
    this.setupEvents();

    if (usingP5) {
        // p5.prototype.motions.push(this)
        // console.log(p5.prototype.motions)
    }
};

MOTION.REVISION = '1';

MOTION.SECONDS = "seconds";
MOTION.FRAMES = "frames";

MOTION.REVERSE = "reverse";
MOTION.NO_REVERSE = "noReverse";

MOTION.ONCE = "once";
MOTION.REPEAT = "repeat";

MOTION.timeMode = (usingP5) ? MOTION.FRAMES : MOTION.SECONDS;

MOTION.prototype = {
    setup: function(name, duration, delay, easing) {
        if (name) this._name = name;

        if (duration) this._duration = duration;

        if (delay) this._delay = delay;

        this._playTime = 0;

        if (easing) this.setEasing(easing);
    },

    setupEvents: function() {},

    play: function() {
        this.seek(0);
        this.resume();

        this._playCount++;
        this._repeatCount = 0;

        this.dispatchStartedEvent();

        return this;
    },

    stop: function() {
        this._reverseTime = (this._reverseTime == 0) ? this._duration : 0;

        if (this._isRepeating && (this._repeatDuration == 0 || this._repeatCount < this._repeatDuration)) {
            this.seek(0);
            this.resume();

            if (!this._isRepeatingDelay)
                this._delay = 0;

            this._repeatCount++;

            this.dispatchRepeatedEvent();
        } else {
            this.seek(1);
            this.pause();

            this._repeatCount = 0;

            this.dispatchEndedEvent();
        }

        return this;
    },

    pause: function() {
        if (this._isRegistered) {
            // if (this._isAutoUpdating)
            //     p5.prototype.unregisterMethod('pre', this.update);

            this._isRegistered = false;
        }

        this._isPlaying = false;

        this._playTime = this._time;

        return this;
    },

    resume: function() {
        if (!this._isRegistered) {
            // if (this._isAutoUpdating)
            //     p5.prototype.registerMethod('pre', this.update);

            this._isRegistered = true;
        }

        this._isPlaying = true;

        if (usingP5)
            this._playTime = (MOTION.timeMode == MOTION.SECONDS) ? (millis() - this._playTime * 1000) : (frameCount - this._playTime);
        else
            this._playTime = new Date().getTime() - this._playTime * 1000;

        return this;
    },

    seek: function(value) {
        this._playTime = (this._delay + this._duration) * value;

        if (this._playTime != this._time) {
            this.setTime(this._playTime);
            // this.updateCalls();
        }

        return this;
    },

    repeat: function(repeat) {
        this._isRepeating = true;

        if (repeat) this._repeatDuration = repeat;

        return this;
    },

    oRepeat: function() {
        this._isRepeating = false;
        this._repeatDuration = 0;

        return this;
    },

    reverse: function() {
        this._isReversing = true;
        return this;
    },

    noReverse: function() {
        this._isReversing = false;
        return this;
    },

    update: function(time) {
        if (time) {
            if (this._isInsidePlayingTime(time)) {
                if (!this._isPlaying)
                    this.play();

                this.setTime(time);
                this.updateCalls();
            } else if (this._isPlaying)
                this.stop();
        } else {
            if (this._isRegistered && this._isPlaying) {
                this.updateTime();
                this.updateCalls();

                if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                    this.stop();
            }
        }

        this.dispatchChangedEvent()
    },

    updateTime: function() {
        if (usingP5)
            this._time = ((MOTION.timeMode == MOTION.SECONDS) ? ((millis() - this._playTime) / 1000) : (frameCount - this._playTime)) * this._timeScale;
        else
            this._time = (new Date().getTime() - this._playTime) / 1000 * this._timeScale;

        if (this._isReversing && this._reverseTime != 0)
            this._time = this._reverseTime - this._time;
    },

    updateCalls: function() {
        // for (Callback c  = this._calls)
        //  if (this.getTime() > c.getTime()) {
        //      if (!c.hasInvoked())
        //          c.invoke();
        //  } else
        //      c.noInvoke();
    },

    // Motion call(Object _object, _name) {
    //  return addCall(new Callback(_object, _name, duration));
    // }
    // Motion call(Object _object, _name,  _time) {
    //  return addCall(new Callback(_object, _name, _time));

    addCall: function(_call) {
        calls.push(_call);
        return this;
    },

    removeCall: function(call) {
        // calls.remove(call);
        return this;
    },

    removeCalls: function() {
        calls = [];
        return this;
    },

    onBegin: function() {
        this._onBegin = object;
        return this;
    },

    onEnd: function(object) {
        this._onEnd = object;
        return this;
    },

    onChange: function(object) {
        this._onChange = object;
        return this;
    },

    onRepeat: function(object) {
        this._onRepeat = object;
        return this;
    },

    getCallback: function(index) {
        if (index < calls.length) return calls[index];
        else return null;
    },

    getCallback: function(name) {
        return callMap[name];
    },

    getCallbacks: function() {
        return calls;
    },

    getCallbackList: function() {
        return calls;
    },

    getCallbackCount: function() {
        return calls.length;
    },

    setName: function(name) {
        this._name = name;
    },

    getName: function() {
        return this._name;
    },

    setTime: function(time) {
        this._time = time;

        if (this._isReversing && this._reverseTime != 0) this._time = this._reverseTime - this._time;
    },

    getTime: function() {
        return (this._time < this._delay) ? 0 : (this._time - this._delay);
    },

    setTimeScale: function(_timeScale) {
        this._timeScale = _timeScale;
        return this;
    },

    getTimeScale: function() {
        return this._timeScale;
    },

    getPosition: function() {
        return this._easing(this.getTime() / this._duration, 0, 1, 1)
    },

    setDuration: function(_duration) {
        this._duration = _duration;
        return this;
    },

    getDuration: function() {
        return this._duration;
    },

    delay: function(delay) {
        this._delay = delay;
        return this;
    },

    noDelay: function() {
        this._delay = 0;
        return this;
    },

    getDelay: function() {
        return this._delay;
    },

    repeatDelay: function() {
        this._isRepeatingDelay = true;
        return this;
    },

    noRepeatDelay: function() {
        this._isRepeatingDelay = false;
        return this;
    },

    setEasing: function(easing) {
        this._easing = easing;
        return this;
    },

    getEasing: function() {
        return this._easing;
    },

    noEasing: function() {
        this.setEasing(Linear.easeIn);

        return this;
    },

    setTimeMode: function(_timeMode) {
        MOTION.timeMode = _timeMode;

        return this;
    },

    getTimeMode: function() {
        return MOTION.timeMode;
    },

    getRepeat: function() {
        return this._repeatTime;
    },

    autoUpdate: function() {
        this._isAutoUpdating = true;
        return this;
    },

    noAutoUpdate: function() {
        this._isAutoUpdating = false;
        return this;
    },

    isAutoUpdating: function() {
        return this._isAutoUpdating;
    },

    isDelaying: function() {
        return (this._time <= this._delay);
    },

    isPlaying: function() {
        return this._isPlaying;
    },

    isReversing: function() {
        return this._isReversing;
    },

    isInsideDelayingTime: function(value) {
        return (value >= 0 && value <= this._delay);
        // return (value >= 0 && value <= delay);
    },

    isInsidePlayingTime: function(value) {
        return (value >= this._delay && value <= this._delay + this._duration);
        // return (value > this._delay && value <= this._delay + duration);
    },

    isAbovePlayingTime: function(value) {
        return value > this._delay + this._duration;
    },

    isTween: function() {
        return this instanceof Tween;
    },

    isParallel: function() {
        return this instanceof Parallel;
    },

    isSequence: function() {
        return this instanceof Sequence;
    },

    isTimeline: function() {
        return this instanceof Timeline;
    },

    isKeyFrame: function() {
        return this instanceof KeyFrame;
    },

    usingSeconds: function() {
        return MOTION.timeMode == SECONDS;
    },

    usingFrames: function() {
        return MOTION.timeMode == FRAMES;
    },

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
        if (this._onBegin)
            this._onBegin();
    },

    dispatchEndedEvent: function() {
        // console.log('dispatchEndedEvent');
        if (this._onEnd)
            this._onEnd();
    },

    dispatchChangedEvent: function() {
        // console.log('dispatchUpdateEvent');
        if (this._onChange)
            this._onChange();
    },

    dispatchRepeatedEvent: function() {
        // console.log('dispatchRepeatedEvent');
        if (this._onRepeat)
            this._onRepeat();
    }
};;MOTION.MotionController = function(name, children) {
    MOTION.call(this, name);

    this._children = [];
    this._tweens = [];
    this._parallels = [];
    this._sequences = [];

    this._childrenMap = [];
    this._tweenMap = [];
    this._parallelMap = [];
    this._sequenceMap = [];

    if (children) this.addAll(children);

    // this.setup(name,children);
};

MOTION.MotionController.prototype = {
    constructor: MOTION.MotionController,

    setup: function(name, children) {
        this._children = [];
        this._tweens = [];
        this._parallels = [];
        this._sequences = [];

        this._childrenMap = [];
        this._tweenMap = [];
        this._parallelMap = [];
        this._sequenceMap = [];

        if (children) this.addAll(children);
    },

    stop: function() {
        MOTION.prototype.stop.call(this);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            c.stop();
        }

        return this;
    },

    pause: function() {
        MOTION.prototype.pause.call(this);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i]
            c.pause();
        }

        return this;
    },

    resume: function() {
        MOTION.prototype.resume.call(this);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            c.resume();
        }

        return this;
    },

    seek: function(value) {
        MOTION.prototype.seek.call(this, value);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];

            if (c.isInsidePlayingTime(this.getTime()))
                c.seek(this.getTime() / (c.getDelay() + c.getDuration()));
            else if (c.isAbovePlayingTime(this.getTime()))
                c.seek(1);
            else
                c.seek(0);
        }

        return this;
    },

    update: function(time) {
        MOTION.prototype.update.call(this, time);

        if (time) {
            if (this._isPlaying) this.updateChildren();
        } else {
            if (this._isRegistered && this._isPlaying) this.updateChildren();
        }
    },

    updateChildren: function() {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];

            if (c.isInsidePlayingTime(this.getTime()))
                if (c._isPlaying) c.update(this.getTime());
                else c.play();
        }
    },

    updateTweens: function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];

            for (var j = 0; j < this._properties.length; j++) {
                var p = this._properties[i];

                var name = p.getObject().constructor.name + "." + p.getName();

                if (orderMap[name]) {
                    var pp = ppropertyMap.get(name);

                    var order = orderMap.get(name);
                    order++;

                    p.setBegin(pp.getEnd());
                    p.setOrder(order);

                    orderMap[name] = order;
                    ppropertyMap[name] = p;
                } else {
                    var tweens = [];
                    tweens.push(t);

                    p.setBegin();
                    p.setOrder(0);

                    orderMap[name] = 0;
                    ppropertyMap[name] = p;
                }
            }
        }
    },

    updateDuration: function() {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i]
            this._duration = Math.max(this._duration, c.getDelay() + c.getDuration());
        }

        // for (Callback c : calls)
        //  duration = Math.max(duration, c.getTime() - getDelay());
    },

     getPosition: function() { 
        return this.getTime() / this._duration 
    },

    getTween: function(index) {
        if (index < this._tweens.length) return this._tweens[index];
        else return null;
    },

    getTween: function(name) {
        return this._tweenMap[name];
    },

    getParallel: function(index) {
        if (index < this._parallels.length) return this._parallels[index];
        else return null;
    },

    getParallel: function(name) {
        return this._parallelMap[name];
    },

    getSequence: function(index) {
        if (index < this._sequences.length) return this._sequences[index];
        else return null;
    },

    getSequence: function(name) {
        return this._sequenceMap[name];
    },

    getChildren: function() {
        return this._children;
    },

    getChildrenList: function() {
        return this._children;
    },

    getTweens: function() {
        return this._tweens;
    },

    getTweenList: function() {
        return this._tweens;
    },

    getParallels: function() {
        return this._parallels;
    },

    getParallelList: function() {
        return this._parallels;
    },

    getSequences: function() {
        return this._sequences;
    },

    getSequenceList: function() {
        return this._sequences;
    },

    get: function(index) {
        if (index < this._children.length) return this._children[index];
        else return null;
    },

    getChild: function(name) {
        return this._childrenMap[name];
    },

    getCount: function() {
        return this._children.length;
    },

    getTweenCount: function() {
        return this._tweens.length;
    },

    getParallelCount: function() {
        return this._parallels.length;
    },

    getSequenceCount: function() {
        return this._sequences.length;
    },

    setTimeScale: function(timeScale) {
        MOTION.prototype.setTimeScale.call(this, timeScale);

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i]
            child.setTimeScale(timeScale);
        }

        return this;
    },

    setTimeMode: function(_durationMode) {
        MOTION.prototype.setTimeMode.call(this, _durationMode);

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child.setTimeMode(_durationMode);
        }

        return this;
    },

    add: function(child) {
        this.insert(child, 0);
        return this;
    },

    insert: function(child, time) {
        child.delay(time);
        // _child.seek(1);
        child.setTimeMode(this._timeMode);
        child.noAutoUpdate();
        child.addEventListener(this);

        if (child.isTween()) {
            this._tweens.push(child);

            if (child.getName() != null)
                this._tweenMap[child.getName()] = child;

            this.updateTweens();
        } else if (child.isParallel()) {
            this._parallels.push(child);

            if (child.getName() != null)
                this._parallelMap[child.getName()] = child;
        } else if (child.isSequence()) {
            this._sequences.push(child);

            if (child.getName() != null)
                this._sequenceMap[child.getName()] = child;
        }

        this._children.push(child);

        if (child.getName() != null)
            this._childrenMap[child.getName()] = child;

        updateDuration();

        return this;
    },

    removeChild: function(child) {
        if (child.isTween()) {
            this._tweens.remove(child);
            // this._tweenLUT.remove(child.name);
        } else if (child.isParallel()) {
            this._parallels.remove(child);
            // this._ParallelLUT.remove(child.name);
        } else if (child.isSequence()) {
            this._sequences.remove(child);
            // sequenceLUT.remove(child.name);
        }

        this._children.remove(child);
        // childrenLUT.remove(child.name);
        return this;
    },

    // addTween = function(_tweenObject, _tweenObjectProperty, _end, _duration, _delay, _easing) {
    //  return add(new Tween(_tweenObject, _tweenObjectProperty, _end,
    //          _duration, _delay, _easing));
    // ,

    addAll: function(children) {
        for (var i = 0; i < children.length; i++)
            this.add(children[i]);

        return this;
    },

    // addCall = function(_call) {
    //  calls.add(_call);
    //  updateDuration();
    //  return this;
    // ,

    removeAll: function() {
        this._tweens = []
        this._tweenMap = []

        this._parallels = []
        this._parallelMap = []

        this._sequences = []
        this._sequenceMap = []

        this._calls = []
        this._callMap = []

        this._children = []
        this._childrenMap = []

        return this;
    },

    printChildren: function() {
        childrenAs = "";

        var i = 0;

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            childrenAs += c.toString();
            childrenAs += ((i < this._children.length - 1) ? ", " : "");
            i++;
        }
    }
};;MOTION.KeyFrame = function(name, time, children) {
    MOTION.MotionController.call(this, name, children)
    this.delay(time);
};

MOTION.KeyFrame.prototype = {
    constructor: MOTION.KeyFrame,

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
    },

    dispatchEndedEvent: function() {
        // console.log('dispatchEndedEvent');
    },

    dispatchChangedEvent: function() {
        // console.log('dispatchChangedEvent');
    },

    dispatchRepeatedEvent: function() {
        // console.log('dispatchRepeatedEvent');
    }
};
;NumberProperty = function NumberProperty(object, name, end) {
	this._object = {}; 
	this._field = ""; 

	this._name = "";

	this._begin = 0;
	this._end = 0;
	this._change = 0;
	this._position = 0;
 
	this.setupObjectField(object, name);
	this.setup(name, end);
}

NumberProperty.prototype.setup = function(name, end) {
	this._name = name;

	this.setEnd(end);

	this._position = 0;
}

NumberProperty.prototype.setupObjectField = function(object, objectFieldName) {
	this._object = object;
	this._field = objectFieldName;
}

NumberProperty.prototype.getName = function() {
	return this._name;
}

NumberProperty.prototype.setName = function(name) {
	this._name = name;
}

NumberProperty.prototype.getBegin = function() { 
	return this._begin;
}

NumberProperty.prototype.setBegin = function() {  
	this._begin = this._object[this._field];

	this.setChange(this._end - this._begin);
}

NumberProperty.prototype.setBegin = function(begin) {
	this._begin = begin;

	this.setChange(this._end - this._begin);
}

NumberProperty.prototype.getEnd = function() {
	return this._end;
}

NumberProperty.prototype.setEnd = function(end) { 
	this._begin = this._object[this._field];

	this._end = end;

	this.setChange(this._end - this._begin);
}

NumberProperty.prototype.getChange = function() {
	return this._change;
}

NumberProperty.prototype.setChange = function(change) {
	this._change = this._change;
}

NumberProperty.prototype.getPosition = function() {
	return this._position;
}

NumberProperty.prototype.setPosition = function(position) {
	this._position = position;

	this.updateValue();
} 

NumberProperty.prototype.updateValue = function() { 
	this._object[this._field] = this._begin + (this._end-this._begin) * this._position;
}

NumberProperty.prototype.toString = function() {
	return "Parameter[name: " + this.getName() + ", begin: " + this.getBegin()
			+ ", end: " + this.getEnd() + ", change: " + this.getChange()
			+ ", position: " + this.getPosition() + "]";
} ;// PVectorProperty.prototype.( = functionString _name, float _end) {
// setup(_name, _end);
// }
PVectorProperty = function PVectorProperty(_vector, _end) {
    this._name = "";
    this._vector = vector;
    this._begin = vector.get();
    this._end = end;
    this._position = 0;
}

PVectorProperty.prototype.getName = function() {
    return this._name;
}

PVectorProperty.prototype.setName = function(_name) {
    this._name = _name;
}

PVectorProperty.prototype.getBegin = function() {
    return this._begin;
}

PVectorProperty.prototype.setBegin = function(begin) {
    this._begin = begin;

    this.setChange(PVector.sub(this._end, this._begin));
}

PVectorProperty.prototype.getEnd = function() {
    return this._end;
}

PVectorProperty.prototype.setEnd = function(end) {
    this._begin = vector.get();
    this._end = end;

    this.setChange(PVector.sub(this._end, this._begin));
}

PVectorProperty.prototype.getChange = function() {
    return this.change;
}

PVectorProperty.prototype.setChange = function(change) {
    this._change = change;
}

PVectorProperty.prototype.getPosition = function() {
    return this._position;
}

PVectorProperty.prototype.setPosition = function(position) {
    this._position = position;

    this.updateValue();
}

PVectorProperty.prototype.updateValue = function() {
    vector.lerp(this._end, this._position);
}

// PVectorProperty.prototype.resetValue = function() {
// vector = begin.get();
// }
PVectorProperty.prototype.toString = function() {
    return "Parameter[name: " + this.getName() + ", begin: " + this.getBegin() + ", end: " + this.getEnd() + ", change: " + this.getChange() + ", position: " + this.getPosition() + "]";
};MOTION.Parallel = function(name, children) {
    MOTION.MotionController.call(this, name, children);
};

MOTION.Parallel.prototype = {
    constructor: MOTION.Parallel,

    setup: function() {},

    setupEvents: function() {},

    dispatchMotionStartedEvent: function() {
        // console.log('dispatchMotionStartedEvent');
    },

    dispatchMotionEndedEvent: function() {
        // console.log('dispatchMotionEndedEvent');
    },

    dispatchMotionChangedEvent: function() {
        // console.log('dispatchMotionChangedEvent');
    },

    dispatchMotionRepeatedEvent: function() {
        // console.log('dispatchMotionRepeatedEvent');
    },

    toString: function() {
        return ("TweenParallel[tweens: {" + tweens + "}]");
    }
};
;MOTION.Sequence = function(name, children) {
    MOTION.MotionController.call(this, name, children)

    this._currentChild = null;
    this._currentChildIndex = 0;
};

MOTION.Sequence.prototype = {
    constructor: MOTION.Sequence,

    setup: function() {},

    setupEvents: function() {},

    update: function(time) {
        MOTION.MotionController.prototype.update.call(this, time);

        // console.log(this._time)

        if (this._isPlaying) {
            for (var i = 0; i < this._children.length; i++) {
                var c = this._children[i]

                if (c.isInsidePlayingTime(time)) {
                    this._currentChildIndex = i;
                    this._currentChild = c;

                    break;
                }
            }
        }
    },

    add: function(child) {
        MOTION.MotionController.prototype.insert.call(this, child, this._duration);
        return this;
    },

    getCurrentChild: function() {
        return this._currentChild;
    },

    getCurrentChildIndex: function() {
        return this._currentChildIndex;
    },

    getCurrentChildType: function() {
        return (this._currentChild.getClass().getSimpleName());
    },

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
    },

    dispatchEndedEvent: function() {
        // console.log('dispatchEndedEvent');
    },

    dispatchChangedEvent: function() {
        // console.log('dispatchChangedEvent');
    },

    dispatchRepeatedEvent: function() {
        // console.log('dispatchRepeatedEvent');
    },

    toString: function() {
        return ("TweenSequence[tweens: {" + tweens + "}]");
    }
};
;MOTION.Timeline = function (name) {
    MOTION.MotionController.call(this, name)

    this._keyFrames = [];
    this._keyFrameMap = [];
};

MOTION.Timeline.prototype = {
    constructor: MOTION.Timeline,
    setup: function() {},

    setupEvents: function() {},
    
    insert: function(child, time) {
        MotionController.prototype.insert.call(this, child, time);

        if (child.isKeyFrame()) {
            this._keyFrames.push(child);

            if (child.getName() != null)
                this._keyFrameMap[child.getName()] = child;
        }

        return this;
    },
    
    add: function(child) {
        var c = this._childrenMap[child.getName()];
        c.push(child);

        this._children[this._children.indexOf(c)] = c;

        return this;
    },
    
    add: function(child, time) {
        var keyFrame = this.getKeyFrame(time + "");

        if (keyFrame == null) {
            keyFrame = new KeyFrame(time + "", time);
            keyFrame.add(child);

            this.insert(keyFrame, time);
        } else
            keyFrame.add(child);

        // console.log(keyFrame.getDuration());

        return this;
    },
    
    addAll: function(children, time) {
        var keyFrame = getKeyFrame(time);

        if (keyFrame == null) {
            keyFrame = new KeyFrame(time + "", time);

            for (var j = 0; j < children.length; j++)
                keyFrame.add(children[j]);

            this.insert(keyFrame, time);
        } else
            for (var j = 0; j < children.length; j++)
                keyFrame.add(children[j]);

        return this;
    },
    
    addAll: function(children, name) {
        // PApplet.println("insertChildren(" + children + ", " + name + ")");
        var c = childrenMap.get(name);
        c.addAll(children);

        children.set(children.indexOf(c), c);

        return this;
    },
    
    removeKeyFrame: function(time) {
        // for(var i = 0; i < this._children.length; i++) {
        // 	var c = this._children[i]
        // 	if (c.getPlayTime() == time) {
        // 		children.remove(children.indexOf(c));
        // 		childrenMap.remove(c);
        // 	}
        // }
    },
    
    removeKeyFrame: function(name) {
        // var c = childrenMap.get(name);

        // children.remove(children.indexOf(c));
        // childrenMap.remove(c);
    },
    
    getKeyFrameCount: function() {
        return this._keyFrames.length;
    },
    
    getCurrentKeyFrames: function() {
        var currentKeyFrames = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(this.getTime()))
                currentKeyFrames.push(children[i]);

        return currentKeyFrames;
    },
    
    getCurrentKeyFrameIndices: function() {
        var indices = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(getTime()))
                indices.push(i);

        return indices;
    },
    
    getKeyFrame: function(index) {
        return this._children[index];
    },
    
    getKeyFrame: function(time) {
        var keyFrame = null;

        for (var i = 0; i < children.length; i++) {
            var c = this.chilren[i];

            if (c.getTime() == time)
                keyFrame = c;
        }

        return keyFrame;
    },
    
    getKeyFrame: function(name) {
        return this._childrenMap[name];
    },
    
    getKeyFrames: function() {
        return this._children;
    },
    
    getKeyFrameTime: function(name) {
        return this.getKeyFrame(name).getTime();
    },
    
    getKeyFrameChildren: function(name) {
        return this.getKeyFrame(name).getChildren();
    },
    
    gotoAndPlay: function(time) {
        this.seek(time / this._duration);
        this.resume();
    },
    
    gotoAndPlay: function(name) {
        var keyFrame = this.getKeyFrame(name);

        this.seek(keyFrame.getPlayTime() / this._duration);
        this.resume();
    },
    
    gotoAndPlay: function() {
        this.seek(keyFrame.getPlayTime() / this._duration);
        this.resume();
    },
    
    gotoAndStop: function(time) {
        this.seek(time / this._duration);
        this.pause();
    },
    
    gotoAndStop: function(name) {
        var keyFrame = getKeyFrame(name);

        this.seek(keyFrame.getPlayTime() / this._duration);
        this.pause();
    },
    
    gotoAndStop: function() {
        this.seek(keyFrame.getPlayTime() / this._duration);
        this.pause();
    },
    
    toString: function() {
        // String keyFrameNames = "";

        // Iterator i = childrenMap.entrySet().iterator();

        // while (i.hasNext()) {
        // 	Map.Entry me = (Map.Entry) i.next();
        // 	keyFrameNames += "{" + me.getKey() + "," + me.getValue() + "},";
        // }

        // return ("Timeline[children: [" + keyFrameNames + "] duration: "
        // 		+ duration + "]");
    },
    
    printKeyFrames: function() {
        var childrenAsString = "";

        for (var i = 0; i < this._children.length; i++)
            childrenAsString += this._children[i].toString() + ((i < this._children.length - 1) ? ", " : "");

        // console.log(childrenAsString);
    }
};
;MOTION.Tween = function(name, object, property, end, duration, delay, easing) {
    Motion.call(this, name, duration, delay, easing)

    this._properties = [];

    this.addProperty(new NumberProperty(object, property, end));
};

MOTION.Tween.prototype = {
    constructor: MOTION.Tween,

    setup: function() {},

    setupEvents: function() {},

    update: function(time) {
        Motion.prototype.update.call(this, time);

        if (this.isPlaying())
            this.updateProperties();
    },

    updateProperties: function() {
        for (var i = 0; i < this._properties.length; i++) {
            var p = this._properties[i];
            p.setPosition(this._easing(this.getPosition(), 0, 1, 1))
        }
    },

    seek: function(value) {
        Motion.prototype.seek.call(this, value)

        this.updateProperties();

        return this;
    },

    addProperty: function(p) {
        this._properties.push(p);

        return this;
    },

    add: function(p) {
        this.properties.push(p);

        return this;
    },

    add: function(object, property, end) {
        return this.addProperty(new NumberProperty(object, property, end));
    },

    // add = function(object, property, end) {
    // 	return this.addProperty(new ColorProperty(object, property, end));
    // }

    // add = function(PVector _vector, PVector end) {
    // 	return this.addProperty(new PVectorProperty(_vector, end));
    // }

    addNumber: function(object, property, end) {
        return this.addProperty(new NumberProperty(object, property, end));
    },

    // addColor = function(object, property, end) {
    // 	return this.addProperty(new ColorProperty(object, property, end));
    // }

    // addPVector = function(PVector _vector, PVector end) {
    // 	return this.addProperty(new PVectorProperty(_vector, end));
    // }

    call: function(object, method, _time) {
        return this.addCall(new Callback(object, method, _time));
    },

    // addCall = function(Callback _call) {
    // 	calls.push(_call);
    // 	return this;
    // }

    getPosition: function() { 
        return this.getTime() / this._duration 
    },

    get: function(_index) {
        return this.getProperty(_index);
    },

    get: function(name) {
        return this.getProperty(name);
    },

    getNumber: function(_index) {
        return this.getProperty(_index);
    },

    getNumber: function(name) {
        return this.getProperty(name);
    },

    getColor: function(_index) {
        return this.getProperty(_index);
    },

    getColor: function(name) {
        return this.getProperty(name);
    },

    getPVector: function(_index) {
        return this.getProperty(_index);
    },

    getPVector: function(name) {
        return this.getProperty(name);
    },

    getProperty: function(_index) {
        return this.properties[_index];
    },

    getProperty: function(name) {
        var mp = null;

        for (i = 0; i < this.properties.length; i++)
            if (this.properties[i].getName() == name) {
                mp = this.properties[i];
                break;
            }

        return mp;
    },

    getProperties: function() {
        // return properties.toArray(new IProperty[properties.length]);
        return this.properties;
    },

    getPropertyCount: function() {
        return this.properties.length;
    },

    getPropertyName: function(_index) {
        return this.properties[_index].getName();
    },

    getPropertyNames: function() {
        if (this.properties.length > 1) {
            var propertyNames = [];

            for (i = 1; i < properties.length - 1; i++)
                propertyNames.push(this.properties[i + 1].getName());

            return propertyNames;
        } else
            return [];
    },

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
    },

    dispatchEndedEvent: function() {
        // console.log('dispatchEndedEvent');
    },

    dispatchChangedEvent: function() {
        // console.log('dispatchChangedEvent');
    },

    dispatchRepeatedEvent: function() {
        // console.log('dispatchRepeatedEvent');
    },

    toString: function() {
        return "Tween[time = " + this._delay + ", duration = " + this.getDuration() + "]";
    }
};