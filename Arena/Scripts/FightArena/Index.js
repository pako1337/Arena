$(function () {
    var fightHub = $.connection.fightArenaHub;
    var arena = document.getElementById("Arena");

    fightHub.client.newUser = function (connectionId) {
        console.log("new user " + connectionId);
        createElement(connectionId);
    };

    fightHub.client.userExit = function (connectionId) {
        console.log("user disconnected " + connectionId);
        var user = document.getElementById(connectionId);
        arena.removeChild(user);
    }

    fightHub.client.moveUser = function (connectionId, x, y) {
        var user = document.getElementById(connectionId);
        if (user == undefined || user == null) return;
        user.style.left = x + "px";
        user.style.top = y + "px";
    }

    var createElement = function (connectionId) {
        connectionId = connectionId || "myself";
        var indicator = document.createElement("div");
        indicator.style.cssText = "position:absolute;background-color:red;";
        indicator.textContent = connectionId;
        indicator.id = connectionId;
        arena.appendChild(indicator);
        return indicator;
    };

    window.onbeforeunload = function () {
        $.connection.hub.stop();
    }

    $.connection.hub.start().done(function () {
        fightHub.server.register();

        var indicator = createElement();
        arena.onmousedown = function () {
            fightHub.server.moveUser(event.clientX, event.clientY);

            indicator.style.left = event.clientX + "px";
            indicator.style.top = event.clientY + "px";
        };
    });
});