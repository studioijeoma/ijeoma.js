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
};(function(window, undefined) {
    _usingP5 = (typeof p5 != "undefined") ? true : false

    _id = 0;
    _motions = [];

    MOTION = function(duration, delay, easing) {
        if (this.isTween())
            this._id = 'Tween' + _id++;
        else if (this.isParallel())
            this._id = 'Parallel' + _id++;
        else if (this.isSequence())
            this._id = 'Sequence' + _id++;
        else if (this.isTimeline())
            this._id = 'Timeline' + _id++;

        this._name = '';

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

        this._reverseTime = 0;

        this._order = 0;

        this._onStart = undefined;
        this._onEnd = undefined;
        this._onUpdate = undefined;
        this._onRepeat = undefined;

        this._valueMode = MOTION.ABSOLUTE;

        _motions.push(this);
    };

    MOTION.REVISION = '1';

    MOTION.SECONDS = "seconds";
    MOTION.FRAMES = "frames"

    _timeMode = (_usingP5) ? MOTION.FRAMES : MOTION.SECONDS;

    MOTION.RELATIVE = 'relative';
    MOTION.ABSOLUTE = 'absolute';

    MOTION.REVERSE = "reverse";
    MOTION.NO_REVERSE = "noReverse";

    MOTION.ONCE = "once";
    MOTION.REPEAT = "repeat";


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
            this._isPlaying = false;

            this._playTime = this._time;

            return this;
        },

        resume: function() {
            this._isPlaying = true;

            if (_usingP5) this._playTime = (_timeMode == MOTION.SECONDS) ? (millis() - this._playTime * 1000) : (frameCount - this._playTime);
            else this._playTime = new Date().getTime() - this._playTime * 1000;

            isPlaying = true;


            return this;
        },

        seek: function(value) {
            this._playTime = (this._delay + this._duration) * value;

            this.setTime(this._playTime);

            // if (this._playTime != this._time) {
            if (this.isInsidePlayingTime(this._time)) {
                // console.log(this._id + ': '+this._time) 
                this.dispatchChangedEvent();
            }

            return this;
        },

        repeat: function(duration) {
            this._isRepeating = true;

            if (typeof repeat != 'undefined') this._repeatDuration = duration;

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
            if (typeof time != 'undefined' && !this._isPlaying && this.isInsidePlayingTime(time))
                this.play();

            if (this._isPlaying) {
                if (typeof time == 'undefined')
                    this.updateTime();
                else
                    this.setTime(time);

                if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                    this.stop();
                else
                    this.dispatchChangedEvent();
            }
        },

        updateTime: function() {
            if (_usingP5) this._time = ((_timeMode == MOTION.SECONDS) ? ((millis() - this._playTime) / 1000) : (frameCount - this._playTime)) * this._timeScale;
            else this._time = (new Date().getTime() - this._playTime) / 1000 * this._timeScale;

            if (this._isReversing && this._reverseTime != 0)
                this._time = this._reverseTime - this._time;
        },

        onStart: function(func) {
            this._onStart = func;
            return this;
        },

        onEnd: function(func) {
            this._onEnd = func;
            return this;
        },

        onUpdate: function(func) {
            this._onUpdate = func;
            return this;
        },

        onRepeat: function(func) {
            this._onRepeat = func;
            return this;
        },

        setName: function(name) {
            this._name = name;
            return this;
        },

        getName: function() {
            return this._name;
        },

        setTime: function(time) {
            this._time = time;
            if (this._isReversing && this._reverseTime != 0) this._time = this._reverseTime - this._time;
            return this;
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
            var t = this.getTime();
            return this._easing((t > 0) ? this.getTime() / this._duration : 0, 0, 1, 1);
        },

        setDuration: function(_duration) {
            this._duration = _duration;
            return this;
        },

        getDuration: function() {
            return this._duration;
        },

        getRepeat: function() {
            return this._repeatTime;
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

        repeatDelay: function(duration) {
            this.repeat(duration);
            this._isRepeatingDelay = true;
            return this;
        },

        noRepeatDelay: function() {
            this.noRepeat();
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
            _timeMode = _timeMode;
            return this;
        },

        getTimeMode: function() {
            return _timeMode;
        },

        relative: function() {
            this.setValueMode(MOTION.RELATIVE);
            return this;
        },

        absolute: function() {
            this.setValueMode(MOTION.ABSOLUTE);
            return this;
        },

        setValueMode: function(_valueMode) {
            this._valueMode = _valueMode;
            return this;
        },

        getValueMode: function() {
            return this._valueMode;
        },

        isRelative: function() {
            return this._valueMode == MOTION.RELATIVE
        },

        isAbsolute: function() {
            return this._valueMode == MOTION.ABSOLUTE
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
            return _timeMode == MOTION.SECONDS;
        },

        usingFrames: function() {
            return _timeMode == MOTION.FRAMES;
        },

        dispatchStartedEvent: function() {
            if (this._onStart)
                this._onStart(window, this._object);
        },

        dispatchEndedEvent: function() {
            if (this._onEnd)
                this._onEnd(window, this._object);
        },

        dispatchChangedEvent: function() {
            if (this._onUpdate)
                this._onUpdate(window, this._object);
        },

        dispatchRepeatedEvent: function() {
            if (this._onRepeat)
                this._onRepeat(window, this._object);
        }
    };

    window.MOTION = MOTION;
})(window);(function(MOTION, undefined) {
    MOTION.MotionController = function(children) {
        MOTION.call(this);

        this._children = [];
        this._childrenMap = [];

        this._tweens = [];

        if (children) this.addAll(children);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController

    MOTION.MotionController.prototype.play = function() {
        MOTION.prototype.play.call(this);

        for (var i = 0; i < this._children.length; i++) {
            this._children[i].seek(0);
        }

        return this;
    }

    MOTION.MotionController.prototype.seek = function(value) {
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
    };

    MOTION.MotionController.prototype.updateChildren = function() {
        for (var i = 0; i < this._children.length; i++)
            this._children[i].update(this.getTime());
    };

    MOTION.MotionController.prototype.updateTweens = function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];
            var properties = t.get();

            for (var j = 0; j < properties.length; j++) {
                var p = properties[j];

                var name = (t.isRelative()) ? p.getName() : t._id + '.' + p.getName();
                // var name =  t._id + '.' + p.getName(); 
                var order = 0;

                if (name in orderMap) {
                    order = orderMap[name]
                    order++;

                    var pp = ppropertyMap[name];
                    p.setBegin(pp.getEnd());
                } else
                    p.setBegin();

                p.setOrder(order);

                orderMap[name] = order;
                ppropertyMap[name] = p;


            }
        }
    };

    MOTION.MotionController.prototype.updateDuration = function() {
        for (var i = 0; i < this._children.length; i++)
            this._duration = Math.max(this._duration, this._children[i].getDelay() + this._children[i].getDuration());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.getChild = function(name) {
        if (typeof arguments[0] == 'number')
            return this._children[arguments[0]];
        else
            return this._childrenMap[arguments[0]];
    };

    MOTION.MotionController.prototype.get = MOTION.MotionController.prototype.getChild;

    MOTION.MotionController.prototype.getChildren = function() {
        return this._children;
    };

    MOTION.MotionController.prototype.getCount = function() {
        return this._children.length;
    };

    MOTION.MotionController.prototype.setTimeScale = function(timeScale) {
        MOTION.prototype.setTimeScale.call(this, timeScale);

        for (var i = 0; i < this._children.length; i++)
            this._children[i].setTimeScale(timeScale);

        return this;
    };

    MOTION.MotionController.prototype.setTimeMode = function(_durationMode) {
        MOTION.prototype.setTimeMode.call(this, _durationMode);

        for (var i = 0; i < this._children.length; i++)
            this._children[i].setTimeMode(_durationMode);

        return this;
    };

    MOTION.MotionController.prototype.setValueMode = function(_valueMode) {
        MOTION.prototype.setValueMode.call(this, _valueMode);

        for (var i = 0; i < this._children.length; i++)
            this._children[i].setValueMode(_valueMode);

        return this;
    };

    MOTION.MotionController.prototype.add = function(child) {
        this.insert(child, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(child, time) {
        child.delay(time);
        child.setTimeMode(this._timeMode); 
        child.setValueMode(this._valueMode);
        child.noAutoUpdate();

        if (child.isTween()) {
            this._tweens.push(child);
            this.updateTweens();
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

    MOTION.MotionController.prototype.removeAll = function() {
        this._tweens = [];

        this._children = [];
        this._childrenMap = [];

        return this;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this.updateChildren();

        if (this._onUpdate)
            this._onUpdate(window);
    };
})(MOTION);(function(MOTION, undefined) {
	MOTION.Parallel = function(children) {
		MOTION.MotionController.call(this, name, children);
	};

	MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
	MOTION.Parallel.prototype.constructor = MOTION.Parallel; 
})(MOTION);(function(MOTION, undefined) {
    MOTION.Property = function(object, field, end) {
        this._object = object;
        this._field = field;

        this._id = 'Property'+_id++;
        this._name = field;

        this._begin = (typeof object[field] == "undefined") ? 0 : object[field];
        this._end = (typeof end == "undefined") ? 0 : end;

        this._position = 0;
    }

    MOTION.Property.prototype.update = function(position) {
        this._position = position;


        if ((this._position >= 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
            // _this._easing(this.getTime() / this._duration, 0, 1, 1)  
            this._object[this._field] = this._position * (this._end - this._begin) + this._begin
            // console.log(this._id)
            // console.log(this._position)
            // console.log(this._object[this._field])
        } else
            console.log(this._position)
    };

    MOTION.Property.prototype.getId = function() {
        return this._id;
    };

    MOTION.Property.prototype.getName = function() {
        return this._name;
    };

    MOTION.Property.prototype.setName = function(name) {
        this._name = name;
        return this;
    };

    MOTION.Property.prototype.getBegin = function() {
        return this._begin;
    };

    MOTION.Property.prototype.setBegin = function(begin) {
        if (begin)
            this._begin = begin;
        else
            this._begin = (typeof this._object[this._field] == "undefined") ? 0 : this._object[this._field];
        return this;
    };

    MOTION.Property.prototype.getEnd = function() {
        return this._end;
    };

    MOTION.Property.prototype.setEnd = function(end) {
        this._end = end;
        return this;
    };

    MOTION.Property.prototype.getPosition = function() {
        return this._position
    };

    MOTION.Property.prototype.setPosition = function(position) {
        this._position = position;
        this.update();
        return this;
    };

    MOTION.Property.prototype.getValue = function() {
        return this._object[this._field];
    };

    MOTION.Property.prototype.getObject = function() {
        return this._object
    };

    MOTION.Property.prototype.getField = function() {
        return this._field
    };

    MOTION.Property.prototype.setOrder = function(order) {
        this._order = order
        return this;
    };

    MOTION.Property.prototype.getOrder = function() {
        return this._order
    };

    MOTION.NumberProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end)
    };

    MOTION.NumberProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.NumberProperty.prototype.constrctor = MOTION.NumberProperty
})(MOTION);(function(MOTION, undefined) {
    MOTION.Sequence = function(children) {
        MOTION.MotionController.call(this, children);

        this._currentChild = null;
        this._currentChildIndex = 0;
    };

    MOTION.Sequence.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Sequence.prototype.constructor = MOTION.Sequence;

    MOTION.Sequence.prototype.update = function(time) {
        MOTION.MotionController.prototype.update.call(this, time);

        if (this._isPlaying) {
            for (var i = 0; i < this._children.length; i++) {
                var c = this._children[i];

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
            return this._children[arguments[0]];
        else if (typeof arguments[0] == 'string')
            return this._childrenMap[arguments[0]];
        else
            return this._currentChild;
    };

    MOTION.Sequence.prototype.getIndex = function() {
        return this._currentChildIndex;
    };
})(MOTION);;(function(MOTION, undefined) {
    MOTION.Keyframe = function(time, children) {
        MOTION.MotionController.call(this, children)
        this.delay(time);
    };

    MOTION.Keyframe.prototype = Object.create(MOTION.MotionController.prototype);

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Timeline.prototype.constructor = MOTION.Timeline,

    MOTION.Timeline.prototype.add = function(child, time) {
        if (child.isKeyframe()) {
            if (typeof time != 'undefined') 
                this.insert(child, time);
            else
                this.insert(child, child.getDelay());
        } else {
            if (typeof time != 'undefined') {
                var k = this.get(time + '');

                if (typeof k != 'undefined') {
                    k.add(child);
                } else {
                    k = new MOTION.Keyframe(time + '', time);
                    k.add(child);

                    this.insert(k, time);
                }
            } else {
                var c = this._childrenMap.get(child.getName());
                c.add(child);

                this._children[children.indexOf(c)] = c;
            }
        }

        return this;
    };

    MOTION.Timeline.prototype.getChild = function(index) {
        if (typeof arguments[0] == 'number') {
            var k = null;

            for (var i = 0; i < children.length; i++) {
                var c = this.chilren[i];

                if (c.getTime() == arguments[0])
                    k = c;
            }

            // return k;
            return this._childrenMap[arguments[0] + ''];
        } else if (typeof arguments == 'string')
            return this._childrenMap[arguments[0]];
        else
            return getCurrentChildren();
    };

    MOTION.Timeline.prototype.getCurrentChildren = function() {
        var currentKeyframes = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(this.getTime()))
                currentKeyFrames.push(children[i]);

        return currentKeyFrames;
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
    };
})(MOTION);(function(MOTION, undefined) {
    MOTION.Tween = function(object, property, end, duration, delay, easing) {
        this._object = (typeof arguments[0] == 'undefined' || typeof arguments[0] == 'number') ? window : arguments[0];

        this._properties = [];
        this._propertyMap = [];

        if (typeof arguments[1] == 'string') {
            if (typeof object == 'undefined' || typeof arguments[0] == 'number')
                MOTION.call(this, arguments[0], arguments[1], arguments[2])
            else
                MOTION.call(this, duration, delay, easing)

                this.addProperty(this._object, property, end);
        } else {
            if (typeof object == 'undefined' || typeof arguments[0] == 'number')
                MOTION.call(this, arguments[0], arguments[1], arguments[2])
            else
                MOTION.call(this, arguments[1], arguments[2], arguments[3])
        }
    };



    MOTION.Tween.prototype = Object.create(MOTION.prototype);
    MOTION.Tween.prototype.constrctor = MOTION.Tween;

    MOTION.Tween.prototype.updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this.getPosition());
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p = (typeof arguments[0] == 'string') ? new MOTION.NumberProperty(this._object, arguments[0], arguments[1]) : new MOTION.NumberProperty(object, property, end);

        this._properties.push(p);

        if (p.getName())
            this._propertyMap[p.getName()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;

    MOTION.Tween.prototype.getProperty = function() {
        if (typeof arguments[0] == 'string')
            return this._propertyMap[arguments[0]];
        else if (typeof arguments[0] == 'number')
            return this._properties[arguments[0]];
        else
            return this._properties;
    };

    MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

    MOTION.Tween.prototype.getCount = function() {
        return this._properties.length;
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this.updateProperties();

        if (this._onUpdate)
            this._onUpdate(window);
    };

    MOTION.Tween.prototype.dispatchEndedEvent = function() {
        for (var i = 0; i < this._properties.length; i++) {
            // if (this.isRelative())
            //     this._properties[i].setBegin();
            // console.log(this._properties[i].getName() + ': ' + this._properties[i].getValue())
        }
    };
})(MOTION);(function(MOTION, undefined) {
    REVISION = '1';

    p5.prototype.registerMethod('pre', function() {
        for (var i = 0; i < _motions.length; i++)
            if (_motions[i].isAutoUpdating())
                _motions[i].update();
    });

    p5.prototype.createMotion = function(duration, delay, easing) {
        return new MOTION(duration, delay, easing);
    };

    p5.prototype.createTween = function(object, property, end, duration, delay, easing) {
        return new MOTION.Tween(object, property, end, duration, delay, easing);
    };

    p5.prototype.createParallel = function(children) {
        return new MOTION.Parallel(children);
    };

    p5.prototype.createSequence = function(children) {
        return new MOTION.Sequence(children);
    };

    p5.prototype.createTimeline = function(children) {
        return new MOTION.Timeline(children);
    };

    _valueMode = MOTION.ABSOLUTE;
    _current = null;

    p5.prototype.relative = function() {
        _valueMode = MOTION.RELATIVE;

        if (_current)
            _current.setValueMode(_valueMode)

        return this;
    };

    p5.prototype.absolute = function() {
        _valueMode = MOTION.ABSOLUTE;

        if (_current)
            _current.setValueMode(_valueMode)

        return this;
    };

    p5.prototype.tween = function(object, property, end, duration, delay, easing) {
        t = new MOTION.Tween(object, property, end, duration, delay, easing).setValueMode(_valueMode);

        if (_current)
            _current.add(t);

        return t;
    };

    p5.prototype.beginParallel = function(name) {
        _current = new MOTION.Parallel();

        if (typeof name != 'undefined')
            _current.setName(name);

        return _currentParallel;
    };

    p5.prototype.endParallel = function() {
        _current.updateTweens();
        _current = null;
    };

    p5.prototype.beginSequence = function(name) {
        _current = new MOTION.Sequence();

        if (typeof name != 'undefined')
            _current.setName(name);

        return _current;
    };

    p5.prototype.endSequence = function() {
        _current.updateTweens();
        _current = null;
    };

    p5.prototype.beginTimeline = function(name) {
        _current = new MOTION.Timeline();

        if (typeof name != 'undefined')
            _current.setName(name);

        return _current;
    };

    p5.prototype.endTimeline = function() {
        _current.updateTweens();
        _current = null;
    };

    _currentKeyframe = null;

    p5.prototype.beginKeyframe = function(name, time) {
        _currentKeyframe = new MOTION.keyFrame();

        if (arguments.length == 1 && typeof arguments[0] != 'undefined') {
            if (typeof arguments[0] == 'number')
                _currentKeyframe.delay(arguments[0]);
            else if (typeof arguments[0] == 'string')
                _currentKeyframe.setName(arguments[0]);
        } else if (arguments.length == 2) {
            _currentKeyframe.setName(name);
            _currentKeyframe.delay(time);
        }

        return _currentKeyframe;
    };

    p5.prototype.endkeyFrame = function() {
        _currentKeyframe.updateTweens();

        if (_current.isTimeline())
            _current.add(_currentKeyframe);

        _currentKeyframe = null;
    };

    p5.prototype.play = function(m) {
        m.play();
    };

    p5.prototype.stop = function(m) {
        m.stop();
    };

    p5.prototype.pause = function(m) {
        m.pause();
    };

    p5.prototype.resume = function(m) {
        m.resume();
    };

    p5.prototype.seek = function(m, t) {
        m.seek(t);
    };

    MOTION.timeMode = MOTION.FRAMES;

    MOTION.prototype.resume = function() {
        this._isPlaying = true;

        this._playTime = (MOTION.timeMode == MOTION.SECONDS) ? (millis() - this._playTime * 1000) : (frameCount - this._playTime);

        return this;
    };

    MOTION.prototype.updateTime = function() {
        this._time = ((MOTION.timeMode == MOTION.SECONDS) ? ((millis() - this._playTime) / 1000) : (frameCount - this._playTime)) * this._timeScale;

        if (this._isReversing && this._reverseTime != 0)
            this._time = this._reverseTime - this._time;
    };

    MOTION.ColorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.ColorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.ColorProperty.prototype.constrctor = MOTION.ColorProperty

    MOTION.ColorProperty.prototype.update = function(position) {
        this._position = position;
        this._object[this._field] = lerpColor(this._begin, this._end, this._position);
    };

    MOTION.VectorProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.VectorProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.VectorProperty.prototype.constrctor = MOTION.VectorProperty;

    MOTION.VectorProperty.prototype.update = function(position) {
        this._position = position;
        console.log(this._position);
        this._object[this._field] = p5.Vector.lerp(this._begin, this._end, this._position);
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p;

        if (typeof arguments[0] == 'string') {
            var v = this._object[arguments[0]];

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(this._object, arguments[0], arguments[1]);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(this._object, arguments[0], arguments[1]);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(this._object, arguments[0], arguments[1]);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        } else {
            var v = object[property];

            if (typeof v == 'number')
                p = new MOTION.NumberProperty(object, property, end);
            else if (v instanceof p5.Color)
                p = new MOTION.ColorProperty(object, property, end);
            else if (v instanceof p5.Vector)
                p = new MOTION.VectorProperty(object, property, end);
            else
                console.warn('Only numbers, p5.colors and p5.vectors are supported.');
        }

        this._properties.push(p);

        if (p.getName())
            this._propertyMap[p.getName()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;
})(MOTION);