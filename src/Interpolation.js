(function(MOTION, undefined) {  
    MOTION.Interoplation = function() {}

    MOTION.Interoplation.Linear = function(y1, y2, t) {
        return (y1 * (1 - t) + y2 * t);
    };

    // MOTION.Interoplation.Smoothstep = function(y1, y2, t) {
    //     // return (y1 * (1 - t) + y2 * t);
    //     // ((x) * (x) * (3 - 2 * (x)))
    // };

    MOTION.Interoplation.Cosine = function(y1, y2, t) {
        var t2 = (1 - PApplet.cos(t * PConstants.PI)) / 2;
        return (y1 * (1 - t2) + y2 * t2);
    };

    MOTION.Interoplation.Cubic = function(y0, y1, y2, y3, t) {
        var a0, a1, a2, a3, t2;
        t2 = t * t;
        a0 = y3 - y2 - y0 + y1;
        a1 = y0 - y1 - a0;
        a2 = y2 - y0;
        a3 = y1;
        //http://paulbourke.net/miscellaneous/interpolation/
        //     a0 = -0.5*y0 + 1.5*y1 - 1.5*y2 + 0.5*y3;
        // a1 = y0 - 2.5*y1 + 2*y2 - 0.5*y3;
        // a2 = -0.5*y0 + 0.5*y2;
        // a3 = y1;
        return (a0 * t * t2 + a1 * t2 + a2 * t + a3);
    };

    /*
     * Tension: 1 is high, 0 normal, -1 is low Bias: 0 is even, positive is
     * towards first segment, negative towards the other
     */
    MOTION.Interoplation.Hermite = function(y0, y1, y2, y3, t, tension, bias) {
        if(!tension)
            tension = 0;

        if(!bias)
            bias = 0; 

        var m0, m1, t2, t3;
        var a0, a1, a2, a3;
        t2 = t * t;
        t3 = t2 * t;
        m0 = (y1 - y0) * (1 + bias) * (1 - tension) / 2;
        m0 += (y2 - y1) * (1 - bias) * (1 - tension) / 2;
        m1 = (y2 - y1) * (1 + bias) * (1 - tension) / 2;
        m1 += (y3 - y2) * (1 - bias) * (1 - tension) / 2;
        a0 = 2 * t3 - 3 * t2 + 1;
        a1 = t3 - 2 * t2 + t;
        a2 = t3 - t2;
        a3 = -2 * t3 + 3 * t2;
        return (a0 * y1 + a1 * m0 + a2 * m1 + a3 * y2);
    };
})(MOTION);
