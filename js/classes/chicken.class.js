/** Class of an extension of MovableObject representing a chicken */
class Chicken extends MovableObject {
    y = 350;
    width = 248 / 3.2;
    height = 243 / 3.2;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    images_walking = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    image_dead = './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    intervalID = setInterval(() => {
        this.playAnimation(this.images_walking);
    }, 150);

    /**
     * load the chicken into the canvas and let it walk to the left side
     * @param {number} positionX = random x coordinate of a small chicken
     */
    constructor(positionX) {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.x = positionX + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.25;
        this.animate();
    }

    /** animates a chicken walking */
    animate() {
        this.moveLeftObjects();
        this.intervalID;
    }
}