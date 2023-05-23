class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
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
    }
}