function Glitter() {
    rune.particle.Particle.call(this, 0, 0, 2, 2, "image_sparkle");
}

Glitter.prototype = Object.create(rune.particle.Particle.prototype);
Glitter.prototype.constructor = Glitter;

Glitter.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

Glitter.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step);
};

Glitter.prototype.dispose = function() {
    rune.particle.Particle.prototype.dispose.call(this);
};
