(function(window, undefined) {  
    _idMap = [];
    _idMap['Motion'] = 0;
    _idMap['Tween'] = 0;
    _idMap['Property'] = 0;
    _idMap['Parallel'] = 0;
    _idMap['Sequence'] = 0;
    _idMap['Timeline'] = 0;
    _idMap['KeyFrame'] = 0;

    _motions = [];
    _motionMap = [];

    /**
   * Returns the duration of the HTML5 media element.
   * 
   * @method duration
   * @return {Number} duration
   */
    MOTION = function(duration, delay, easing) {
        if (this.isTween())
            this._id = 'Tween' + _idMap['Tween']++;
        else if (this.isParallel())
            this._id = 'Parallel' + _idMap['Parallel']++;
        else if (this.isSequence())
            this._id = 'Sequence' + _idMap['Sequence']++;
        else if (this.isTimeline())
            this._id = 'Timeline' + _idMap['Timeline']++;
        else
            this._id = 'Motion' + _idMap['Motion']++;

        this._name = '';

        this._playTime = 0;
        this._playCount = 0;

        this._time = 0;
        this._timeScale = 1;

        this._duration = (typeof duration == 'undefined') ? 0 : duration;

        this._delay = (typeof delay == 'undefined') ? 0 : delay;

        this._easing = (typeof easing == 'undefined') ? (function(t) {
            return t;
        }) : easing;

        this._repeatTime = 0;
        this._repeatDuration = 0;

        this._isPlaying = false;
        this._isRepeating = false;
        this._isRepeatingDelay = false;
        this._isReversing = false;
        this._isSeeking = false;

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
    MOTION.FRAMES = "frames";

    _timeMode = MOTION.SECONDS;

    MOTION.RELATIVE = 'relative';
    MOTION.ABSOLUTE = 'absolute';

    MOTION.REVERSE = "reverse";
    MOTION.NO_REVERSE = "noReverse";

    MOTION.ONCE = "once";
    MOTION.REPEAT = "repeat";

    MOTION.setTimeMode = function(timeMode) {
        _timeMode = timeMode;
        return this;
    };

    MOTION.getTimeMode = function() {
        return _timeMode;
    };

    MOTION.remove = function(child) {
        var i = _motions.indexOf(child);
        _motions.splice(i, 1);
    };

    MOTION.prototype.constructor = MOTION;

    MOTION.prototype.play = function() { 
        this.dispatchStartedEvent();

        this.seek(0);
        this.resume();

        this._playCount++;
        this._repeatTime = 0;

        return this;
    };

    MOTION.prototype.stop = function() { 
        this._reverseTime = (this._reverseTime === 0) ? this._duration : 0;

        if (this._isRepeating && (this._repeatDuration === 0 || this._repeatTime < this._repeatDuration)) {
            this.seek(0);
            this.resume();

            if (!this._isRepeatingDelay)
                this._delay = 0;

            this._repeatTime++;

            this.dispatchRepeatedEvent();
        } else {
            this.seek(1);
            this.pause();

            this._repeatTime = 0;

            this.dispatchEndedEvent();
        }

        return this;
    };

    MOTION.prototype.pause = function() {  
        this._isPlaying = false; 

        this._playTime = this._time;

        return this;
    };

    MOTION.prototype.resume = function() { 
        this._isPlaying = true;  

        this._playTime = new Date().getTime() - this._playTime * 1000;

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

    MOTION.prototype.update = function(time) {  
        if (this._isPlaying) {
            if (typeof time == 'undefined')
                this.updateTime();
            else
                this.setTime(time);

            this.dispatchChangedEvent(); 

             if (!this.isInsidePlayingTime(this._time)) 
                this.stop();
        }  
    };

    MOTION.prototype.updateTime = function() {
        this._time = (new Date().getTime() - this._playTime) / 1000 * this._timeScale;

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
        return this._easing((t > 0) ? this.getTime() / this._duration : 0);
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

    MOTION.prototype.setEasing = function(easing) {
        this._easing = easing;
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

    MOTION.prototype.isRelative = function() {
        return this._valueMode == MOTION.RELATIVE;
    };

    MOTION.prototype.isAbsolute = function() {
        return this._valueMode == MOTION.ABSOLUTE;
    };

    MOTION.prototype.autoUpdate = function() {
        this._isAutoUpdating = true;
        return this;
    };

    MOTION.prototype.noAutoUpdate = function() {
        this._isAutoUpdating = false;
        return this;
    };

    MOTION.prototype.isAutoUpdating = function() {
        return this._isAutoUpdating;
    };

    MOTION.prototype.isDelaying = function() {
        return (this._time <= this._delay);
    };

    MOTION.prototype.isPlaying = function() {
        return this._isPlaying;
    };

    MOTION.prototype.isReversing = function() {
        return this._isReversing;
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

    MOTION.prototype.usingSeconds = function() {
        return _timeMode == MOTION.SECONDS;
    };

    MOTION.prototype.usingFrames = function() {
        return _timeMode == MOTION.FRAMES;
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
            this._onStart(window);
    };

    MOTION.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd(window);
    };

    MOTION.prototype.dispatchChangedEvent = function() {
        if (this._onUpdate)
            this._onUpdate(window);
    };

    MOTION.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat(window);
    };

    MOTION.prototype.kill = function() {
        MOTION.remove(this);
        delete this;
    };

    window.MOTION = MOTION;
})(window)