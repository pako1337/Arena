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

require(["signalr.hubs", "ArenaController"], function (_hub, ArenaController) {
    var fightHub = $.connection.fightArenaHub;
    var arenaController = new ArenaController(fightHub);

    arenaController.subscribe();

    $.connection.hub.error(function (error) {
        console.log('SignalR error: ' + error)
    });

    $.connection.hub.start().done(function () {
        window.onbeforeunload = function () {
            $.connection.hub.stop();
        };

        arenaController.connected();
    });
});