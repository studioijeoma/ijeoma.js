NumberProperty = function NumberProperty(object, name, end) {
	this._object = {}; 
	this._field = ""; 

	this._name = "";

	this._begin = 0;
	this._end = 0;
	this._change = 0;
	this._position = 0;
 
	this.setupObjectField(object, name);
	this.setup(name, end);
}

NumberProperty.prototype.setup = function(name, end) {
	this._name = name;

	this.setEnd(end);

	this._position = 0;
}

NumberProperty.prototype.setupObjectField = function(object, objectFieldName) {
	this._object = object;
	this._field = objectFieldName;
}

NumberProperty.prototype.getName = function() {
	return this._name;
}

NumberProperty.prototype.setName = function(name) {
	this._name = name;
}

NumberProperty.prototype.getBegin = function() { 
	return this._begin;
}

NumberProperty.prototype.setBegin = function() {  
	this._begin = this._object[this._field];

	this.setChange(this._end - this._begin);
}

NumberProperty.prototype.setBegin = function(begin) {
	this._begin = begin;

	this.setChange(this._end - this._begin);
}

NumberProperty.prototype.getEnd = function() {
	return this._end;
}

NumberProperty.prototype.setEnd = function(end) { 
	this._begin = this._object[this._field];

	this._end = end;

	this.setChange(this._end - this._begin);
}

NumberProperty.prototype.getChange = function() {
	return this._change;
}

NumberProperty.prototype.setChange = function(change) {
	this._change = this._change;
}

NumberProperty.prototype.getPosition = function() {
	return this._position;
}

NumberProperty.prototype.setPosition = function(position) {
	this._position = position;

	this.updateValue();
} 

NumberProperty.prototype.updateValue = function() { 
	this._object[this._field] = this._begin + (this._end-this._begin) * this._position;
}

NumberProperty.prototype.toString = function() {
	return "Parameter[name: " + this.getName() + ", begin: " + this.getBegin()
			+ ", end: " + this.getEnd() + ", change: " + this.getChange()
			+ ", position: " + this.getPosition() + "]";
} 