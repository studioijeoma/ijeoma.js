(function(MOTION, undefined) {
    MOTION.Keyframe = function(time, children) {
        MOTION.MotionController.call(this, children)
        this.delay(time);
    };

    MOTION.Keyframe.prototype = Object.create(MOTION.MotionController.prototype);

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Timeline.prototype.constructor = MOTION.Timeline,

    MOTION.Timeline.prototype.add = function(child, time) {
        if (typeof time != 'undefined') {
            var k = this.get(time + '');

            if (typeof k != 'undefined') {
                k.add(child);
            } else {
                k = new MOTION.Keyframe(time + '', time);
                k.add(child);

                this.insert(k, time);
            }
        } else {
            var c = this._childrenMap.get(child.getName());
            c.add(child);

            this._children[children.indexOf(c)] = c;
        }

        return this;
    };

    MOTION.Timeline.prototype.getChild = function(index) {
        if (typeof arguments[0] == 'number') {
            var k = null;

            for (var i = 0; i < children.length; i++) {
                var c = this.chilren[i];

                if (c.getTime() == arguments[0])
                    k = c;
            }

            // return k;
            return this._childrenMap[arguments[0] + ''];
        } else if (typeof arguments == 'string')
            return this._childrenMap[arguments[0]];
        else
            return getCurrentChildren();
    };

    MOTION.Timeline.prototype.getCurrentChildren = function() {
        var currentKeyframes = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(this.getTime()))
                currentKeyFrames.push(children[i]);

        return currentKeyFrames;
    };

    MOTION.Timeline.prototype.gotoAndPlay = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.resume();
        } else if (typeof arguments[0] == 'string') {
            var k = this.getChild(arguments[0]);

            this.seek(k.getPlayTime() / this._duration);
            this.resume();
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.resume();
        }
    };

    MOTION.Timeline.prototype.gotoAndStop = function(time) {
        if (typeof arguments[0] == 'number') {
            this.seek(arguments[0] / this._duration);
            this.pause();
        } else if (typeof arguments[0] == 'string') {
            var k = getKeyFrame(arguments[0]);

            this.seek(k.getPlayTime() / this._duration);
            this.pause();
        } else if (typeof arguments[0] == 'object') {
            this.seek(arguments[0].getPlayTime() / this._duration);
            this.pause();
        }
    };
})(MOTION)