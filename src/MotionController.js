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
        this._playTime = (this._delay + this._duration) * value;

        this.setTime(this._playTime);

        for (var i = 0; i < this._children.length; i++) {
            if (this._children[i].isInsidePlayingTime(this.getTime()))
                this._children[i].seek(this.getTime() / (this.getDelay() + this.getDuration()));
            else if (this._children[i].isAbovePlayingTime(this.getTime()))
                this._children[i].seek(1);
            else
                this._children[i].seek(0);
        }

        if (this.isInsidePlayingTime(this._time))
            this.dispatchChangedEvent();

        return this;
    };

    MOTION.MotionController.prototype.updateChildren = function() {
        for (var i = 0; i < this._children.length; i++) {
            this._children[i].update(this.getTime(), this._isSeeking);
        }
    };

    MOTION.MotionController.prototype.updateTweens = function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];
            var properties = t.get();

            for (var j = 0; j < properties.length; j++) {
                var p = properties[j];

                var name = (t.isRelative()) ? p.getName() : t._id + '.' + p.getName();
                // var name =  t._id + '.' + p.getName(); 
                var order = 0;

                // console.log(t.isRelative())
                // console.log(orderMap)

                if (name in orderMap) {
                    order = orderMap[name]
                    order++;

                    var pp = ppropertyMap[name];
                    p.setBegin(pp.getEnd());
                    // if(p.getName() == 'rotation') 
                    // console.log(pp.getEnd())
                } else
                    p.setBegin();

                p.setOrder(order);

                orderMap[name] = order;
                ppropertyMap[name] = p;
            }
        }
    };

    MOTION.MotionController.prototype.updateDuration = function() {
        for (var i = 0; i < this._children.length; i++)
            this._duration = Math.max(this._duration, this._children[i].getDelay() + this._children[i].getDuration());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.getChild = function(name) {
        if (typeof arguments[0] == 'number')
            return this._children[arguments[0]];
        else if (typeof arguments[0] == 'string')
            return this._childrenMap[arguments[0]];
        return this._children;
    };

    MOTION.MotionController.prototype.get = MOTION.MotionController.prototype.getChild;

    MOTION.MotionController.prototype.getCount = function() {
        return this._children.length;
    };

    MOTION.MotionController.prototype.setTimeScale = function(timeScale) {
        MOTION.prototype.setTimeScale.call(this, timeScale);

        for (var i = 0; i < this._children.length; i++)
            this._children[i].setTimeScale(timeScale);

        return this;
    };

    MOTION.MotionController.prototype.setTimeMode = function(_durationMode) {
        MOTION.prototype.setTimeMode.call(this, _durationMode);

        for (var i = 0; i < this._children.length; i++)
            this._children[i].setTimeMode(_durationMode);

        return this;
    };

    MOTION.MotionController.prototype.setValueMode = function(_valueMode) {
        MOTION.prototype.setValueMode.call(this, _valueMode);

        for (var i = 0; i < this._children.length; i++)
            this._children[i].setValueMode(_valueMode);

        return this;
    };

    MOTION.MotionController.prototype.add = function(child) {
        this.insert(child, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(child, time) {
        child.delay(time);
        child.setTimeMode(this._timeMode);
        // child.setValueMode(this._valueMode);
        child.noAutoUpdate();

        if (child.isTween()) {
            this._tweens.push(child);
            this.updateTweens();
        }

        this._children.push(child);

        if (child.getName() != null)
            this._childrenMap[child.getName()] = child;

        this.updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(child) {
        var child, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0]
            child = this._children[i] 
        } else if (typeof arguments[0] == 'name') {
            child = this._childrenMap[arguments[0]]
            i = this._children.indexOf(child); 
        } else if (typeof arguments[0] == 'object') {
            child = arguments[0]
            i = this._children.indexOf(child);  
        }

        if (i && i != -1)
            this._children.splice(i, 1);

        if (child && child.getName() in this._childrenMap)
            delete this._childrenMap[c.getName()];

        return this;
    };

    MOTION.MotionController.prototype.addAll = function(children) {
        for (var i = 0; i < children.length; i++)
            this.add(children[i]);

        return this;
    };

    MOTION.MotionController.prototype.removeAll = function() {
        this._tweens = [];

        this._children = [];
        this._childrenMap = [];

        return this;
    };

    MOTION.MotionController.prototype.dispatchStartedEvent = function() {
        this.updateChildren();
        // for (var i = 0; i < this._children.length; i++) {   
        //     this._children[i].update(this.getTime()); 
        MOTION.prototype.dispatchStartedEvent.call(this)
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this.updateChildren();
        MOTION.prototype.dispatchChangedEvent.call(this)
    };
})(MOTION)