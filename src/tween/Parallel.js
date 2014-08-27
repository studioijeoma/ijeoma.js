MOTION.Parallel = function(name, children) {
    MOTION.MotionController.call(this, name, children);
};

MOTION.Parallel.prototype = {
    constructor: MOTION.Parallel,

    setup: function() {},

    setupEvents: function() {},

    dispatchMotionStartedEvent: function() {
        // console.log('dispatchMotionStartedEvent');
    },

    dispatchMotionEndedEvent: function() {
        // console.log('dispatchMotionEndedEvent');
    },

    dispatchMotionChangedEvent: function() {
        // console.log('dispatchMotionChangedEvent');
    },

    dispatchMotionRepeatedEvent: function() {
        // console.log('dispatchMotionRepeatedEvent');
    },

    toString: function() {
        return ("TweenParallel[tweens: {" + tweens + "}]");
    }
};
