MOTION.Parallel = function(name, children) {
    MOTION.MotionController.call(this, name, children);
};

MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
// MOTION.Parallel.prototype.constructor = MOTION.Parallel;