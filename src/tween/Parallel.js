(function(MOTION, undefined) {
    MOTION.Parallel = function(motions) {
        MOTION.MotionController.call(this, name, motions);
    };

    MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Parallel.prototype.constructor = MOTION.Parallel;

    MOTION.Parallel.prototype.updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++) {
            var m = this._motions[i];

            if (this._isSeeking) {
                if (m.isInsidePlayingTime(this.getTime()))
                    m.seek(map(this.getTime(), 0, m.getDelay() + m.getDuration(), 0, 1));
                else if (m.isAbovePlayingTime(this.getTime()))
                    m.seek(1);
                else
                    m.seek(0);
            } else if (m.isInsidePlayingTime(this.getTime())) {
                if (m.isPlaying())
                    m.update(this.getTime());
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