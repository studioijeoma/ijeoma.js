(function(window, undefined) {
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

        this._isAutoUpdating = false;

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

        // this._playTime = ((_usePerformance) ? window.performance.now() : Date.now()) - this._playTime;
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

    MOTION.prototype.autoUpdate = function() {
        this._isAutoUpdating = true;

        return this;
    };

    MOTION.prototype.noAutoUpdate = function() {
        this._isAutoUpdating = false;

        return this;
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
})(window)