(function(MOTION, undefined) {
    MOTION.Property = function(object, field, end) {
        this._object = object;
        this._field = field;

        this._id = 'Property' + _idMap['Property']++;
        this._name = field;

        this._begin = (typeof object[field] == "undefined") ? 0 : object[field];
        this._end = (typeof end == "undefined") ? 0 : end;

        this._position = 0;
    }

    MOTION.Property.prototype.update = function(position) {
        this._position = position;


        // if ((this._position >= 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) { 
        this._object[this._field] = this._position * (this._end - this._begin) + this._begin 
        // } else
        //     console.log(this._position)
    };

    MOTION.Property.prototype.getId = function() {
        return this._id;
    };

    MOTION.Property.prototype.getName = function() {
        return this._name;
    };

    MOTION.Property.prototype.setName = function(name) {
        this._name = name;
        return this;
    };

    MOTION.Property.prototype.getBegin = function() {
        return this._begin;
    };

    MOTION.Property.prototype.setBegin = function(begin) {
        if (begin)
            this._begin = begin;
        else
            this._begin = (typeof this._object[this._field] == "undefined") ? 0 : this._object[this._field];
        return this;
    };

    MOTION.Property.prototype.getEnd = function() {
        return this._end;
    };

    MOTION.Property.prototype.setEnd = function(end) {
        this._end = end;
        return this;
    };

    MOTION.Property.prototype.getPosition = function() {
        return this._position
    };

    MOTION.Property.prototype.setPosition = function(position) {
        this._position = position;
        this.update();
        return this;
    };

    MOTION.Property.prototype.getValue = function() {
        return this._object[this._field];
    };

    MOTION.Property.prototype.getObject = function() {
        return this._object
    };

    MOTION.Property.prototype.getField = function() {
        return this._field
    };

    MOTION.Property.prototype.setOrder = function(order) {
        this._order = order
        return this;
    };

    MOTION.Property.prototype.getOrder = function() {
        return this._order
    };

    MOTION.NumberProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end)
    };

    MOTION.NumberProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.NumberProperty.prototype.constrctor = MOTION.NumberProperty
})(MOTION)