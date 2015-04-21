(function(MOTION, undefined) {
    MOTION.Tween = function(object, property, end, duration, delay, easing) {
        this._properties = [];
        this._valueMode = MOTION.ABSOLUTE;

        this._easing = function(t) {
            return t;
        };
        this._interpolation = MOTION.Interoplation.Hermite;

        if (typeof arguments[0] === 'object') {
            MOTION.call(this, arguments[3], arguments[4]);
            this.addProperty(arguments[0], arguments[1], arguments[2]);

            if (typeof arguments[5] !== 'undefined')
                this.setEasing(arguments[5]);
        } else if (typeof arguments[0] === 'string') {
            MOTION.call(this, arguments[2], arguments[3]);
            this.addProperty(arguments[0], arguments[1]);

            if (typeof arguments[4] !== 'undefined')
                this.setEasing(arguments[4]);
        } else {
            MOTION.call(this, arguments[0], arguments[1]);

            if (typeof arguments[2] !== 'undefined')
                this.setEasing(arguments[2]);
        }
    };

    MOTION.Tween.prototype = Object.create(MOTION.prototype);
    MOTION.Tween.prototype.constrctor = MOTION.Tween;

    MOTION.Tween.prototype._updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this.position(), this._easing, this._interpolation);
    };

    MOTION.Tween.prototype.addProperty = function(object, property, values) {
        if (arguments[0] instanceof MOTION.Property)
            this._properties.push(arguments[0]);
        else if (typeof arguments[0] === 'object')
            this._properties.push(new MOTION.Property(object, property, values));
        else
            this._properties.push(new MOTION.Property(arguments[0], arguments[1]));

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;


    MOTION.Tween.prototype.remove = function(child) {
        var i;

        if (typeof arguments[0] === 'number') {
            i = arguments[0];
        } else if (typeof arguments[0] === 'name') {
            i = this._properties.indexOf(property);
        } else if (typeof arguments[0] === 'object') {
            for (var j = 0; j < this._properties.length; j++)
                if (this._properties[j]._field === arguments[0])
                    j = i;
        }

        if (i && i != -1)
            this._properties.splice(i, 1);

        return this;
    };

    MOTION.Tween.prototype.getProperty = function() {
        if (typeof arguments[0] === 'string') {
            for (var j = 0; j < this._properties.length; j++)
                if (this._properties[j]._field === arguments[0])
                    return this._properties[j];
        } else if (typeof arguments[0] === 'number') {
            return this._properties[arguments[0]];
        } else {
            return this._properties;
        }
    };

    MOTION.Tween.prototype.get = MOTION.Tween.prototype.getProperty;

    MOTION.Tween.prototype.getCount = function() {
        return this._properties.length;
    };

    MOTION.Tween.prototype.count = MOTION.Tween.prototype.getCount;

    MOTION.Tween.prototype.setEasing = function(easing) {
        this._easing = easing;
        return this;
    };

    MOTION.Tween.prototype.easing = MOTION.Tween.prototype.setEasing;

    MOTION.Tween.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.Tween.prototype.noEasing = function() {
        this._easing = function(t) {
            return t;
        };
        return this;
    };

    MOTION.Tween.prototype.setInterpolation = function(inpterpolation) {
        this._interpolation = inpterpolation;
        return this;
    };

    MOTION.Tween.prototype.interpolation = MOTION.Tween.prototype.setInterpolation;

    MOTION.Tween.prototype.getInterpolation = function() {
        return this._interpolation;
    };

    MOTION.Tween.prototype.relative = function() {
        this.setValueMode(MOTION.RELATIVE);

        return this;
    };

    MOTION.Tween.prototype.absolute = function() {
        this.setValueMode(MOTION.ABSOLUTE);

        return this;
    };

    MOTION.Tween.prototype.setValueMode = function(_valueMode) {
        this._valueMode = _valueMode;

        return this;
    };

    MOTION.Tween.prototype.valueMode = MOTION.Tween.prototype.setValueMode;

    MOTION.Tween.prototype.getValueMode = function() {
        return this._valueMode;
    };

    MOTION.Tween.prototype.dispatchStartedEvent = function() {
        if (this._valueMode == MOTION.RELATIVE)
            for (var i = 0; i < this._properties.length; i++) {
                this._properties[i].setStart();
            }

        if (this._onStart)
            this._onStart(this._object);
    };

    MOTION.Tween.prototype.dispatchEndedEvent = function() {
        if (this._onEnd)
            this._onEnd(this._object);
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this._updateProperties();

        if (this._onUpdate)
            this._onUpdate(this._object);
    };

    MOTION.Tween.prototype.dispatchRepeatedEvent = function() {
        if (this._onRepeat)
            this._onRepeat(this._object);
    };
})(MOTION);
