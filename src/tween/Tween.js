(function(MOTION, undefined) {
    MOTION.Tween = function(object, property, end, duration, delay, easing) {
        this._object = (typeof arguments[0] == 'undefined' || typeof arguments[0] == 'number') ? window : arguments[0];

        this._properties = [];
        this._propertyMap = [];

        if (typeof arguments[1] == 'string') {
            if (typeof object == 'undefined' || typeof arguments[0] == 'number')
                MOTION.call(this, arguments[0], arguments[1], arguments[2])
            else
                MOTION.call(this, duration, delay, easing)

                this.addProperty(this._object, property, end);
        } else {
            if (typeof object == 'undefined' || typeof arguments[0] == 'number')
                MOTION.call(this, arguments[0], arguments[1], arguments[2])
            else
                MOTION.call(this, arguments[1], arguments[2], arguments[3])
        }
    };

    MOTION.Tween.prototype = Object.create(MOTION.prototype);
    MOTION.Tween.prototype.constrctor = MOTION.Tween;

    MOTION.Tween.prototype.updateProperties = function() {
        // if(this.get('offset'))
        //     console.log(this._id + ': '+this.get('offset').getValue())

        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this.getPosition());
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p = (typeof arguments[0] == 'string') ? new MOTION.NumberProperty(this._object, arguments[0], arguments[1]) : new MOTION.NumberProperty(object, property, end);

        this._properties.push(p);

        if (p.getName())
            this._propertyMap[p.getName()] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;

    MOTION.Tween.prototype.getProperty = function() {
        if (typeof arguments[0] == 'string')
            return this._propertyMap[arguments[0]];
        else if (typeof arguments[0] == 'number')
            return this._properties[arguments[0]];
        else
            return this._properties;
    };

    MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

    MOTION.Tween.prototype.getCount = function() {
        return this._properties.length;
    };

    MOTION.Tween.prototype.dispatchStartedEvent = function() {
        MOTION.prototype.dispatchStartedEvent.call(this)

        if (this.isAbsolute())
            for (var i = 0; i < this._properties.length; i++)
                this._properties[i].setBegin();
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        MOTION.prototype.dispatchChangedEvent.call(this)
        this.updateProperties();
    };

    MOTION.Tween.prototype.dispatchEndedEvent = function() {
        MOTION.prototype.dispatchEndedEvent.call(this)

        if (this.isRelative())
            for (var i = 0; i < this._properties.length; i++) {
                // this._properties[i].setBegin();
                // console.log(this._properties[i].getName() + ': ' + this._properties[i].getValue())
            }
    };
})(MOTION);