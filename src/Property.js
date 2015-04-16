(function(MOTION, undefined) {

    MOTION._properties = [];

    MOTION.Property = function(object, field, values) {
        this._object = (typeof arguments[0] === 'object') ? object : window;
        this._field = (typeof arguments[0] === 'object') ? field : arguments[0];

        var values = (typeof arguments[0] === 'object') ? values : arguments[1];
        this._isArray = values instanceof Array; 
        this._start = (this._isArray) ? values[0] : ((typeof this._object[this._field] == 'undefined') ? 0 : this._object[this._field]);
        this._end = this._object[this._field] = (this._isArray) ? values[1] : values;

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

        if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 1)){ 
            this._object[this._field] = (this._isArray) ? this._updateArray(this._position) : MOTION.Interoplation.Linear(this._start, this._end, this._position);
        }else {

        }
    };

    MOTION.Property.prototype._updateArray = function(position) { 
        var segmentSize = 1 / this._end.length
        var segmentIndex = Math.floor(map(position, 0, 1, 0, this._end.length));
        var segmentPosition = map(position, segmentIndex * segmentSize, (segmentIndex + 1) * segmentSize, 0, 1);

        var p1, p2, p3, p4;

        p2 = this._end[segmentIndex];
        p3 = this._end[segmentIndex + 1];
        p1 = p4 = 0;

        if (segmentIndex == 0) {
            var segmentBegin = this._end[0];
            var segmentEnd = this._end[1];
            var segmentSlope = segmentEnd - segmentBegin;
            p1 = segmentEnd - segmentSlope;
        } else {
            p1 = this._end[segmentIndex - 1];
        }

        if (segmentIndex == this._end.length - 1) {
            var segmentBegin = this._end[this._end.length - 2];
            var segmentEnd = this._end[this._end.length - 1];
            var segmentSlope = segmentEnd - segmentBegin;
            p4 = segmentEnd + segmentSlope;
        } else {
            p4 = this._end[segmentIndex + 1];
        }
 
        return MOTION.Interoplation.Linear(p2, p3, segmentPosition)
        // return MOTION.Interoplation.Cosine(p2, p3, segmentPosition)
        // return MOTION.Interoplation.Cubic(p1, p2, p3, p4, segmentPosition)
        // return MOTION.Interoplation.Hermite(p1, p2, p3, p4, segmentPosition)
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