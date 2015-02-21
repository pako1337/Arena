define("DrawEngine", function() {
    function DrawEngine(arenaDisplay, arena) {
        this.arena = arena;
        this.display = arenaDisplay.getContext("2d");

        var size = { width: arenaDisplay.width, height: arenaDisplay.height };

        var self = this;

        var update = function (time) {
            self.display.clearRect(0, 0, size.width, size.height);

            var animationLength = 1000;
            var animationPoint = 0;
            if (self.arena.animatingTurnEnded) {
                animationPoint = time - self.arena.startTime;
                self.arena.animatingTurnEnded = (animationPoint < animationLength);
            }

            for (var i = 0; i < self.arena.players.length; i++) {
                var player = self.arena.players[i].Token;
                var movePath = player.MovePath.slice();
                movePath.unshift(player.Position);

                var segmentDuration = animationLength / movePath.length;
                var startIndex = animationPoint / segmentDuration;
                startIndex = parseInt(startIndex);

                startIndex = Math.min(startIndex, movePath.length - 1);
                var endIndex = Math.min(startIndex + 1, movePath.length - 1);

                var startPoint = movePath[startIndex];
                var endPoint = movePath[endIndex];

                var segmentProgress = (animationPoint % segmentDuration) / segmentDuration;

                var currentPosition =
                    {
                        X: (endPoint.X - startPoint.X) * segmentProgress,
                        Y: (endPoint.Y - startPoint.Y) * segmentProgress
                    };

                if (!isFinite(currentPosition.X))
                    currentPosition.X = 0;
                if (!isFinite(currentPosition.Y))
                    currentPosition.Y = 0;

                currentPosition =
                    {
                        X: startPoint.X + currentPosition.X,
                        Y: startPoint.Y + currentPosition.Y,
                    };

                paintPlayer(currentPosition, player.Size, movePath.slice(startIndex + 1));
            }

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