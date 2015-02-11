define("Arena", function () {
    function Arena(arenaDispaly) {
        this.arena = arenaDispaly.getContext("2d");
        this.size = { x: arenaDispaly.width, y: arenaDispaly.height };
        this.players = [];

        var self = this;
        var tick = function () {
            self.update();
            requestAnimationFrame(tick);
        };

        tick();
    }

    Arena.prototype = {
        update: function () {
            this.arena.clearRect(0, 0, this.size.x, this.size.y);
            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i].Token;
                this.arena.fillRect(player.Position.X, player.Position.Y, player.Size.X, player.Size.Y);

                this.arena.strokeStyle = "#777";
                this.arena.beginPath();
                this.arena.moveTo(player.Position.X, player.Position.Y);
                for (var j = 0; j < player.MovePath.length; j++) {
                    var pathPoint = player.MovePath[j];
                    this.arena.lineTo(pathPoint.X, pathPoint.Y);
                }
                this.arena.stroke();
            }
        },

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