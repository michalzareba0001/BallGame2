const gameboard = document.getElementById('gameboard');

let floor = document.getElementById('floor');
let floorBottom = parseInt(window.getComputedStyle(floor).getPropertyValue('bottom'));
let floorHeight = parseInt(window.getComputedStyle(floor).getPropertyValue('height'));
let floorTop = floorBottom + floorHeight;

let ball1 = document.getElementById('ball1');
let ball1Bottom = parseInt(window.getComputedStyle(ball1).getPropertyValue('bottom'));
let ball1Height = parseInt(window.getComputedStyle(ball1).getPropertyValue('height'));
let ball1Top = ball1Bottom + ball1Height;
let ball1Left = parseInt(window.getComputedStyle(ball1).getPropertyValue('left'));
let ball1Width = parseInt(window.getComputedStyle(ball1).getPropertyValue('width'));
let ball1Right = ball1Left + ball1Width;

let ball2 = document.getElementById('ball2');
let ball2Bottom = parseInt(window.getComputedStyle(ball2).getPropertyValue('bottom'));
let ball2Height = parseInt(window.getComputedStyle(ball2).getPropertyValue('height'));
let ball2Top = ball2Bottom + ball2Height;
let ball2Left = parseInt(window.getComputedStyle(ball2).getPropertyValue('left'));
let ball2Width = parseInt(window.getComputedStyle(ball2).getPropertyValue('width'));
let ball2Right = ball2Left + ball2Width;

let isJumping1 = false;
let upTime1;
let downTime1;

let isJumping2 = false;
let upTime2;
let downTime2;

function jumpBall1() {
    if (isJumping1) return;
    upTime1 = setInterval(() => {
        if (ball1Bottom >= floorTop + 250) {
            clearInterval(upTime1);
            downTime1 = setInterval(() => {
                if (ball1Bottom <= floorTop - 10) {
                    clearInterval(downTime1);
                    isJumping1 = false;
                }
                ball1Bottom -= 10;
                ball1.style.bottom = ball1Bottom + "px";
            }, 20)

        }
        ball1Bottom += 10;
        ball1.style.bottom = ball1Bottom + "px";
        isJumping1 = true;
    }, 20);
}
function jumpBall2() {
    if (isJumping2) return;
    upTime2 = setInterval(() => {
        if (ball2Top <= floorBottom - 250) {
            clearInterval(upTime2);
            downTime2 = setInterval(() => {
                if (ball2Top >= floorBottom - 10) {
                    clearInterval(downTime2);
                    isJumping2 = false;
                }
                ball2Top += 10;
                ball2.style.bottom = ball2Top + "px";
            }, 20)

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
