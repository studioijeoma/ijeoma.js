(function(MOTION, undefined) {
    MOTION.Sequence = function(children) {
        MOTION.MotionController.call(this, children);

        this._current = null;
        this._currentIndex = 0;
    };

    MOTION.Sequence.prototype = MOTION.MotionController.prototype;
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

                if (c._isInsidePlayingTime(this._time)) {
                    this._currentIndex = i;
                    this._current = c;

                    break;
                }
            }
        }
        
        MOTION.prototype.dispatchChangedEvent.call(this)
    };
})(MOTION);