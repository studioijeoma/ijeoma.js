Quad = function(){};
Quad.In = function(t) {
    return (t /= 1) * t;
};
Quad.Out = function(t) {
    return -(t /= 1) * (t - 2);
};
Quad.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t;
    return -.5 * ((--t) * (t - 2) - 1);
};

Cubic = function(){};
Cubic.In = function(t) {
    return (t /= 1) * t * t;
};
Cubic.Out = function(t) {
    return ((t = t / 1 - 1) * t * t + 1);
};
Cubic.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t;
    return .5 * ((t -= 2) * t * t + 2);
};

Quart = function(){};
Quart.In = function(t) {
    return (t /= 1) * t * t * t;
};
Quart.Out = function(t) {
    return -((t = t / 1 - 1) * t * t * t - 1);
};
Quart.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t * t;
    return -.5 * ((t -= 2) * t * t * t - 2);
};

Quint = function(){};
Quint.In = function(t) {
    return (t /= 1) * t * t * t * t;
};
Quint.Out = function(t) {
    return ((t = t / 1 - 1) * t * t * t * t + 1);
};
Quint.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t * t * t;
    return .5 * ((t -= 2) * t * t * t * t + 2);
};

Sine = function(){};
Sine.In = function(t) {
    return -Math.cos(t / 1 * (Math.PI / 2)) + 1;
};
Sine.Out = function(t) {
    return Math.sin(t / 1 * (Math.PI / 2));
};
Sine.InOut = function(t) {
    return -.5 * (Math.cos(Math.PI * t / 1) - 1);
};

Expo = function(){};
Expo.In = function(t) {
    return (t == 0) ? 0 : Math.pow(2, 10 * (t / 1 - 1));
};
Expo.Out = function(t) {
    return (t == 1) ? 1 : (-Math.pow(2, -10 * t / 1) + 1);
};
Expo.InOut = function(t) {
    if (t == 0) return 0;
    if (t == 1) return 1;
    if ((t /= 1 / 2) < 1) return .5 * Math.pow(2, 10 * (t - 1));
    return .5 * (-Math.pow(2, -10 * --t) + 2);
};

Circ = function(){};
Circ.In = function(t) {
    return -(Math.sqrt(1 - (t /= 1) * t) - 1);
};
Circ.Out = function(t) {
    return Math.sqrt(1 - (t = t / 1 - 1) * t);
};
Circ.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
    return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};

Elastic = function(){};
Elastic.In = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = .3;
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
};
Elastic.Out = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = .3;
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
};
Elastic.InOut = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1 / 2) == 2) return 1;
    if (!p) p = (.3 * 1.5);
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;
};

Back = function(){};
Back.In = function(t, s) {
    if (s == undefined) s = 1.70158;
    return (t /= 1) * t * ((s + 1) * t - s);
};
Back.Out = function(t, s) {
    if (s == undefined) s = 1.70158;
    return ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
};
Back.InOut = function(t, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= 1 / 2) < 1) return .5 * (t * t * (((s *= (1.525)) + 1) * t - s));
    return .5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
};

Bounce = function(){};
Bounce.In = function(t) {
    return 1 - Bounce.Out(1 - t, 0);
};
Bounce.Out = function(t) {
    if ((t /= 1) < (1/2.75)) {
        return (7.5625 * t * t);
    } else if (t < (2 / 2.75)) {
        return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
    } else if (t < (2.5 / 2.75)) {
        return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
    } else {
        return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
    }
};
Bounce.InOut = function(t) {
    if (t < .5) return Bounce.In (t * 2, 0) * .5;
    return Bounce.Out(t * 2 - 1, 0) * .5 + .5;
};(function(window, undefined) {
    _ids = [];
    _ids['Motion'] = 0;
    _ids['Tween'] = 0;
    _ids['Property'] = 0;
    _ids['Parallel'] = 0;
    _ids['Sequence'] = 0;
    _ids['Timeline'] = 0;
    _ids['KeyFrame'] = 0;

    _motions = [];

    _usePerformance = typeof window !== undefined && window.performance !== undefined && window.performance.now !== undefined;
    _isAutoUpdating = false;
    _time = 0;

    MOTION = function(duration, delay) {
        if (this.isTween())
            this._ids = 'Tween' + _ids['Tween']++;
        else if (this.isParallel())
            this._ids = 'Parallel' + _ids['Parallel']++;
        else if (this.isSequence())
            this._ids = 'Sequence' + _ids['Sequence']++;
        else if (this.isTimeline())
            this._ids = 'Timeline' + _ids['Timeline']++;
        else
            this._ids = 'Motion' + _ids['Motion']++;
 
        this._name = '';

        this._playTime = 0;

        this._time = 0;
        this._timeScale = 1;

        this._reverseTime = 0;

        this._duration = (typeof duration == 'undefined') ? 0 : duration;

        this._delay = (typeof delay == 'undefined') ? 0 : delay;

        this._repeatTime = 0;
        this._repeatDuration = 0;

        this._isPlaying = false;
        this._isRepeating = false;
        this._isRepeatingDelay = false;
        this._isReversing = false;
        this._isSeeking = false; 

        this._order = 0;

        this._hasController = false;

        this._onStart = null;
        this._onEnd = null;
        this._onUpdate = null;
        this._onRepeat = null;

        this._valueMode = MOTION.ABSOLUTE;

        _motions.push(this);
    };

    MOTION.REVISION = '1';

    MOTION.RELATIVE = 'relative';
    MOTION.ABSOLUTE = 'absolute';

    MOTION.playAll = function() {
        for (var i = 0; i < _motions.length; i++)
            if (!_motions[i]._hasController)
                _motions[i].play();
    };

    MOTION.stopAll = function() {
        for (var i = 0; i < _motions.length; i++)
            if (!_motions[i]._hasController)
                _motions[i].stop();
    };

    MOTION.resumeAll = function() {
        for (var i = 0; i < _motions.length; i++)
            if (!_motions[i]._hasController)
                _motions[i].resume();
    };

    MOTION.pauseAll = function() {
        for (var i = 0; i < _motions.length; i++)
            if (!_motions[i]._hasController)
                _motions[i].pause();
    };

    MOTION.seekAll = function(t) {
        for (var i = 0; i < _motions.length; i++)
            if (!_motions[i]._hasController)
                _motions[i].seek(t);
    };

    MOTION.remove = function(child) {
        var i = _motions.indexOf(child);
        _motions.splice(i, 1);
    };

    MOTION.removeAll = function(child) {
        _motions = [];
        _motionsMap = [];

        _ids = [];
    };

    MOTION.update = function(time) {
        _time = time !== undefined ? time : ((_usePerformance) ? window.performance.now() : Date.now());

        for (var i = 0; i < _motions.length; i++)
            if (!_motions[i]._hasController)
                _motions[i]._update();
    }

    MOTION.autoUpdate = function() {
        _isAutoUpdating = true;

        return this;
    };

    MOTION.noAutoUpdate = function() {
        _isAutoUpdating = false;

        return this;
    };

    MOTION.isPlaying = function() {
        for (var i = 0; i < _motions.length; i++)
            if (_motions[i].isPlaying())
                return true;

        return false;
    };

    MOTION.prototype.constructor = MOTION;

    MOTION.prototype.play = function() {
        this.dispatchStartedEvent();

        this.seek(0);
        this.resume();

        this._repeatTime = 0;

        return this;
    };

    MOTION.prototype.stop = function() {
        this.seek(1);
        this.pause();

        this._repeatTime = 0;

        this.dispatchEndedEvent();

        return this;
    };

    MOTION.prototype.pause = function() {
        this._isPlaying = false;

        this._playTime = this._time;

        return this;
    };

    MOTION.prototype.resume = function() {
        this._isPlaying = true;
 
        this._playTime = _time - this._playTime;

        return this;
    };

    MOTION.prototype.seek = function(value) {
        this._isPlaying = false;
        this._isSeeking = true;

        this._playTime = (this._delay + this._duration) * value;

        this.setTime(this._playTime);

        this.dispatchChangedEvent();

        this._isSeeking = false;

        return this;
    };

    MOTION.prototype.repeat = function(duration) {
        this._isRepeating = true;
        if (typeof duration !== 'undefined' || duration) this._repeatDuration = duration;

        return this;
    };

    MOTION.prototype.noRepeat = function() {
        this._isRepeating = false;
        this._repeatDuration = 0;

        return this;
    };

    MOTION.prototype.reverse = function() {
        this._isReversing = true;

        return this;
    };

    MOTION.prototype.noReverse = function() {
        this._isReversing = false;

        return this;
    };

    MOTION.prototype._update = function(time) {
        if (this._isPlaying) {
            if (typeof time == 'undefined')
                this._updateTime();
            else
                this.setTime(time);

            this.dispatchChangedEvent();

            if (!this.isInsidePlayingTime(this._time) && !this.isInsideDelayingTime(this._time)) {
                this._reverseTime = (this._reverseTime === 0) ? this._duration : 0;

                if (this._isRepeating && (this._repeatDuration === 0 || this._repeatTime < this._repeatDuration)) {
                    this.seek(0);
                    this.resume();

                    this._repeatTime++;

                    if (!this._isRepeatingDelay)
                        this._delay = 0;

                    this.dispatchRepeatedEvent();
                } else this.stop();
            }
        }
    };

    MOTION.prototype._updateTime = function() { 
        this._time = _time - this._playTime;

        if (this._isReversing && this._reverseTime !== 0)
            this._time = this._reverseTime - this._time;
    };

    MOTION.prototype.setName = function(name) {
        this._name = name;

        return this;
    };

    MOTION.prototype.getName = function() {
        return this._name;
    };

    MOTION.prototype.setTime = function(time) { 
        this._time = time;

        if (this._isReversing && this._reverseTime !== 0) this._time = this._reverseTime - this._time;

        return this;
    };

    MOTION.prototype.getTime = function() {
        return (this._time < this._delay) ? 0 : (this._time - this._delay);
    };

    MOTION.prototype.setTimeScale = function(_timeScale) {
        this._timeScale = _timeScale;

        return this;
    };

    MOTION.prototype.getTimeScale = function() {
        return this._timeScale;
    };

    MOTION.prototype.getPosition = function() {
        var t = this.getTime();

        return (t > 0) ? t / this._duration : 0;
    };

    MOTION.prototype.setDuration = function(_duration) {
        this._duration = _duration;

        return this;
    };

    MOTION.prototype.duration = MOTION.prototype.setDuration;

    MOTION.prototype.getDuration = function() {
        return this._duration;
    };

    MOTION.prototype.getRepeatTime = function() {
        return this._repeatTime;
    };

    MOTION.prototype.setDelay = function(delay) {
        this._delay = delay;

        return this;
    };

    MOTION.prototype.delay = MOTION.prototype.setDelay;

    MOTION.prototype.noDelay = function() {
        this._delay = 0;

        return this;
    };

    MOTION.prototype.getDelay = function() {
        return this._delay;
    };

    MOTION.prototype.repeatDelay = function(duration) {
        this.repeat(duration);
        this._isRepeatingDelay = true;

        return this;
    };

    MOTION.prototype.noRepeatDelay = function() {
        this.noRepeat();
        this._isRepeatingDelay = false;

        return this;
    };

    MOTION.prototype.relative = function() {
        this.setValueMode(MOTION.RELATIVE);

        return this;
    };

    MOTION.prototype.absolute = function() {
        this.setValueMode(MOTION.ABSOLUTE);

        return this;
    };

    MOTION.prototype.setValueMode = function(_valueMode) {
        this._valueMode = _valueMode;

        return this;
    };

    MOTION.prototype.getValueMode = function() {
        return this._valueMode;
    };

    MOTION.prototype.isDelaying = function() {
        return (this._time <= this._delay);
    };

    MOTION.prototype.isPlaying = function() {
        return this._isPlaying;
    };

    MOTION.prototype.isInsideDelayingTime = function(value) {
        return (value >= 0 && value < this._delay);
    };

    MOTION.prototype.isInsidePlayingTime = function(value) {
        return (value >= this._delay && value < this._delay + this._duration);
    };

    MOTION.prototype.isAbovePlayingTime = function(value) {
        return value >= this._delay + this._duration;
    };

    MOTION.prototype.isTween = function() {
        return this instanceof MOTION.Tween;
    };

    MOTION.prototype.isParallel = function() {
        return this instanceof MOTION.Parallel;
    };

    MOTION.prototype.isSequence = function() {
        return this instanceof MOTION.Sequence;
    };

    MOTION.prototype.isTimeline = function() {
        return this instanceof MOTION.Timeline;
    };

    MOTION.prototype.isKeyframe = function() {
        return this instanceof MOTION.Keyframe;
    };

    MOTION.prototype.onStart = function(func) {
        this._onStart = func;

        return this;
    };

    MOTION.prototype.onEnd = function(func) {
        this._onEnd = func;

        return this;
    };

    MOTION.prototype.onUpdate = function(func) {
        this._onUpdate = func;

        return this;
    };

    MOTION.prototype.onRepeat = function(func) {
        this._onRepeat = func;

        return this;
    };

    MOTION.prototype.dispatchStartedEvent = function() {
        if (this._onStart)
            this._onStart();
    };

    MOTION.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd();
    };

    MOTION.prototype.dispatchChangedEvent = function() {
        if (this._onUpdate)
            this._onUpdate();
    };

    MOTION.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat();
    }; 

    window.MOTION = MOTION;
})(window);(function(MOTION, undefined) {
    MOTION.MotionController = function(motions) {
        MOTION.call(this);

        this._motions = [];
        this._tweens = [];

        if (motions) this.addAll(motions);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController;

    MOTION.MotionController.prototype.reverse = function(_valueMode) {
        MOTION.prototype.reverse.call(this);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].reverse();

        return this;
    };

    MOTION.MotionController.prototype._updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m.isInsidePlayingTime(this.getTime()))
                    m.seek(_map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m.isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m.isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m._update(this.getTime(), false);
                else
                    m.play();
            } else if (m.isPlaying())
            m.stop();
        }
    };

    MOTION.MotionController.prototype._updateTweens = function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];
            var properties = t.get();

            for (var j = 0; j < properties.length; j++) {
                var p = properties[j];

                var name = (this._valueMode == MOTION.RELATIVE) ? p.getField() : t._id + '.' + p.getField();
                var order = 0;

                if (name in orderMap) {
                    order = orderMap[name];
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

    MOTION.MotionController.prototype._updateDuration = function() {
        for (var i = 0; i < this._motions.length; i++)
            this._duration = Math.max(this._duration, this._motions[i].getDelay() + this._motions[i].getDuration());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.get = function(name) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        return this._motions;
    };

    MOTION.MotionController.prototype.getCount = function() {
        return this._motions.length;
    };

    MOTION.MotionController.prototype.setValueMode = function(_valueMode) {
        MOTION.prototype.setValueMode.call(this, _valueMode);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].setValueMode(_valueMode);

        return this;
    };

    MOTION.MotionController.prototype.add = function(motion) {
        this.insert(motion, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(motion, time) {
        motion.delay(time);
        motion._hasController = true;

        this._motions.push(motion);

        if (motion.isTween()) {
            this._tweens.push(motion);
            this._updateTweens();
        }

        this._updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(motion) {
        var motion, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0];
            motion = this._motions[i];
        } else if (typeof arguments[0] == 'object') {
            motion = arguments[0];
            i = this._motions.indexOf(motion);
        }

        if (i != -1)
            this._motions.splice(i, 1);

        if (motion.isTween()) {
            i = this._tweens.indexOf(motion);
            this._tweens.splice(i, 1);

            this._updateTweens();
        }

        this._updateDuration();

        motion.kill();

        return this;
    };

    MOTION.MotionController.prototype.addAll = function(motions) {
        for (var i = 0; i < motions.length; i++)
            this.add(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.removeAll = function() {
        for (var i = 0; i < motions.length; i++)
            this.remove(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this._updateMotions();
        MOTION.prototype.dispatchChangedEvent.call(this)
    };

    _map = function(n, start1, stop1, start2, stop2) {
        return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    };
})(MOTION);(function(MOTION, undefined) {
    MOTION.Parallel = function(motions) {
        MOTION.MotionController.call(this, name, motions);
    };

    MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Parallel.prototype.constructor = MOTION.Parallel;

    MOTION.Parallel.prototype._updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m.isInsidePlayingTime(this.getTime()))
                    m.seek(_map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m.isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m.isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m._update(this.getTime(), false);
                else
                    m.play();
            } else if (m.isPlaying()) {
                if (this._isReversing && i < this._motions.length - 1)
                    m.seek(1);
                else
                    for (var i = 0; i < _motions.length; i++)
                        _motions[i].stop();
            }
        }
    };
})(MOTION)
;(function(MOTION, undefined) {
    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] == 'object') ? object : window;
        this._field = (typeof arguments[0] == 'object') ? field : arguments[0];

        this._id = 'Property' + _ids['Property']++;

        var values = (typeof arguments[0] == 'object') ? values : arguments[1]

        this._begin = this._object[this._field] = (typeof values == 'number') ? ((typeof this._object[this._field] == 'undefined') ? 0 : this._object[this._field]) : values[0];
        this._end = (typeof values == 'number') ? values : values[1];

        this._position = 0;
    }

    MOTION.Property.prototype.update = function(position) {
        this._position = position;

        if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
            this._object[this._field] = this._position * (this._end - this._begin) + this._begin;
        } else {
            // console.log(this._position);
        }
    };

    MOTION.Property.prototype.getId = function() {
        return this._id;  
    };

    MOTION.Property.prototype.getBegin = function() {
        return this._begin;
    };

    MOTION.Property.prototype.setBegin = function(begin) {
        if (typeof begin === 'undefined') {
            if (typeof this._object[this._field] === 'undefined')
                this._begin = 0;
            else
                this._begin = this._object[this._field];
        } else
            this._begin = begin;

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

        this._current = null;
        this._currentIndex = 0;
    };

    MOTION.Sequence.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Sequence.prototype.constructor = MOTION.Sequence;

    MOTION.Sequence.prototype.add = function(child) {
        MOTION.MotionController.prototype.insert.call(this, child, this._duration);
        return this;
    };

    MOTION.Sequence.prototype.get = function(name) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]]; 
        else
            return this._current;
    };

    MOTION.Sequence.prototype.getIndex = function() {
        return this._currentIndex;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this._updateMotions();

         if (this._isPlaying) {
            for (var i = 0; i < this._motions.length; i++) {
                var c = this._motions[i];

                if (c.isInsidePlayingTime(this._time)) {
                    this._currentIndex = i;
                    this._current = c;

                    break;
                }
            }
        }
        
        MOTION.prototype.dispatchChangedEvent.call(this)
    };
})(MOTION);;(function(MOTION, undefined) {
    MOTION.Keyframe = function(time, motions) {
        MOTION.MotionController.call(this, motions)
        this.delay(time);
    };

    MOTION.Keyframe.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Keyframe.prototype.constructor = MOTION.Keyframe;

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Timeline.prototype.constructor = MOTION.Timeline;

    MOTION.Timeline.prototype.add = function(motion, time) {
        if (motion.isKeyframe()) {
            if (typeof time == 'undefined')
                this.insert(motion, motion.getDelay());
            else
                this.insert(motion, time);
        } else {
            if (typeof time == 'undefined') {
                this._motions[this._motions.indexOf(c)] = c;
            } else {
                var key = time + '';

                // if (key in this._motionMap)
                //     this._motionMap[key].add(motion);
                // else {
                var k = new MOTION.Keyframe(time + '');
                k.add(motion);

                this.insert(k, time);
                // } 
            }
        }

        return this;
    };

    MOTION.Timeline.prototype.get = function(index) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        // else if (typeof arguments == 'string')
        //     return this._motionMap[arguments[0]];
        else {
            var current = [];

            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i].isInsidePlayingTime(this.getTime()))
                    current.push(this._motions[i]);

            if (current.length == 0)
                return null;
            else
                return current;
        }
    };

    MOTION.Timeline.prototype.gotoAndPlay = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.resume();
        }
        // else if (typeof arguments[0] == 'string') {
        //     var k = this.get(arguments[0]);

        //     this.seek(k.getPlayTime() / this._duration);
        //     this.resume();
        // } 
        else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.resume();
        }
    };

    MOTION.Timeline.prototype.gotoAndStop = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.pause();
        }
        // else if (typeof arguments[0] == 'string') {
        //     var k = this.get(arguments[0]);

        //     this.seek(k.getPlayTime() / this._duration);
        //     this.pause();
        // } 
        else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.pause();
        }
    };
})(MOTION);(function(MOTION, undefined) { 
        MOTION.Tween = function(object, property, end, duration, delay, easing) {  
            this._properties = [];
            this._propertyMap = [];

            if (typeof arguments[0] == 'object') {
                MOTION.call(this, arguments[3], arguments[4]);
                this.addProperty(arguments[0], arguments[1], arguments[2])
                this.setEasing(arguments[5]);
            } else if (typeof arguments[0] == 'string') {
                MOTION.call(this, arguments[2], arguments[3]);
                this.addProperty(arguments[0], arguments[1])
                this.setEasing(arguments[4]);
            }else  {
                MOTION.call(this, arguments[0], arguments[1]); 
                this.setEasing(arguments[2]);
            } 
    };

    MOTION.Tween.prototype = Object.create(MOTION.prototype); MOTION.Tween.prototype.constrctor = MOTION.Tween

    MOTION.Tween.prototype._updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this._easing(this.getPosition()));
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p = (typeof arguments[0] == 'object') ? new MOTION.NumberProperty(object, property, end) : new MOTION.NumberProperty(arguments[0], arguments[1]);
 
        this._properties.push(p);
        this._propertyMap[p.getField()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;


    MOTION.Tween.prototype.remove = function(child) {
        var property, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0];
            property = this._properties[i];
        } else if (typeof arguments[0] == 'name') {
            property = this._propertyMap[arguments[0]];
            i = this._properties.indexOf(property);
        } else if (typeof arguments[0] == 'object') {
            property = arguments[0];
            i = this._properties.indexOf(property);
        }

        if (i && i != -1)
            this._properties.splice(i, 1);

        if (property && property.getName() in this._propertyMap)
            delete this._propertyMap[c.getName()];

        return this;
    };

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
 
    MOTION.prototype.setEasing = function(easing) {
        this._easing = (typeof easing == 'undefined') ? (function(t) {
            return t;
        }) : easing;

        return this;
    };

    MOTION.prototype.easing = MOTION.prototype.setEasing;

    MOTION.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.prototype.noEasing = function() {
        this.setEasing(function(t) {
            return t;
        });

        return this;
    };

    MOTION.Tween.prototype.dispatchStartedEvent = function() {
        if (this._valueMode == MOTION.RELATIVE)
            for (var i = 0; i < this._properties.length; i++)
                this._properties[i].setBegin();

        if (this._onStart)
            this._onStart(this._object);
    };

    MOTION.Tween.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd(this._object);
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this._updateProperties();

        if (this._onUpdate)
            this._onUpdate(this._object);
    };

    MOTION.Tween.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat(this._object);
    };
})(MOTION);
