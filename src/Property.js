(function(MOTION, undefined) {

    MOTION._properties = [];

    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] == 'object') ? object : window;
        this._field = (typeof arguments[1] == 'string') ? field : arguments[0];
        this._isArray = false;
        this._isPath = false;

        var values = (typeof arguments[1] == 'string') ? values : arguments[1];

        if (values instanceof Array) {
            //it'll either be interpolating between 2 arrays or through multiple points
            if (values.length == 2) {
                //interpolates between a start and end number or number values/properties of a custom color or vector object;
                //(window, 'x', [0,1]) or (window, 'x', [[0,0,0],[1,2,3])
                this._start = values[0];
                this._end = values[1]
                this._isArray = values[0] instanceof Array && values[1] instanceof Array;
            } else {
                if (this._object[this._field] instanceof Array) {
                    this._start = (this._object[this._field].length == 0) ? new Array(values.length) : this._object[this._field];
                    this._end = values;
                    this._isArray = true;
                } else {
                    //interpolates through an array of values as a path   
                    //(window, 'x', [0,1,2,3,4])
                    this._start = values[0];
                    this._end = values
                    this._isPath = true;
                }
            }
        } else {
            //it'll either interpolating between a number or number values/properties of a custom color or vector object
            //(window, 'x', 1) 
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
        // if ((t > 0 && t <= 1) || (t == 0 && this._order == 1)) {
        if (this._isArray) {
            var a = [];
            for (var i = 0; i < this._start.length; i++)
                a.push(MOTION.Interoplation.Linear(easing(t), this._start[i], this._end[i]));
            this._object[this._field] = a;
        } else if (this._isPath)
            this._object[this._field] = MOTION.Interoplation.getInterpolationAt(easing(t), this._end, interoplation);
        else
            this._object[this._field] = MOTION.Interoplation.Linear(easing(t), this._start, this._end);
        // } else {}
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
})(MOTION);
