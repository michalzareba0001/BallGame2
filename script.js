var gameboard = document.getElementById('gameboard');
var gameboardWidth = gameboard.offsetWidth;
var floor = document.getElementById('floor');
var floorBottom = parseInt(window.getComputedStyle(floor).getPropertyValue('bottom'));
var floorHeight = parseInt(window.getComputedStyle(floor).getPropertyValue('height'));
var floorTop = floorBottom + floorHeight;
var ball1 = document.getElementById('ball1');
var ball1Bottom = parseInt(window.getComputedStyle(ball1).getPropertyValue('bottom'));
var ball1Height = parseInt(window.getComputedStyle(ball1).getPropertyValue('height'));
var ball1Top = ball1Bottom + ball1Height;
var ball1Left = parseInt(window.getComputedStyle(ball1).getPropertyValue('left'));
var ball1Width = parseInt(window.getComputedStyle(ball1).getPropertyValue('width'));
var ball1Right = ball1Left + ball1Width;
var ball2 = document.getElementById('ball2');
var ball2Bottom = parseInt(window.getComputedStyle(ball2).getPropertyValue('bottom'));
var ball2Height = parseInt(window.getComputedStyle(ball2).getPropertyValue('height'));
var ball2Top = ball2Bottom + ball2Height;
var ball2Left = parseInt(window.getComputedStyle(ball2).getPropertyValue('left'));
var ball2Width = parseInt(window.getComputedStyle(ball2).getPropertyValue('width'));
var ball2Right = ball2Left + ball2Width;
var isJumping1 = false;
var upTime1;
var downTime1;
var isJumping2 = false;
var upTime2;
var downTime2;
var a = 0;
var scoreCounter = 0;
var livesCounter = 10;
function score() {
    scoreCounter++;
    document.getElementById('score').innerHTML = scoreCounter.toString();
}
var scoreInterval = setInterval(score, 500);
function jumpBall1() {
    if (isJumping1)
        return;
    upTime1 = setInterval(function () {
        if (ball1Bottom >= floorTop + 250) {
            clearInterval(upTime1);
            downTime1 = setInterval(function () {
                if (ball1Bottom <= floorTop - 10) {
                    clearInterval(downTime1);
                    isJumping1 = false;
                }
                ball1Bottom -= 10;
                ball1.style.bottom = ball1Bottom + "px";
            }, 20);
        }
        ball1Bottom += 10;
        ball1.style.bottom = ball1Bottom + "px";
        isJumping1 = true;
    }, 20);
}
function jumpBall2() {
    if (isJumping2)
        return;
    upTime2 = setInterval(function () {
        if (ball2Top <= floorBottom - 250) {
            clearInterval(upTime2);
            downTime2 = setInterval(function () {
                if (ball2Top >= floorBottom - 10) {
                    clearInterval(downTime2);
                    isJumping2 = false;
                }
                ball2Top += 10;
                ball2.style.bottom = ball2Top + "px";
            }, 20);
        }
        ball2Top -= 10;
        ball2.style.bottom = ball2Top + "px";
        isJumping2 = true;
    }, 20);
}
function generateWalls1() {
    var walls1 = document.querySelector('.walls1');
    var wall1 = document.createElement('div');
    wall1.setAttribute('class', 'wall1');
    walls1.appendChild(wall1);
    a++;
    var randomTimeout = Math.floor(Math.random() * 1500) + 1500;
    var wall1Right = -20;
    var wall1Width = 20;
    var wall1Left = wall1Right - wall1Width;
    var wall1Bottom = parseInt(window.getComputedStyle(wall1).getPropertyValue('bottom'));
    var wall1Height = Math.floor(Math.random() * 60) + 75;
    function moveWall1() {
        wall1Right += 5;
        var ball1Right = parseInt(window.getComputedStyle(ball1).getPropertyValue('right'));
        wall1.style.right = wall1Right + "px";
        wall1.style.bottom = wall1Bottom + "px";
        wall1.style.width = wall1Width + "px";
        wall1.style.height = wall1Height + "px";
        if (wall1Right > gameboardWidth) {
            wall1.remove();
        }
        if (ball1Right <= wall1Right + wall1Width && ball1Right + ball1Width >= wall1Right && ball1Bottom <= wall1Bottom + wall1Height && ball1Bottom + ball1Height >= wall1Bottom) {
            livesCounter--;
            document.getElementById('lives').innerHTML = livesCounter.toString();
        }
    }
    var wall1Interval = setInterval(moveWall1, 20);
    var wall1Timeout = setTimeout(generateWalls1, randomTimeout);
}
function generateWalls2() {
    var walls2 = document.querySelector('.walls2');
    var wall2 = document.createElement('div');
    wall2.setAttribute('class', 'wall2');
    walls2.appendChild(wall2);
    var randomTimeout2 = Math.floor(Math.random() * 2000) + 1500;
    var wall2Right = -20;
    var wall2Width = 20;
    var wall2Left = wall2Right - wall2Width;
    var wall2Height = Math.floor(Math.random() * 60) + 75;
    var wall2Bottom = parseInt(window.getComputedStyle(wall2).getPropertyValue('bottom')) - wall2Height;
    function moveWall2() {
        wall2Right += 5;
        var ball2Right = parseInt(window.getComputedStyle(ball2).getPropertyValue('right'));
        wall2.style.right = wall2Right + "px";
        wall2.style.bottom = wall2Bottom + "px";
        wall2.style.width = wall2Width + "px";
        wall2.style.height = wall2Height + "px";
        if (wall2Right > gameboardWidth) {
            wall2.remove();
        }
        if (ball2Right <= wall2Right + wall2Width && ball2Right + ball2Width >= wall2Right && ball2Bottom <= wall2Bottom + wall2Height && ball2Top >= wall2Bottom) {
            console.log('hit ball 2');
        }
    }
    var wall2Interval = setInterval(moveWall2, 20);
    var wall2Timeout = setTimeout(generateWalls2, randomTimeout2);
}
generateWalls1();
generateWalls2();
function control(e) {
    if (e.key == "ArrowUp") {
        jumpBall1();
    }
    if (e.key == "ArrowDown") {
        jumpBall2();
    }
}
document.addEventListener('keydown', control);
