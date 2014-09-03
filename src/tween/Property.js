(function(MOTION, undefined) {
    MOTION.Property = function(object, field, end) {
        this._object = object;
        this._field = field;

        this._name = field;

        this._begin = (typeof object[field] == "undefined") ? 0 : object[field];
        this._end = (typeof end == "undefined") ? 0 : end;

        this._position = 0;
    }

    MOTION.Property.prototype.update = function(position) {
        this._position = position;

        // if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
        // _this._easing(this.getTime() / this._duration, 0, 1, 1)
        // PApplet.lerp(begin, end, this._position); 
        // this._object[this._field] = easing(this._position, this._begin, this._change, 1);
        // }

        this._object[this._field] = this._position * (this._end - this._begin) + this._begin
    };

    MOTION.Property.prototype.getName = function() {
        return this._name;
    };

    MOTION.Property.prototype.setName = function(name) {
        if (!this._field)
            this._name = name;
    };

    MOTION.Property.prototype.getBegin = function() {
        return this._begin;
    };

    MOTION.Property.prototype.setBegin = function(begin) {
        if (begin)
            this._begin = begin;
        else
            this._begin = (typeof this._object[this._field] == "undefined") ? 0 : this._object[this._field];
    };

    MOTION.Property.prototype.getEnd = function() {
        return this._end;
    };

    MOTION.Property.prototype.setEnd = function(end) {
        this._end = end;
    };

    MOTION.Property.prototype.getPosition = function() {
        return this._position
    };

    MOTION.Property.prototype.setPosition = function(position) {
        this._position = position;
        this.update();
    };

    MOTION.Property.prototype.getValue = function() {
        if (this._field)
            return this._object[this._field];
        else
            return this._value;
    };

    MOTION.Property.prototype.getObject = function() {
        return this._object
    };

    MOTION.Property.prototype.setOrder = function(order) {
        this._order = order
    };

    MOTION.Property.prototype.getOrder = function() {
        return this._order
    };

    MOTION.NumberProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end)
    };

    MOTION.NumberProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.NumberProperty.prototype.constrctor = MOTION.NumberProperty

    if (usingP5) {
        MOTION.ColorProperty = function(object, field, end) {
            MOTION.Property.call(this, object, field, end)
        };

        MOTION.ColorProperty.prototype = Object.create(MOTION.Property.prototype);
        MOTION.ColorProperty.prototype.constrctor = MOTION.ColorProperty

        MOTION.ColorProperty.prototype.update = function(position) {
            this._position = position;
            this._object[this._field] = lerpColor(this._begin, this._end, this._position);
        };

        MOTION.VectorProperty = function(object, field, end) {
            MOTION.Property.call(this, object, field, end)
        };

        MOTION.VectorProperty.prototype = Object.create(MOTION.Property.prototype);
        MOTION.VectorProperty.prototype.constrctor = MOTION.VectorProperty

        MOTION.VectorProperty.prototype.update = function(position) {
            this._position = position;
            this._object[this._field] = this._begin.lerp(this._end, this._position);
        };
    }
})(MOTION)