(function(MOTION, undefined) {
	MOTION.Parallel = function(motions) {
		MOTION.MotionController.call(this, name, motions);
	};

	MOTION.Parallel.prototype = Object.create(MOTION.MotionController.prototype);
	MOTION.Parallel.prototype.constructor = MOTION.Parallel; 
})(MOTION)