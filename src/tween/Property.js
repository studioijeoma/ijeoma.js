MOTION.Property = function(object, field, end) {
    this._object = object;
    this._field = field;

    this._name = field;

    this._begin = (typeof object[field] == "undefined") ? 0 : object[field];
    this._end = (typeof end == "undefined") ? 0 : end;
    this._change = this._end - this._begin;

    this._position = 0;
}

MOTION.Property.prototype.update = function(position, easing) {
    this._position = position;

    // if ((this._position > 0 && this._position <= 1) || (this._position == 0 && this._order == 0)) {
    // _this._easing(this.getTime() / this._duration, 0, 1, 1)
    // PApplet.lerp(begin, end, this._position); 
    this._object[this._field] = easing(this._position, this._begin, this._change, 1);
    // }
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
    if (begin) {
        this._begin = begin;
        this._change = this._end - this._begin;
    } else {
        this._begin = (typeof this._object[this._field] == "undefined") ? 0 : this._object[this._field];
        this._change = this._end - this._begin;
    }
};

MOTION.Property.prototype.getEnd = function() {
    return this._end;
};

MOTION.Property.prototype.setEnd = function(end) {
    this._end = end;
    this._change = this._end - this._begin;
};

MOTION.Property.prototype.getChange = function() {
    return this._change;
};

MOTION.Property.prototype.setChange = function(change) {
    this._change = change;
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