define("Arena", function () {
    function Arena(arenaDispaly) {
        this.players = [];
        this.animatingTurnEnded = false;

        var drawEngine = new DrawEngine(arenaDispaly, this);
        var self = this;

        self.turnEnded = function () {
            self.animatingTurnEnded = true;
            self.startTime = window.performance.now();
        };
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

    return Arena;
});