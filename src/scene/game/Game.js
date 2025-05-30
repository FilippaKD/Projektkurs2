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
pixiepower.scene.Game = function (p1Character, p2Character, highscores) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
    this.p1choosen = p1Character;
    this.p2choosen = p2Character;
    this.highscores = highscores;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
pixiepower.scene.Game.prototype.constructor = pixiepower.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
pixiepower.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    // kolla om gamepads är connected
    // console.log(this.gamepads.numGamepads)

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "image_game_background");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);

    this.sol = new Sol("image_game_Sol");
    this.filippa = new Filippa("image_game_Filippa");

    this.borderBottom = new rune.display.DisplayObject(0, 225, 400, 1);
    this.borderLeft = new rune.display.DisplayObject(0, 0, 1, 225);
    this.borderRight = new rune.display.DisplayObject(400, 0, 1, 225);
    this.borderTop = new rune.display.DisplayObject(0, 20, 400, 1);


    this.borderBottom.immovable = true;
    this.borderLeft.immovable = true;
    this.borderRight.immovable = true;
    this.borderTop.immovable = true;

    this.fairies = new rune.display.DisplayGroup(this.stage);

    this.fairies.addMember(this.sol)
    this.fairies.addMember(this.filippa)

    bgContainer.addChild(this.sol.emitter);
    bgContainer.addChild(this.filippa.emitter);

    this.stage.addChild(this.borderBottom);
    this.stage.addChild(this.borderLeft);
    this.stage.addChild(this.borderRight);
    this.stage.addChild(this.borderTop);

    this.initFlower();
    this.initWaterdroplet();

    this.lightballs = new rune.display.DisplayGroup(this.stage);

    this.initThorns();
    this.initWeeds();
    this.initMushrooms();
    this.initHud();
    this.initBossWeeds();
    this.initPowerups();

    this.waterZone = new rune.display.Graphic(
        this.flower.x,
        this.flower.y,
        this.flower.width,
        this.flower.height + 10
    );

    this.stage.addChild(this.waterZone);
    // protect the flower-ljud
    this.timers.create({
        duration: 2000,
        onTick: function () {
            this.sound_protect.volume = 0.9;
            this.sound_protect.play();
        }.bind(this)
    });


    this.sound_protect = this.application.sounds.sound.get("sound_protectheflower");
    this.sound_blub = this.application.sounds.sound.get("sound_blub");
    this.sound_helpme = this.application.sounds.sound.get("sound_helpme");
    this.sound_waterPickup = this.application.sounds.sound.get("sound_waterpickup");
    this.sound_waterSplash = this.application.sounds.sound.get("sound_watersplash");
    this.sound_isThatJesus = this.application.sounds.sound.get("sound_isthatjesus");
    this.sound_powerup = this.application.sounds.sound.get("sound_powerup");
    this.sound_ohno = this.application.sounds.sound.get("sound_ohno");
    this.sound_dramabush = this.application.sounds.sound.get("sound_deadbush");
    this.sound_teamwork = this.application.sounds.sound.get("sound_teamwork");

    this.application.sounds.master.get("sound_startsong").fade(0, 2000);
    this.bgm = this.application.sounds.music.get("themesong");
    this.bgm.volume = 0;
    this.bgm.loop = true;
    this.bgm.play();
    this.bgm.fade(0.5, 2000);

   





};




/**
 * @inheritDoc
 */
pixiepower.scene.Game.prototype.m_initCamera = function (step) {
    this.camera = new Camera();
    this.cameras.addCamera(this.camera);



};

pixiepower.scene.Game.prototype.initHud = function () {

    this.score = 0;
    this.displayCounter = new rune.text.BitmapField();
    this.displayCounter.autoSize = true;
    this.displayCounter.center = this.application.screen.center;
    this.displayCounter.y = 5;
    this.displayCounter.backgroundColor = "#000000"
    this.displayCounter.color = "#FFFFFF";
    this.stage.addChild(this.displayCounter);

    this.displayPlayer1 = new rune.text.BitmapField();
    this.displayPlayer1.color = "#FFFFFF";
    //this.displayPlayer1.y = 100;
    this.stage.addChild(this.displayPlayer1);
    this.watercan1 = new Watercan;
    this.stage.addChild(this.watercan1);



    this.displayPlayer2 = new rune.text.BitmapField();
    this.displayPlayer2.color = "#FFFFFF";
    this.displayPlayer2.x = 300;
    this.stage.addChild(this.displayPlayer2);
    this.watercan2 = new Watercan(375, 0);
    this.stage.addChild(this.watercan2);


};


pixiepower.scene.Game.prototype.initMushrooms = function () {

    this.mushrooms = new rune.display.DisplayGroup(this.stage);


    this.timers.create({
        duration: 6000,
        repeat: Infinity,
        onTick: function () {
            var mushroom = new Mushroom();
            this.mushrooms.addMember(mushroom);
        }.bind(this)
    });

    /* this.mushrooms.forEachMember(function (mushroom) {
         var filippaDistance = this.filippa.distance(mushroom);
         var solDistance = this.sol.distance(mushroom);
 
         if (filippaDistance < solDistance) {
             var nearestPlayer = this.filippa;
         } else {
             var nearestPlayer = this.sol;
         }
     }.bind(this));*/
}


pixiepower.scene.Game.prototype.initWaterdroplet = function () {

    this.waterdroplets = new rune.display.DisplayGroup(this.stage);

    this.timers.create({
        duration: 2500,
        repeat: Infinity,
        onTick: function () {

            this.waterdroplet = new Waterdroplet();
            this.waterdroplets.addMember(this.waterdroplet);


        }.bind(this)
    });


    this.timers.create({
        duration: 7000,
        repeat: Infinity,
        onTick: function () {
            var members = this.waterdroplets.getMembers();
            if (members.length > 0) {
                var randomI = Math.floor(Math.random() * members.length);
                var toBeRemoved = members[randomI];
                toBeRemoved.flicker.start(2000, 200);

                this.removeWaterdrop(toBeRemoved);
            }
        }.bind(this)
    })
};


pixiepower.scene.Game.prototype.removeWaterdrop = function (toBeRemoved) {

    this.timers.create({
        duration: 2000,
        repeat: Infinity,
        onTick: function () {

            this.stage.removeChild(toBeRemoved);
            this.waterdroplets.removeMember(toBeRemoved);
        }.bind(this)
    })

}

pixiepower.scene.Game.prototype.initPowerups = function () {


    this.timers.create({
        duration: 9000,
        repeat: Infinity,
        onTick: function () {
            if (Math.random() < 0.10 && !this.jesusPowerup) {
                this.jesusPowerup = new Powerup("image_game_powerup_jesus");
                this.stage.addChild(this.jesusPowerup);
            }

        }.bind(this)
    });

    this.timers.create({
        duration: 9000,
        repeat: Infinity,
        onTick: function () {
            if (Math.random() < 0.10 && !this.bombPowerup) {
                this.bombPowerup = new Powerup("image_game_powerup_bomb");
                this.stage.addChild(this.bombPowerup);
            }

        }.bind(this)
    });


};



pixiepower.scene.Game.prototype.initWeeds = function () {

    this.weeds = new rune.display.DisplayGroup(this.stage);

    this.spawnInterval = 3000;

    const startSpawnTimer = () => {
        if (this.spawnTimer) {
            this.spawnTimer.stop();
        }

        this.spawnTimer = this.timers.create({
            duration: this.spawnInterval,
            repeat: Infinity,
            onTick: () => {
                for (let i = 0; i < 2; i++) {
                    var weed = new Weed();
                    this.weeds.addMember(weed);
                    this.stage.addChildAt(weed, 1);

                }

            }
        });
    };

    startSpawnTimer();

    this.timers.create({
        duration: 10000,
        repeat: 10,
        onTick: () => {
            if (this.spawnInterval > 500) {
                this.spawnInterval -= 200;
                // console.log("New spawn interval: " + this.spawnInterval);
                startSpawnTimer();
            }
        }
    });


}

pixiepower.scene.Game.prototype.initBossWeeds = function () {
    this.bossWeeds = new rune.display.DisplayGroup(this.stage);

    var spawnInterval = 45000;

    this.timers.create({
        duration: spawnInterval,
        repeat: Infinity,
        onTick: function () {
            var bossWeed = new BossWeed();
            this.bossWeeds.addMember(bossWeed);
        }
    });


    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            spawnInterval = Math.max(1000, spawnInterval - 200);
        }
    });
}

// Taggbuskar initiering
pixiepower.scene.Game.prototype.initThorns = function () {

    this.allThorns = new rune.display.DisplayGroup(this.stage);

    this.spawnIntervalThorns = 3000;

    const startSpawnTimer = () => {
        if (this.spawnTimer) {
            this.spawnTimer.stop();
        }

        this.spawnTimerThorns = this.timers.create({
            duration: this.spawnIntervalThorns,
            repeat: Infinity,
            onTick: () => {

                var thorn = new Thorn();
                this.allThorns.addMember(thorn);

            }
        });
    };

    startSpawnTimer();

    this.timers.create({
        duration: 10000,
        repeat: 5,
        onTick: () => {
            if (this.spawnIntervalThorns > 2500) {
                this.spawnIntervalThorns -= 100;
                // console.log("New spawn interval: " + this.spawnInterval);
                startSpawnTimer();
            }
            console.log("SPAWNINTERVALL THORNS" + this.spawnIntervalThorns);
        }
    });

};


pixiepower.scene.Game.prototype.initFlower = function () {

    this.flower = new Flower();
    this.stage.addChild(this.flower);


    this.timers.create({
        duration: 8000,
        repeat: Infinity,
        onTick: function () {
            this.flower.flowerDamage(5);
        }.bind(this)
    });


};

pixiepower.scene.Game.prototype.handleThorns = function () {

    this.fairies.forEachMember(function (fairy) {
        if (!fairy.isStuck) {
            this.allThorns.forEachMember(function (thorn) {
                if (fairy.hitTestObject(thorn)) {

                    thorn.fairyStuck();
                    this.sound_helpme.volume = 0.9;
                    this.sound_helpme.play();

                    fairy.isStuck = true;
                    fairy.immovable = true;
                }
            }.bind(this));
        }
    }.bind(this));

};




pixiepower.scene.Game.prototype.handleWaterdroplets = function () {

    this.waterdroplets.forEachMember(function (droplet) {
        var collected = false;

        this.fairies.forEachMember(function (fairy) {
            if (droplet.hitTestObject(fairy) && fairy.waterCollection < 3 && !collected) {

                this.sound_waterPickup.volume = 0.9;
                this.sound_waterPickup.play();
                fairy.addDrop(1);
                this.waterdroplets.removeMember(droplet);
                collected = true;

            }
        }.bind(this));
    }.bind(this));


    if (this.filippa.hitTestObject(this.waterZone) && this.gamepads.get(0).justPressed(7) && this.filippa.waterCollection > 0) {
        this.sound_waterSplash.volume = 0.9;
        this.sound_waterSplash.play();
        this.flower.flowerHeal(this.filippa.waterCollection);
        var droppedWater = new Waterdroplet;
        droppedWater.x = this.filippa.x;
        droppedWater.y = this.filippa.y;
        droppedWater.dropWater();
        this.stage.addChild(droppedWater);
        this.waterdroplets.forEachMember(function (droplet) {
            this.score += droplet.point;
        }.bind(this));
        this.filippa.waterCollection = 0;



    }

    if (this.sol.hitTestObject(this.waterZone) && this.gamepads.get(1).justPressed(7) && this.sol.waterCollection > 0) {
        this.flower.flowerHeal(this.sol.waterCollection);
        var droppedWater = new Waterdroplet;
        droppedWater.x = this.sol.x;
        droppedWater.y = this.sol.y;
        droppedWater.dropWater();
        this.stage.addChild(droppedWater);
        this.waterdroplets.forEachMember(function (droplet) {
            this.score += droplet.point;
        }.bind(this));
        this.sol.waterCollection = 0;

    }


};


pixiepower.scene.Game.prototype.handlePowerups = function () {

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestObject(this.jesusPowerup)) {

            this.jesus = new Jesus();
            // jesusljud
            this.sound_isThatJesus.volume = 0.9;
            this.sound_isThatJesus.play();

            this.jesus.x = this.flower.x;
            this.jesus.y = this.flower.y - 35;
            this.stage.addChild(this.jesus);

            this.timers.create({
                duration: 1000,
                repeat: this.flower.flowerLifeBar,
                onTick: function () {
                    this.flower.flowerHeal(10);
                }.bind(this)
            });

            this.stage.removeChild(this.jesusPowerup);
            this.jesusPowerup = null;
        }
    }.bind(this))

    this.fairies.forEachMember(function (fairy) {
        if (fairy.hitTestObject(this.bombPowerup)) {
            this.sound_powerup.volume = 0.9;
            this.sound_powerup.play();
            fairy.powerUpShooting = true;
            this.timers.create({
                duration: 5000,
                onComplete: function () {
                    fairy.powerUpShooting = false;
                }
            });
            this.stage.removeChild(this.bombPowerup);
            this.bombPowerup = null;
        }
    }.bind(this))

}


pixiepower.scene.Game.prototype.gameOver = function () {

    if (this.flower.flowerLifeBar == 0) {
        //  console.log("gameover");

        var cam = this.cameras.getCameraAt(0);

        this.gameOverStart = true;

        this.weeds.forEachMember(function (weed) {
            weed.dispose()
        })
        this.allThorns.forEachMember(function (thorn) {
            thorn.dispose()
        })
        this.mushrooms.forEachMember(function (mushroom) {
            mushroom.dispose()
        })

        this.flower.dyingFlower();
        this.sol.isStuck = true;
        this.filippa.isStuck = true;

        //cam.target = this.flower;
        //  console.log(cam.target);

        //cam.center = this.application.screen.center;
        //cam.viewport.zoom = 2.0;

        //cam.centerX = this.flower.x + this.flower.width / 2;
        //cam.centerY = this.flower.y + this.flower.height / 2;

     
        var highscoreTest = this.highscores.test(this.score);
        console.log(highscoreTest)
        console.log(this.highscores)


        if (highscoreTest !== -1) {
            this.timers.create({
                duration: 2500,
                repeat: 1,
                onComplete: function () {

                    this.application.scenes.load([
                        new pixiepower.scene.GameOver(this.score, this.highscores)
                    ]);

                }.bind(this)
            });
        } else {
            console.log("try again") // Här ska de va gameover på samma scen och fler knappar
        }

    }


    if (this.sol.isStuck && this.filippa.isStuck && !this.gameOverStart) {


        if (highscoreTest !== -1) {
            this.timers.create({
                duration: 2500,
                repeat: 1,
                onComplete: function () {
                    this.application.scenes.load([
                        new pixiepower.scene.GameOver(this.score, this.highscores)
                    ]);
                }.bind(this)
            });
        } else {
            console.log("try again") // Här ska de va gameover på samma scen och fler knappar
        }

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
pixiepower.scene.Game.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);
    this.sol.movement();
    this.filippa.movement();

    this.gameOver();
    this.displayCounter.text = "";
    this.displayCounter.text = this.score.toString();


    this.displayPlayer1.text = "";
    this.displayPlayer1.text = "Player 1 " + this.sol.waterCollection.toString() + "/3";
    this.watercan1.updatePicture(this.sol.waterCollection);

    this.displayPlayer2.text = "";
    this.displayPlayer2.text = "Player 2 " + this.filippa.waterCollection.toString() + "/3";
    this.watercan2.updatePicture(this.filippa.waterCollection);


    // HEJ GOOPh
    var cam = this.cameras.getCameraAt(0);
    this.mushrooms.forEachMember(function (mushroom) {
        rune.physics.Space.separate(this.flower, mushroom);
        var filippaDistance = this.filippa.distance(mushroom);
        var solDistance = this.sol.distance(mushroom);

        if (filippaDistance < solDistance) {
            var nearestPlayer = this.filippa;
        } else {
            var nearestPlayer = this.sol;
        }

        mushroom.getDistanceOfPlayers(nearestPlayer);

        if (mushroom.hitTestGroup(this.fairies)) {
            this.stage.removeChild(mushroom);
            this.mushrooms.removeMember(mushroom);
            cam.wavy = true;

            cam.tint = new rune.camera.CameraTint();
            cam.tint.color = new rune.color.Color24();
            cam.tint.opacity = 0.4;

            // Färger för svampeffekten
            let colors = [
                { r: 255, g: 105, b: 180 },
                { r: 255, g: 0, b: 0 },
                { r: 255, g: 128, b: 0 },
                { r: 255, g: 255, b: 0 },
                { r: 0, g: 255, b: 0 },
                { r: 128, g: 0, b: 255 }
            ];

            let index = 0;

            // Fadetimer för färgerna på svampeffekten
            let fadeTimer = this.timers.create({
                duration: 250,
                repeat: 24,
                onTick: () => {
                    let c = colors[index];
                    cam.tint.color.setRGB(c.r, c.g, c.b);
                    index++;
                    if (index >= colors.length) {
                        index = 0;
                    }
                }
            });
            // are we tripping-ljud
            this.timers.create({
                duration: 1000,
                onTick: function () {
                    this.sound_ohno.volume = 0.9;
                    this.sound_ohno.play();
                }.bind(this)
            });


            // Svamptimer hur länge den ska hålla på
            this.timers.create({
                duration: 7000,
                onComplete: function () {
                    this.timers.remove(fadeTimer);
                    cam.tint.opacity = 0;
                    cam.wavy = false;
                }
            });
        }
    }.bind(this));


    this.weeds.forEachMember(function (weed) {
        rune.physics.Space.separate(this.flower, weed);
        if (this.flower.hitTestObject(weed) && weed.canHit) {
            this.flower.flowerDamage(2);
            this.flower.flicker.start();
            weed.canHit = false;
            this.timers.create({
                duration: 2000,
                onTick: function () {
                    weed.canHit = true;
                }
            })
        }

        //HÄR LIGGER DET
        this.fairies.forEachMember(function (fairy) {

            rune.physics.Space.separate(fairy, weed);



        }.bind(this))
    }.bind(this));


    // borders
    this.fairies.forEachMember(function (fairy) {

        rune.physics.Space.separate(fairy, this.borderBottom);
        rune.physics.Space.separate(fairy, this.borderLeft);
        rune.physics.Space.separate(fairy, this.borderRight);
        rune.physics.Space.separate(fairy, this.borderTop);

    }.bind(this))



    this.lightballs.forEachMember(function (ball) {
        if (ball.isDead) {
            this.lightballs.removeMember(ball);
        }

        // Såhär gör man om man använder display group för att at bort går inte med vanlig array
        this.allThorns.forEachMember(function (thorn) {
            if (ball.hitTestObject(thorn)) {
                this.stage.addChild(thorn.emitter);
                thorn.emitter.emit(30);
                this.allThorns.removeMember(thorn);
                this.lightballs.removeMember(ball);
                this.fairies.forEachMember(function (fairy) {
                    if (fairy.isStuck == true && fairy.hitTestObject(thorn)) {

                        fairy.isStuck = false;
                        fairy.immovable = false;
                    }
                });


                return false;
            }
        }.bind(this));


        this.weeds.forEachMember(function (weed) {
            if (ball.hitTestObject(weed)) {
                weed.hp--;

                // Glitter när ett ogräs dör
                if (weed.hp == 0) {
                    this.sound_dramabush.volume = 0.9;
                    this.sound_dramabush.play();

                    this.stage.addChild(weed.emitter);
                    weed.emitter.emit(30);
                    this.weeds.removeMember(weed);
                    this.score += 1000;
                }

                var originalColor = rune.color.Color24.fromHex("4b692f");
                var hitColor = rune.color.Color24.fromHex("ac2828");
                weed.texture.replaceColor(originalColor, hitColor);
                this.timers.create({
                    duration: 200,
                    onTick: function () {
                        weed.texture.replaceColor(hitColor, originalColor);
                    }
                });
                this.lightballs.removeMember(ball);
                // console.log(this.score);
            }

        }.bind(this));

        this.mushrooms.forEachMember(function (mushroom) {
            rune.physics.Space.separate(this.flower, mushroom);
            if (ball.hitTestObject(mushroom)) {
                mushroom.emitter.emit(30);
                this.mushrooms.removeMember(mushroom);
                this.lightballs.removeMember(ball);
                this.score += 25;

                // console.log(this.score);
            }
        }.bind(this));

        // bigboss
        this.bossWeeds.forEachMember(function (bossWeed) {
            //  console.log("bossWeed");

            if (this.flower.hitTestObject(bossWeed) && bossWeed.canHit) {
                this.flower.flowerDamage(10);
                this.flower.flicker.start();
                bossWeed.canHit = false;
                this.timers.create({
                    duration: 2000,
                    onTick: function () {
                        bossWeed.canHit = true;
                    }
                })
            }




            if (ball.hitTestObject(bossWeed)) {

                this.lightballs.removeMember(ball);
                bossWeed.hp--;
                this.camera.shake.start(300, 1, 1);

                var originalColor = rune.color.Color24.fromHex("4b692f");
                var hitColor = rune.color.Color24.fromHex("ac2828");
                bossWeed.texture.replaceColor(originalColor, hitColor);
                this.timers.create({
                    duration: 200,
                    onTick: function () {
                        bossWeed.texture.replaceColor(hitColor, originalColor);
                    }
                });
            }

            if (bossWeed.hp == 0) {
                var weed1 = new Weed(bossWeed.x, bossWeed.y);
                var weed2 = new Weed(bossWeed.x + 10, bossWeed.y + 10);

                this.weeds.addMember(weed1);
                this.weeds.addMember(weed2);

                this.bossWeeds.removeMember(bossWeed);

                this.sound_teamwork.volume = 0.9;
                this.sound_teamwork.play();

                this.score += 100;
            }
        }.bind(this));

    }.bind(this));



    this.bossWeeds.forEachMember(function (bossWeed) {
        rune.physics.Space.separate(this.flower, bossWeed);
    }.bind(this));

    this.waterdroplets.forEachMember(function (droplet) {
        droplet.hitTestAndSeparate(this.flower);
    }.bind(this));


    // denna funkar ej
    this.allThorns.forEachMember(function (thorn) {
        // rune.physics.Space.separate(this.flower, thorn);
        this.flower.hitTestAndSeparate(thorn);
    }.bind(this));

    // console.log(this.lightballs.numMembers)


    // Skottlogik (tilläggning på scen)
    if (this.gamepads.get(0).justPressed(2)) {
        if (this.filippa.isStuck == false) {
            this.sound_blub.volume = 0.9;
            this.sound_blub.play();


            if (this.filippa.powerUpShooting) {
                var balls = this.filippa.shootPowerUp();


                for (let i = 0; i < balls.length; i++) {
                    this.lightballs.addMember(balls[i]);
                }
            } else {
                var ball = this.filippa.shoot();
                this.lightballs.addMember(ball);
            }

        }

    }

    if (this.gamepads.get(1).justPressed(2)) {
        if (this.sol.isStuck == false) {

            this.sound_blub.volume = 0.9;
            this.sound_blub.play();
            if (this.sol.powerUpShooting) {
                var balls = this.sol.shootPowerUp();
                for (let i = 0; i < balls.length; i++) {
                    this.lightballs.addMember(balls[i]);
                }
            } else {
                var ball = this.sol.shoot();
                this.lightballs.addMember(ball);
            }
        }


    }

    // Med tangentbord
    /*
    if (this.keyboard.justPressed("SPACE")) {
        const ball = this.filippa.shoot();
       this.lightballs.addMember(ball);
    }
    
    if (this.keyboard.justPressed("SPACE")) {
        const ball = this.sol.shoot();
       this.lightballs.addMember(ball);
    }
    */
    this.handleThorns();
    this.handleWaterdroplets();
    this.handlePowerups();


    this.fairies.forEachMember(function (fairy) {



    }.bind(this))


};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
pixiepower.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};