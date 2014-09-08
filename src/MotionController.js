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

    MOTION.MotionController.prototype.play = function() {
        MOTION.prototype.play.call(this);
        return this;
    }

    MOTION.MotionController.prototype.seek = function(value) {
        MOTION.prototype.seek.call(this, value);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];

            if (c.isInsidePlayingTime(this.getTime()))
                c.seek(this.getTime() / (c.getDelay() + c.getDuration()));
        }

        return this;
    };

    MOTION.MotionController.prototype.updateChildren = function() {
        for (var i = 0; i < this._children.length; i++)
            this._children[i].update(this.getTime());
    };

    MOTION.MotionController.prototype.updateTweens = function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];
            var properties = t.getProperties();

            for (var j = 0; j < properties.length; j++) {
                var p = properties[j];

                var name = p.getId();

                if (name in orderMap) {
                    var pp = ppropertyMap[name];

                    var order = orderMap[name];
                    order++;

                    p.setBegin(pp.getEnd());
                    p.setOrder(order);

                    orderMap[name] = order;
                    ppropertyMap[name] = p;
                } else {
                    p.setBegin();
                    p.setOrder(0);

                    orderMap[name] = 0;
                    ppropertyMap[name] = p;
                }
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
            return this._children[arguments[0]]
        else
            return this._childrenMap[arguments[0]];
    };

    MOTION.MotionController.prototype.get = MOTION.MotionController.prototype.getChild;

    MOTION.MotionController.prototype.getChildren = function() {
        return this._children;
    };

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

    MOTION.MotionController.prototype.add = function(child) {
        this.insert(child, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(child, time) {
        child.delay(time);
        child.setTimeMode(this._timeMode);
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

    MOTION.MotionController.prototype.removeAll = function() {
        this._tweens = [];

        this._children = [];
        this._childrenMap = [];

        return this;
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this.updateChildren(); 

        if (this._onUpdate)
            this._onUpdate(window);
    }; 
})(MOTION)