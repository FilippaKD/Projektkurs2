function Controll() {

    Entity.call(this, "image_controls_controll", 50, 80, 180, 100);


   this.makeAnimation();
    
}

Controll.prototype = Object.create(Entity.prototype);
Controll.prototype.constructor = Controll;


Controll.prototype.makeAnimation = function() {

   this.animation.create("idle", [0, 1], 1, true);
   this.animation.gotoAndPlay("idle");
};