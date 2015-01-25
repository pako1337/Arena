define("Arena", function () {
    function Arena(arenaDispaly) {
        self = this;
        self.arena = arenaDispaly.getContext("2d");

        this.addPlayer = function (players) {
            for (var i = 0; i < players.length; i++) {
                createElement(players[i]);
            }
        };

        this.removePlayer = function (id) {
            var playerToken = document.getElementById(id);
            if (playerToken === null) return;
            arena.removeChild(playerToken);
        };

        this.updatePlayer = function (id, player) {
            var playerToken = document.getElementById(id);
            if (playerToken == undefined || playerToken == null) return;
            setPosition(playerToken, player.Position);
        };

        var createElement = function (player) {
            self.arena.fillRect(player.Position.X, player.Position.Y, 50, 50);            
        };
    };

    return Arena;
});