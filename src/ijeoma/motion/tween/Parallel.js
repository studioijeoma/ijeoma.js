Parallel = function Parallel(name, children) {
	MotionController.call(this, name, children) 
}

Parallel.prototype = new MotionController();
Parallel.prototype.constructor = Parallel;

Parallel.prototype.setup = function() {}

Parallel.prototype.setupEvents = function() {}

Parallel.prototype.dispatchMotionStartedEvent = function() {
	console.log('dispatchMotionStartedEvent');
}

Parallel.prototype.dispatchMotionEndedEvent = function() {
	console.log('dispatchMotionEndedEvent');
}

Parallel.prototype.dispatchMotionChangedEvent = function() {
	console.log('dispatchMotionChangedEvent');
}

Parallel.prototype.dispatchMotionRepeatedEvent = function() {
	console.log('dispatchMotionRepeatedEvent');
}

Parallel.prototype.toString = function() {
	return("TweenParallel[tweens: {" + tweens + "}]");
}