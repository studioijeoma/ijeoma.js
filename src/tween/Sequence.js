(function(MOTION, undefined) {
    MOTION.Sequence = function(children) {
        MOTION.MotionController.call(this, children)

        this._currentChild = null;
        this._currentChildIndex = 0;
    };

    MOTION.Sequence.prototype = Object.create(MOTION.MotionController.prototype);
    MOTION.Sequence.prototype.constructor = MOTION.Sequence;

    MOTION.Sequence.prototype.update = function(time) {
        MOTION.MotionController.prototype.update.call(this, time);

        // console.log(this._time)

        if (this._isPlaying) {
            for (var i = 0; i < this._children.length; i++) {
                var c = this._children[i]

                if (c.isInsidePlayingTime(this._time)) {
                    this._currentChildIndex = i;
                    this._currentChild = c;

                    break;
                }
            }
        }
    };

    MOTION.Sequence.prototype.add = function(child) {
        MOTION.MotionController.prototype.insert.call(this, child, this._duration);
        return this;
    };

    MOTION.Sequence.prototype.getChild = function(name) {
        if (typeof arguments[0] == 'number')
            return this._children[arguments[0]]
        else if (typeof arguments[0] == 'string')
            return this._childrenMap[arguments[0]];
        else
            return this._currentChild;
    };

    MOTION.Sequence.prototype.getIndex = function() {
        return this._currentChildIndex;
    };

    if (usingP5) {
        p5.prototype.createSequence = function(children) {
            return new MOTION.Sequence(children);
        }
    }
})(MOTION)