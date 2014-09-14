(function(MOTION, undefined) {
    MOTION.MotionController = function(motions) {
        MOTION.call(this);

        this._motions = [];
        this._motionMap = [];

        this._tweens = [];

        if (motions) this.addAll(motions);
    };

    MOTION.MotionController.prototype = Object.create(MOTION.prototype);
    MOTION.MotionController.prototype.constructor = MOTION.MotionController

    MOTION.MotionController.prototype.updateMotions = function() {
        for (var i = 0; i < this._motions.length; i++){
            var m = this._motions[i];

            if(this._isSeeking) {
                // m.seek(this.getTime())
                m._isSeeking = true;

                m.update(this.getTime());

                m._isSeeking = false;
            } else {
                if(m.isInsidePlayingTime(this.getTime())){
                    if(m.isPlaying())
                        m.update(this.getTime());
                    else
                        m.play(); 
                } else if(m.isPlaying())
                    m.stop();  
            }       
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

                var name = (t.isRelative()) ? p.getField() : t._id + '.' + p.getField();
                var order = 0;

                if (name in orderMap) {
                    order = orderMap[name]
                    order++;

                    var pp = ppropertyMap[name];
                    p.setBegin(pp.getEnd());
                } else
                    p.setBegin();

                p.setOrder(order);

                orderMap[name] = order;
                ppropertyMap[name] = p;
            }
        }
    };

    MOTION.MotionController.prototype.updateDuration = function() {
        for (var i = 0; i < this._motions.length; i++)
            this._duration = Math.max(this._duration, this._motions[i].getDelay() + this._motions[i].getDuration());
    };

    MOTION.MotionController.prototype.getPosition = function() {
        return this.getTime() / this._duration;
    };

    MOTION.MotionController.prototype.getmotion = function(name) {
        if (typeof arguments[0] == 'number')
            return this._motions[arguments[0]];
        else if (typeof arguments[0] == 'string')
            return this._motionMap[arguments[0]];
        return this._motions;
    };

    MOTION.MotionController.prototype.get = MOTION.MotionController.prototype.getmotion;

    MOTION.MotionController.prototype.getCount = function() {
        return this._motions.length;
    };

    MOTION.MotionController.prototype.setTimeScale = function(timeScale) {
        MOTION.prototype.setTimeScale.call(this, timeScale);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].setTimeScale(timeScale);

        return this;
    };

    MOTION.MotionController.prototype.setTimeMode = function(_durationMode) {
        MOTION.prototype.setTimeMode.call(this, _durationMode);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].setTimeMode(_durationMode);

        return this;
    };

    MOTION.MotionController.prototype.setValueMode = function(_valueMode) {
        MOTION.prototype.setValueMode.call(this, _valueMode);

        for (var i = 0; i < this._motions.length; i++)
            this._motions[i].setValueMode(_valueMode);

        return this;
    };

    MOTION.MotionController.prototype.add = function(motion) {
        this.insert(motion, 0);
        return this;
    };

    MOTION.MotionController.prototype.insert = function(motion, time) {
        motion.delay(time);
        motion.setTimeMode(_timeMode); 
        motion.noAutoUpdate();

        this._motions.push(motion);

        if (motion.getName() != null)
            this._motionMap[motion.getName()] = motion;

        if (motion.isTween()) {
            this._tweens.push(motion);
            this.updateTweens();
        }

        this.updateDuration();

        return this;
    };

    MOTION.MotionController.prototype.remove = function(motion) {
        var motion, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0]
            motion = this._motions[i]
        } else if (typeof arguments[0] == 'name') {
            motion = this._motionMap[arguments[0]]
            i = this._motions.indexOf(motion);
        } else if (typeof arguments[0] == 'object') {
            motion = arguments[0]
            i = this._motions.indexOf(motion);
        }

        if (i != -1)
            this._motions.splice(i, 1);

        if (motion.getName() in this._motionMap)
            delete this._motionMap[motion.getName()];

        if (motion.isTween()) {
            i = this._tweens.indexOf(motion);
            this._tweens.splice(i, 1);

            this.updateTweens();
        }

        this.updateDuration();

        motion.kill();

        return this;
    };

    MOTION.MotionController.prototype.addAll = function(motions) {
        for (var i = 0; i < motions.length; i++)
            this.add(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.removeAll = function() {
        for (var i = 0; i < motions.length; i++)
            this.remove(motions[i]);

        return this;
    };

    MOTION.MotionController.prototype.dispatchStartedEvent = function() {
        // this.updateMotions(); 
        MOTION.prototype.dispatchStartedEvent.call(this)
    };

    MOTION.MotionController.prototype.dispatchChangedEvent = function() {
        this.updateMotions();
        MOTION.prototype.dispatchChangedEvent.call(this)
    };
})(MOTION)