define("Arena", function () {
    function Arena(arenaDispaly) {
        this.arena = arenaDispaly.getContext("2d");
        this.size = { x: arenaDispaly.width, y: arenaDispaly.height };
        this.players = [];
        this.animatingTurnEnded = false;

        var self = this;

        self.turnEnded = function () {
            self.animatingTurnEnded = true;
            self.startTime = window.performance.now();
        };

        var update = function (time) {
            self.arena.clearRect(0, 0, self.size.x, self.size.y);

            var animationLength = 1000;
            var animationPoint = 0;
            if (self.animatingTurnEnded) {
                animationPoint = time - self.startTime;
                self.animatingTurnEnded = (animationPoint < animationLength);
            }


            for (var i = 0; i < self.players.length; i++) {
                var player = self.players[i].Token;
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

                paintPlayer(currentPosition, player.Size, movePath.slice(startIndex+1));
            }

            requestAnimationFrame(update);
        };

        var paintPlayer = function (position, size, movePath) {
            self.arena.fillRect(position.X, position.Y, size.X, size.Y);

            self.arena.strokeStyle = "#777";
            self.arena.beginPath();
            self.arena.moveTo(position.X, position.Y);
            for (var j = 0; j < movePath.length; j++) {
                var pathPoint = movePath[j];
                self.arena.lineTo(pathPoint.X, pathPoint.Y);
            }
            self.arena.stroke();
        }

        requestAnimationFrame(update);
    }

    Arena.prototype = {

        addPlayer: function (players) {
            for (var i = 0; i < players.length; i++) {
                this.players.push(players[i]);
            }
        },

        removePlayer: function (id) {
            var player = this.players.filter(function (e) { return e.Id === id; });
            if (player.length === 0)
                return;

            var playerIndex = this.players.indexOf(player);
            this.players.splice(playerIndex, 1);
        },

        updatePlayer: function (player) {
            var playerToUpdate = this.players.filter(function (e) { return e.Id === player.Id; });
            if (playerToUpdate.length === 0)
                return;

            var playerIndex = this.players.indexOf(playerToUpdate[0]);
            this.players[playerIndex] = player;
        },
    };

    return Arena;
});