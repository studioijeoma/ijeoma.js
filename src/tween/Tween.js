MOTION.Tween = function(name, object, property, end, duration, delay, easing) {
    Motion.call(this, name, duration, delay, easing)

    this._properties = [];

    this.addProperty(new NumberProperty(object, property, end));
};

MOTION.Tween.prototype = {
    constructor: MOTION.Tween,

    setup: function() {},

    setupEvents: function() {},

    update: function(time) {
        Motion.prototype.update.call(this, time);

        if (this.isPlaying())
            this.updateProperties();
    },

    updateProperties: function() {
        for (var i = 0; i < this._properties.length; i++) {
            var p = this._properties[i];
            p.setPosition(this._easing(this.getPosition(), 0, 1, 1))
        }
    },

    seek: function(value) {
        Motion.prototype.seek.call(this, value)

        this.updateProperties();

        return this;
    },

    addProperty: function(p) {
        this._properties.push(p);

        return this;
    },

    add: function(p) {
        this.properties.push(p);

        return this;
    },

    add: function(object, property, end) {
        return this.addProperty(new NumberProperty(object, property, end));
    },

    // add = function(object, property, end) {
    // 	return this.addProperty(new ColorProperty(object, property, end));
    // }

    // add = function(PVector _vector, PVector end) {
    // 	return this.addProperty(new PVectorProperty(_vector, end));
    // }

    addNumber: function(object, property, end) {
        return this.addProperty(new NumberProperty(object, property, end));
    },

    // addColor = function(object, property, end) {
    // 	return this.addProperty(new ColorProperty(object, property, end));
    // }

    // addPVector = function(PVector _vector, PVector end) {
    // 	return this.addProperty(new PVectorProperty(_vector, end));
    // }

    call: function(object, method, _time) {
        return this.addCall(new Callback(object, method, _time));
    },

    // addCall = function(Callback _call) {
    // 	calls.push(_call);
    // 	return this;
    // }

    getPosition: function() { 
        return this.getTime() / this._duration 
    },

    get: function(_index) {
        return this.getProperty(_index);
    },

    get: function(name) {
        return this.getProperty(name);
    },

    getNumber: function(_index) {
        return this.getProperty(_index);
    },

    getNumber: function(name) {
        return this.getProperty(name);
    },

    getColor: function(_index) {
        return this.getProperty(_index);
    },

    getColor: function(name) {
        return this.getProperty(name);
    },

    getPVector: function(_index) {
        return this.getProperty(_index);
    },

    getPVector: function(name) {
        return this.getProperty(name);
    },

    getProperty: function(_index) {
        return this.properties[_index];
    },

    getProperty: function(name) {
        var mp = null;

        for (i = 0; i < this.properties.length; i++)
            if (this.properties[i].getName() == name) {
                mp = this.properties[i];
                break;
            }

        return mp;
    },

    getProperties: function() {
        // return properties.toArray(new IProperty[properties.length]);
        return this.properties;
    },

    getPropertyCount: function() {
        return this.properties.length;
    },

    getPropertyName: function(_index) {
        return this.properties[_index].getName();
    },

    getPropertyNames: function() {
        if (this.properties.length > 1) {
            var propertyNames = [];

            for (i = 1; i < properties.length - 1; i++)
                propertyNames.push(this.properties[i + 1].getName());

            return propertyNames;
        } else
            return [];
    },

    dispatchStartedEvent: function() {
        // console.log('dispatchStartedEvent');
    },

    dispatchEndedEvent: function() {
        // console.log('dispatchEndedEvent');
    },

    dispatchChangedEvent: function() {
        // console.log('dispatchChangedEvent');
    },

    dispatchRepeatedEvent: function() {
        // console.log('dispatchRepeatedEvent');
    },

    toString: function() {
        return "Tween[time = " + this._delay + ", duration = " + this.getDuration() + "]";
    }
};