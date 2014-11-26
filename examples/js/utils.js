TWO_PI = Math.PI * 2;

function radians(degrees) {
    return degrees * (Math.PI / 180);
}

function random(min, max) {
    if (arguments.length === 0)
        return Math.random();
    else if (arguments.length === 1)
        return Math.random() * min;
    else
        return Math.random() * (max - min) + min;
};

function roundRandom(min, max) {
    if (arguments.length === 0)
        return random() | 0;
    else if (arguments.length === 1)
        return random(min) | 0;
    else
        return random(min, max) | 0;
}

function randomColor(useAlpha) {
    var r = 255 * Math.random() | 0,
        g = 255 * Math.random() | 0,
        b = 255 * Math.random() | 0,
        a = (!useAlpha) ? 1 : random(0, 1);

    return {
        r: r,
        g: g,
        b: b,
        a: a,
        toString: function() {
            return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
        }
    }
}

function randomBW(useAlpha) {
    var bw = 255 * Math.random() | 0;
    a = (!useAlpha) ? 1 : random(0, 1);

    return {
        r: bw,
        g: bw,
        b: bw,
        a: a,
        toString: function() {
            return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
        }
    }
}

function lerp(start, end, t) {
    return t * (end - start) + start;
};

function lerpColor(start, end, t) {
    return {
        r: lerp(start.r, end.r, t) | 0,
        g: lerp(start.g, end.g, t) | 0,
        b: lerp(start.b, end.b, t) | 0,
        toString: function() {
            return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
        }
    }
}