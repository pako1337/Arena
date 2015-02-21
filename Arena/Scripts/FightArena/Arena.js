define("Arena", ["DrawEngine"], function (DrawEngine) {
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

    return Arena;
});