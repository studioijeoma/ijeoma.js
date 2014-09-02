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
id = 0;

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

MOTION = function(duration, delay, easing) {
    this._id = id++;
    this._name = "";

    this._calls = [];
    this._callMap = [];

    this._playTime = 0;
    this._playCount = 0;

    this._time = 0;
    this._timeScale = 1;

    this._duration = (typeof duration == 'undefined') ? 0 : duration;

    this._delay = (typeof delay == 'undefined') ? 0 : delay;

    this._easing = (typeof easing == 'undefined') ? Linear.easeIn : easing;

    this._repeatCount = 0;
    this._repeatDuration = 0;

    this._isPlaying = false;
    this._isRepeating = false;
    this._isRepeatingDelay = false;
    this._isReversing = false;

    this._isAutoUpdating = true;

    this._isRegistered = false;

    this._reverseTime = 0;

    this._order = 0;

    this._onStart = undefined;
    this._onEnd = undefined;
    this._onChange = undefined;
    this._onRepeat = undefined;

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
    constructor: MOTION,
    play: function() {
        this.dispatchStartedEvent();

        this.seek(0);
        this.resume();

        this._playCount++;
        this._repeatCount = 0;

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
            if (this.isInsidePlayingTime(time)) {
                if (!this._isPlaying)
                    this.play();

                this.setTime(time);
                this.updateCalls();

                this.dispatchChangedEvent();
            } else if (this._isPlaying)
                this.stop();
        } else {
            if (this._isRegistered && this._isPlaying) {
                this.updateTime();
                this.updateCalls();

                if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))  
                    this.stop();
                else
                    this.dispatchChangedEvent(); 
            }
        }
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

    onStart: function(func) {
        this._onStart = func;
        return this;
    },

    onEnd: function(func) {
        this._onEnd = func;
        return this;
    },

    onChange: function(func) {
        this._onChange = func;
        return this;
    },

    onRepeat: function(func) {
        this._onRepeat = func;
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
        return (value >= 0 && value < this._delay);
    },

    isInsidePlayingTime: function(value) {
        return (value >= this._delay && value <= this._delay + this._duration);
    },

    isAbovePlayingTime: function(value) {
        return value >= this._delay + this._duration;
    },

    isTween: function() {
        return this instanceof MOTION.Tween;
    },

    isParallel: function() {
        return this instanceof MOTION.Parallel;
    },

    isSequence: function() {
        return this instanceof MOTION.Sequence;
    },

    isTimeline: function() {
        return this instanceof MOTION.Timeline;
    },

    isKeyFrame: function() {
        return this instanceof MOTION.KeyFrame;
    },

    usingSeconds: function() {
        return MOTION.timeMode == SECONDS;
    },

    usingFrames: function() {
        return MOTION.timeMode == FRAMES;
    },

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
        if (this._onStart)
            this._onStart();
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
};;MOTION.MotionController = function(children) {
    MOTION.call(this);

    this._children = [];
    this._childrenMap = [];

    this._tweens = [];

    if (children) this.addAll(children);
};

MOTION.MotionController.prototype = Object.create(MOTION.prototype);
MOTION.MotionController.prototype.constructor = MOTION.MotionController

MOTION.MotionController.prototype.seek = function(value) {
    MOTION.prototype.seek.call(this, value);

    for (var i = 0; i < this._children.length; i++) {
        var c = this._children[i];

        if (c.isInsidePlayingTime(this.getTime())){
            c._isUpdatingProperties = true;
            c.seek(this.getTime() / (c.getDelay() + c.getDuration()));
        } else
            c._isUpdatingProperties = false; 
    }

    return this;
};

MOTION.MotionController.prototype.update = function(time) {
    if (time) {
        if (this.isInsidePlayingTime(time)) {
            if (!this._isPlaying)
                this.play();

            this.setTime(time);
            this.updateCalls();
            this.updateChildren();

            this.dispatchChangedEvent();
        } else if (this._isPlaying) {
            this.stop();
        }
    } else {
        if (this._isRegistered && this._isPlaying) {
            this.updateTime();
            this.updateCalls();
            this.updateChildren()

            if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                this.stop();
            else
                this.dispatchChangedEvent();
        }
    }
};

MOTION.MotionController.prototype.updateChildren = function() {
    for (var i = 0; i < this._children.length; i++) {
        this._children[i]._isUpdatingProperties = (i == 0);
        this._children[i].update(this.getTime());
    }
};

MOTION.MotionController.prototype.updateTweens = function() {
    var orderMap = [];
    var ppropertyMap = [];

    for (var i = 0; i < this._tweens.length; i++) {
        var t = this._tweens[i];
        var properties = t.getProperties();

        for (var j = 0; j < properties.length; j++) {
            var p = properties[j];

            var name = p.getObject().constructor.name + "." + p.getName();
            // console.log(name)

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
};

MOTION.MotionController.prototype.updateDuration = function() {
    for (var i = 0; i < this._children.length; i++) {
        var c = this._children[i]
        this._duration = Math.max(this._duration, c.getDelay() + c.getDuration());
    }

    // for (Callback c : calls)
    //     duration = PApplet.max(duration, c.getTime() - getDelay());
};

MOTION.MotionController.prototype.getPosition = function() {
    return this.getTime() / this._duration;
};

MOTION.MotionController.prototype.get = MOTION.MotionController.prototype.getChild;

MOTION.MotionController.prototype.getChild = function(name) {
    if (typeof arguments[0] == 'number')
        return this._children[arguments[0]]
    else
        return this._childrenMap[arguments[0]];
};

MOTION.MotionController.prototype.getChildren = function() {
    return this._children;
};

MOTION.MotionController.prototype.getCount = function() {
    return this._children.length;
};

MOTION.MotionController.prototype.setTimeScale = function(timeScale) {
    MOTION.prototype.setTimeScale.call(this, timeScale);

    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i]
        child.setTimeScale(timeScale);
    }

    return this;
};

MOTION.MotionController.prototype.setTimeMode = function(_durationMode) {
    MOTION.prototype.setTimeMode.call(this, _durationMode);

    for (var i = 0; i < this._children.length; i++) {
        var child = this._children[i];
        child.setTimeMode(_durationMode);
    }

    return this;
};

MOTION.MotionController.prototype.add = function(child) {
    this.insert(child, 0);
    return this;
};

MOTION.MotionController.prototype.insert = function(child, time) {
    child.delay(time);
    // _child.seek(1);
    child.setTimeMode(this._timeMode);
    child.noAutoUpdate();
    // child.addEventListener(this);

    if (child.isTween()) {
        this._tweens.push(child);
        // this.updateTweens();
    }

    this._children.push(child);

    if (child.getName() != null)
        this._childrenMap[child.getName()] = child;

    this.updateDuration();

    return this;
};

MOTION.MotionController.prototype.remove = function(child) {
    if (typeof arguments[0] == 'number') {
        // var c = this.children
        // this._children.splice()
        // this._children.splice(arguments[0])
    } else if (typeof arguments[0] == 'name') {

    } else if (typeof arguments[0] == 'object') {

    }

    // this._children.remove(child);
    // childrenLUT.remove(child.name);
    return this;
};

MOTION.MotionController.prototype.addAll = function(children) {
    for (var i = 0; i < children.length; i++)
        this.add(children[i]);

    return this;
};

// addCall = function(_call) {
//  calls.add(_call);
//  updateDuration();
//  return this;
// ,

MOTION.MotionController.prototype.removeAll = function() {
    this._tweens = [];

    this._children = [];
    this._childrenMap = [];

    return this;
};;MOTION.Parallel = function(name, children) {
    MOTION.MotionController.call(this, name, children);
};

MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
// MOTION.Parallel.prototype.constructor = MOTION.Parallel;
;MOTION.Property = function(object, field, end) {
    this._object = object;
    this._field = field;

    this._name = field;

    this._begin = (typeof object[field] == "undefined") ? 0 : object[field];
    this._end = (typeof end == "undefined") ? 0 : end;
    this._change = this._end - this._begin;

    this._position = 0;
}

MOTION.Property.prototype.update = function(position, easing) {
    this._position = position;

    // if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
    // _this._easing(this.getTime() / this._duration, 0, 1, 1)
    // PApplet.lerp(begin, end, this._position); 
    this._object[this._field] = easing(this._position, this._begin, this._change, 1);
    // }
};

MOTION.Property.prototype.getName = function() {
    return this._name;
};

MOTION.Property.prototype.setName = function(name) {
    if (!this._field)
        this._name = name;
};

MOTION.Property.prototype.getBegin = function() {
    return this._begin;
};

MOTION.Property.prototype.setBegin = function(begin) {
    if (begin) {
        this._begin = begin;
        this._change = this._end - this._begin;
    } else {
        this._begin = (typeof this._object[this._field] == "undefined") ? 0 : this._object[this._field];
        this._change = this._end - this._begin;
    }
};

MOTION.Property.prototype.getEnd = function() {
    return this._end;
};

MOTION.Property.prototype.setEnd = function(end) {
    this._end = end;
    this._change = this._end - this._begin;
};

MOTION.Property.prototype.getChange = function() {
    return this._change;
};

MOTION.Property.prototype.setChange = function(change) {
    this._change = change;
};

MOTION.Property.prototype.getPosition = function() {
    return this._position
};

MOTION.Property.prototype.setPosition = function(position) {
    this._position = position;
    this.update();
};

MOTION.Property.prototype.getValue = function() {
    if (this._field)
        return this._object[this._field];
    else
        return this._value;
};

MOTION.Property.prototype.getObject = function() {
    return this._object
};

MOTION.Property.prototype.setOrder = function(order) {
    this._order = order
};

MOTION.Property.prototype.getOrder = function() {
    return this._order
};;MOTION.Sequence = function(children) {
    MOTION.MotionController.call(this, children)

    this._currentChild = null;
    this._currentChildIndex = 0;
};

MOTION.Sequence.prototype = Object.create(MOTION.MotionController.prototype);
MOTION.Sequence.prototype.constructor = MOTION.Sequence;

MOTION.Sequence.prototype.update = function(time) {
    MOTION.MotionController.prototype.update.call(this, time);

    // console.log(this._time)

    if (this._isPlaying) {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i]

            if (c.isInsidePlayingTime(this._time)) {
                this._currentChildIndex = i;
                this._currentChild = c;

                break;
            }
        }
    }
}; 

MOTION.Sequence.prototype.add = function(child) {
    MOTION.MotionController.prototype.insert.call(this, child, this._duration);
    return this;
};

MOTION.Sequence.prototype.getChild = function(name) {
    if (typeof arguments[0] == 'number')
        return this._children[arguments[0]]
    else if (typeof arguments[0] == 'string')
        return this._childrenMap[arguments[0]];
    else
        return this._currentChild;
};

MOTION.Sequence.prototype.getIndex = function() {
    return this._currentChildIndex;
};;MOTION.KeyFrame = function(time, children) {
    MOTION.MotionController.call(this, children)
    this.delay(time);
};

MOTION.KeyFrame.prototype = Object.create(MOTION.MotionController.prototype);

MOTION.Timeline = function() {
    MOTION.MotionController.call(this);
};

MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
// MOTION.Timeline.prototype.constructor = MOTION.Timeline,

MOTION.Timeline.prototype.add = function(child, time) {
    if (time) {
        var keyFrame = this.getChild(time + "");

        if (keyFrame)
            keyFrame.add(child);
        else {
            keyFrame = new MOTION.KeyFrame(time);
            keyFrame.add(child);

            this.insert(keyFrame, time);
        }

    } else {
        var c = this._childrenMap[child.getName()];
        c.push(child);

        this._children[this._children.indexOf(c)] = c;
    }

    return this;
};

MOTION.Timeline.prototype.getChild = function(index) {
    if (typeof arguments[0] == 'number') {
        var keyFrame = null;

        for (var i = 0; i < children.length; i++) {
            var c = this.chilren[i];

            if (c.getTime() == time)
                keyFrame = c;
        }

        // return keyFrame;
        return this._childrenMap[arguments[0]+''];
    } else if (typeof arguments == 'string') {
        return this._childrenMap[arguments[0]];
    } else
        return this.getCurrentKeyFrames();
};

MOTION.Timeline.prototype.getKeyFrameCount = function() {
    return this._keyFrames.length;
};

MOTION.Timeline.prototype.getCurrentKeyFrames = function() {
    var currentKeyFrames = [];

    for (var i = 0; i < this._children.length; i++)
        if (this._children[i].isInsidePlayingTime(this.getTime()))
            currentKeyFrames.push(children[i]);

    return currentKeyFrames;
};

MOTION.Timeline.prototype.getCurrentKeyFrameIndices = function() {
    var indices = [];

    for (var i = 0; i < this._children.length; i++)
        if (this._children[i].isInsidePlayingTime(getTime()))
            indices.push(i);

    return indices;
};

MOTION.Timeline.prototype.getKeyFrames = function() {
    return this._children;
};

MOTION.Timeline.prototype.getKeyFrameTime = function(name) {
    return this.getChild(name).getTime();
};

MOTION.Timeline.prototype.getKeyFrameChildren = function(name) {
    return this.getChild(name).getChildren();
};

MOTION.Timeline.prototype.gotoAndPlay = function(time) {
    if (typeof arguments[0] == 'number') {
        this.seek(arguments[0] / this._duration);
        this.resume();
    } else if (typeof arguments[0] == 'string') {
        var k = this.getChild(arguments[0]);

        this.seek(k.getPlayTime() / this._duration);
        this.resume();
    } else if (typeof arguments[0] == 'object') {
        this.seek(arguments[0].getPlayTime() / this._duration);
        this.resume();
    }
};

MOTION.Timeline.prototype.gotoAndStop = function(time) {
    if (typeof arguments[0] == 'number') {
        this.seek(arguments[0] / this._duration);
        this.pause();
    } else if (typeof arguments[0] == 'string') {
        var k = getKeyFrame(arguments[0]);

        this.seek(k.getPlayTime() / this._duration);
        this.pause();
    } else if (typeof arguments[0] == 'object') {
        this.seek(arguments[0].getPlayTime() / this._duration);
        this.pause();
    }
};;MOTION.Tween = function(object, property, end, duration, delay, easing) {
    MOTION.call(this, duration, delay, easing)

    this._properties = [];
    this._propertyMap = [];

    this._isUpdatingProperties = true;

    if (typeof object !== "undefined" && typeof property !== "undefined")
        this.add(new MOTION.Property(object, property, end));
};

MOTION.Tween.prototype = Object.create(MOTION.prototype);
MOTION.Tween.prototype.constrctor = MOTION.Tween

MOTION.Tween.prototype.play = function() {
    MOTION.prototype.play.call(this);

    this._isUpdatingProperties = true;


            console.log('------')
    for (var i = 0; i < this._properties.length; i++) {
        this._properties[i].setBegin(); 
        console.log(this._properties[i].getName() + ': '+this._properties[i].getBegin());
    }

    return this;
}

MOTION.Tween.prototype.update = function(time) {
    if (time) {
        if (this.isInsidePlayingTime(time)) {
            if (!this._isPlaying){ 
                // this._isUpdatingProperties =false;
                this.play();
            }

            this.setTime(time);
            this.updateCalls();
            this.updateProperties();

            this.dispatchChangedEvent();
        } else if (this._isPlaying){ 
            this.stop();
        }
    } else {
        if (this._isRegistered && this._isPlaying) {
            this.updateTime();
            this.updateCalls();
            this.updateProperties();

            if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                this.stop();
            else
                this.dispatchChangedEvent();
        }
    } 
};

MOTION.Tween.prototype.updateProperties = function() {
    for (var i = 0; i < this._properties.length; i++)
        this._properties[i].update(this.getPosition(), this._easing);
};

MOTION.Tween.prototype.seek = function(value) {
    MOTION.prototype.seek.call(this, value);

    if (this._isUpdatingProperties)
        this.updateProperties();

    return this;
};

MOTION.Tween.prototype.addProperty = function(object, property, end) {
    if (arguments.length == 1) {
        this._properties.push(arguments[0]);

        if (arguments[0].getName())
            this._propertyMap[arguments[0].getName()] = arguments[0];
    } else {
        return this.addProperty(new MOTION.Property(object, property, end));
    }

    return this;
};

MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;

MOTION.Tween.prototype.getProperty = function() {
    if (isNaN(arguments[0]))
        return this._propertyMap[arguments[0]];
    else
        return this._properties[arguments[0]];
};

MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

MOTION.Tween.prototype.getProperties = function() {
    return this._properties;
};

MOTION.Tween.prototype.getPropertyCount = function() {
    return this._properties.length;
};

MOTION.Tween.prototype.getPropertyName = function(i) {
    return this._properties[i].getName();
};

MOTION.Tween.prototype.getPropertyNames = function() {
    if (this._properties.length > 1) {
        var propertyNames = [];

        for (i = 1; i < properties.length - 1; i++)
            propertyNames.push(this._properties[i + 1].getName());

        return propertyNames;
    } else
        return [];
};
