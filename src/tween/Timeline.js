
(function(MOTION, undefined) {
    MOTION.KeyFrame = function(time, children) {
        MOTION.MotionController.call(this, children)
        this.delay(time);
    };

    MOTION.KeyFrame.prototype = Object.create(MOTION.MotionController.prototype);

    MOTION.Timeline = function() {
        MOTION.MotionController.call(this);
    };

    MOTION.Timeline.prototype = Object.create(MOTION.MotionController.prototype);
    // MOTION.Timeline.prototype.constructor = MOTION.Timeline,

    MOTION.Timeline.prototype.add = function(child, time) {
        if (time) {
            var keyFrame = this.getChild(time + "");

            if (keyFrame)
                keyFrame.add(child);
            else {
                keyFrame = new MOTION.KeyFrame(time);
                keyFrame.add(child);

                this.insert(keyFrame, time);
            }

        } else {
            var c = this._childrenMap[child.getName()];
            c.push(child);

            this._children[this._children.indexOf(c)] = c;
        }

        return this;
    };

    MOTION.Timeline.prototype.getChild = function(index) {
        if (typeof arguments[0] == 'number') {
            var keyFrame = null;

            for (var i = 0; i < children.length; i++) {
                var c = this.chilren[i];

                if (c.getTime() == time)
                    keyFrame = c;
            }

            // return keyFrame;
            return this._childrenMap[arguments[0] + ''];
        } else if (typeof arguments == 'string') {
            return this._childrenMap[arguments[0]];
        } else
            return this.getCurrentKeyFrames();
    };

    MOTION.Timeline.prototype.getKeyFrameCount = function() {
        return this._keyFrames.length;
    };

    MOTION.Timeline.prototype.getCurrentKeyFrames = function() {
        var currentKeyFrames = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(this.getTime()))
                currentKeyFrames.push(children[i]);

        return currentKeyFrames;
    };

    MOTION.Timeline.prototype.getCurrentKeyFrameIndices = function() {
        var indices = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(getTime()))
                indices.push(i);

        return indices;
    };

    MOTION.Timeline.prototype.getKeyFrames = function() {
        return this._children;
    };

    MOTION.Timeline.prototype.getKeyFrameTime = function(name) {
        return this.getChild(name).getTime();
    };

    MOTION.Timeline.prototype.getKeyFrameChildren = function(name) {
        return this.getChild(name).getChildren();
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