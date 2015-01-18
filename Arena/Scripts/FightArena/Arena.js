define("Arena", function () {
    function Arena(arena) {

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

        this.movePlayer = function (id, x, y) {
            var playerToken = document.getElementById(id);
            if (playerToken == undefined || playerToken == null) return;
            setPosition(playerToken, x, y);
        };

        var createElement = function (player) {
            var playerToken = document.createElement("div");
            playerToken.style.cssText = "position:absolute;background-color:red;";
            playerToken.textContent = player.Id;
            playerToken.id = player.Id;
            setPosition(playerToken, player.Position.X, player.Position.Y);
            arena.appendChild(playerToken);
            return playerToken;
        };

        function setPosition(element, x, y) {
            element.style.left = x + "px";
            element.style.top =  y + "px";
        }
    };

    return Arena;
});