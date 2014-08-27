MOTION.KeyFrame = function(name, time, children) {
    MOTION.MotionController.call(this, name, children)
    this.delay(time);
};

MOTION.KeyFrame.prototype = {
    constructor: MOTION.KeyFrame,

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
    }
};
