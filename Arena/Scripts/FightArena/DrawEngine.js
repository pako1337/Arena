define("DrawEngine", function() {
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

                var xDistance = endPoint.X - player.CurrentPosition.X;
                var yDistance = endPoint.Y - player.CurrentPosition.Y;

                var moveLength = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

                var sin = yDistance / moveLength;
                var cos = xDistance / moveLength;

                player.CurrentPosition.X = player.CurrentPosition.X + speed * cos * deltaT / 1000;
                player.CurrentPosition.Y = player.CurrentPosition.Y + speed * sin * deltaT / 1000;

                if (xDistance > 0 && player.CurrentPosition.X > endPoint.X ||
                    xDistance < 0 && player.CurrentPosition.X < endPoint.X ||
                    yDistance > 0 && player.CurrentPosition.Y > endPoint.Y ||
                    yDistance < 0 && player.CurrentPosition.Y < endPoint.Y) {
                    player.CurrentIndex++;
                    player.CurrentPosition.X = endPoint.X;
                    player.CurrentPosition.Y = endPoint.Y;
                }

                paintPlayer(player.CurrentPosition, player.Size, player.MovePath.slice(player.CurrentIndex));
            }

            lastTime = time;
            requestAnimationFrame(update);
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
        }

        requestAnimationFrame(update);
    }

    return DrawEngine;
});