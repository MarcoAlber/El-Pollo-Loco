let canvas;
let world;
let keyboard = new KeyBoard();

function init() {
    canvas = document.getElementById('canvas');
    document.getElementById('startButton').style.display = "none";
    initLevel();
    world = new World(canvas, keyboard);
}

window.addEventListener("load", startScreen);

async function startScreen() {
    let canvas = document.getElementById('canvas');
    let img = await loadImage("./assets/img/9_intro_outro_screens/start/startscreen_2.png");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width = 720, img.height = 480);
}

function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let canvas = document.getElementById('canvas');
    canvas.style.width = "100%";
    canvas.style.height = "100vh";
    canvas.style.borderRadius = "0";
    enterFullscreen(fullscreen);
}

function clearAllIntervals() {
    for (let i = 0; i < 100; i++) {
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
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
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