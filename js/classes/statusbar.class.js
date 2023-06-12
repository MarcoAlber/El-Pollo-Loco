/** Class of an extension of DrawableObject representing the statusbar of the character */
class Statusbar extends DrawableObject {

    images_health = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    /** loads the statusbar into the canvas */
    constructor() {
        super();
        this.loadImages(this.images_health);
        this.x = 20;
        this.y = 20;
        this.width = 595 / 3;
        this.height = 158 / 3;
        this.setPercentage(this.energy);
    }

    /**
     * 
     * @param {number} percentage = energy of the character
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.resolveImageIndex();
        this.img = this.imageCache[path];
    }

    /**
     * checks the energy of the character and changes the statusbar image
     * @returns current health statusbar of the character 
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return this.images_health[5];
        }
        else if (this.percentage > 80) {
            return this.images_health[4];
        }
        else if (this.percentage > 60) {
            return this.images_health[3];
        }
        else if (this.percentage > 40) {
            return this.images_health[2];
        }
        else if (this.percentage >= 20) {
            return this.images_health[1];
        }
        else if (this.percentage < 20) {
            return this.images_health[0];
        }
    }
}