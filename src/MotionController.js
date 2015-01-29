(function(MOTION, undefined) {
    MOTION.MotionController = function(motions) {
        MOTION.call(this);

        this._motions = [];
        this._valueMode = null;

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
                    m.seek(MOTION._map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
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

    MOTION.MotionController.prototype.count = MOTION.MotionController.prototype.getCount;

    MOTION.MotionController.prototype.setEasing = function(easing) {
        this._easing = (typeof easing == 'undefined') ? (function(t) {
            return t;
        }) : easing;

        for (var i = 0; i < this._motions.length; i++) {
            if (this._motions[i] instanceof MOTION.Tween) {
                this._motions[i].easing(this._easing);
            }
        }

        return this;
    };

    MOTION.MotionController.prototype.easing = MOTION.MotionController.prototype.setEasing;

    MOTION.MotionController.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.MotionController.prototype.add = function(motion) {
        this.insert(motion, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(motion, time) {
        motion.delay(time);
        if (this._valueMode) motion.valueMode(this._valueMode);
        motion._hasController = true;

        this._motions.push(motion);

        MOTION.remove(motion);

        this._updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(motion) {
        var i;

        if (typeof arguments[0] === 'number') {
            i = arguments[0];
        } else if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._motions.length; j++)
                if (this._motions[j]._name === arguments[0])
                    motion = this._motions[j];
        } else if (typeof arguments[0] === 'object') {
            i = this._motions.indexOf(motion);
        }

        if (i != -1) {
            this._motions.splice(i, 1);
            this._updateDuration();
        }

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
})(MOTION)
