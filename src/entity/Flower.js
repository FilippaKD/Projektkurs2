
function Flower() {

    Entity.call(this, "image_game_flower", 185, 90, 30, 40);

    this.flowerLifeBar = 100;
    console.log(this.flowerLifeBar)

    this.immovable = true;
    this.makeAnimations();
    this.hitbox.set(1, 8, 27, 35);

    this.isDead = false;
    
}

Flower.prototype = Object.create(Entity.prototype);
Flower.prototype.constructor = Flower;


Flower.prototype.makeAnimations = function() {

   this.animation.create("wilting", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6, true);
   this.animation.gotoAndPlay("wilting");
};


Flower.prototype.update = function(step) {

    Entity.prototype.update.call(this, step);

    if (!this.isDead) {
    var totalFrames = 10;
    var percent = (0, this.flowerLifeBar / 100);
    var frame = Math.floor((1 - percent) * (totalFrames - 1));

    this.animation.current.gotoAndStop(frame); 
    }
    
};


Flower.prototype.flowerDamage = function(amount) {
    
    this.flowerLifeBar -= amount;

    if (this.flowerLifeBar < 0) {
        this.flowerLifeBar = 0;
    }
   
}

Flower.prototype.flowerHeal = function(amount) {
    
    //hej
    this.flowerLifeBar += amount;
    
    if (this.flowerLifeBar > 100) {
        this.flowerLifeBar = 100;
    }
}


Flower.prototype.dyingFlower = function() {
    this.isDead = true;
   this.animation.create("dying", [9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19], 2, true);
   this.animation.gotoAndPlay("dying");
};