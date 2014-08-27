MOTION.MotionController = function(name, children) {
    MOTION.call(this, name);

    this._children = [];
    this._tweens = [];
    this._parallels = [];
    this._sequences = [];

    this._childrenMap = [];
    this._tweenMap = [];
    this._parallelMap = [];
    this._sequenceMap = [];

    if (children) this.addAll(children);

    // this.setup(name,children);
};

MOTION.MotionController.prototype = {
    constructor: MOTION.MotionController,

    setup: function(name, children) {
        this._children = [];
        this._tweens = [];
        this._parallels = [];
        this._sequences = [];

        this._childrenMap = [];
        this._tweenMap = [];
        this._parallelMap = [];
        this._sequenceMap = [];

        if (children) this.addAll(children);
    },

    stop: function() {
        MOTION.prototype.stop.call(this);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            c.stop();
        }

        return this;
    },

    pause: function() {
        MOTION.prototype.pause.call(this);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i]
            c.pause();
        }

        return this;
    },

    resume: function() {
        MOTION.prototype.resume.call(this);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            c.resume();
        }

        return this;
    },

    seek: function(value) {
        MOTION.prototype.seek.call(this, value);

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];

            if (c.isInsidePlayingTime(this.getTime()))
                c.seek(this.getTime() / (c.getDelay() + c.getDuration()));
            else if (c.isAbovePlayingTime(this.getTime()))
                c.seek(1);
            else
                c.seek(0);
        }

        return this;
    },

    update: function(time) {
        MOTION.prototype.update.call(this, time);

        if (time) {
            if (this._isPlaying) this.updateChildren();
        } else {
            if (this._isRegistered && this._isPlaying) this.updateChildren();
        }
    },

    updateChildren: function() {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];

            if (c.isInsidePlayingTime(this.getTime()))
                if (c._isPlaying) c.update(this.getTime());
                else c.play();
        }
    },

    updateTweens: function() {
        var orderMap = [];
        var ppropertyMap = [];

        for (var i = 0; i < this._tweens.length; i++) {
            var t = this._tweens[i];

            for (var j = 0; j < this._properties.length; j++) {
                var p = this._properties[i];

                var name = p.getObject().constructor.name + "." + p.getName();

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
    },

    updateDuration: function() {
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i]
            this._duration = Math.max(this._duration, c.getDelay() + c.getDuration());
        }

        // for (Callback c : calls)
        //  duration = Math.max(duration, c.getTime() - getDelay());
    },

     getPosition: function() { 
        return this.getTime() / this._duration 
    },

    getTween: function(index) {
        if (index < this._tweens.length) return this._tweens[index];
        else return null;
    },

    getTween: function(name) {
        return this._tweenMap[name];
    },

    getParallel: function(index) {
        if (index < this._parallels.length) return this._parallels[index];
        else return null;
    },

    getParallel: function(name) {
        return this._parallelMap[name];
    },

    getSequence: function(index) {
        if (index < this._sequences.length) return this._sequences[index];
        else return null;
    },

    getSequence: function(name) {
        return this._sequenceMap[name];
    },

    getChildren: function() {
        return this._children;
    },

    getChildrenList: function() {
        return this._children;
    },

    getTweens: function() {
        return this._tweens;
    },

    getTweenList: function() {
        return this._tweens;
    },

    getParallels: function() {
        return this._parallels;
    },

    getParallelList: function() {
        return this._parallels;
    },

    getSequences: function() {
        return this._sequences;
    },

    getSequenceList: function() {
        return this._sequences;
    },

    get: function(index) {
        if (index < this._children.length) return this._children[index];
        else return null;
    },

    getChild: function(name) {
        return this._childrenMap[name];
    },

    getCount: function() {
        return this._children.length;
    },

    getTweenCount: function() {
        return this._tweens.length;
    },

    getParallelCount: function() {
        return this._parallels.length;
    },

    getSequenceCount: function() {
        return this._sequences.length;
    },

    setTimeScale: function(timeScale) {
        MOTION.prototype.setTimeScale.call(this, timeScale);

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i]
            child.setTimeScale(timeScale);
        }

        return this;
    },

    setTimeMode: function(_durationMode) {
        MOTION.prototype.setTimeMode.call(this, _durationMode);

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child.setTimeMode(_durationMode);
        }

        return this;
    },

    add: function(child) {
        this.insert(child, 0);
        return this;
    },

    insert: function(child, time) {
        child.delay(time);
        // _child.seek(1);
        child.setTimeMode(this._timeMode);
        child.noAutoUpdate();
        child.addEventListener(this);

        if (child.isTween()) {
            this._tweens.push(child);

            if (child.getName() != null)
                this._tweenMap[child.getName()] = child;

            this.updateTweens();
        } else if (child.isParallel()) {
            this._parallels.push(child);

            if (child.getName() != null)
                this._parallelMap[child.getName()] = child;
        } else if (child.isSequence()) {
            this._sequences.push(child);

            if (child.getName() != null)
                this._sequenceMap[child.getName()] = child;
        }

        this._children.push(child);

        if (child.getName() != null)
            this._childrenMap[child.getName()] = child;

        updateDuration();

        return this;
    },

    removeChild: function(child) {
        if (child.isTween()) {
            this._tweens.remove(child);
            // this._tweenLUT.remove(child.name);
        } else if (child.isParallel()) {
            this._parallels.remove(child);
            // this._ParallelLUT.remove(child.name);
        } else if (child.isSequence()) {
            this._sequences.remove(child);
            // sequenceLUT.remove(child.name);
        }

        this._children.remove(child);
        // childrenLUT.remove(child.name);
        return this;
    },

    // addTween = function(_tweenObject, _tweenObjectProperty, _end, _duration, _delay, _easing) {
    //  return add(new Tween(_tweenObject, _tweenObjectProperty, _end,
    //          _duration, _delay, _easing));
    // ,

    addAll: function(children) {
        for (var i = 0; i < children.length; i++)
            this.add(children[i]);

        return this;
    },

    // addCall = function(_call) {
    //  calls.add(_call);
    //  updateDuration();
    //  return this;
    // ,

    removeAll: function() {
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
    },

    printChildren: function() {
        childrenAs = "";

        var i = 0;

        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            childrenAs += c.toString();
            childrenAs += ((i < this._children.length - 1) ? ", " : "");
            i++;
        }
    }
};