class CollactableBottles extends DrawableObject {
    offset = {
        top: 10,
        bottom: 10,
        left: 25,
        right: 25
    };
    bottleOnGround = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    randomBottle = Math.floor(Math.random() * this.bottleOnGround.length);

    constructor(x, y) {
        super();
        if (y < 300) {
            this.loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        }
        else {
            this.loadImage(this.bottleOnGround[this.randomBottle]);
        }
        this.x = x;
        this.y = y;
        this.width = 400 / 4.5;
        this.height = 400 / 4.5;
    }
}