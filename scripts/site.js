(function createSkulls(white) {
    var bigSkull = document.createElement("img");
    var left = (window.innerWidth / 2) - (bigSkull.width / 2);
    var tops = (window.innerHeight / 2) - (bigSkull.height / 2);
    bigSkull.setAttribute("src", "images/whiteSkull.png");

    var steps = 360 / 12;
    var radius = 230;

    var promise = new Promise(
        function (resolve) {
            (function createCurrentSkull(i) {
                if (i <= 360) {
                    var smallSkull = document.createElement("img");
                    smallSkull.setAttribute("src", "images/whiteSkullSmall.png");
                    var smallSkullHeight = smallSkull.height;
                    var smallSkullWidth = smallSkull.width;
                    var x = Math.floor(((left - (bigSkull.width / 2) + (smallSkullWidth / 2)) + radius * Math.cos(i * Math.PI / 180)));
                    var y = Math.floor(((tops - (bigSkull.height / 2) + (smallSkullHeight / 2)) + radius * Math.sin(i * Math.PI / 180)));
                    smallSkull.className = "skull";
                    smallSkull.style.position = "absolute";
                    smallSkull.style.left = x + "px";
                    smallSkull.style.top = y + "px";
                    var animationEndHandler = function () {
                        i += steps;
                        createCurrentSkull(i);
                    };

                    smallSkull.addEventListener("animationend", animationEndHandler);
                    smallSkull.addEventListener("webkitAnimationEnd", animationEndHandler);
                    smallSkull.addEventListener("oAnimationEnd", animationEndHandler);
                    document.body.appendChild(smallSkull);
                } else {
                    resolve();
                }
            }(0));
        });
    promise.then(function () {
        bigSkull.setAttribute("class", "skull");
        bigSkull.setAttribute("style", "position: absolute; left:" +
        (left - (bigSkull.width / 2)) + "px; top: " +
        (tops - (bigSkull.height / 2)) + "px;");
        document.body.appendChild(bigSkull);
    });
}(true));