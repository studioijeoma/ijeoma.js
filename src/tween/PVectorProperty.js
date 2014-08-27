// PVectorProperty.prototype.( = functionString _name, float _end) {
// setup(_name, _end);
// }
PVectorProperty = function PVectorProperty(_vector, _end) {
    this._name = "";
    this._vector = vector;
    this._begin = vector.get();
    this._end = end;
    this._position = 0;
}

PVectorProperty.prototype.getName = function() {
    return this._name;
}

PVectorProperty.prototype.setName = function(_name) {
    this._name = _name;
}

PVectorProperty.prototype.getBegin = function() {
    return this._begin;
}

PVectorProperty.prototype.setBegin = function(begin) {
    this._begin = begin;

    this.setChange(PVector.sub(this._end, this._begin));
}

PVectorProperty.prototype.getEnd = function() {
    return this._end;
}

PVectorProperty.prototype.setEnd = function(end) {
    this._begin = vector.get();
    this._end = end;

    this.setChange(PVector.sub(this._end, this._begin));
}

PVectorProperty.prototype.getChange = function() {
    return this.change;
}

PVectorProperty.prototype.setChange = function(change) {
    this._change = change;
}

PVectorProperty.prototype.getPosition = function() {
    return this._position;
}

PVectorProperty.prototype.setPosition = function(position) {
    this._position = position;

    this.updateValue();
}

PVectorProperty.prototype.updateValue = function() {
    vector.lerp(this._end, this._position);
}

// PVectorProperty.prototype.resetValue = function() {
// vector = begin.get();
// }
PVectorProperty.prototype.toString = function() {
    return "Parameter[name: " + this.getName() + ", begin: " + this.getBegin() + ", end: " + this.getEnd() + ", change: " + this.getChange() + ", position: " + this.getPosition() + "]";
}