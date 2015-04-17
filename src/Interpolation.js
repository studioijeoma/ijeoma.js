(function(MOTION, undefined) {
    MOTION.Interoplation = function() {}

    MOTION.Interoplation.Linear = function(t, y1, y2) {
        return (y1 * (1 - t) + y2 * t);
    };

    // MOTION.Interoplation.Smoothstep = function(t,y1, y2) {
    //     // return (y1 * (1 - t) + y2 * t);
    //     // ((x) * (x) * (3 - 2 * (x)))
    // };

    MOTION.Interoplation.Cosine = function(t, y1, y2) {
        var t2 = (1 - PApplet.cos(t * PConstants.PI)) / 2;
        return (y1 * (1 - t2) + y2 * t2);
    };

    MOTION.Interoplation.Cubic = function(t, y0, y1, y2, y3) {
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
    MOTION.Interoplation.Hermite = function(t, y0, y1, y2, y3, tension, bias) {
        debugger
        if (tension == undefined) tension = 0;
        if (bias == undefined) bias = 0;

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

    MOTION.Interoplation.getPointsAt = function(t, points, count) {
        if (count == undefined || count != 2 || count != 4) count = 4;

        var segmentSize = 1 / points.length
        var segmentIndex = Math.floor(map(t, 0, 1, 0, points.length));
        var segmentT = map(t, segmentIndex * segmentSize, (segmentIndex + 1) * segmentSize, 0, 1);

        var p1, p2, p3, p4;

        p2 = points[segmentIndex];
        p3 = points[segmentIndex + 1];

        if (count == 2)
            return [p2, p3]

        p1 = p4 = 0;

        if (segmentIndex == 0) {
            var segmentBegin = points[0];
            var segmentEnd = points[1];
            var segmentSlope = segmentEnd - segmentBegin;
            p1 = segmentEnd - segmentSlope;
        } else {
            p1 = points[segmentIndex - 1];
        }

        if (segmentIndex == points.length - 1) {
            var segmentBegin = points[points.length - 2];
            var segmentEnd = points[points.length - 1];
            var segmentSlope = segmentEnd - segmentBegin;
            p4 = segmentEnd + segmentSlope;
        } else {
            p4 = points[segmentIndex + 1];
        }

        debugger

        return [p1, p2, p3, p4]
    };

    MOTION.Interoplation.getInterpolationAt = function(t, points, interpolation) {
        if (interpolation == undefined) interpolation = MOTION.Interoplation.Linear   
        return interpolation(this.getPointsAt(t, points))
    }

})(MOTION);
