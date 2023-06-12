/** Class of an extension of DrawableObject representing the current collected coins */
class StatusCoins extends DrawableObject {

    /** draws the coin into the status area */
    constructor() {
        super();
        this.loadImage('./assets/img/8_coin/coin_1.png');
        this.x = 120;
        this.y = 70;
        this.width = 300 / 4;
        this.height = 301 / 4;
    }
}