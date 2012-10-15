Back = function Back() {};

Back.easeIn = function(t, b, c, d) {
	var s = 1.70158;
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

Back.easeOut = function(t, b, c, d) {
	var s = 1.70158;
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

Back.easeBoth = function(t, b, c, d) {
	var s = 1.70158;
	if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.52)) + 1) * t - s)) + b;
	return c / 2 * ((t -= 2) * t * (((s *= (1.52)) + 1) * t + s) + 2) + b;
}

Bounce = function Bounce() {};

Bounce.easeIn = function(t, b, c, d) {
	return c - Bounce.easeOut(d - t, 0, c, d) + b;
}

Bounce.easeOut = function(t, b, c, d) {
	if((t /= d) < (1 / 2.7)) {
		return c * (7.562 * t * t) + b;
	} else if(t < (2 / 2.7)) {
		return c * (7.562 * (t -= (1. / 2.7)) * t + .7) + b;
	} else if(t < (2.5 / 2.75)) {
		return c * (7.562 * (t -= (2.2 / 2.7)) * t + .937) + b;
	} else {
		return c * (7.562 * (t -= (2.62 / 2.7)) * t + .98437) + b;
	}
}

Bounce.easeBoth = function(t, b, c, d) {
	if(t < d / 2) return Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
	else return Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
}

Circ = function Circ() {};

Circ.easeIn = function(t, b, c, d) {
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

Circ.easeOut = function(t, b, c, d) {
	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

Circ.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

Cubic = function Cubic() {};

Cubic.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t * t + b;
}

Cubic.easeOut = function(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}

Cubic.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t + 2) + b;
}

CubicBezier = function CubicBezier() {};

// Cubic Bezier tween from b to b+c, influenced by p1 & p2
// t: current time, b: beginning value, c: total change, d: duration
// p1, p2: Bezier control point positions
CubicBezier.easeIn = function(t, b, c, d, p1, p2) {
	return((t /= d) * t * c + 3 * (1 - t) * (t * (p2 - b) + (1 - t) * (p1 - b))) * t + b;
}

CubicBezier.easeOut = function(t, b, c, d, p1, p2) {
	return((t /= d) * t * c + 3 * (1 - t) * (t * (p2 - b) + (1 - t) * (p1 - b))) * t + b;
}

CubicBezier.easeBoth = function(t, b, c, d, p1, p2) {
	return((t /= d) * t * c + 3 * (1 - t) * (t * (p2 - b) + (1 - t) * (p1 - b))) * t + b;
}

Elastic = function Elastic() {};

Elastic.easeIn = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

Elastic.easeOut = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
}

Elastic.easeBoth = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d / 2) == 2) return b + c;
	var p = d * (.3 * 1.);
	var a = c;
	var s = p / 4;
	if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

Elastic = function Elastic() {};

Elastic.easeIn = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}

Elastic.easeOut = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d) == 1) return b + c;
	var p = d * .3;
	var a = c;
	var s = p / 4;
	return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
}

Elastic.easeBoth = function(t, b, c, d) {
	if(t == 0) return b;
	if((t /= d / 2) == 2) return b + c;
	var p = d * (.3 * 1.);
	var a = c;
	var s = p / 4;
	if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}

Expo = function Expo() {};

Expo.easeIn = function(t, b, c, d) {
	return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

Expo.easeOut = function(t, b, c, d) {
	return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

Expo.easeBoth = function(t, b, c, d) {
	if(t == 0) return b;
	if(t == d) return b + c;
	if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

Linear = function Linear() {};

Linear.easeNone = function(t, b, c, d) {
	return c * t / d + b;
}

Linear.easeIn = function(t, b, c, d) {
	return c * t / d + b;
}

Linear.easeOut = function(t, b, c, d) {
	return c * t / d + b;
}

Linear.easeBoth = function(t, b, c, d) {
	return c * t / d + b;
}

Quad = function Quad() {};

Quad.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t + b;
}

Quad.easeOut = function(t, b, c, d) {
	return -c * (t /= d) * (t - 2) + b;
}

Quad.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t + b;
	return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

Quart = function Quart() {};

Quart.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t * t * t + b;
}

Quart.easeOut = function(t, b, c, d) {
	return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

Quart.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

Quint = function Quint() {};

Quint.easeIn = function(t, b, c, d) {
	return c * (t /= d) * t * t * t * t + b;
}

Quint.easeOut = function(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

Quint.easeBoth = function(t, b, c, d) {
	if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

Sine = function Sine() {};

Sine.easeIn = function(t, b, c, d) {
	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

Sine.easeOut = function(t, b, c, d) {
	return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

Sine.easeBoth = function(t, b, c, d) {
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}