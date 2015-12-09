var tankOnePath = ["r", "r", "l", "r", "d", "d", "d", "u", "r", "r", "l", "u", "d"],
    tankTwoPath = ["l", "r", "d", "d", "d", "u", "r", "r", "l", "u", "d", "u", "r"],
    boardSize = 880, // In pixels
    squaresAcross = 10,
    squareSize = boardSize / squaresAcross;

var jetpackPower = 0.5,
    horizontalMovement = jetpackPower / 3,
    firePower = 15,
    firePowerDeviation = firePower / 20;

var lorina = new l.lorina();
lorina.setTitle("Tanks")
    .setColor("#ed7656")
    .setDomSize(boardSize, boardSize)
    .setDomPosition(0, 0) // Position on the screen
    .appendCanvas();

var tool = new l.tool();
var keyboard = new l.keyboard();
var pencil = new l.pencil();

var tankOne = new l.entity();
tankOne.setSprite("images/tank.png", true, true)
    .setPosition(0 + 88 / 2, 0 + 88 / 2)
    .setAnchor(88 / 2, 88 / 2);

tankOne.facing = "right";
tankOne.canShoot = "true";
tankOne.reloadTime = 250;

var tankTwo = new l.entity();
tankTwo.setSprite("images/tank.png", true, true)
    .setPosition(squareSize * 5 + 88 / 2, squareSize * 5 + 88 / 2)
    .setAnchor(88 / 2, 88 / 2);

tankTwo.facing = "left";
tankTwo.canShoot = "true";
tankTwo.reloadTime = 250;

var step = 0,
    canStep = true;

setInterval(function() {
    step++;
    canStep = true;
}, 1000);

var main = function() {
    if (canStep) {
        canStep = false;

        if (tankOnePath[step] == "u") {
            tankOne.rotateTo(0).snapTo(tankOne.x, tankOne.y - squareSize);
        } else if (tankOnePath[step] == "d") {
            tankOne.rotateTo(180).snapTo(tankOne.x, tankOne.y + squareSize);
        } else if (tankOnePath[step] == "l") {
            tankOne.rotateTo(90).snapTo(tankOne.x - squareSize, tankOne.y);
        } else if (tankOnePath[step] == "r") {
            tankOne.rotateTo(270).snapTo(tankOne.x + squareSize, tankOne.y);
        }

        if (tankTwoPath[step] == "u") {
            tankTwo.steer().snapTo(tankTwo.x, tankTwo.y - squareSize);
        } else if (tankTwoPath[step] == "d") {
            tankTwo.rotateTo(180).snapTo(tankTwo.x, tankTwo.y + squareSize);
        } else if (tankTwoPath[step] == "l") {
            tankTwo.rotateTo(90).snapTo(tankTwo.x - squareSize, tankTwo.y);
        } else if (tankTwoPath[step] == "r") {
            tankTwo.rotateTo(270).snapTo(tankTwo.x + squareSize, tankTwo.y);
        }
    }

    lorina.blank();

    pencil.setColor("#bada55");

    for (var i = 0; i < squaresAcross; i++) {
        pencil.setPosition(squareSize * i, 0).setEndPosition(squareSize * i, l.globals.dom.height).strokeLine();
    }

    for (var i = 0; i < squaresAcross; i++) {
        pencil.setPosition(0, squareSize * i).setEndPosition(l.globals.dom.width, squareSize * i).strokeLine();
    }

    tankOne.contain().buffer(); //.debug();
    tankTwo.contain().buffer();
    lorina.draw();
};

lorina.start(main);
