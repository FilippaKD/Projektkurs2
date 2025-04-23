

function Thorn() {

    var x = 100;
    var y = 100;

    Entity.call(this, "bigthorns", x, y, 25, 25);
    this.makeAnimations();

    this.hitbox.set(5, 10, 10, 12);
    
}

Thorn.prototype = Object.create(Entity.prototype);
Thorn.prototype.constructor = Thorn;



Thorn.prototype.makeAnimations = function() {

   this.animation.create("grow", [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 6, false);
   this.animation.gotoAndPlay("grow");

  
  
};

Thorn.prototype.attackMode = function() {

     this.animation.create("idle", [20, 19, 18, 17, 16, 15, 14, 13, 12], 6, true);
     this.animation.gotoAndPlay("grow");


}

/*
Thorn.prototype.update = function() {
    Entity.prototype.update.call(this);

    if (
        this.animation.current === "grow" &&
        !this.animation.looped &&
        !this.animation.isPlaying
    ) {
        console.log("ghjk")
        this.animation.gotoAndPlay("idle");
    }
};
*/
