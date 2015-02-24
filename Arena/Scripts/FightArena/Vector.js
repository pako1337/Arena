var vectorsAreEqual = function (a, b) {
    return a.X == b.X && a.Y == b.Y;
};

var vectorLength = function (a) {
    return Math.sqrt(a.X * a.X + a.Y * a.Y);
};

var vectorAdd = function (a, b) {
    return {
        X: a.X + b.X,
        Y: a.Y + b.Y
    };
};

var vectorRemove = function (a, b) {
    return {
        X: a.X - b.X,
        Y: a.Y - b.Y
    };
};