(function(MOTION, undefined) {
	MOTION.Parallel = function(children) {
		MOTION.MotionController.call(this, name, children);
	};

	MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
	MOTION.Parallel.prototype.constructor = MOTION.Parallel;

	if (usingP5) {
		p5.prototype.createMotion = function(children) {
			return new MOTION.Parallel(children);
		}
	}
})(MOTION)