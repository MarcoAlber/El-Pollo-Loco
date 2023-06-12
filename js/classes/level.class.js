/** Class representing the level which project the objects into the world */
class Level {
    enemies;
    collactableBottles;
    collactableCoins;
    clouds;
    backgroundObjects;
    level_end_x = 721 * 4;

    /**
     * project the objects into the world
     * @param {Object} enemies = small chicken, chicken & endboss
     * @param {Object} collactableBottles = collactable bottles
     * @param {Object} collactableCoins = collactable coins
     * @param {Object} clouds = clouds
     * @param {Object} backgroundObjects = background layers
     */
    constructor(enemies, collactableBottles, collactableCoins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.collactableBottles = collactableBottles;
        this.collactableCoins = collactableCoins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}