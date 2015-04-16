(function(MOTION, undefined) {    
    MOTION.Easing = function() {};

    MOTION.Easing.Quad = function() {};
    MOTION.Easing.Quad.In = function(t) {
        return (t /= 1) * t;
    };
    MOTION.Easing.Quad.Out = function(t) {
        return -(t /= 1) * (t - 2);
    };
    MOTION.Easing.Quad.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t;
        return -.5 * ((--t) * (t - 2) - 1);
    };

    MOTION.Easing.Cubic = function() {};
    MOTION.Easing.Cubic.In = function(t) {
        return (t /= 1) * t * t;
    };
    MOTION.Easing.Cubic.Out = function(t) {
        return ((t = t / 1 - 1) * t * t + 1);
    };
    MOTION.Easing.Cubic.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t * t;
        return .5 * ((t -= 2) * t * t + 2);
    };

    MOTION.Easing.Quart = function() {};
    MOTION.Easing.Quart.In = function(t) {
        return (t /= 1) * t * t * t;
    };
    MOTION.Easing.Quart.Out = function(t) {
        return -((t = t / 1 - 1) * t * t * t - 1);
    };
    MOTION.Easing.Quart.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t * t * t;
        return -.5 * ((t -= 2) * t * t * t - 2);
    };

    MOTION.Easing.Quint = function() {};
    MOTION.Easing.Quint.In = function(t) {
        return (t /= 1) * t * t * t * t;
    };
    MOTION.Easing.Quint.Out = function(t) {
        return ((t = t / 1 - 1) * t * t * t * t + 1);
    };
    MOTION.Easing.Quint.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return .5 * t * t * t * t * t;
        return .5 * ((t -= 2) * t * t * t * t + 2);
    };

    MOTION.Easing.Sine = function() {};
    MOTION.Easing.Sine.In = function(t) {
        return -Math.cos(t / 1 * (Math.PI / 2)) + 1;
    };
    MOTION.Easing.Sine.Out = function(t) {
        return Math.sin(t / 1 * (Math.PI / 2));
    };
    MOTION.Easing.Sine.InOut = function(t) {
        return -.5 * (Math.cos(Math.PI * t / 1) - 1);
    };

    MOTION.Easing.Expo = function() {};
    MOTION.Easing.Expo.In = function(t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t / 1 - 1));
    };
    MOTION.Easing.Expo.Out = function(t) {
        return (t == 1) ? 1 : (-Math.pow(2, -10 * t / 1) + 1);
    };
    MOTION.Easing.Expo.InOut = function(t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return .5 * Math.pow(2, 10 * (t - 1));
        return .5 * (-Math.pow(2, -10 * --t) + 2);
    };

    MOTION.Easing.Circ = function() {};
    MOTION.Easing.Circ.In = function(t) {
        return -(Math.sqrt(1 - (t /= 1) * t) - 1);
    };
    MOTION.Easing.Circ.Out = function(t) {
        return Math.sqrt(1 - (t = t / 1 - 1) * t);
    };
    MOTION.Easing.Circ.InOut = function(t) {
        if ((t /= 1 / 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
        return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    };

    MOTION.Easing.Elastic = function() {};
    MOTION.Easing.Elastic.In = function(t) {
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
    MOTION.Easing.Elastic.Out = function(t) {
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
    MOTION.Easing.Elastic.InOut = function(t) {
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

    MOTION.Easing.Back = function() {};
    MOTION.Easing.Back.In = function(t, s) {
        if (s == undefined) s = 1.70158;
        return (t /= 1) * t * ((s + 1) * t - s);
    };
    MOTION.Easing.Back.Out = function(t, s) {
        if (s == undefined) s = 1.70158;
        return ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
    };
    MOTION.Easing.Back.InOut = function(t, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= 1 / 2) < 1) return .5 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return .5 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    };

    MOTION.Easing.Bounce = function() {};
    MOTION.Easing.Bounce.In = function(t) {
        return 1 - MOTION.Easing.Bounce.Out(1 - t, 0);
    };
    MOTION.Easing.Bounce.Out = function(t) {
        if ((t /= 1) < (1 / 2.75)) {
            return (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
            return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
            return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
            return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
    };
    MOTION.Easing.Bounce.InOut = function(t) {
        if (t < .5) return MOTION.Easing.Bounce.In(t * 2, 0) * .5;
        return MOTION.Easing.Bounce.Out(t * 2 - 1, 0) * .5 + .5;
    };

    MOTION.Quad = MOTION.Easing.Quad;
    MOTION.Cubic = MOTION.Easing.Cubic;
    MOTION.Quart = MOTION.Easing.Quart;
    MOTION.Quint = MOTION.Easing.Quint;
    MOTION.Sine = MOTION.Easing.Sine;
    MOTION.Expo = MOTION.Easing.Expo;
    MOTION.Circ = MOTION.Easing.Circ;
    MOTION.Elastic = MOTION.Easing.Elastic;
    MOTION.Back = MOTION.Easing.Back;
    MOTION.Bounce = MOTION.Easing.Bounce;
})(MOTION);