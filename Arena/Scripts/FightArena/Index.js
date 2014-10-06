requirejs.config({
    baseUrl: "/Scripts/FightArena"
});

require(["Arena"], function (Arena) {
    var fightHub = $.connection.fightArenaHub;
    var arenaElement = document.getElementById("Arena");

    arena = new Arena(arenaElement)

    fightHub.client.newUser = function (connectionId) {
        console.log("new user " + connectionId);
        arena.addPlayer(connectionId);
    };

    fightHub.client.userExit = function (connectionId) {
        console.log("user disconnected " + connectionId);
        arena.removePlayer(connectionId);
    }

    fightHub.client.moveUser = function (connectionId, x, y) {
        arena.movePlayer(connectionId, x, y);
    }

    window.onbeforeunload = function () {
        $.connection.hub.stop();
    }

    $.connection.hub.start().done(function () {
        fightHub.server.register();

        var indicator = arena.addPlayer("myself");
        arenaElement.onmousedown = function () {
            fightHub.server.moveUser(event.clientX, event.clientY);
            arena.movePlayer("myself", event.clientX, event.clientY);
        };
    });
});