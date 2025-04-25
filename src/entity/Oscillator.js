Oscillator = function(speed) {

  var frame = 0;

  this.current = function(x) {
    frame += 0.003 * speed;
    return Math.sin(frame + x * speed * 10);
  };
}