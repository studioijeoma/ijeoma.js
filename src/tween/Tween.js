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

        this._valueMode = MOTION.Tween.ABSOLUTE;
    };

    MOTION.Tween.RELATIVE = 'relative';
    MOTION.Tween.ABSOLUTE = 'absolute';

    MOTION.Tween.prototype = Object.create(MOTION.prototype);
    MOTION.Tween.prototype.constrctor = MOTION.Tween;

    MOTION.Tween.prototype.play = function() {  
        this.seek(0);
        this.resume();

        this._playCount++;
        this._repeatCount = 0;

        this.dispatchStartedEvent();

        for (var i = 0; i < this._properties.length; i++) {
            // this._properties[i].setBegin();            
            // console.log(this._properties[i].getName() + ': ' + this._properties[i].getValue())
        }

        return this;
    }

    MOTION.Tween.prototype.updateProperties = function() { 
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

    MOTION.Tween.prototype.setValueMode = function(_valueMode) {
        MOTION.valueMode = _valueMode;
        return this;
    };

    MOTION.Tween.prototype.getValueMode = function() {
        return MOTION.valueMode;
    };

    MOTION.Tween.prototype.relative = function() {
        this._valueMode = MOTION.Tween.RELATIVE;
        return this;
    };

    MOTION.Tween.prototype.absolute = function() {
        this._valueMode = MOTION.Tween.ABSOLUTE;
        return this;
    };

    MOTION.Tween.prototype.isRelative = function() {
        return this._valueMode == MOTION.Tween.RELATIVE
    };

    MOTION.Tween.prototype.isAbsolute = function() {
        return this._valueMode == MOTION.Tween.ABSOLUTE
    };

    MOTION.Tween.prototype.dispatchChangedEvent = function() {
        this.updateProperties();

        if (this._onUpdate)
            this._onUpdate(window);
    };
})(MOTION)