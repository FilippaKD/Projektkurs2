//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
projektkurs2.scene.GameOver = function (score) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    this.score = score;
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.GameOver.prototype.constructor = projektkurs2.scene.GameOver;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.GameOver.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    console.log("bytt scen")
    this.backgroundColor = "#000000";

    var text = new rune.text.BitmapField("GAME OVER", rune.text.BitmapFormat.FONT_MEDIUM);
    
    text.autoSize = true;
    text.center = this.application.screen.center;
    text.color = "#FFFFFF"; 
    this.stage.addChild(text);

    var score = new rune.text.BitmapField(this.score.toString(), rune.text.BitmapFormat.FONT_MEDIUM);
    
    score.autoSize = true;
    score.center = this.application.screen.center;
    score.y = 120;
    score.color = "#FFFFFF"; 
    this.stage.addChild(score);

};



/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
projektkurs2.scene.GameOver.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);
    
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
projektkurs2.scene.GameOver.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};