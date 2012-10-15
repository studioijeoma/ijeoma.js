var Motion = function Motion(name, duration, delay, easing) {
	for(var p in MotionConstant)
	this.constructor[p] = MotionConstant[p];

	this._name = (name) ? name : "";

	this._calls = [];
	this._callMap = [];

	this._beginTime = 0;
	this._time = 0;
	this._timeScale = 1;

	this._duration = (duration) ? duration : 0;

	this._delay = (delay) ? delay : 0;

	this._easing = (easing) ? this.setEasing(easing) : Linear.easeIn;

	this._repeatTime = 0;
	this._repeatDuration = 0;

	this._isPlaying = false;
	this._isRepeating = false;
	this._isRepeatingDelay = false;
	this._isReversing = false;

	this._isAutoUpdating = true;

	this._isRegistered = false;

	this._timeMode = MotionConstant.FRAMES;

	this._reverseTime = 0; 

	// this.setup(name, duration, delay, easing);
	// this.setupEvents();
}

Motion.prototype.setup = function(name, duration, delay, easing) {
	if(name) this._name = name;

	if(duration) this._duration = duration;

	if(delay) this._delay = delay;

	this._beginTime = 0;

	if(easing) this.setEasing(easing);
}

Motion.prototype.setupEvents = function() {}

Motion.prototype.play = function() {
	this.seek(0);
	this.resume();

	this._repeatTime = 0;

	this._isPlaying = true;

	if(!this._isRegistered) {
		// getParent().registerPre(this);
		this._isRegistered = true;
	}

	this.dispatchMotionStartedEvent();

	return this;
}

Motion.prototype.stop = function() {
	if(this._isReversing) this._reverseTime = (this._reverseTime == 0) ? duration : 0;

	if(this._isRepeating && (this._repeatDuration == 0 || this._repeatTime < this._repeatDuration)) {
		this.seek(0);
		this.resume();

		if(!this._isRepeatingDelay) this._delay = 0;

		this._repeatTime++;

		this.dispatchMotionRepeatedEvent();
	} else {
		this.seek(1);
		this.pause();

		this._repeatTime = 0;

		this.dispatchMotionEndedEvent();
	}

	return this;
}

Motion.prototype.pause = function() {
	this._isPlaying = false;

	this._beginTime = this._time;

	if(this._isRegistered) {
		// getParent().unregisterPre(this);
		this._isRegistered = false;
	}

	return this;
}

Motion.prototype.resume = function() {
	this._isPlaying = true;

	// this._beginTime = (this._timeMode == SECONDS) ? (getParent().millis() - this._beginTime * 1000)
	// 		 = (getParent().frameCount - this._beginTime);
	this._beginTime = (new Date().getTime() - this._beginTime);

	if(!this._isRegistered) {
		// getParent().registerPre(this);
		this._isRegistered = true;
	}

	return this;
}

Motion.prototype.seek = function(value) {
	this._beginTime = value * (this._duration + this._delay);

	this.setTime(this._beginTime);
	this.updateCalls();

	return this;
}

Motion.prototype.repeat = function(repeat) {
	this._isRepeating = true;

	if(repeat) this._repeatDuration = repeat;

	return this;
}

Motion.prototype.oRepeat = function() {
	this._isRepeating = false;
	this._repeatDuration = 0;

	return this;
}

Motion.prototype.reverse = function() {
	this._isReversing = true;
	return this;
}

Motion.prototype.noReverse = function() {
	this._isReversing = false;
	return this;
}

Motion.prototype.update = function(time) {
	if(this._isPlaying) {
		if(time) this.setTime(time);
		else this.updateTime();

		this.updateCalls();

		if(this.isOutsidePlayingTime(this._time)) {
			this.stop();
			return;
		}
	} 
	//  // 	return;
}

Motion.prototype.updateTime = function() {
	// this._time = ((this._timeMode == SECONDS) ? ((getParent().millis() - this._beginTime) / 1000)
	// 		 = (getParent().frameCount - this._beginTime))
	// 		* this._timeScale;
	this._time = ((new Date().getTime()) - this._beginTime) / 1000 * this._timeScale;

	if(this._isReversing && this._reverseTime != 0) this._time = this._reverseTime - this._time;
}


Motion.prototype.updateCalls = function() {
	// for (Callback c  = this._calls)
	// 	if (this.getTime() > c.getTime()) {
	// 		if (!c.hasInvoked())
	// 			c.invoke();
	// 	} else
	// 		c.noInvoke();
}

// Motion call(Object _object, _name) {
// 	return addCall(new Callback(_object, _name, duration));
// }
// Motion call(Object _object, _name,  _time) {
// 	return addCall(new Callback(_object, _name, _time));
// }
Motion.prototype.addCall = function(_call) {
	calls.push(_call);
	return this;
}

Motion.prototype.getCallback = function(_index) {
	if(_index < calls.size()) return calls[_index];
	else return null;
}

Motion.prototype.getCallback = function(name) {
	return callMap[name];
}

Motion.prototype.getCallbacks = function() {
	return calls;
}

Motion.prototype.getCallbackList = function() {
	return calls;
}

Motion.prototype.getCallbackCount = function() {
	return calls.length;
}

Motion.prototype.setName = function(name) {
	this._name = name;
}

Motion.prototype.getName = function() {
	return this._name;
}

Motion.prototype.setTime = function(time) {
	this._time = time;

	if(this._isReversing && this._reverseTime != 0) this._time = this._reverseTime - this._time;
}

Motion.prototype.getTime = function() {
	return(this._time < this._delay) ? 0 : (this._time - this._delay);
}

Motion.prototype.setTimeScale = function(_timeScale) {
	this._timeScale = _timeScale;
	return this;
}

Motion.prototype.getTimeScale = function() {
	return this._timeScale;
}

Motion.prototype.getPosition = function() {
	return this.getTime() / this._duration;
}

Motion.prototype.setDuration = function(_duration) {
	this._duration = _duration;
	return this;
}

Motion.prototype.getDuration = function() {
	return this._duration;
}

Motion.prototype.delay = function(delay) {
	this._delay = delay;
	return this;
}

Motion.prototype.noDelay = function() {
	this._delay = 0;
	return this;
}

Motion.prototype.getDelay = function() {
	return this._delay;
}

Motion.prototype.repeatDelay = function() {
	this._isRepeatingDelay = true;
	return this;
}

Motion.prototype.noRepeatDelay = function() {
	this._isRepeatingDelay = false;
	return this;
}

Motion.prototype.setEasing = function(easing) {
	if(easing == MotionConstant.LINEAR_IN) this._easing = Linear.easeIn;
	else if(easing == MotionConstant.LINEAR_OUT) this._easing = Linear.easeOut;
	else if(easing == MotionConstant.LINEAR_BOTH) this._easing = Linear.easeBoth;
	else if(easing == MotionConstant.QUAD_IN) this._easing = Quad.easeIn;
	else if(easing == MotionConstant.QUAD_OUT) this._easing = Quad.easeOut;
	else if(easing == MotionConstant.QUAD_BOTH) this._easing = Quad.easeBoth;
	else if(easing == MotionConstant.CUBIC_IN) this._easing = Cubic.easeIn;
	else if(easing == MotionConstant.CUBIC_BOTH) this._easing = Cubic.easeBoth;
	else if(easing == MotionConstant.CUBIC_OUT) this._easing = Cubic.easeOut;
	else if(easing == MotionConstant.QUART_IN) this._easing = Quart.easeIn;
	else if(easing == MotionConstant.QUART_OUT) this._easing = Quart.easeOut;
	else if(easing == MotionConstant.QUART_BOTH) this._easing = Quart.easeBoth;
	else if(easing == MotionConstant.QUINT_IN) this._easing = Quint.easeIn;
	else if(easing == MotionConstant.QUINT_OUT) this._easing = Quint.easeOut;
	else if(easing == MotionConstant.QUINT_BOTH) this._easing = Quint.easeBoth;
	else if(easing == MotionConstant.SINE_IN) this._easing = Sine.easeIn;
	else if(easing == MotionConstant.SINE_OUT) this._easing = Sine.easeOut;
	else if(easing == MotionConstant.SINE_BOTH) this._easing = Sine.easeBoth;
	else if(easing == MotionConstant.CIRC_IN) this._easing = Circ.easeIn;
	else if(easing == MotionConstant.CIRC_OUT) this._easing = Circ.easeOut;
	else if(easing == MotionConstant.CIRC_BOTH) this._easing = Circ.easeBoth;
	else if(easing == MotionConstant.EXPO_IN) this._easing = Expo.easeIn;
	else if(easing == MotionConstant.EXPO_OUT) this._easing = Expo.easeOut;
	else if(easing == MotionConstant.EXPO_BOTH) this._easing = Expo.easeBoth;
	else if(easing == MotionConstant.BACK_IN) this._easing = Back.easeIn;
	else if(easing == MotionConstant.BACK_OUT) this._easing = Back.easeOut;
	else if(easing == MotionConstant.BACK_BOTH) this._easing = Back.easeBoth;
	else if(easing == MotionConstant.BOUNCE_IN) this._easing = Bounce.easeIn;
	else if(easing == MotionConstant.BOUNCE_OUT) this._easing = Bounce.easeOut;
	else if(easing == MotionConstant.BOUNCE_BOTH) this._easing = Bounce.easeBoth;
	else if(easing == MotionConstant.ELASTIC_IN) this._easing = Elastic.easeIn;
	else if(easing == MotionConstant.ELASTIC_OUT) this._easing = Elastic.easeOut;
	else if(easing == MotionConstant.ELASTIC_BOTH) this._easing = Elastic.easeBoth;
	else if(easing == MotionConstant.CUBIC_BEZIER_IN) this._easing = Cubic_bezier.easeIn;
	else if(easing == MotionConstant.CUBIC_BEZIER_OUT) this._easing = Cubic_bezier.easeOut;
	else if(easing == MotionConstant.CUBIC_BEZIER_BOTH) this._easing = Cubic_bezier.easeBoth;

	// this._easing = easing;
	return this;
}

Motion.prototype.getEasing = function() {
	return this._easing;
}

Motion.prototype.noEasing = function() {
	this.setEasing(Linear.easeIn);

	return this;
}

Motion.prototype.setTimeMode = function(_timeMode) {
	this._timeMode = _timeMode;

	return this;
}

Motion.prototype.getTimeMode = function() {
	return this._timeMode;
}

Motion.prototype.getRepeat = function() {
	return this._repeatTime;
}

Motion.prototype.autoUpdate = function() {
	this._isAutoUpdating = true;
	return this;
}

Motion.prototype.noAutoUpdate = function() {
	this._isAutoUpdating = false;
	return this;
}

Motion.prototype.isAutoUpdating = function() {
	return this._isAutoUpdating;
}

Motion.prototype.isDelaying = function() {
	return(this._time <= this._delay);
}

Motion.prototype.isPlaying = function() {
	return this._isPlaying;
}

Motion.prototype.isReversing = function() {
	return this._isReversing;
}

Motion.prototype.isAbovePlayTime = function(value) {
	return(value > this._delay) ? true : false;
}

Motion.prototype.isInsidePlayingTime = function(value) {
	return(value >= this._delay && value <= this._delay + this._duration) ? true : false;
}

Motion.prototype.isOutsidePlayingTime = function(value) {
	return(value < 0 || value > this._delay + this._duration);
}

Motion.prototype.dispatchMotionStartedEvent = function() {
	console.log('dispatchMotionStartedEvent');
}

Motion.prototype.dispatchMotionEndedEvent = function() {
	console.log('dispatchMotionEndedEvent');
}

Motion.prototype.dispatchMotionChangedEvent = function() {
	console.log('dispatchMotionChangedEvent');
}

Motion.prototype.dispatchMotionRepeatedEvent = function() {
	console.log('dispatchMotionRepeatedEvent');
}

Motion.prototype.isTween = function() {
	return this instanceof Tween;
}

Motion.prototype.isParallel = function() {
	return this instanceof Parallel;
}

Motion.prototype.isSequence = function() {
	return this instanceof Sequence;
}

Motion.prototype.isTimeline = function() {
	return this instanceof Timeline;
}

Motion.prototype.isKeyFrame = function() {
	return this instanceof KeyFrame;
}

Motion.prototype.usingSeconds = function() {
	return this._timeMode == MotionConstant.SECONDS;
}

Motion.prototype.usingFrames = function() {
	return this._timeMode == MotionConstant.FRAMES;
}