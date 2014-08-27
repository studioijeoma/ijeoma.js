MOTION.Sequence = function(name, children) {
    MOTION.MotionController.call(this, name, children)

    this._currentChild = null;
    this._currentChildIndex = 0;
};

MOTION.Sequence.prototype = {
    constructor: MOTION.Sequence,

    setup: function() {},

    setupEvents: function() {},

    update: function(time) {
        MOTION.MotionController.prototype.update.call(this, time);

        // console.log(this._time)

        if (this._isPlaying) {
            for (var i = 0; i < this._children.length; i++) {
                var c = this._children[i]

                if (c.isInsidePlayingTime(time)) {
                    this._currentChildIndex = i;
                    this._currentChild = c;

                    break;
                }
            }
        }
    },

    add: function(child) {
        MOTION.MotionController.prototype.insert.call(this, child, this._duration);
        return this;
    },

    getCurrentChild: function() {
        return this._currentChild;
    },

    getCurrentChildIndex: function() {
        return this._currentChildIndex;
    },

    getCurrentChildType: function() {
        return (this._currentChild.getClass().getSimpleName());
    },

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
    },

    dispatchEndedEvent: function() {
        // console.log('dispatchEndedEvent');
    },

    dispatchChangedEvent: function() {
        // console.log('dispatchChangedEvent');
    },

    dispatchRepeatedEvent: function() {
        // console.log('dispatchRepeatedEvent');
    },

    toString: function() {
        return ("TweenSequence[tweens: {" + tweens + "}]");
    }
};
