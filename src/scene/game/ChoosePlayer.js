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

    this.p1text = new rune.text.BitmapField("Player 1");
    this.p1text.autoSize = true;
    this.stage.addChild(this.p1text);

    
    this.p2text = new rune.text.BitmapField("Player 2");
    this.p2text.autoSize = true;
    this.stage.addChild(this.p2text);
    

     this.updateHighlight();

};


projektkurs2.scene.ChoosePlayer.prototype.initFairies = function () {
    
    this.fairies = new rune.display.DisplayGroup(this.stage);
   
    this.characters = [
    { name: "Sol", image: "image_game_Sol" },
    { name: "Filippa", image: "image_game_Filippa" },
    { name: "Henrik", image: "image_game_Henrik" },
    { name: "Rebecka", image: "image_game_Rebecka" },
    { name: "Kalle", image: "image_game_Kalle" }
    ]

    for (var i = 0; i < this.characters.length; i++) {
    var fairy = new Fairy(this.characters[i].image, null, 100 + i * 50, 100);
    this.characters[i].fairy = fairy;
    this.fairies.addMember(fairy);
    }


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
    
    var members = this.fairies.getMembers();

    var selected = members[this.selectedByP1];
    if (selected && this.p1text && !this.p1text.flicker.active) {
        this.p1text.x = selected.x + (selected.width - this.p1text.width) / 2;
        this.p1text.y = selected.y - 20;
    }

    if (selected && this.p2text && !this.p2text.flicker.active) {
        var selectedP2 = members[this.selectedByP2];
        this.p2text.x = selectedP2.x + (selectedP2.width - this.p2text.width) / 2;
        this.p2text.y = selectedP2.y - 20;

    }
    
    
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

    var maxIndex = this.fairies.getMembers().length - 1;

      if (gamepad1.stickLeftJustLeft) {
        var newIndex = this.selectedByP1 - 1;
        while (newIndex >= 0 && newIndex === this.selectedByP2) {
            newIndex--;
        }
        if (newIndex >= 0) {
            this.selectedByP1 = newIndex;
            this.updateHighlight();
        }
    }

    if (gamepad1.stickLeftJustRight) {
        var newIndex = this.selectedByP1 + 1;
        while (newIndex <= maxIndex && newIndex === this.selectedByP2) {
            newIndex++;
        }
        if (newIndex <= maxIndex) {
            this.selectedByP1 = newIndex;
            this.updateHighlight();
        }
    }

    if (gamepad1.justPressed(0)) {
        this.p1text.flicker.start(Infinity, 350);
    }
    if (gamepad1.justPressed(1)) {
        this.p1text.flicker.stop();
    }


    if (gamepad2.stickLeftJustLeft) {
        var newIndex = this.selectedByP2 - 1;
        while (newIndex >= 0 && newIndex === this.selectedByP1) {
            newIndex--;
        }
        if (newIndex >= 0) {
            this.selectedByP2 = newIndex;
            this.updateHighlight();
        }
    }

    if (gamepad2 && gamepad2.stickLeftJustRight) {
        var newIndex = this.selectedByP2 + 1;
        while (newIndex <= maxIndex && newIndex === this.selectedByP1) {
            newIndex++;
        }
        if (newIndex <= maxIndex) {
            this.selectedByP2 = newIndex;
            this.updateHighlight();
        }
    }

    if (gamepad2.justPressed(0)) {
        this.p2text.flicker.start(Infinity, 350);
    }
    if (gamepad2.justPressed(1)) {
        this.p2text.flicker.stop();
    }


    if (this.p1text.flicker.active && this.p2text.flicker.active) {
        var startText = new rune.text.BitmapField("Press X to start");
        startText.autoSize = true;
        startText.center = this.application.screen.center;
        startText.y = 180;
        this.stage.addChild(startText);



        if (gamepad1.justPressed(2) || gamepad2.justPressed(2)) {
            var p1Character = this.characters[this.selectedByP1].image;
            var p2Character = this.characters[this.selectedByP2].image;

         this.application.scenes.load([
           new projektkurs2.scene.Game(p1Character, p2Character)
        ]);
        }
        
        
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