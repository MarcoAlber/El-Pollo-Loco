let level1;

function initLevel() {
    level1 = new Level(

        [
            new Chicken(200),
            new Chicken(300),
            new Chicken(400),
            new BabyChicken(500),
            new BabyChicken(600),
            new BabyChicken(700),
            new BabyChicken(1000),
            new BabyChicken(1100),
            new Chicken(1200),
            new Endboss(2200)
        ],
        [
            new CollactableBottles(getRandomX(), 350),
            new CollactableBottles(getRandomX(), 350),
            new CollactableBottles(getRandomX(), 350),
            new CollactableBottles(getRandomX(), 350),
            new CollactableBottles(getRandomX(), 350),
            new CollactableBottles(getRandomX(), 350),
            new CollactableBottles(getRandomX(), getRandomY()),
            new CollactableBottles(getRandomX(), getRandomY()),
            new CollactableBottles(getRandomX(), getRandomY()),
            new CollactableBottles(getRandomX(), getRandomY())
        ],
        [
            new CollactableCoins(getRandomX(), getRandomY()),
            new CollactableCoins(getRandomX(), getRandomY()),
            new CollactableCoins(getRandomX(), getRandomY()),
            new CollactableCoins(getRandomX(), getRandomY()),
            new CollactableCoins(getRandomX(), 0),
            new CollactableCoins(getRandomX(), 0)
        ],
        [
            new Cloud(-900),
            new Cloud(-300),
            new Cloud(300),
            new Cloud(900),
            new Cloud(1500),
            new Cloud(2100),
            new Cloud(2700),
            new Cloud(3300)
        ],
        [
            new BackgroundObject('./assets/img/5_background/layers/air.png', -721),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -721),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -721),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -721),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 721),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 721),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 721),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 721),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 721 * 2),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 721 * 2),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 721 * 2),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 721 * 2),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 721 * 3),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 721 * 3),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 721 * 3),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 721 * 3),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 721 * 4),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 721 * 4),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 721 * 4),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 721 * 4)
        ]
    );
}

function getRandomX() {
    min = Math.ceil(-600);
    max = Math.floor(2000);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomY() {
    min = Math.ceil(100);
    max = Math.floor(200);
    return Math.floor(Math.random() * (max - min) + min);
}