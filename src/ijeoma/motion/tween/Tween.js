var Tween = function Tween(name, object, property, end, duration, delay, easing)  {
	Motion.call(this, name, duration, delay, easing)

	this._properties = [];

	this.addProperty(new NumberProperty(object, property, end));
}
 
Tween.prototype = new Motion();
Tween.prototype.constructor=Tween;   

Tween.prototype.setup = function() { }

Tween.prototype.setupEvents = function() { }
	
Tween.prototype.update = function(time) {  
	Motion.prototype.update.call(this, time); 

	if (this.isPlaying())
		this.updateProperties();
} 

Tween.prototype.updateProperties = function() {   
	for(var i = 0; i < this._properties.length; i++) {
		var p = this._properties[i]; 
		p.setPosition(this._easing(this.getPosition(), 0, 1, 1 )) 
	}
}
  
Tween.prototype.seek = function(value) { 
	Motion.prototype.seek.call(this,value)
 
	this.updateProperties();

	return this;
}

Tween.prototype.addProperty = function(p) {
	this._properties.push(p);

	return this;
}

Tween.prototype.add = function(p) {
	this.properties.push(p);

	return this;
}

Tween.prototype.add = function(object, property, end) {
	return this.addProperty(new NumberProperty(object, property, end));
}

// add = function(object, property, end) {
// 	return this.addProperty(new ColorProperty(object, property, end));
// }

// add = function(PVector _vector, PVector end) {
// 	return this.addProperty(new PVectorProperty(_vector, end));
// }

Tween.prototype.addNumber = function(object, property, end) {
	return this.addProperty(new NumberProperty(object, property, end));
}

// addColor = function(object, property, end) {
// 	return this.addProperty(new ColorProperty(object, property, end));
// }

// addPVector = function(PVector _vector, PVector end) {
// 	return this.addProperty(new PVectorProperty(_vector, end));
// }

Tween.prototype.call = function(object, method, _time) {
	return this.addCall(new Callback(object, method, _time));
}

// addCall = function(Callback _call) {
// 	calls.push(_call);
// 	return this;
// }

Tween.prototype.get = function(_index) {
	return this.getProperty(_index);
}

Tween.prototype.get = function(name) {
	return this.getProperty(name);
}

Tween.prototype.getNumber = function(_index) {
	return this.getProperty(_index);
}

Tween.prototype.getNumber = function(name) {
	return this.getProperty(name);
}

Tween.prototype.getColor = function(_index) {
	return this.getProperty(_index);
}

Tween.prototype.getColor = function(name) {
	return this.getProperty(name);
}

Tween.prototype.getPVector = function(_index) {
	return this.getProperty(_index);
}

Tween.prototype.getPVector = function(name) {
	return this.getProperty(name);
}

Tween.prototype.getProperty = function(_index) {
	return this.properties[_index];
}

Tween.prototype.getProperty = function(name) {
	var mp = null;

	for (i = 0; i < this.properties.length; i++)
		if (this.properties[i].getName() == name) {
			mp = this.properties[i];
			break;
		}

	return mp;
}

Tween.prototype.getProperties = function() {
	// return properties.toArray(new IProperty[properties.length]);
	return this.properties;
}

Tween.prototype.getPropertyCount = function() {
	return this.properties.length;
}

Tween.prototype.getPropertyName = function(_index) {
	return this.properties[_index].getName();
}

Tween.prototype.getPropertyNames = function() {
	if (this.properties.length > 1) {
		var propertyNames = [];

		for (i = 1; i < properties.length - 1; i++)
			propertyNames.push(this.properties[i + 1].getName());

		return propertyNames;
	} else
		return [];
}

Tween.prototype.dispatchMotionStartedEvent = function() {
	console.log('dispatchMotionStartedEvent');
}

Tween.prototype.dispatchMotionEndedEvent = function() {
	console.log('dispatchMotionEndedEvent');
}

Tween.prototype.dispatchMotionChangedEvent = function() {
	console.log('dispatchMotionChangedEvent');
}

Tween.prototype.dispatchMotionRepeatedEvent = function() {
 	console.log('dispatchMotionRepeatedEvent');
}

Tween.prototype.toString = function() { 
	return "Tween[time = " + this._delay + ", duration = " + this.getDuration()
			+ "]"; 
}
