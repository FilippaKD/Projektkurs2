
function Flower() {

    Entity.call(this, "Flower", 185, 100, 32, 32);
    this.flowerLifeBar = 9;
    this.makeAnimations();
    this.hitbox.set(5, 8, 15, 20);
    
}

Flower.prototype = Object.create(Entity.prototype);
Flower.prototype.constructor = Flower;


Flower.prototype.makeAnimations = function() {

   this.animation.create("wilting", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6, true);
   this.animation.gotoAndPlay("wilting");
};


Flower.prototype.update = function(step) {

    Entity.prototype.update.call(this, step);

    var frame = this.flowerLifeBar;
    console.log(frame)

    this.animation.current.gotoAndStop(frame); 
    //this.animation.goto(frame);
    //this.animation.stop();
};


Flower.prototype.flowerDamage = function(amount) {

    console.log(amount);
    
    this.flowerLifeBar += amount;
    if (this.flowerLifeBar < 0) {
        this.flowerLifeBar = 0;
    }
    console.log(this.flowerLifeBar)


}
