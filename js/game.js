let canvas;
let world;
let keyboard = new KeyBoard();

function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('startButton').classList.add('dp-none');
    document.getElementById('youLostScreen').classList.add('dp-none');
    document.getElementById('gameOverScreen').classList.add('dp-none');
    initLevel();
    world = new World(canvas, keyboard);
    moveButtons();
}

window.addEventListener("load", startScreen);

async function startScreen() {
    let canvas = document.getElementById('canvas');
    let img = await loadImage("./assets/img/9_intro_outro_screens/start/startscreen_2.png");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width = canvas.width, img.height = canvas.height);
}

function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url });
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let canvas = document.getElementById('canvas');
    canvas.style.width = "100%";
    canvas.style.height = "100dvh";
    canvas.style.borderRadius = "0";
    document.getElementById('fullscreenButtonImg').src = "./assets/img/moveButtons/fullscreen-exit.png";
    document.getElementById('fullscreenButton').onclick = function () { exitFullscreen() };
    enterFullscreen(fullscreen);
}

function clearAllIntervals() {
    for (let i = 0; i < 10000; i++) {
        window.clearInterval(i);
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    let canvas = document.getElementById('canvas');
    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    document.getElementById('fullscreenButtonImg').src = "./assets/img/moveButtons/fullscreen.png";
    document.getElementById('fullscreenButton').onclick = function () { fullscreen() };
    canvas.style.width = "720px";
    canvas.style.height = "480px";
    canvas.style.borderRadius = "25px";
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        keyboard.left = true;
    }
    else if (event.keyCode == 38) {
        keyboard.jump = true;
    }
    else if (event.keyCode == 39) {
        keyboard.right = true;
    }
    else if (event.keyCode == 71) {
        keyboard.throwing = true;
    }
    if (event.keyCode == 27) {
        exitFullscreen();
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37) {
        keyboard.left = false;
    }
    else if (event.keyCode == 38) {
        keyboard.jump = false;
    }
    else if (event.keyCode == 39) {
        keyboard.right = false;
    }
    else if (event.keyCode == 71) {
        keyboard.throwing = false;
    }
});

function moveButtons() {
    showMoveButtons();
    moveLeft();
    moveRight();
    jump();
    throwing();
}

function moveLeft() {
    document.getElementById('walkLeftButton').addEventListener('touchstart', (e) => {
        e.preventDefault;
        keyboard.left = true;
    });
    document.getElementById('walkLeftButton').addEventListener('touchend', (e) => {
        e.preventDefault;
        keyboard.left = false;
    });
}

function moveRight() {
    document.getElementById('walkRightButton').addEventListener('touchstart', (e) => {
        e.preventDefault;
        keyboard.right = true;
    });
    document.getElementById('walkRightButton').addEventListener('touchend', (e) => {
        e.preventDefault;
        keyboard.right = false;
    });
}

function jump() {
    document.getElementById('jumpButton').addEventListener('touchstart', (e) => {
        e.preventDefault;
        keyboard.jump = true;
    });
    document.getElementById('jumpButton').addEventListener('touchend', (e) => {
        e.preventDefault;
        keyboard.jump = false;
    });
}

function throwing() {
    document.getElementById('throwButton').addEventListener('touchstart', (e) => {
        e.preventDefault;
        keyboard.throwing = true;
    });
    document.getElementById('throwButton').addEventListener('touchend', (e) => {
        e.preventDefault;
        keyboard.throwing = false;
    });
}

function showMoveButtons() {
    if (window.matchMedia("(max-width: 1200px)").matches) {
        document.getElementById('walkLeftButton').classList.remove("dp-none");
        document.getElementById('walkRightButton').classList.remove("dp-none");
        document.getElementById('jumpButton').classList.remove("dp-none");
        document.getElementById('throwButton').classList.remove("dp-none");
    }
}