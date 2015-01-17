define("Arena", function () {
    function Arena(arena) {

        this.addPlayer = function (players) {
            for (var i = 0; i < players.length; i++) {
                createElement(players[i]);
            }
        };

        this.removePlayer = function (id) {
            var user = document.getElementById(id);
            if (user === null) return;
            arena.removeChild(user);
        };

        this.movePlayer = function (id, x, y) {
            var user = document.getElementById(id);
            if (user == undefined || user == null) return;
            user.style.left = x + "px";
            user.style.top  = y + "px";
        };

        var createElement = function (player) {
            var indicator = document.createElement("div");
            indicator.style.cssText = "position:absolute;background-color:red;";
            indicator.textContent = player.Id;
            indicator.id = player.Id;
            arena.appendChild(indicator);
            return indicator;
        };
    };

    return Arena;
});