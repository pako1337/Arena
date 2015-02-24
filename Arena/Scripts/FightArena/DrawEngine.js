define("DrawEngine", ["Vector"], function (vector) {
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
                movePlayerToNewPosition(player, deltaT);
                paintPlayer(player.CurrentPosition, player.Size, player.MovePath.slice(player.CurrentIndex));
            }

            lastTime = time;
            requestAnimationFrame(update);
        };

        var movePlayerToNewPosition = function (player, deltaT) {
            if (player.CurrentPosition === undefined) {
                player.CurrentPosition = player.Position;
                player.CurrentIndex = 0;
            }

            var endPoint = player.MovePath[player.CurrentIndex];
            if (endPoint == undefined)
                return;

            var distance = vectorRemove(endPoint, player.CurrentPosition);
            var moveDistance = calculateMoveDistance(distance, deltaT);

            player.CurrentPosition = vectorAdd(player.CurrentPosition, moveDistance);

            if (hasReachedEnd(distance, player.CurrentPosition, endPoint)) {
                pointPlayerToNextTarget(player, endPoint);
            }

        }

        var calculateMoveDistance = function (distance, deltaT) {
            var moveLength = vectorLength(distance);

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
            while (endPoint && vectorsAreEqual(player.CurrentPosition, endPoint)) {
                player.CurrentIndex++;
                endPoint = player.MovePath[player.CurrentIndex];
            }
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