(function(MOTION, undefined) {
    MOTION.RELATIVE = 'relative';
    MOTION.ABSOLUTE = 'absolute';

    MOTION.MotionController = function(motions) {
        MOTION.call(this);

        this._motions = [];
        this._tweens = [];

        if (motions) this.addAll(motions);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController;

    MOTION.MotionController.prototype.reverse = function() {
        MOTION.prototype.reverse.call(this);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].reverse();

        return this;
    };

    MOTION.MotionController.prototype._updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m._isInsidePlayingTime(this.getTime()))
                    m.seek(this._map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m._isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m._isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m._update(this.getTime(), false);
                else
                    m.play();
            } else if (m.isPlaying())
                m.stop();
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
        if (typeof arguments[0] === 'number') {
            return this._motions[arguments[0]];
        } else if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._motions.length; j++)
                if (this._motions[j]._name === arguments[0])
                    return this._motions[j];
        }

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

    MOTION.MotionController.prototype.valueMode = MOTION.MotionController.prototype.setValueMode;

    MOTION.MotionController.prototype.add = function(motion) {
        this.insert(motion, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(motion, time) {
        motion.delay(time);
        motion.valueMode(this._valueMode);
        motion._hasController = true;

        this._motions.push(motion);

        MOTION.remove(motion);

        this._updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(motion) {
        var motion, i;

        if (typeof arguments[0] === 'number') {
            i = arguments[0];
            motion = this._motions[i];
        } else if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._motions.length; j++)
                if (this._motions[j]._name === arguments[0]) {
                    i = j;
                    motion = this._motions[j];
                }
        } else if (typeof arguments[0] === 'object') {
            motion = arguments[0];
            i = this._motions.indexOf(motion);
        }

        if (i != -1)
            this._motions.splice(i, 1);

        this._updateDuration();

        // motion.kill();

        return this;
    };

    MOTION.MotionController.prototype.addAll = function(motions) {
        for (var i = 0; i < motions.length; i++)
            this.add(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.removeAll = function() {
        for (var i = 0; i < this._motions.length; i++)
            this.remove(this._motions[i]);

        return this;
    }; 

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this._updateMotions();
        MOTION.prototype.dispatchChangedEvent.call(this);
    };

    MOTION.MotionController.prototype._map = function(n, start1, end1, start2, end2) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    };
})(MOTION)