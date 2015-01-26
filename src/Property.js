(function(MOTION, undefined) {

    MOTION._properties = [];

    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] === 'object') ? object : window;
        this._field = (typeof arguments[0] === 'object') ? field : arguments[0];

        var values = (typeof arguments[0] === 'object') ? values : arguments[1];
        this._start = (values instanceof Array) ? values[0] : ((typeof this._object[this._field] == 'undefined') ? 0 : this._object[this._field]);
        this._end = this._object[this._field] = (values instanceof Array) ? values[1] : values;

        this._position = 0;

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

    MOTION.Property.prototype.update = function(position) {
        this._position = position;

        if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 1))
            this._object[this._field] = MOTION.Linear(this._start, this._end, this._position);
        else {

        }
    };

    MOTION.Property.prototype._updateArray = function(position) {
        var segmentTRange = 1 / (this._end.length - 1);

        if (position < 1) {
            segmentPointIndex = Math.floor((this._end.length - 1) * position);
            segmentT = MOTION._map((position % segmentTRange), 0, segmentTRange, 0, 1);
        } else {
            segmentPointIndex = (this._end.length - 2);
            segmentT = 1;
        }

        var v1, v2, v3, v4;

        v2 = this._end[segmentPointIndex];
        v3 = this._end[segmentPointIndex + 1];
        v1 = v4 = 0;

        if (segmentPointIndex == 0) {
            var segmentBegin = this._end[0];
            var segmentEnd = this._end[1];
            var segmentSlope = segmentEnd - segmentBegin;
            v1 = segmentEnd - segmentSlope;
        } else {
            v1 = this._end[segmentPointIndex - 1];
        }
        
        if ((segmentPointIndex + 1) == this._end.length - 1) {
            var segmentBegin = this._end[this._end.length - 2];
            var segmentEnd = this._end[this._end.length - 1];
            var segmentSlope = segmentEnd - segmentBegin;
            v4 = segmentEnd + segmentSlope;
        } else {
            v4 = this._end[segmentPointIndex + 2];
        }

        // if (this._interpolation === MOTION.LINEAR) {
        return MOTION.Linear(v2.y, v3.y, segmentT);
        // } else if (this._interpolation === MOTION.COSINE) {
        // return MOTION.Cosine(v2.y, v3.y, segmentT);
        // } else if (this._interpolation === MOTION.CUBIC) {
        //     return MOTION.Cubic(v1.y, v2.y, v3.y, v4.y, segmentT);
        // } else if (this._interpolation === MOTION.HERMITE) {
        //     return MOTION.Hermite(v1.y, v2.y, v3.y, v4.y, segmentT, tension, bias);
        // }
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

    MOTION.Property.prototype.getPosition = function() {
        return this._position;
    };

    MOTION.Property.prototype.position = MOTION.Property.prototype.getPosition;

    MOTION.Property.prototype.setPosition = function(position) {
        this._position = position;
        this.update();
        return this;
    };

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
