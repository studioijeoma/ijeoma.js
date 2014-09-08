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

    MOTION.Tween.prototype.play = function() {
        this.seek(0);
        this.resume();

        this._playCount++;
        this._repeatCount = 0;

        this.dispatchStartedEvent();

        for (var i = 0; i < this._properties.length; i++) {
            this._properties[i].setBegin();
            // console.log(this._properties[i].getName() + ': ' + this._properties[i].getValue())
        }

        return this;
    }

    MOTION.Tween.prototype.updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this.getPosition());
    };

    MOTION.Tween.prototype.seek = function(value) {
        MOTION.prototype.seek.call(this, value);

        this.updateProperties();

        return this;
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

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this.updateProperties();

        if (this._onUpdate)
            this._onUpdate(window);
    };
})(MOTION)