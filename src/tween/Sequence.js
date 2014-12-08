(function(MOTION, undefined) {
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

    MOTION.Sequence.prototype.getCurrentIndex = function() {
        return this._currentIndex;
    };

    MOTION.Sequence.prototype.currentIndex = MOTION.Sequence.prototype.getCurrentIndex;

    MOTION.Sequence.prototype.getCurrent = function() {
        return this._current;
    };

    MOTION.Sequence.prototype.current = MOTION.Sequence.prototype.getCurrent;

    MOTION.MotionController.prototype.dispatchStartedEvent = function() {
        this._current = null;
        this._currentIndex = 0;

        MOTION.prototype.dispatchStartedEvent.call(this)
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this._updateMotions();

         if (this._isPlaying) {
            for (var i = 0; i < this._motions.length; i++) {
                var c = this._motions[i];

                if (c._isInsidePlayingTime(this._time)) {
                    this._currentIndex = i;
                    this._current = c;

                    break;
                }
            }
        }
        
        MOTION.prototype.dispatchChangedEvent.call(this)
    };

    MOTION.MotionController.prototype.dispatchRepeatedEvent = function() {
        this._current = null;
        this._currentIndex = 0;

        MOTION.prototype.dispatchRepeatedEvent.call(this)
    };
})(MOTION);