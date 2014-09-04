
(function(MOTION, undefined) { 
    MOTION.MotionController = function(children) {
        MOTION.call(this);

        this._children = [];
        this._childrenMap = [];

        this._tweens = [];

        if (children) this.addAll(children);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController

    MOTION.MotionController.prototype.seek = function(value) {
        MOTION.prototype.seek.call(this, value);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];

            if (c.isInsidePlayingTime(this.getTime())) {
                c._isUpdatingProperties = true;
                c.seek(this.getTime() / (c.getDelay() + c.getDuration()));
            } else
                c._isUpdatingProperties = false;
        }

        return this;
    };

    MOTION.MotionController.prototype.update = function(time) {
        if (time) {
            if (this.isInsidePlayingTime(time)) {
                if (!this._isPlaying)
                    this.play();

                this.setTime(time);
                this.updateCalls();
                this.updateChildren();

                this.dispatchChangedEvent();
            } else if (this._isPlaying) {
                this.stop();
            }
        } else { 
            if (this._isPlaying) {
                this.updateTime();
                this.updateCalls();
                this.updateChildren()

                if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                    this.stop();
                else
                    this.dispatchChangedEvent();
            }
        }
    };

    MOTION.MotionController.prototype.updateChildren = function() {
        for (var i = 0; i < this._children.length; i++) {
            this._children[i]._isUpdatingProperties = (i == 0);
            this._children[i].update(this.getTime());
        }
    };

    MOTION.MotionController.prototype.updateTweens = function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];
            var properties = t.getProperties();

            for (var j = 0; j < properties.length; j++) {
                var p = properties[j];

                var name = p.getObject().constructor.name + "." + p.getName();
                // console.log(name)

                if (orderMap[name]) {
                    var pp = ppropertyMap.get(name);

                    var order = orderMap.get(name);
                    order++;

                    p.setBegin(pp.getEnd());
                    p.setOrder(order);

                    orderMap[name] = order;
                    ppropertyMap[name] = p;
                } else {
                    var tweens = [];
                    tweens.push(t);

                    p.setBegin();
                    p.setOrder(0);

                    orderMap[name] = 0;
                    ppropertyMap[name] = p;
                }
            }
        }
    };

    MOTION.MotionController.prototype.updateDuration = function() {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i]
            this._duration = Math.max(this._duration, c.getDelay() + c.getDuration());
        }

        // for (Callback c : calls)
        //     duration = PApplet.max(duration, c.getTime() - getDelay());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.get = MOTION.MotionController.prototype.getChild;

    MOTION.MotionController.prototype.getChild = function(name) {
        if (typeof arguments[0] == 'number')
            return this._children[arguments[0]]
        else
            return this._childrenMap[arguments[0]];
    };

    MOTION.MotionController.prototype.getChildren = function() {
        return this._children;
    };

    MOTION.MotionController.prototype.getCount = function() {
        return this._children.length;
    };

    MOTION.MotionController.prototype.setTimeScale = function(timeScale) {
        MOTION.prototype.setTimeScale.call(this, timeScale);

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i]
            child.setTimeScale(timeScale);
        }

        return this;
    };

    MOTION.MotionController.prototype.setTimeMode = function(_durationMode) {
        MOTION.prototype.setTimeMode.call(this, _durationMode);

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child.setTimeMode(_durationMode);
        }

        return this;
    };

    MOTION.MotionController.prototype.add = function(child) {
        this.insert(child, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(child, time) {
        child.delay(time);
        // _child.seek(1);
        child.setTimeMode(this._timeMode);
        child.noAutoUpdate();
        // child.addEventListener(this);

        if (child.isTween()) {
            this._tweens.push(child);
            // this.updateTweens();
        }

        this._children.push(child);

        if (child.getName() != null)
            this._childrenMap[child.getName()] = child;

        this.updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(child) {
        if (typeof arguments[0] == 'number') {
            // var c = this.children
            // this._children.splice()
            // this._children.splice(arguments[0])
        } else if (typeof arguments[0] == 'name') {

        } else if (typeof arguments[0] == 'object') {

        }

        // this._children.remove(child);
        // childrenLUT.remove(child.name);
        return this;
    };

    MOTION.MotionController.prototype.addAll = function(children) {
        for (var i = 0; i < children.length; i++)
            this.add(children[i]);

        return this;
    };

    // addCall = function(_call) {
    //  calls.add(_call);
    //  updateDuration();
    //  return this;
    // ,

    MOTION.MotionController.prototype.removeAll = function() {
        this._tweens = [];

        this._children = [];
        this._childrenMap = [];

        return this;
    };
})(MOTION)