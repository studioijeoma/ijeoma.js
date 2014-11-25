(function(MOTION, undefined) { 
        MOTION.Tween = function(object, property, end, duration, delay, easing) {  
            this._properties = [];
            this._propertyMap = [];

            if (typeof arguments[0] == 'object') {
                MOTION.call(this, arguments[3], arguments[4]);
                this.addProperty(arguments[0], arguments[1], arguments[2])
                this.setEasing(arguments[5]);
            } else if (typeof arguments[0] == 'string') {
                MOTION.call(this, arguments[2], arguments[3]);
                this.addProperty(arguments[0], arguments[1])
                this.setEasing(arguments[4]);
            }else  {
                MOTION.call(this, arguments[0], arguments[1]); 
                this.setEasing(arguments[2]);
            } 
    };

    MOTION.Tween.prototype = Object.create(MOTION.prototype); MOTION.Tween.prototype.constrctor = MOTION.Tween

    MOTION.Tween.prototype._updateProperties = function() {
        for (var i = 0; i < this._properties.length; i++)
            this._properties[i].update(this._easing(this.getPosition()));
    };

    MOTION.Tween.prototype.addProperty = function(object, property, end) {
        var p = (typeof arguments[0] == 'object') ? new MOTION.NumberProperty(object, property, end) : new MOTION.NumberProperty(arguments[0], arguments[1]);
 
        this._properties.push(p);
        this._propertyMap[p._field] = p;

        return this;
    };

    MOTION.Tween.prototype.add = MOTION.Tween.prototype.addProperty;


    MOTION.Tween.prototype.remove = function(child) {
        var property, i;

        if (typeof arguments[0] == 'number') {
            i = arguments[0];
            property = this._properties[i];
        } else if (typeof arguments[0] == 'name') {
            property = this._propertyMap[arguments[0]];
            i = this._properties.indexOf(property);
        } else if (typeof arguments[0] == 'object') {
            property = arguments[0];
            i = this._properties.indexOf(property);
        }

        if (i && i != -1)
            this._properties.splice(i, 1);

        if (property && property.getName() in this._propertyMap)
            delete this._propertyMap[c.getName()];

        return this;
    };

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
 
    MOTION.prototype.setEasing = function(easing) {
        this._easing = (typeof easing == 'undefined') ? (function(t) {
            return t;
        }) : easing;

        return this;
    };

    MOTION.prototype.easing = MOTION.prototype.setEasing;

    MOTION.prototype.getEasing = function() {
        return this._easing;
    };

    MOTION.prototype.noEasing = function() {
        this.setEasing(function(t) {
            return t;
        });

        return this;
    };

    MOTION.Tween.prototype.dispatchStartedEvent = function() {
        if (this._valueMode == MOTION.RELATIVE)
            for (var i = 0; i < this._properties.length; i++)
                this._properties[i].setBegin();

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
