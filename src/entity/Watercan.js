function Watercan(x, y) {

    Entity.call(this, "image_game_watercan", x, y, 12, 10);


    this.makeAnimations();
    
}

Watercan.prototype = Object.create(Entity.prototype);
Watercan.prototype.constructor = Watercan;


Watercan.prototype.makeAnimations = function() {

   this.animation.create("water", [0, 1, 2, 3, 4], 6, true);
   this.animation.gotoAndPlay("water");
};


Watercan.prototype.updatePicture = function(frame) {
    
    this.animation.current.gotoAndStop(frame); 
    
};

