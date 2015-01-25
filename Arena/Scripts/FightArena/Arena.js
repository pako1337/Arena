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

        this.addPlayer = function (players) {
            for (var i = 0; i < players.length; i++) {
                self.players.push(players[i]);
            }
        };

        this.removePlayer = function (id) {
        };

        this.updatePlayer = function (id, player) {
        };

        tick();
    };

    Arena.prototype = {
        update: function() {
            this.arena.clearRect(0, 0, this.size.x, this.size.y);
            for (var i = 0; i < this.players.length; i++) {
                this.arena.fillRect(this.players[i].Position.X, this.players[i].Position.Y, 50, 50);
            }
        },
    }

    return Arena;
});