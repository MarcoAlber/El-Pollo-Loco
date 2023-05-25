class ThrowableObject extends MovableObject {

    images_rotation = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png');
        this.loadImages(this.images_rotation);
        this.x = x;
        this.y = y;
        this.width = 400 / 4;
        this.height = 400 / 4;
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            if (world.character.otherDirection) {
                this.x -= 10;
            }
            else if (!world.character.otherDirection) {
                this.x += 10;
            }
        }, 25);

        setInterval(() => {
            this.playAnimation(this.images_rotation);
        }, 120);
    }
}