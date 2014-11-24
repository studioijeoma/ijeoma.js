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

    MOTION.Timeline.prototype.add = function(motion, time) {
        if (motion.isKeyframe()) {
            if (typeof time == 'undefined')
                this.insert(motion, motion.getDelay());
            else
                this.insert(motion, time);
        } else {
            if (typeof time == 'undefined') {
                this._motions[this._motions.indexOf(c)] = c;
            } else {
                var key = time + '';

                // if (key in this._motionMap)
                //     this._motionMap[key].add(motion);
                // else {
                var k = new MOTION.Keyframe(time + '');
                k.add(motion);

                this.insert(k, time);
                // } 
            }
        }

        return this;
    };

    MOTION.Timeline.prototype.get = function(index) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        // else if (typeof arguments == 'string')
        //     return this._motionMap[arguments[0]];
        else {
            var current = [];

            for (var i = 0; i < this._motions.length; i++)
                if (this._motions[i].isInsidePlayingTime(this.getTime()))
                    current.push(this._motions[i]);

            if (current.length == 0)
                return null;
            else
                return current;
        }
    };

    MOTION.Timeline.prototype.gotoAndPlay = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.resume();
        }
        // else if (typeof arguments[0] == 'string') {
        //     var k = this.get(arguments[0]);

        //     this.seek(k.getPlayTime() / this._duration);
        //     this.resume();
        // } 
        else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.resume();
        }
    };

    MOTION.Timeline.prototype.gotoAndStop = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.pause();
        }
        // else if (typeof arguments[0] == 'string') {
        //     var k = this.get(arguments[0]);

        //     this.seek(k.getPlayTime() / this._duration);
        //     this.pause();
        // } 
        else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.pause();
        }
    };
})(MOTION)