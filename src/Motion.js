(function(window, undefined) {
    MOTION = function(duration, delay) {
        this._name = '';

        this._playTime = 0;
        this._time = 0;
        this._duration = (typeof duration === 'undefined') ? 0 : duration;
        this._delayTime = (typeof delay === 'undefined') ? 0 : delay;

        this._repeatTime = 0;
        this._repeatDuration = 0;

        this._reverseTime = 0;

        this._timeScale = 1;

        this._isPlaying = false;
        this._isRepeating = false;
        this._isRepeatingDelay = false;
        this._isReversing = false;
        this._isSeeking = false;

        this._hasController = false;
        this._useOnce = MOTION._useOnce;

        this._onStart = null;
        this._onEnd = null;
        this._onUpdate = null;
        this._onRepeat = null;

        MOTION._add(this);
    };

    MOTION.REVISION = '1';

    MOTION.ABSOLUTE = 'absolute';
    MOTION.RELATIVE = 'relative';

    MOTION.LINEAR = 'linear';
    MOTION.COSINE = 'cosine';
    MOTION.CUBIC = 'cubic';
    MOTION.HERMITE = 'hermite';

    MOTION._motions = [];

    MOTION._performance = (typeof window !== undefined && window.performance !== undefined && window.performance.now !== undefined) ? window.performance : Date;
    MOTION._useOnce = false;
    MOTION._time = 0;
    MOTION._valueMode = MOTION.ABSOLUTE;

    MOTION.valueMode = function(mode) {
        MOTION._valueMode = mode;
    }

    MOTION.playAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].play();
    };

    MOTION.stopAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].stop();
    };

    MOTION.resumeAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].resume();
    };

    MOTION.pauseAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].pause();
    };

    MOTION.seekAll = function(t) {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].seek(t);
    };

    MOTION.repeatAll = function(duration) {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].repeat(duration);
    };

    MOTION.reverseAll = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].reverse();
    };

    MOTION.timeScaleAll = function(t) {
        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].timeScale(t);
    };

    MOTION.useOnce = function(useOnce) {
        MOTION._useOnce = (typeof useOnce !== 'undefined') ? useOnce : true;

        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i].useOnce(MOTION._useOnce);
    };

    MOTION._add = function(child) {
        MOTION._motions.push(child);
    };

    MOTION.remove = function(child) {
        var i = MOTION._motions.indexOf(child);
        MOTION._motions.splice(i, 1);
    };

    MOTION.removeAll = function(child) {
        MOTION._motions = [];
    };

    MOTION.update = function(time) {
        if (typeof time == 'undefined') return false;

        MOTION._time = typeof time !== undefined ? time : this._performance.now();

        for (var i = 0; i < MOTION._motions.length; i++)
            MOTION._motions[i]._update();
    };

    MOTION.autoUpdate = function() {
        _isAutoUpdating = true;

        return this;
    };

    MOTION.noAutoUpdate = function() {
        _isAutoUpdating = false;

        return this;
    };

    MOTION.time = function() {
        return MOTION._time;
    }

    MOTION.isPlaying = function() {
        for (var i = 0; i < MOTION._motions.length; i++)
            if (MOTION._motions[i].isPlaying())
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

        if (this._useOnce && !this._hasController)
            MOTION.remove(this);
        else
            return this;
    };

    MOTION.prototype.pause = function() {
        this._isPlaying = false;

        this._playTime = this._time;

        return this;
    };

    MOTION.prototype.resume = function() {
        this._isPlaying = true;

        this._playTime = MOTION._time - this._playTime;

        return this;
    };

    MOTION.prototype.seek = function(value) {
        this._isPlaying = false;
        this._isSeeking = true;

        this._playTime = (this._delayTime + this._duration) * value;

        this.setTime(this._playTime);

        this.dispatchChangedEvent();

        this._isSeeking = false;

        return this;
    };

    MOTION.prototype.repeat = function(duration) {
        this._isRepeating = true;
        this._repeatDuration = (typeof duration !== 'undefined') ? duration : 0;

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

            if (!this._isInsidePlayingTime(this._time) && !this._isInsideDelayingTime(this._time)) {
                this._reverseTime = (this._reverseTime === 0) ? this._duration : 0;

                if (this._isRepeating && (this._repeatDuration === 0 || this._repeatTime < this._repeatDuration)) {
                    this.seek(0);
                    this.resume();

                    this._repeatTime++;

                    if (!this._isRepeatingDelay)
                        this._delayTime = 0;

                    this.dispatchRepeatedEvent();
                } else {

                    this.stop();
                }
            }
        }
    };

    MOTION.prototype._updateTime = function() {
        this._time = (MOTION._time - this._playTime) * this._timeScale;

        if (this._isReversing && this._reverseTime !== 0)
            this._time = this._reverseTime - this._time;
    };

    MOTION.prototype.setName = function(name) {
        this._name = name;

        return this;
    };

    MOTION.prototype.name = MOTION.prototype.setName;

    MOTION.prototype.getName = function() {
        return this._name;
    };

    MOTION.prototype.setTime = function(time) {
        this._time = time * this._timeScale;

        if (this._isReversing && this._reverseTime !== 0) this._time = this._reverseTime - this._time;

        return this;
    };

    MOTION.prototype.getTime = function() {
        return (this._time < this._delayTime) ? 0 : (this._time - this._delayTime);
    };

    MOTION.prototype.time = MOTION.prototype.getTime;

    MOTION.prototype.setTimeScale = function(timeScale) {
        this._timeScale = timeScale;

        return this;
    };

    MOTION.prototype.timeScale = MOTION.prototype.setTimeScale;

    MOTION.prototype.getTimeScale = function() {
        return this._timeScale;
    };

    MOTION.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.prototype.position = MOTION.prototype.getPosition;

    MOTION.prototype.setDuration = function(_duration) {
        this._duration = _duration;

        return this;
    };

    MOTION.prototype.getDuration = function() {
        return this._duration;
    };

    MOTION.prototype.duration = MOTION.prototype.getDuration;

    MOTION.prototype.getRepeatTime = function() {
        return this._repeatTime;
    };

    MOTION.prototype.repeatTime = MOTION.prototype.getRepeatTime;

    MOTION.prototype.setDelay = function(delay) {
        this._delayTime = delay;

        return this;
    };

    MOTION.prototype.delay = MOTION.prototype.setDelay;

    MOTION.prototype.noDelay = function() {
        this._delayTime = 0;

        return this;
    };

    MOTION.prototype.getDelay = function() {
        return this._delayTime;
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

    MOTION.prototype.isDelaying = function() {
        return (this._time <= this._delayTime);
    };

    MOTION.prototype.isPlaying = function() {
        return this._isPlaying;
    };

    MOTION.prototype._isInsideDelayingTime = function(value) {
        return (value >= 0 && value < this._delayTime);
    };

    MOTION.prototype._isInsidePlayingTime = function(value) {
        return (value >= this._delayTime && value < this._delayTime + this._duration);
    };

    MOTION.prototype._isAbovePlayingTime = function(value) {
        return value >= this._delayTime + this._duration;
    };

    MOTION.prototype.useOnce = function(useOnce) {
        this._useOnce = (typeof useOnce !== 'undefined') ? useOnce : true;

        return this;
    }

    MOTION._map = function(n, start1, end1, start2, end2) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
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

    if (typeof Object.create != 'function') {
        Object.create = (function() {
            var Object = function() {};
            return function(prototype) {
                if (arguments.length > 1) {
                    throw Error('Second argument not supported');
                }
                if (typeof prototype != 'object') {
                    throw TypeError('Argument must be an object');
                }
                Object.prototype = prototype;
                var result = new Object();
                Object.prototype = null;
                return result;
            };
        })();
    }
})(window);
