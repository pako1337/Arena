requirejs.config({
    baseUrl: "/Scripts/FightArena",
    paths: {
        "signalr.core": "/Scripts/jquery.signalR-2.1.2",
        "signalr.hubs": "/signalr/hubs?" // needs ? to avoid requireJs automatically adding extension
    },
    shim: {
        "signalr.core": {
            exports: "$.connection"
        },
        "signalr.hubs": {
            deps: ["signalr.core"]
        }
    }
});

require(["signalr.hubs", "Arena"], function (_hub, Arena) {
    var fightHub = $.connection.fightArenaHub;
    var arenaElement = document.getElementById("Arena");

    arena = new Arena(arenaElement);

    fightHub.client.newUser = function (p) {
        arena.addPlayer(p);
        refreshPlayersList(arena);
    };
    fightHub.client.updatePlayer = function (p) {
        arena.updatePlayer(p);
    };
    fightHub.client.userExit = function (id) {
        arena.removePlayer(id);
        refreshPlayersList(arena);
    };

    fightHub.client.playerStatusChanged = function (player) {
        arena.updatePlayer(player);
        refreshPlayersList(arena);
    };

    $.connection.hub.start().done(function () {
        window.onbeforeunload = function () { $.connection.hub.stop(); };

        fightHub.server.register();

        arenaElement.onmousedown = function () {
            fightHub.server.moveUser(event.offsetX, event.offsetY);
        };

        document.getElementById("MarkAsReady").onclick = function () {
            fightHub.server.markAsReady();
            return false;
        };
    });

    function refreshPlayersList(arena) {
        var playersListTemplate = document.getElementById("PlayersListTemplate");
        var playersList = Mustache.render(playersListTemplate.innerHTML, arena);
        document.getElementById("PlayersList").innerHTML = playersList;
    }
});