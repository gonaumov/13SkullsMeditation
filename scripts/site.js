(function createSkulls(white) {
    var usedSkulls = document.querySelectorAll('.skull');

    [].forEach.call(usedSkulls, function(skull) {
        skull.parentNode.removeChild(skull);
    });

    var bigSkull = document.createElement("img");
    var left = (window.innerWidth / 2) - (bigSkull.width / 2);
    var tops = (window.innerHeight / 2) - (bigSkull.height / 2);
    var skullSrc, smallSkullSrc;
    if(white) {
        document.body.style.backgroundColor = "white";
        skullSrc = "images/whiteSkull.png";
        smallSkullSrc = "images/whiteSkullSmall.png";
        white = false;
    } else {
        document.body.style.backgroundColor = "black";
        skullSrc = "images/blackSkull.png";
        smallSkullSrc = "images/blackSkullSmall.png";
        white = true;
    }

    bigSkull.setAttribute("src", skullSrc);

    var steps = 360 / 12;
    var radius = 230;

    var promise = new Promise(
        function (resolve) {
            (function createCurrentSkull(i) {
                if (i <= 360) {
                    var smallSkull = document.createElement("img");
                    smallSkull.setAttribute("src", smallSkullSrc);
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
        var animationEndHandler = function () {
            createSkulls(white);
        };

        bigSkull.addEventListener("animationend", animationEndHandler);
        bigSkull.addEventListener("webkitAnimationEnd", animationEndHandler);
        bigSkull.addEventListener("oAnimationEnd", animationEndHandler);
        document.body.appendChild(bigSkull);
    });
}(true));