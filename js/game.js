let canvas;
let world;
let keyboard = new KeyBoard();
let soundOn = true;
let sounds = [
    new Audio('./assets/audio/dead_chicken.mp3'),
    new Audio('./assets/audio/chicken_song.mp3'),
    new Audio('./assets/audio/running.mp3'),
    new Audio('./assets/audio/jumping.mp3'),
    new Audio('./assets/audio/character_hurting.mp3'),
    new Audio('./assets/audio/character_dead.mp3'),
    new Audio('./assets/audio/endboss_hurting.mp3'),
    new Audio('./assets/audio/endboss_dead.mp3'),
    new Audio('./assets/audio/collect_coin.mp3'),
    new Audio('./assets/audio/snoring.mp3'),
    new Audio('./assets/audio/chicken_song.mp3')
];

/** start the game if device is not in portrait mode */
function init() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById('turnDevice').open = true;
    }
    else {
        startGame();
    }
}

/** starts the game */
function startGame() {
    document.getElementById('turnDevice').open = false;
    canvas = document.getElementById('canvas');
    document.getElementById('startButton').classList.add('dp-none');
    document.getElementById('youLostScreen').classList.add('dp-none');
    document.getElementById('gameOverScreen').classList.add('dp-none');
    initLevel();
    world = new World(canvas, keyboard, sounds);
    moveButtons();
}

/** load the start screen when website finished loading */
window.addEventListener("load", startScreen);

/** draw the start screen inside the canvas */
async function startScreen() {
    let canvas = document.getElementById('canvas');
    let img = await loadImage("./assets/img/9_intro_outro_screens/start/startscreen_2.png");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width = canvas.width, img.height = canvas.height);
    gameSound();
}

/**
 * load image to draw inside the canvas
 * @param {path} url = path of the image
 * @returns image to draw inside the canvas
 */
function loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url });
}

/** opens the information dialog about the game informations */
function openInfoContainer() {
    document.getElementById('infoContainer').open = true;
    document.getElementById('fullscreenButton').classList.add('dp-none');
    clearAllIntervals();
    stopSounds();
}

/** close the information dialog about the game informations */
function closeInfoContainer() {
    document.getElementById('infoContainer').open = false;
    document.getElementById('fullscreenButton').classList.remove('dp-none');
    if (document.getElementById('startButton').classList.contains('dp-none')) {
        init();
    }
}

/** change the canvas into fullscreen */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    document.getElementById('canvas').classList.add('canvasFullscreen');
    fullscreenBoderRadius();
    document.getElementById('fullscreenButtonImg').src = "./assets/img/moveButtons/fullscreen-exit.png";
    document.getElementById('fullscreenButton').onclick = function () { exitFullscreen() };
    enterFullscreen(fullscreen);
}

/** chnages border radius of container and images to 0 */
function fullscreenBoderRadius() {
    document.getElementById('infoContainer').style.borderRadius = "0";
    document.getElementById('gameOverScreenImg').style.borderRadius = "0";
    document.getElementById('youLostScreenImg').style.borderRadius = "0";
}

/** chnages border radius of container and images to 25px */
function exitFullscreenBoderRadius() {
    document.getElementById('infoContainer').style.borderRadius = "25px";
    document.getElementById('gameOverScreenImg').style.borderRadius = "25px";
    document.getElementById('youLostScreenImg').style.borderRadius = "25px";
}

/** stops all intervals */
function clearAllIntervals() {
    for (let i = 0; i < 10000; i++) {
        window.clearInterval(i);
    }
}

/**
 * set container to fullscreen
 * @param {div} element = fullscreen container
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/** exit fullscreen mode */
function exitFullscreen() {
    if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    document.getElementById('fullscreenButtonImg').src = "./assets/img/moveButtons/fullscreen.png";
    document.getElementById('fullscreenButton').onclick = function () { fullscreen() };
    document.getElementById('canvas').classList.remove('canvasFullscreen');
    exitFullscreenBoderRadius();
}

/** checks if keys are pressed */
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

/** checks if keys are released */
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

/** loads responsive buttons into the canvas */
function moveButtons() {
    showMoveButtons();
    moveLeft();
    moveRight();
    jump();
    throwing();
}

/** enable the move buttons */
function showMoveButtons() {
    document.getElementById('walkLeftButton').classList.remove("dp-none");
    document.getElementById('walkRightButton').classList.remove("dp-none");
    document.getElementById('jumpButton').classList.remove("dp-none");
    document.getElementById('throwButton').classList.remove("dp-none");
}

/** checks if move left button is pressed or released */
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

/** checks if move right button is pressed or released */
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

/** checks if jump button is pressed or released */
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

/** checks if throw button is pressed or released */
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

/** turns sound on or off */
function soundOnOff() {
    if (soundOn) {
        turnSoundOff();
    }
    else {
        turnSoundOn();
    }
}

/** turns sound off */
function turnSoundOff() {
    document.getElementById('soundOnButtonImg').src = "./assets/img/moveButtons/sound-off.png";
    soundOn = false;
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].volume = 0;
    }
}

/** turns sound on */
function turnSoundOn() {
    document.getElementById('soundOnButtonImg').src = "./assets/img/moveButtons/sound.png";
    soundOn = true;
    gameSound();
}

/** set the volume for each sound */
function gameSound() {
    for (let i = 0; i < 9; i++) {
        sounds[i].volume = 0.2;
    }
    sounds[9].volume = 0.7;
    sounds[10].volume = 0.1;
}

/** stops all sounds */
function stopSounds() {
    for (let i = 0; i < sounds.length; i++) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
}