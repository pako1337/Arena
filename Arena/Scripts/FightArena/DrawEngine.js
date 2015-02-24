define("DrawEngine", function () {
    function DrawEngine(arenaDisplay, arena) {
        this.arena = arena;
        this.display = arenaDisplay.getContext("2d");

        var size = { width: arenaDisplay.width, height: arenaDisplay.height };
        var lastTime = 0;
        var speed = 100;

        var self = this;

        var update = function (time) {
            if (lastTime === 0) lastTime = time;
            self.display.clearRect(0, 0, size.width, size.height);

            var deltaT = time - lastTime;

            for (var i = 0; i < self.arena.players.length; i++) {
                var player = self.arena.players[i].Token;
                if (player.CurrentPosition === undefined) {
                    player.CurrentPosition = player.Position;
                    player.CurrentIndex = 0;
                }

                var endPoint = player.MovePath[player.CurrentIndex];
                if (endPoint == undefined)
                    endPoint = player.CurrentPosition;

                var distance =
                    {
                        X: endPoint.X - player.CurrentPosition.X,
                        Y: endPoint.Y - player.CurrentPosition.Y
                    };

                var moveDistance = calculateMoveDistance(distance, deltaT);

                player.CurrentPosition.X = player.CurrentPosition.X + moveDistance.X;
                player.CurrentPosition.Y = player.CurrentPosition.Y + moveDistance.Y;

                if (hasReachedEnd(distance, player.CurrentPosition, endPoint)) {
                    pointPlayerToNextTarget(player, endPoint);
                }

                paintPlayer(player.CurrentPosition, player.Size, player.MovePath.slice(player.CurrentIndex));
            }

            lastTime = time;
            requestAnimationFrame(update);
        };

        var calculateMoveDistance = function (distance, deltaT) {
            var moveLength = Math.sqrt(distance.X * distance.X + distance.Y * distance.Y);

            var sin = distance.Y / moveLength;
            var cos = distance.X / moveLength;

            return {
                X: speed * deltaT * cos / 1000,
                Y: speed * deltaT * sin / 1000
            };
        };

        var hasReachedEnd = function (distance, currentPosition, endPoint) {
            return distance.X >= 0 && currentPosition.X >= endPoint.X ||
                   distance.X <= 0 && currentPosition.X <= endPoint.X ||
                   distance.Y >= 0 && currentPosition.Y >= endPoint.Y ||
                   distance.Y <= 0 && currentPosition.Y <= endPoint.Y;
        };

        var pointPlayerToNextTarget = function (player, endPoint) {
            player.CurrentPosition.X = endPoint.X;
            player.CurrentPosition.Y = endPoint.Y;
            while (endPoint && pointsAreEqual(player.CurrentPosition, endPoint)) {
                player.CurrentIndex++;
                endPoint = player.MovePath[player.CurrentIndex];
            }
        };

        var pointsAreEqual = function (a, b) {
            return a.X == b.X && a.Y == b.Y;
        };

        var paintPlayer = function (position, size, movePath) {
            self.display.fillRect(position.X, position.Y, size.X, size.Y);
            self.display.strokeStyle = "#777";
            self.display.beginPath();
            self.display.moveTo(position.X, position.Y);
            for (var j = 0; j < movePath.length; j++) {
                var pathPoint = movePath[j];
                self.display.lineTo(pathPoint.X, pathPoint.Y);
            }
            self.display.stroke();
        };

        requestAnimationFrame(update);
    }

    return DrawEngine;
});