/** Class of an extension of DrawableObject representing a collactable coin */
class CollactableCoins extends DrawableObject {
    offset = {
        top: 20,
        bottom: 10,
        left: 25,
        right: 25
    };

    /**
     * loads the collactable coin into the canvas and place it into a random coordinate
     * @param {number} x = x coordinate of the collactable bottle
     * @param {number} y = y coordinate of the collactable bottle
     */
    constructor(x, y) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 300 / 3;
        this.height = 301 / 3;
    }
}