define("Arena", function () {
    function Arena(arenaDispaly) {
        this.arena = arenaDispaly.getContext("2d");
        this.size = { x: arenaDispaly.width, y: arenaDispaly.height };
        this.players = [];

        var self = this;
        var tick = function () {
            self.update();
            requestAnimationFrame(tick);
        }

        tick();
    };

    Arena.prototype = {
        update: function() {
            this.arena.clearRect(0, 0, this.size.x, this.size.y);
            for (var i = 0; i < this.players.length; i++) {
                var player = this.players[i].PlayerToken;
                this.arena.fillRect(player.Position.X, player.Position.Y, player.Size.X, player.Size.Y);
            }
        },

        addPlayer: function (players) {
            for (var i = 0; i < players.length; i++) {
                this.players.push(players[i]);
            }
        },

        removePlayer: function (id) {
            var player = this.players.filter(function (e) { return e.PlayerToken.Id === id });
            if (player.length == 0)
                return;

            var playerIndex = this.players.indexOf(player);
            this.players.splice(playerIndex, 1);
        },

        updatePlayer: function (player) {
            var playerToUpdate = this.players.filter(function (e) { return e.PlayerToken.Id === player.Id });
            if (playerToUpdate.length == 0)
                return;

            playerToUpdate[0].PlayerToken.Position = player.Position;
        },
    }

    return Arena;
});