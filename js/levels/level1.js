let level1;

function initLevel() {
    level1 = new Level(

        [
            new Chicken(200),
            new Chicken(200),
            new Chicken(200),
            new BabyChicken(800),
            new BabyChicken(800),
            new BabyChicken(800),
            new Endboss(2200)
        ],
        [
            new CollactableBottles(300, 200),
            new CollactableBottles(900, 200),
            new CollactableBottles(1500, 200)
        ],
        [
            new CollactableCoins(600, 200),
            new CollactableCoins(1100, 200),
            new CollactableCoins(1700, 200)
        ],
        [
            new Cloud(300),
            new Cloud(900),
            new Cloud(1500)
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
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 721 * 3)
        ]
    );
}