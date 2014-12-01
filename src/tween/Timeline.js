(function(MOTION, undefined) {
    MOTION.Keyframe = function(time, motions) {
        MOTION.MotionController.call(this, motions)
        this.delay(time);
    };

    MOTION.Keyframe.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Keyframe.prototype.constructor = MOTION.Keyframe;

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Timeline.prototype.constructor = MOTION.Timeline;


    MOTION.Timeline.prototype.play = function(time) {
        if (typeof arguments[0] == 'undefined') {
            MOTION.MotionController.prototype.play.call(this);
        } else if (typeof arguments[0] == 'number') {
            this.seek(this._motions[arguments[0]] / this._duration);
            this.resume();
        } else if (typeof arguments[0] == 'string') {
            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i]._name === arguments[0]) {
                    this.seek(this._motions[i] / this._duration);
                    this.resume();
                }
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.resume();
        }

        return this;
    };

    MOTION.Timeline.prototype.stop = function(time) {
        if (typeof arguments[0] == 'undefined')
            MOTION.MotionController.prototype.stop.call(this);
        else if (typeof arguments[0] == 'number') {
            this.seek(this._motions[arguments[0]] / this._duration);
            this.pause();
        } else if (typeof arguments[0] == 'string') {
            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i]._name === arguments[0]) {
                    this.seek(this._motions[i] / this._duration);
                    this.pause();
                }
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.pause();
        }

        return this;
    };

    MOTION.Timeline.prototype.add = function(motion, time) {
        if (motion instanceof MOTION.Keyframe) {
            if (typeof time == 'undefined')
                this.insert(motion, motion.getDelay());
            else
                this.insert(motion, time);
        } else {
            if (typeof time == 'undefined') {
                this._motions[this._motions.indexOf(c)] = c;
            } else {
                var key = time + '';
 
                var k = new MOTION.Keyframe(time + '');
                k.add(motion);

                this.insert(k, time);
            }
        }

        return this;
    };

    MOTION.Timeline.prototype.getCurrent = function(index) {
        var current = [];

        for (var i = 0; i < this._motions.length; i++)
            if (this._motions[i].isInsidePlayingTime(this.getTime()))
                current.push(this._motions[i]);

        if (current.length == 0)
            return null;
        else
            return current;
    };

    MOTION.Timeline.prototype.current = MOTION.Timeline.prototype.getCurrent
})(MOTION)