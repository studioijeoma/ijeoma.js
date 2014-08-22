var Sequence = function Sequence(name, children) {
    MotionController.call(this, name, children)

    this._currentChild = null;
    this._currentChildIndex = 0;
}

Sequence.prototype = new MotionController();
Sequence.prototype.constructor = Sequence;

Sequence.prototype.setup = function() {}

Sequence.prototype.setupEvents = function() {}

Sequence.prototype.update = function(time) {
    MotionController.prototype.update.call(this, time);

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
}

Sequence.prototype.add = function(child) {
    MotionController.prototype.insert.call(this, child, this._duration);
    return this;
}

Sequence.prototype.getCurrentChild = function() {
    return this._currentChild;
}

Sequence.prototype.getCurrentChildIndex = function() {
    return this._currentChildIndex;
}

// Sequence.prototype.getCurrentChildType = function() {
// 	return(this._currentChild.getClass().getSimpleName());
// }
Sequence.prototype.dispatchMotionStartedEvent = function() {
    // console.log('dispatchMotionStartedEvent');
}

Sequence.prototype.dispatchMotionEndedEvent = function() {
    // console.log('dispatchMotionEndedEvent');
}

Sequence.prototype.dispatchMotionChangedEvent = function() {
    // console.log('dispatchMotionChangedEvent');
}

Sequence.prototype.dispatchMotionRepeatedEvent = function() {
    // console.log('dispatchMotionRepeatedEvent');
}

Sequence.prototype.toString = function() {
    return ("TweenSequence[tweens: {" + tweens + "}]");
}