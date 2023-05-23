class CollactableCoins extends DrawableObject {
    offset = {
        top: 20,
        bottom: 10,
        left: 25,
        right: 25
    };
    constructor(x, y) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 300 / 3;
        this.height = 301 / 3;
    }
}