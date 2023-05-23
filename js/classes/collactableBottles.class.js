class CollactableBottles extends DrawableObject {
    offset = {
        top: 10,
        bottom: 10,
        left: 25,
        right: 25
    };
    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 400 / 4;
        this.height = 400 / 4;
    }
}