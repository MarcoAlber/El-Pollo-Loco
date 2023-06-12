/** Class of an extension of DrawableObject representing the current available throwable bottles */
class StatusBottles extends DrawableObject {

    /** draws the bottle into the status area */
    constructor() {
        super();
        this.loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = 10;
        this.y = 70;
        this.width = 400 / 6;
        this.height = 400 / 6;
    }
}