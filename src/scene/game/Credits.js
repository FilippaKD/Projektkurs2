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
projektkurs2.scene.Credits = function (score) {

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

projektkurs2.scene.Credits.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.Credits.prototype.constructor = projektkurs2.scene.Credits;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Credits.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_credits_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);


    this.initFairies();

    this.text = new rune.text.BitmapField("This game was made by");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 50;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

};


projektkurs2.scene.Credits.prototype.initFairies = function () {
    

    this.sol = new Entity("image_credits_sol", 230, 120, 45, 70);
    this.filippa = new Entity("image_credits_filippa", 120, 120, 45, 70);

    this.fairies = new rune.display.DisplayGroup(this.stage);
    this.fairies.addMember(this.sol);
    this.fairies.addMember(this.filippa);



    this.fairies.forEachMember(function (fairy) {
        fairy.animation.create("idle", [0, 1, 2, 3, 2, 1, 0], 6, true);
        fairy.animation.gotoAndPlay("idle");
    })

    var filippaText = new rune.text.BitmapField("Filippa Dagerhed");

    filippaText.color = "#FFFFFF";
    filippaText.x = this.filippa.x + (this.filippa.width - filippaText.width) / 4;
    filippaText.y = this.filippa.y + this.filippa.height + 5;
    this.stage.addChild(filippaText);

    var solText = new rune.text.BitmapField("Sol Olsen");

    solText.color = "#FFFFFF";
    solText.x = this.sol.x + (this.sol.width - solText.width) / 18;
    solText.y = this.sol.y + this.sol.height + 5;
    this.stage.addChild(solText);
    

};



/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Credits.prototype.update = function (step) {

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
projektkurs2.scene.Credits.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};