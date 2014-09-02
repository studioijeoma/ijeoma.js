MOTION.Tween = function(object, property, end, duration, delay, easing) {
    MOTION.call(this, duration, delay, easing)

    this._properties = [];
    this._propertyMap = [];

    this._isUpdatingProperties = true;

    if (typeof object !== "undefined" && typeof property !== "undefined")
        this.add(new MOTION.Property(object, property, end));
};

MOTION.Tween.prototype = Object.create(MOTION.prototype);
MOTION.Tween.prototype.constrctor = MOTION.Tween

MOTION.Tween.prototype.play = function() {
    MOTION.prototype.play.call(this);

    this._isUpdatingProperties = true;


            console.log('------')
    for (var i = 0; i < this._properties.length; i++) {
        this._properties[i].setBegin(); 
        console.log(this._properties[i].getName() + ': '+this._properties[i].getBegin());
    }

    return this;
}

MOTION.Tween.prototype.update = function(time) {
    if (time) {
        if (this.isInsidePlayingTime(time)) {
            if (!this._isPlaying){ 
                // this._isUpdatingProperties =false;
                this.play();
            }

            this.setTime(time);
            this.updateCalls();
            this.updateProperties();

            this.dispatchChangedEvent();
        } else if (this._isPlaying){ 
            this.stop();
        }
    } else {
        if (this._isRegistered && this._isPlaying) {
            this.updateTime();
            this.updateCalls();
            this.updateProperties();

            if (!this.isInsideDelayingTime(this._time) && !this.isInsidePlayingTime(this._time))
                this.stop();
            else
                this.dispatchChangedEvent();
        }
    } 
};

MOTION.Tween.prototype.updateProperties = function() {
    for (var i = 0; i < this._properties.length; i++)
        this._properties[i].update(this.getPosition(), this._easing);
};

MOTION.Tween.prototype.seek = function(value) {
    MOTION.prototype.seek.call(this, value);

    if (this._isUpdatingProperties)
        this.updateProperties();

    return this;
};

MOTION.Tween.prototype.addProperty = function(object, property, end) {
    if (arguments.length == 1) {
        this._properties.push(arguments[0]);

        if (arguments[0].getName())
            this._propertyMap[arguments[0].getName()] = arguments[0];
    } else {
        return this.addProperty(new MOTION.Property(object, property, end));
    }

    return this;
};

MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;

MOTION.Tween.prototype.getProperty = function() {
    if (isNaN(arguments[0]))
        return this._propertyMap[arguments[0]];
    else
        return this._properties[arguments[0]];
};

MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

MOTION.Tween.prototype.getProperties = function() {
    return this._properties;
};

MOTION.Tween.prototype.getPropertyCount = function() {
    return this._properties.length;
};

MOTION.Tween.prototype.getPropertyName = function(i) {
    return this._properties[i].getName();
};

MOTION.Tween.prototype.getPropertyNames = function() {
    if (this._properties.length > 1) {
        var propertyNames = [];

        for (i = 1; i < properties.length - 1; i++)
            propertyNames.push(this._properties[i + 1].getName());

        return propertyNames;
    } else
        return [];
};
