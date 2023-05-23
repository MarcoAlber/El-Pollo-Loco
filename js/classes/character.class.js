class Character extends MovableObject {

    images_walking = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    images_jumping = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    images_hurting = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    images_dead = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png'
    ];
    speed = 5;
    world;
    walking_sound = new Audio('./assets/audio/running.mp3');

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurting);
        this.loadImages(this.images_dead);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (keyboard.right && this.x < this.world.level.level_end_x) {
                this.walkRight();
                this.walking_sound.play();
            }
            else if (keyboard.left && this.x > -600) {
                this.walkLeft();
                this.walking_sound.play();
            }
            else if (keyboard.jump && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.images_hurting);
            }
            else if (this.isAboveGround()) {
                this.jumpAnimation();

                /*console.log('current', this.currentImage);*/
            }
            else {
                this.loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
                if (keyboard.right || keyboard.left) {
                    this.playAnimation(this.images_walking);
                }
            }
        }, 150);

    }

    jumpAnimation() {
        this.playAnimation(this.images_jumping);
    }
}