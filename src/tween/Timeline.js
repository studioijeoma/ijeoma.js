MOTION.Timeline = function (name) {
    MOTION.MotionController.call(this, name)

    this._keyFrames = [];
    this._keyFrameMap = [];
};

MOTION.Timeline.prototype = {
    constructor: MOTION.Timeline,
    setup: function() {},

    setupEvents: function() {},
    
    insert: function(child, time) {
        MotionController.prototype.insert.call(this, child, time);

        if (child.isKeyFrame()) {
            this._keyFrames.push(child);

            if (child.getName() != null)
                this._keyFrameMap[child.getName()] = child;
        }

        return this;
    },
    
    add: function(child) {
        var c = this._childrenMap[child.getName()];
        c.push(child);

        this._children[this._children.indexOf(c)] = c;

        return this;
    },
    
    add: function(child, time) {
        var keyFrame = this.getKeyFrame(time + "");

        if (keyFrame == null) {
            keyFrame = new KeyFrame(time + "", time);
            keyFrame.add(child);

            this.insert(keyFrame, time);
        } else
            keyFrame.add(child);

        // console.log(keyFrame.getDuration());

        return this;
    },
    
    addAll: function(children, time) {
        var keyFrame = getKeyFrame(time);

        if (keyFrame == null) {
            keyFrame = new KeyFrame(time + "", time);

            for (var j = 0; j < children.length; j++)
                keyFrame.add(children[j]);

            this.insert(keyFrame, time);
        } else
            for (var j = 0; j < children.length; j++)
                keyFrame.add(children[j]);

        return this;
    },
    
    addAll: function(children, name) {
        // PApplet.println("insertChildren(" + children + ", " + name + ")");
        var c = childrenMap.get(name);
        c.addAll(children);

        children.set(children.indexOf(c), c);

        return this;
    },
    
    removeKeyFrame: function(time) {
        // for(var i = 0; i < this._children.length; i++) {
        // 	var c = this._children[i]
        // 	if (c.getPlayTime() == time) {
        // 		children.remove(children.indexOf(c));
        // 		childrenMap.remove(c);
        // 	}
        // }
    },
    
    removeKeyFrame: function(name) {
        // var c = childrenMap.get(name);

        // children.remove(children.indexOf(c));
        // childrenMap.remove(c);
    },
    
    getKeyFrameCount: function() {
        return this._keyFrames.length;
    },
    
    getCurrentKeyFrames: function() {
        var currentKeyFrames = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(this.getTime()))
                currentKeyFrames.push(children[i]);

        return currentKeyFrames;
    },
    
    getCurrentKeyFrameIndices: function() {
        var indices = [];

        for (var i = 0; i < this._children.length; i++)
            if (this._children[i].isInsidePlayingTime(getTime()))
                indices.push(i);

        return indices;
    },
    
    getKeyFrame: function(index) {
        return this._children[index];
    },
    
    getKeyFrame: function(time) {
        var keyFrame = null;

        for (var i = 0; i < children.length; i++) {
            var c = this.chilren[i];

            if (c.getTime() == time)
                keyFrame = c;
        }

        return keyFrame;
    },
    
    getKeyFrame: function(name) {
        return this._childrenMap[name];
    },
    
    getKeyFrames: function() {
        return this._children;
    },
    
    getKeyFrameTime: function(name) {
        return this.getKeyFrame(name).getTime();
    },
    
    getKeyFrameChildren: function(name) {
        return this.getKeyFrame(name).getChildren();
    },
    
    gotoAndPlay: function(time) {
        this.seek(time / this._duration);
        this.resume();
    },
    
    gotoAndPlay: function(name) {
        var keyFrame = this.getKeyFrame(name);

        this.seek(keyFrame.getPlayTime() / this._duration);
        this.resume();
    },
    
    gotoAndPlay: function() {
        this.seek(keyFrame.getPlayTime() / this._duration);
        this.resume();
    },
    
    gotoAndStop: function(time) {
        this.seek(time / this._duration);
        this.pause();
    },
    
    gotoAndStop: function(name) {
        var keyFrame = getKeyFrame(name);

        this.seek(keyFrame.getPlayTime() / this._duration);
        this.pause();
    },
    
    gotoAndStop: function() {
        this.seek(keyFrame.getPlayTime() / this._duration);
        this.pause();
    },
    
    toString: function() {
        // String keyFrameNames = "";

        // Iterator i = childrenMap.entrySet().iterator();

        // while (i.hasNext()) {
        // 	Map.Entry me = (Map.Entry) i.next();
        // 	keyFrameNames += "{" + me.getKey() + "," + me.getValue() + "},";
        // }

        // return ("Timeline[children: [" + keyFrameNames + "] duration: "
        // 		+ duration + "]");
    },
    
    printKeyFrames: function() {
        var childrenAsString = "";

        for (var i = 0; i < this._children.length; i++)
            childrenAsString += this._children[i].toString() + ((i < this._children.length - 1) ? ", " : "");

        // console.log(childrenAsString);
    }
};
