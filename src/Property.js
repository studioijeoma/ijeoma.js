(function(MOTION, undefined) {

    MOTION._properties = [];

    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] == 'object') ? object : window;
        this._field = (typeof arguments[1] == 'string') ? field : arguments[0];
         
        var values = (typeof arguments[1] == 'string') ? values : arguments[1];
        console.log(values)

        if (values instanceof Array) {
            this._start = this._object[this._field] = values[0]
            this._end = (values.length > 2) ? values : values[1];
            this._hasArray = (values.length > 2);
        } else {
            this._start = (typeof this._object[this._field] == 'undefined') ? 0 : this._object[this._field];
            this._end = values;
        } 
        
        var found = MOTION._properties.filter(function(d) {
            return d.object == this._object && d.field == this._field;
        }, this);

        if (found.length == 1) {
            this._order = ++found[0].count;
        } else {
            MOTION._properties.push({
                object: this._object,
                field: this._field,
                count: 1
            })
            this._order = 1;
        }
    };

    MOTION.Property.prototype.update = function(t, easing, interoplation) {
        if ((t > 0 && t <= 1) || (t == 0 && this._order == 1)) {
            if (this._hasArray)
                this._object[this._field] = MOTION.Interoplation.getInterpolationAt(easing(t), this._end, interoplation);
            else
                this._object[this._field] = MOTION.Interoplation.Linear(easing(t), this._start, this._end);
        } else {}
    };

    MOTION.Property.prototype.getStart = function() {
        return this._start;
    };

    MOTION.Property.prototype.setStart = function(start) {
        if (typeof start === 'undefined') {
            if (typeof this._object[this._field] === 'undefined')
                this._start = 0;
            else
                this._start = this._object[this._field];
        } else
            this._start = start;

        return this;
    };


    MOTION.Property.prototype.start = MOTION.Property.prototype.setStart;

    MOTION.Property.prototype.getEnd = function() {
        return this._end;
    };

    MOTION.Property.prototype.setEnd = function(end) {
        this._end = end;
        return this;
    };

    MOTION.Property.prototype.end = MOTION.Property.prototype.setEnd;

    MOTION.Property.prototype.getValue = function() {
        return this._object[this._field];
    };

    MOTION.Property.prototype.value = MOTION.Property.prototype.getValue;

    MOTION.NumberProperty = function(object, field, end) {
        MOTION.Property.call(this, object, field, end);
    };

    MOTION.NumberProperty.prototype = Object.create(MOTION.Property.prototype);
    MOTION.NumberProperty.prototype.constrctor = MOTION.NumberProperty;
})(MOTION);
