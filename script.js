var gameboard = document.getElementById('gameboard');
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
function control(e) {
    if (e.key == "ArrowUp") {
        jumpBall1();
    }
    if (e.key == "ArrowDown") {
        jumpBall2();
    }
}
document.addEventListener('keydown', control);
