﻿define("ArenaController", ["Arena"], function (Arena) {
    function ArenaController(arenaHub) {
        var arenaElement = document.getElementById("Arena");
        var arena = new Arena(arenaElement);
        var fightHub = arenaHub;
        
        this.subscribe = function() {
            fightHub.client.newUser = function (player) {
                arena.addPlayer(player);
                refreshPlayersList(arena);
            };

            fightHub.client.updatePlayer = function (players) {
                for (var i = 0; i < players.length; i++) {
                    arena.updatePlayer(players[i]);
                }
                refreshPlayersList();
            };

            fightHub.client.userExit = function (id) {
                arena.removePlayer(id);
                refreshPlayersList();
            };

            fightHub.client.turnEnded = function () {
                arena.turnEnded();
            }
        }

        this.connected = function () {
            fightHub.server.register();
        }

        document.getElementById("MarkAsReady").onclick = function () {
            fightHub.server.markAsReady();
            return false;
        };

        function refreshPlayersList() {
            var playersListTemplate = document.getElementById("PlayersListTemplate");
            var playersList = Mustache.render(playersListTemplate.innerHTML, arena);
            document.getElementById("PlayersList").innerHTML = playersList;
        }

        arenaElement.onmousedown = function (e) {
            e = e || window.event;

            var target = e.target || e.srcElement,
            style = target.currentStyle || window.getComputedStyle(target, null),
            rect = target.getBoundingClientRect(),
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;

            fightHub.server.moveUser(parseInt(offsetX), parseInt(offsetY));
        }
    };

    return ArenaController;
});