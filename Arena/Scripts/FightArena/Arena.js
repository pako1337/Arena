define("Arena", function () {
    function Arena(arena) {

        this.addPlayer = function (id) {
            createElement(id);
        };

        this.removePlayer = function (id) {
            var user = document.getElementById(id);
            arena.removeChild(user);
        };

        this.movePlayer = function (id, x, y) {
            var user = document.getElementById(id);
            if (user == undefined || user == null) return;
            user.style.left = x + "px";
            user.style.top  = y + "px";
        };

        var createElement = function (id) {
            id = id || "myself";
            var indicator = document.createElement("div");
            indicator.style.cssText = "position:absolute;background-color:red;";
            indicator.textContent = id;
            indicator.id = id;
            arena.appendChild(indicator);
            return indicator;
        };
    };

    return Arena;
});