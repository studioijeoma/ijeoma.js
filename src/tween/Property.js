(function(MOTION, undefined) {
    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] == 'object') ? object : window;
        this._field = (typeof arguments[0] == 'object') ? field : arguments[0];

        this._id = 'Property' + _idMap['Property'] ++;

        var values = (typeof arguments[0] == 'object') ? values : arguments[1]

        this._begin = this._object[this._field] = (typeof values == 'number') ? ((typeof this._object[this._field] == 'undefined') ? 0 : this._object[this._field]) : values[0];
        this._end = (typeof values == 'number') ? values : values[1]; 

        this._position = 0;
    }

    MOTION.Property.prototype.update = function(position) {
        this._position = position;

        if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
            this._object[this._field] = this._position * (this._end - this._begin) + this._begin;
        } else {
            // console.log(this._position);
        }
    };

    MOTION.Property.prototype.getId = function() {
        return this._id;
    };

    MOTION.Property.prototype.getBegin = function() {
        return this._begin;
    };

    MOTION.Property.prototype.setBegin = function(begin) {
        if (typeof begin === 'undefined') { 
            if (typeof this._object[this._field] === 'undefined')
                this._begin = 0
            else
                this._begin = this._object[this._field];
        } else
            this._begin = begin;

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
