define("Arena", function () {
    function Arena(arenaDispaly) {
        this.arena = arenaDispaly.getContext("2d");
        this.size = { x: arenaDispaly.width, y: arenaDispaly.height };
        this.playerTokens = [];

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
            for (var i = 0; i < this.playerTokens.length; i++) {
                var player = this.playerTokens[i];
                this.arena.fillRect(player.Position.X, player.Position.Y, player.Size.X, player.Size.Y);
            }
        },

        addPlayer: function (playerTokens) {
            for (var i = 0; i < playerTokens.length; i++) {
                this.playerTokens.push(playerTokens[i]);
            }
        },

        removePlayer: function (id) {
            var player = this.playerTokens.filter(function (e) { return e.Id === id });
            if (player.length == 0)
                return;

            var playerIndex = this.playerTokens.indexOf(player);
            this.playerTokens.splice(playerIndex, 1);
        },

        updatePlayer: function (player) {
            var playerToUpdate = this.playerTokens.filter(function (e) { return e.Id === player.Id });
            if (playerToUpdate.length == 0)
                return;

            playerToUpdate[0].Position = player.Position;
        },
    }

    return Arena;
});