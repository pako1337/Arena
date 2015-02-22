define("DrawEngine", function() {
    function DrawEngine(arenaDisplay, arena) {
        this.arena = arena;
        this.display = arenaDisplay.getContext("2d");

        var size = { width: arenaDisplay.width, height: arenaDisplay.height };
        var lastTime = 0;

        var self = this;

        var update = function (time) {
            if (lastTime === 0) lastTime = time;
            self.display.clearRect(0, 0, size.width, size.height);

            var animationLength = 1000;
            var speed = 10;
            var deltaT = time - lastTime;
            var animationPoint = 0;
            if (self.arena.animatingTurnEnded) {
                animationPoint = time - self.arena.startTime;
                self.arena.animatingTurnEnded = (animationPoint < animationLength);
            }

            for (var i = 0; i < self.arena.players.length; i++) {
                var player = self.arena.players[i].Token;
                if (player.CurrentPosition === undefined) {
                    player.CurrentPosition = player.Position;
                    player.CurrentIndex = 0;
                }

                var currentPosition = player.CurrentPosition;
                var endPoint = player.MovePath[player.CurrentIndex];
                if (endPoint == undefined)
                    endPoint = currentPosition;

                var xDistance = endPoint.X - currentPosition.X;
                var yDistance = endPoint.Y - currentPosition.Y;

                var moveLength = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

                var sin = yDistance / moveLength;
                var cos = xDistance / moveLength;

                currentPosition.X = currentPosition.X + speed * cos;
                currentPosition.Y = currentPosition.Y + speed * sin;

                paintPlayer(currentPosition, player.Size, player.MovePath.slice(player.CurrentIndex));
            }

            last = time;
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