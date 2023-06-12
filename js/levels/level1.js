let level1;

/** creates the level objects */
function initLevel() {
    level1 = new Level(

        [
            new Chicken(getRandomChickenX()),
            new Chicken(getRandomChickenX()),
            new Chicken(getRandomChickenX()),
            new BabyChicken(getRandomChickenX()),
            new BabyChicken(getRandomChickenX()),
            new BabyChicken(getRandomChickenX()),
            new BabyChicken(getRandomChickenX()),
            new BabyChicken(getRandomChickenX()),
            new Chicken(getRandomChickenX()),
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

/**
 * set a random x position for the collactable bottles and coins
 * @returns random number between -600 and 2000
 */
function getRandomX() {
    min = Math.ceil(-600);
    max = Math.floor(2000);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * set a random x position for the chickens
 * @returns random number between 200 and 1500
 */
function getRandomChickenX() {
    min = Math.ceil(200);
    max = Math.floor(1500);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * set a random y position for the collactable bottles and coins
 * @returns random number between 100 and 200
 */
function getRandomY() {
    min = Math.ceil(100);
    max = Math.floor(200);
    return Math.floor(Math.random() * (max - min) + min);
}