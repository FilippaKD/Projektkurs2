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
projektkurs2.scene.ChoosePlayer = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.scene.ChoosePlayer.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.ChoosePlayer.prototype.constructor = projektkurs2.scene.ChoosePlayer;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.ChoosePlayer.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_controls_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    this.text = new rune.text.BitmapField("Choose your character");

    this.text.autoSize = true;
    this.text.center = this.application.screen.center;
    this.text.y = 10;

    this.text.color = "#FFFFFF";
    this.stage.addChild(this.text);

    this.initFairies();

    this.selectedByP1 = 0;
    this.selectedByP2 = 1;

    this.p1choosen = false;
    this.p2choosen = false;

    this.updateHighlight();

};


projektkurs2.scene.ChoosePlayer.prototype.initFairies = function () {
    
    this.fairies = new rune.display.DisplayGroup(this.stage);
    this.sol = new Fairy("image_game_Sol", null, 100, 100);
    this.filippa = new Fairy("image_game_Filippa", null, 150, 100);
    this.henrik = new Fairy("image_game_Henrik", null, 200, 100);
    this.rebecka = new Fairy("image_game_Rebecka", null, 250, 100);
    this.kalle = new Fairy("image_game_Kalle", null, 300, 100);

    this.fairies.addMember(this.sol);
    this.fairies.addMember(this.filippa);
    this.fairies.addMember(this.henrik);
    this.fairies.addMember(this.rebecka);
    this.fairies.addMember(this.kalle);


    /*
    this.addName("Sol", this.sol);
    this.addName("Filippa", this.filippa);
    this.addName("Henrik", this.henrik);
    this.addName("Rebecka", this.rebecka);
    this.addName("Kalle", this.kalle);
    */

};


projektkurs2.scene.ChoosePlayer.prototype.addName = function (name, person) {
    
   
    var names = new rune.text.BitmapField(name);

    names.autoSize = true;
    names.x = person.x + (person.width - names.width) / 2;
    names.y = person.y + 20;
    this.stage.addChild(names);

};

projektkurs2.scene.ChoosePlayer.prototype.updateHighlight = function () {
    
    
    
     

};




/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
projektkurs2.scene.ChoosePlayer.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);

    var gamepad1 = this.gamepads.get(0);
    var gamepad2 = this.gamepads.get(1);

    var maxI = this.fairies.length;

    if (gamepad1.stickLeftJustLeft) {
        this.selectedByP1--;
        if (this.selectedByP1 < 0) {
            this.selectedByP1 = 0;  
        }
        this.updateHighlight();
    }

     if (gamepad1.stickLeftJustRight) {
        this.selectedByP1++;
        if (this.selectedByP1 > maxI) {
            this.selectedByP1 = maxI;  
        }
        this.updateHighlight();
    }

    if (gamepad1.justPressed(2)) {
        console.log("ghjkl")
    }

    
    
};


/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
projektkurs2.scene.ChoosePlayer.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};