usingP5 = (typeof p5 != "undefined") ? true : false

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
};