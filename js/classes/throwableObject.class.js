/** Class of an extension of MovableObject representing a throwable bottle */
class ThrowableObject extends MovableObject {

    offset = {
        top: 10,
        bottom: 10,
        left: 25,
        right: 25
    };

    images_rotation = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    images_splash = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'

    ];

    /**
     * loads the throwable bottle into the canvas
     * @param {number} x = x coordinate of the throwable bottle
     * @param {number} y = y coordinate of the throwable bottle
     */
    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.images_rotation);
        this.loadImages(this.images_splash);
        this.x = x;
        this.y = y;
        this.width = 400 / 4;
        this.height = 400 / 4;
        this.checkCharacterDirection();
    }

    /** checks which direction the character is looking and throws the bottle in this direction */
    checkCharacterDirection() {
        if (!world.character.otherDirection) {
            world.bottleHit = false;
            this.throw(this.throwBottleFront());
        }
        else {
            world.bottleHit = false;
            this.throw(this.throwBottleBack());
        }
    }
}