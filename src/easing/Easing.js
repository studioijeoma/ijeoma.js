Quad = function(){};
Quad.In = function(t) {
    return (t /= 1) * t;
};
Quad.Out = function(t) {
    return -(t /= 1) * (t - 2);
};
Quad.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t;
    return -.5 * ((--t) * (t - 2) - 1);
};

Cubic = function(){};
Cubic.In = function(t) {
    return (t /= 1) * t * t;
};
Cubic.Out = function(t) {
    return ((t = t / 1 - 1) * t * t + 1);
};
Cubic.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t;
    return .5 * ((t -= 2) * t * t + 2);
};

Quart = function(){};
Quart.In = function(t) {
    return (t /= 1) * t * t * t;
};
Quart.Out = function(t) {
    return -((t = t / 1 - 1) * t * t * t - 1);
};
Quart.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t * t;
    return -.5 * ((t -= 2) * t * t * t - 2);
};

Quint = function(){};
Quint.In = function(t) {
    return (t /= 1) * t * t * t * t;
};
Quint.Out = function(t) {
    return ((t = t / 1 - 1) * t * t * t * t + 1);
};
Quint.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return .5 * t * t * t * t * t;
    return .5 * ((t -= 2) * t * t * t * t + 2);
};

Sine = function(){};
Sine.In = function(t) {
    return -Math.cos(t / 1 * (Math.PI / 2)) + 1;
};
Sine.Out = function(t) {
    return Math.sin(t / 1 * (Math.PI / 2));
};
Sine.InOut = function(t) {
    return -.5 * (Math.cos(Math.PI * t / 1) - 1);
};

Expo = function(){};
Expo.In = function(t) {
    return (t == 0) ? 0 : Math.pow(2, 10 * (t / 1 - 1));
};
Expo.Out = function(t) {
    return (t == 1) ? 1 : (-Math.pow(2, -10 * t / 1) + 1);
};
Expo.InOut = function(t) {
    if (t == 0) return 0;
    if (t == 1) return 1;
    if ((t /= 1 / 2) < 1) return .5 * Math.pow(2, 10 * (t - 1));
    return .5 * (-Math.pow(2, -10 * --t) + 2);
};

Circ = function(){};
Circ.In = function(t) {
    return -(Math.sqrt(1 - (t /= 1) * t) - 1);
};
Circ.Out = function(t) {
    return Math.sqrt(1 - (t = t / 1 - 1) * t);
};
Circ.InOut = function(t) {
    if ((t /= 1 / 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
    return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};

Elastic = function(){};
Elastic.In = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = .3;
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
};
Elastic.Out = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1) == 1) return 1;
    if (!p) p = .3;
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
};
Elastic.InOut = function(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t == 0) return 0;
    if ((t /= 1 / 2) == 2) return 1;
    if (!p) p = (.3 * 1.5);
    if (a < Math.abs(1)) {
        a = 1;
        var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;
};

Back = function(){};
Back.In = function(t, s) {
    if (s == undefined) s = 1.70158;
    return (t /= 1) * t * ((s + 1) * t - s);
};
Back.Out = function(t, s) {
    if (s == undefined) s = 1.70158;
    return ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
};
Back.InOut = function(t, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= 1 / 2) < 1) return .5 * (t * t * (((s *= (1.525)) + 1) * t - s));
    return .5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
};

Bounce = function(){};
Bounce.In = function(t) {
    return 1 - Bounce.Out(1 - t, 0);
};
Bounce.Out = function(t) {
    if ((t /= 1) < (1/2.75)) {
        return (7.5625 * t * t);
    } else if (t < (2 / 2.75)) {
        return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
    } else if (t < (2.5 / 2.75)) {
        return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
    } else {
        return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
    }
};
Bounce.InOut = function(t) {
    if (t < .5) return Bounce.In (t * 2, 0) * .5;
    return Bounce.Out(t * 2 - 1, 0) * .5 + .5;
}