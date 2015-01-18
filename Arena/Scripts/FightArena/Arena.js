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

        this.updatePlayer = function (id, player) {
            var playerToken = document.getElementById(id);
            if (playerToken == undefined || playerToken == null) return;
            setPosition(playerToken, player.Position);
        };

        var createElement = function (player) {
            var playerToken = document.createElement("div");
            playerToken.style.cssText = "position:absolute;background-color:red;";
            playerToken.textContent = player.Id;
            playerToken.id = player.Id;
            setPosition(playerToken, player.Position);
            arena.appendChild(playerToken);
            return playerToken;
        };

        var setPosition = function(element, position) {
            element.style.left = position.X + "px";
            element.style.top =  position.Y + "px";
        }
    };

    return Arena;
});