Timeline = function Timeline(name) {  
	MotionController.call(this, name)

	this._keyFrames = [];
	this._keyFrameMap = [];
}

Timeline.prototype = new MotionController();
Timeline.prototype.constructor = Timeline;  

Timeline.prototype.setup = function() {}

Timeline.prototype.setupEvents = function() {}

Timeline.prototype.insert = function(child, time) {
	MotionController.prototype.insert.call(this, child, time);

	if (child.isKeyFrame()) {
		this._keyFrames.push(child);

		if (child.getName() != null)
			this._keyFrameMap[child.getName()] = child;
	}

	return this;
}

Timeline.prototype.add = function(child) {
	var c = this._childrenMap[child.getName()];
	c.push(child);

	this._children[this._children.indexOf(c)] = c;

	return this;
}

Timeline.prototype.add = function(child, time) {
	var keyFrame = this.getKeyFrame(time+"");

	if (keyFrame == null) {
		keyFrame = new KeyFrame(time+"", time);
		keyFrame.add(child);

		this.insert(keyFrame, time);
	} else
		keyFrame.add(child);

	// console.log(keyFrame.getDuration());

	return this;
}

Timeline.prototype.addAll = function(children, time) {
	var keyFrame = getKeyFrame(time);

	if (keyFrame == null) {
		keyFrame = new KeyFrame(time+"", time);

		for (var j = 0; j < children.length; j++)
			keyFrame.add(children[j]);

		this.insert(keyFrame, time);
	} else
		for (var j = 0; j < children.length; j++)
			keyFrame.add(children[j]);

	return this;
}

Timeline.prototype.addAll = function(children, name) {
	// PApplet.println("insertChildren(" + children + ", " + name + ")");
	var c = childrenMap.get(name);
	c.addAll(children);

	children.set(children.indexOf(c), c);

	return this;
}

Timeline.prototype.removeKeyFrame = function(time) { 
	// for(var i = 0; i < this._children.length; i++) {
	// 	var c = this._children[i]
	// 	if (c.getPlayTime() == time) {
	// 		children.remove(children.indexOf(c));
	// 		childrenMap.remove(c);
	// 	}
	// }
}

Timeline.prototype.removeKeyFrame = function(name) {
	// var c = childrenMap.get(name);

	// children.remove(children.indexOf(c));
	// childrenMap.remove(c);
}

Timeline.prototype.getKeyFrameCount = function() {
	return this._keyFrames.length;
}

Timeline.prototype.getCurrentKeyFrames = function() {
	var currentKeyFrames = [];

	for (var i = 0; i < this._children.length; i++)
		if (this._children[i].isInsidePlayingTime(this.getTime()))
			currentKeyFrames.push(children[i]);

	return currentKeyFrames;
}

Timeline.prototype.getCurrentKeyFrameIndices = function() {
	var indices = []; 

	for (var i = 0; i < this._children.length; i++)
		if (this._children[i].isInsidePlayingTime(getTime()))
			indices.push(i); 

	return indices;
}

Timeline.prototype.getKeyFrame = function(index) {
	return this._children[index];
}

Timeline.prototype.getKeyFrame = function(time) {
	var keyFrame = null;

	for (var i = 0; i < children.length; i++) {
		var c = this.chilren[i];

		if (c.getTime() == time)
			keyFrame = c;
	}

	return keyFrame;
}

Timeline.prototype.getKeyFrame = function(name) {
	return this._childrenMap[name];
}

Timeline.prototype.getKeyFrames = function() {
	return this._children;
}

Timeline.prototype.getKeyFrameTime = function(name) {
	return this.getKeyFrame(name).getTime();
}

Timeline.prototype.getKeyFrameChildren = function(name) {
	return this.getKeyFrame(name).getChildren();
}

Timeline.prototype.gotoAndPlay = function(time) {
	this.seek(time / this._duration);
	this.resume();
}

Timeline.prototype.gotoAndPlay = function(name) {
	var keyFrame = this.getKeyFrame(name);

	this.seek(keyFrame.getPlayTime() / this._duration);
	this.resume();
}

Timeline.prototype.gotoAndPlay = function() {
	this.seek(keyFrame.getPlayTime() / this._duration);
	this.resume();
}

Timeline.prototype.gotoAndStop = function(time) {
	this.seek(time / this._duration);
	this.pause();
}

Timeline.prototype.gotoAndStop = function(name) {
	var keyFrame = getKeyFrame(name);

	this.seek(keyFrame.getPlayTime() / this._duration);
	this.pause();
}

Timeline.prototype.gotoAndStop = function() {
	this.seek(keyFrame.getPlayTime() / this._duration);
	this.pause();
}

Timeline.prototype.toString = function() {
	// String keyFrameNames = "";

	// Iterator i = childrenMap.entrySet().iterator();

	// while (i.hasNext()) {
	// 	Map.Entry me = (Map.Entry) i.next();
	// 	keyFrameNames += "{" + me.getKey() + "," + me.getValue() + "},";
	// }

	// return ("Timeline[children: [" + keyFrameNames + "] duration: "
	// 		+ duration + "]");
}

Timeline.prototype.printKeyFrames = function() {
	var childrenAsString = "";

	for (var i = 0; i < this._children.length; i++)
		childrenAsString += this._children[i].toString() + ((i < this._children.length - 1) ? ", " : "");

	// console.log(childrenAsString);
}