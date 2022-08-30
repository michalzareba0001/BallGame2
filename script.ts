const gameboard = document.getElementById('gameboard');
const gameboardWidth = gameboard.offsetWidth;

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

let scoreCounter = 0;

let livesCounter = 10;


function score() {
    scoreCounter++;
    document.getElementById('score').innerHTML = scoreCounter.toString();
}

let scoreInterval = setInterval(score, 500);


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

function generateWalls1() {
    let walls1 = document.querySelector('.walls1' );
    let wall1 = document.createElement('div');
    wall1.setAttribute('class', 'wall1');
    walls1.appendChild(wall1);


    let randomTimeout = Math.floor(Math.random() * 1000) + 1500;
    let wall1Right = -20;
    let wall1Width = 20;
    let wall1Left = wall1Right - wall1Width;
    let wall1Bottom = parseInt(window.getComputedStyle(wall1).getPropertyValue('bottom'));
    let wall1Height = Math.floor(Math.random() * 80) + 50;

    function moveWall1() {
        wall1Right += 5;
        let ball1Right = parseInt(window.getComputedStyle(ball1).getPropertyValue('right'));
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
            ball1.style.display = 'none';
            setTimeout(() => {
            ball1.style.display = 'block';
            }, 1000);
            
            if (livesCounter == 0) {
                alert('Game Over');
                window.location.reload();
            }
        }
        
    }
    
    
    let wall1Interval = setInterval(moveWall1, 20);
    let wall1Timeout = setTimeout(generateWalls1, randomTimeout);    
}

function generateWalls2() {
    let walls2 = document.querySelector('.walls2');
    let wall2 = document.createElement('div');
    wall2.setAttribute('class', 'wall2');
    walls2.appendChild(wall2);

    let randomTimeout2 = Math.floor(Math.random() * 2000) + 1500;
    let wall2Right = -20;
    let wall2Width = 20;
    let wall2Left = wall2Right - wall2Width;
    let wall2Height = Math.floor(Math.random() * 80) + 50;
    let wall2Bottom = parseInt(window.getComputedStyle(wall2).getPropertyValue('bottom')) - wall2Height;


    function moveWall2() {
        wall2Right += 5;
        let ball2Right = parseInt(window.getComputedStyle(ball2).getPropertyValue('right'));
        wall2.style.right = wall2Right + "px";
        wall2.style.bottom = wall2Bottom + "px";
        wall2.style.width = wall2Width + "px";
        wall2.style.height = wall2Height + "px";
        if (wall2Right > gameboardWidth) {
            wall2.remove();
        }

        if (ball2Right <= wall2Right + wall2Width && ball2Right + ball2Width >= wall2Right && ball2Bottom <= wall2Bottom + wall2Height && ball2Top >= wall2Bottom) {
            livesCounter--;
            document.getElementById('lives').innerHTML = livesCounter.toString();
            ball2.style.display = 'none';
            setTimeout(() => {
            ball2.style.display = 'block';
            }, 1000);

            if (livesCounter == 0) {
                alert('Game Over');
                window.location.reload();
            }

        }
    }

    let wall2Interval = setInterval(moveWall2, 20);
    let wall2Timeout = setTimeout(generateWalls2, randomTimeout2);    
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

