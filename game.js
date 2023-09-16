canvas = document.getElementById("game");
ctx = canvas.getContext("2d");
document.addEventListener("keydown", buttonMovements);


let left = 10;
let up = 10;
let loc = 20;
let size = 18;
let upMove = 0;
let leftMove = 0;
let appleLeft = 5;
let appleUp = 5;
let speed = 10;
let snakeLength = 3;
let snakePieces = [];
let score = 0;

class SnakePiece {
    constructor(left, up) {
        this.left = left;
        this.up = up;

    }

}



function drawGame() {
    cleanTheScreen();
    drawTheSnake();
    updateSnakeLocation();
    drawTheApple();
    changeAppleLoc();
    drawScore();
    drawSpeed();


    let result = isGameOver();
    if (result) {
        return;
    }

    setTimeout(drawGame, 1000 / speed);

}

function cleanTheScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
}

function drawTheSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakePieces.length; i++) {
        let pieces = snakePieces[i];
        ctx.fillRect(pieces.left * loc, pieces.up * loc, size, size);
    }
    snakePieces.push(new SnakePiece(left, up));

    if (snakePieces.length > snakeLength) {
        snakePieces.shift();
    }


    ctx.fillStyle = "white";
    ctx.fillRect(left * loc, up * loc, size, size);


}

function updateSnakeLocation() {

    let leftResult = left + leftMove;
    let upResult = up + upMove;

    if (leftResult > 19) {
        left = 0;
    } else if (leftResult < 0) {
        left = 19;
    } else {
        left = leftResult;
    }


    if (upResult > 19) {
        up = 0;
    } else if (upResult < 0) {
        up = 19;
    } else {
        up = upResult;
    }
}

function buttonMovements(e) {
    switch (e.keyCode) {
        case 38: //key code 38 yukarı demektir.
            if (upMove == 1) { return; }
            upMove = -1;
            leftMove = 0;
            break;
        case 40: //key code 40 aşağı demektir.
            if (upMove == -1) { return; }
            upMove = 1;
            leftMove = 0;
            break;
        case 37: //key code 37 sol demektir.
            if (leftMove == 1) { return; }
            upMove = 0;
            leftMove = -1;
            break;
        case 39: //key code 37 sol demektir.
            if (leftMove == -1) { return; }
            upMove = 0;
            leftMove = 1;
            break;
    }

}

function drawTheApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleLeft * loc, appleUp * loc, size, size);

}

function changeAppleLoc() {
    if (left == appleLeft && up == appleUp) {
        appleLeft = Math.floor(Math.random() * loc);
        appleUp = Math.floor(Math.random() * loc);
        snakeLength++;
        score += 10;

        let appleLocSuitable = false;

        while (!appleLocSuitable) {
            appleLocSuitable = true;
            snakePieces.forEach(element => {
                if (element.left === appleLeft && element.up === appleUp) {
                    appleLeft = Math.floor(Math.random() * loc);
                    appleUp = Math.floor(Math.random() * loc);
                    appleLocSuitable = false;
                }
            })
        }
        if (snakeLength % 3 === 0) {
            speed++;
        }
    }
}

function isGameOver() {
    let gameOver = false;

    if (leftMove === 0 && upMove === 0) {
        return;
    }

    for (let i = 0; i < snakePieces.length; i++) {
        let part = snakePieces[i];
        if (part.left === left && part.up === up) {
            gameOver = true;
            break;
        }

    }
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdana";
        ctx.fillText("Game Over!", 400 / 7.7, 200);
    }
    return gameOver;


}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    ctx.fillText(`Score: ${score}`, 270, 30);
}


function drawSpeed() {
    ctx.fillStyle = "white";
    ctx.font = "20px verdana";
    ctx.fillText(`Speed: ${speed}`, 270, 60);
}

function newGame() {
    document.location.reload();

}



drawGame();