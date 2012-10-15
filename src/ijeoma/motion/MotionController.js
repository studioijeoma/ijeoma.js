var MotionController = function MotionController(name, children) {
	Motion.call(this, name);

	this._children = [];
	this._tweens = [];
	this._parallels = [];
	this._sequences = [];

	this._childrenMap = [];
	this._tweenMap = [];
	this._parallelMap = [];
	this._sequenceMap = []; 
 
	if(children) this.addAll(children);

	// this.setup(name,children);
}

MotionController.prototype = new Motion();
MotionController.prototype.constructor=MotionController;  

MotionController.prototype.setup = function(name, children) {  
	this._children = [];
	this._tweens = [];
	this._parallels = [];
	this._sequences = [];

	this._childrenMap = [];
	this._tweenMap = [];
	this._parallelMap = [];
	this._sequenceMap = []; 
 
	if(children) this.addAll(children);
}

MotionController.prototype.stop = function() {
	Motion.prototype.stop.call(this);

	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i]
		c.stop();
	}

	return this;
}

MotionController.prototype.pause = function() {
	Motion.prototype.pause.call(this);

	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i]
		c.pause();
	}

	return this;
}

MotionController.prototype.resume = function() {
	Motion.prototype.resume.call(this);

	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i]
		c.resume();
	}

	return this;
}

MotionController.prototype.seek = function(value) {
	Motion.prototype.seek.call(this, value);

	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i];

		if(c.isInsidePlayingTime(this.getTime())) c.seek((this.getTime() - c.getDelay()) / c.getDuration());
		else if(c.isAbovePlayTime(this.getTime())) c.seek(1);
		else c.seek(0);
	}

	return this;
}

MotionController.prototype.update = function(time) {
	Motion.prototype.update.call(this, time); 

	if(this._isPlaying) this.updateChildren();
}

MotionController.prototype.updateChildren = function() {
	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i];

		if(c.isInsidePlayingTime(this.getTime())) if(c._isPlaying) c.update(this.getTime());
		else c.play();
	}
}

MotionController.prototype.updateDuration = function() {
	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i] 
		this._duration = Math.max(this._duration, c.getDelay() + c.getDuration());
	}

	// for (Callback c : calls)
	// 	duration = Math.max(duration, c.getTime() - getDelay());
}

MotionController.prototype.getTween = function(index) {
	if(index < this._tweens.length) return this._tweens[index];
	else return null;
}

MotionController.prototype.getTween = function(name) {
	return this._tweenMap[name];
}

MotionController.prototype.getParallel = function(index) {
	if(index < this._parallels.length) return this._parallels[index];
	else return null;
}

MotionController.prototype.getParallel = function(name) {
	return this._parallelMap[name];
}

MotionController.prototype.getSequence = function(index) {
	if(index < this._sequences.length) return this._sequences[index];
	else return null;
}

MotionController.prototype.getSequence = function(name) {
	return this._sequenceMap[name];
}

MotionController.prototype.getChildren = function() {
	return this._children;
}

MotionController.prototype.getChildrenList = function() {
	return this._children;
}

MotionController.prototype.getTweens = function() {
	return this._tweens;
}

MotionController.prototype.getTweenList = function() {
	return this._tweens;
}

MotionController.prototype.getParallels = function() {
	return this._parallels;
}

MotionController.prototype.getParallelList = function() {
	return this._parallels;
}

MotionController.prototype.getSequences = function() {
	return this._sequences;
}

MotionController.prototype.getSequenceList = function() {
	return this._sequences;
}

MotionController.prototype.get = function(index) {
	if(index < this._children.length) return this._children[index];
	else return null;
}

MotionController.prototype.getChild = function(name) {
	return this._childrenMap[name];
}

MotionController.prototype.getCount = function() {
	return this._children.length;
}

MotionController.prototype.getTweenCount = function() {
	return this._tweens.length;
}

MotionController.prototype.getParallelCount = function() {
	return this._parallels.length;
}

MotionController.prototype.getSequenceCount = function() {
	return this._sequences.length;
}

MotionController.prototype.setTimeScale = function(timeScale) {
	Motion.prototype.setTimeScale.call(this, timeScale);

	for(var i = 0; i < this._children.length; i++) {
		var child = this._children[i]
		child.setTimeScale(timeScale);
	}

	return this;
}

MotionController.prototype.setTimeMode = function(_durationMode) {
	Motion.prototype.setTimeMode.call(this, _durationMode);

	for(var i = 0; i < this._children.length; i++) {
		var child = this._children[i]
		child.setTimeMode(_durationMode);
	}

	return this;
}

MotionController.prototype.add = function(child) {
	this.insert(child, 0);
	return this;
}

MotionController.prototype.insert = function(child, time) { 
	child.delay(time);
	// child.seek(1);
	child.setTimeMode(this._timeMode);
	child.noAutoUpdate();
	// child.addEventListener(this);

	if(child.isTween()) {
		this._tweens.push(child);
		if(child.getName() != null) this._tweenMap[child.getName()] = child;
	} else if(child.isParallel()) {
		this._parallels.push(child);
		if(child.getName() != null) this._parallelMap[child.getName()] = child;
	} else if(child.isSequence()) {
		this._sequences.push(child);
		if(child.getName() != null) this._sequenceMap[child.getName()] = child;
	}

	this._children.push(child);
	if(child.getName() != null) this._childrenMap[child.getName()] = child;

	this.updateDuration();

	return this;
}

MotionController.prototype.removeChild = function(child) {
	if(child.isTween()) {
		this._tweens.remove(child);
		// this._tweenLUT.remove(child.name);
	} else if(child.isParallel()) {
		this._parallels.remove(child);
		// this._ParallelLUT.remove(child.name);
	} else if(child.isSequence()) {
		this._sequences.remove(child);
		// sequenceLUT.remove(child.name);
	}

	this._children.remove(child);
	// childrenLUT.remove(child.name);
	return this;
}

// addTween = function(_tweenObject, _tweenObjectProperty, _end, _duration, _delay, _easing) {
// 	return add(new Tween(_tweenObject, _tweenObjectProperty, _end,
// 			_duration, _delay, _easing));
// }
MotionController.prototype.addAll = function(children) { 
	for(var i = 0; i < children.length; i++)
		this.add(children[i]);

	return this;
}

// addCall = function(_call) {
// 	calls.add(_call);
// 	updateDuration();
// 	return this;
// }
MotionController.prototype.removeAll = function() {
	this._tweens = []
	this._tweenMap = []

	this._parallels = []
	this._parallelMap = []

	this._sequences = []
	this._sequenceMap = []

	this._calls = []
	this._callMap = []

	this._children = []
	this._childrenMap = []

	return this;
}

MotionController.prototype.printChildren = function() {
	childrenAs = "";

	var i = 0;

	for(var i = 0; i < this._children.length; i++) {
		var c = this._children[i];
		childrenAs += c.toString();
		childrenAs += ((i < this._children.length - 1) ? ", " : "");
		i++;
	}
}