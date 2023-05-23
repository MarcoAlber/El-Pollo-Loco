class Level {
    enemies;
    collactableBottles;
    collactableCoins;
    clouds;
    backgroundObjects;
    level_end_x = 721 * 3

    constructor(enemies, collactableBottles, collactableCoins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.collactableBottles = collactableBottles;
        this.collactableCoins = collactableCoins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}