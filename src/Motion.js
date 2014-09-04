(function(window, undefined) {
    usingP5 = (typeof p5 != "undefined") ? true : false;
    id = 0;

    motions = [];

    MOTION = function(duration, delay, easing) { 
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

        this._asyncPlay = false;

        motions.push(this);
    };

    MOTION.REVISION = '1';

    MOTION.SECONDS = "seconds";
    MOTION.FRAMES = "frames";

    MOTION.REVERSE = "reverse";
    MOTION.NO_REVERSE = "noReverse";

    MOTION.ONCE = "once";
    MOTION.REPEAT = "repeat";

    MOTION.timeMode = MOTION.SECONDS;

    MOTION.prototype = {
        constructor: MOTION,

        // _setupPlay: function() {
        //     this.seek(0);
        //     this.resume();

        //     this._playCount++;
        //     this._repeatCount = 0; 
        // },

        play: function() {
            this.dispatchStartedEvent();

            // if (!this._asyncPlay)
            //     this._setupPlay();

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

            this._playTime = new Date().getTime() - this._playTime * 1000;

            return this;
        },

        seek: function(value) {
            this._playTime = (this._delay + this._duration) * value;

            if (this._playTime != this._time) {
                this.setTime(this._playTime);
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

                    this.dispatchChangedEvent();
                } else if (this._isPlaying)
                    this.stop();
            } else {
                if (this._isPlaying) {
                    this.updateTime();

                    if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                        this.stop();
                    else
                        this.dispatchChangedEvent();
                }
            }
        },

        updateTime: function() {
            this._time = (new Date().getTime() - this._playTime) / 1000 * this._timeScale;

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
            if (this._onStart) {
                this._onStart(window);

                // this._asyncPlay = true;
                // this._setupPlay();
            }
        },

        dispatchEndedEvent: function() {
            if (this._onEnd)
                this._onEnd(window);
        },

        dispatchChangedEvent: function() {
            if (this._onUpdate)
                this._onUpdate(window);
        },

        dispatchRepeatedEvent: function() {
            if (this._onRepeat)
                this._onRepeat(window);
        }
    };

    window.MOTION = MOTION;
})(window)