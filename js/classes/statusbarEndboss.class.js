class StatusbarEndboss extends DrawableObject {

    images_health = [
        './assets/img/7_statusbars/2_statusbar_endboss/0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/100.png'
    ];


    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.images_health);
        this.x = 490;
        this.y = 4;
        this.width = 595 / 2.8;
        this.height = 281 / 2.8;
        this.setPercentage(this.energy);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.resolveImageIndex();
        this.img = this.imageCache[path];
    }

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