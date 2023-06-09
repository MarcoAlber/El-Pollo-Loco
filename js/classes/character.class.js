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
    images_sleeping = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    speed = 5;
    world;
    walking_sound = new Audio('./assets/audio/running.mp3');
    jumping_sound = new Audio('./assets/audio/jumping.mp3');
    character_hurting_sound = new Audio('./assets/audio/character_hurting.mp3');
    character_dead_sound = new Audio('./assets/audio/character_dead.mp3');

    constructor() {
        super().loadImage(this.images_sleeping[0]);
        this.loadImages(this.images_sleeping);
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
            if (keyboard.right && this.x < this.world.level.level_end_x && !this.isDead() && !world.endbossIsDead) {
                this.walkRight();
                this.walking_sound.play();
                this.walking_sound.volume = 0.2;
            }
            if (keyboard.left && this.x > -600 && !this.isDead() && !world.endbossIsDead) {
                this.walkLeft();
                this.walking_sound.play();
                this.walking_sound.volume = 0.2;
            }
            if (keyboard.jump && !this.isAboveGround() && !this.isDead() && !world.endbossIsDead) {
                this.jump();
                this.jumping_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.images_dead);
                this.stopSound(world.chicken_song_sound);
                this.character_dead_sound.play();
                this.character_dead_sound.volume = 0.2;
                setTimeout(() => {
                    clearAllIntervals();
                    document.getElementById('youLostScreen').classList.remove('dp-none');
                    document.getElementById('startButton').innerHTML = '<span>Try again</span>';
                    document.getElementById('startButton').classList.remove('dp-none');
                }, 3500);

            }
            else if (this.isHurt()) {
                this.playAnimation(this.images_hurting);
                if (this.energy > 10) {
                    this.character_hurting_sound.play();
                    this.character_hurting_sound.volume = 0.2;
                }
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.images_jumping);
            }
            else if (this.standingStill() && !this.isAboveGround() && !world.endbossIsDead) {
                this.sleepAnimation(this.images_sleeping);
                if (keyboard.throwing) {
                    this.lastMove = new Date().getTime() + 2000;
                    this.currentImage = 0;
                    this.alreadySlept = true;
                    this.stopSound(this.snoring_sound);
                }
            }
            else if (world.endbossIsDead) {
                this.playAnimation(this.images_jumping);
            }
            else {
                this.loadImage(this.images_sleeping[0]);
                if (keyboard.right || keyboard.left) {
                    this.playAnimation(this.images_walking);
                }
            }
        }, 150);
    }
}