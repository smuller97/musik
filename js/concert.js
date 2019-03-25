/*Hjælp fra https://www.youtube.com/watch?v=88DS3Z8nOdY */ 
// Instansiere the Phaser Game object og  default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update 
});

// Dekleration af variable, som kan tilgåes alle steder fra
let score = 0;
let scoreText;
let platforms;
let nodes;
let cursors;
let player;
  
function preload () { // Loader billeder og spritesheet
  game.load.image('scene', 'asserts/scene.png');
  game.load.image('ground', 'asserts/platformblack.png');
  game.load.image('node', 'asserts/mic.png');
  game.load.spritesheet('Chrisser', 'asserts/Chrisser.png', 32, 32);
  game.load.image('winner','asserts/tillykke.png');
}
  
function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE); //  Anvende physics til enable af Arcade Physics system
  game.add.sprite(0, 0, 'scene');  //  Baggrund for spil
  // #region Platforme
  platforms = game.add.group();//  Gruppering af platforme vi kan hoppe på
  platforms.enableBody = true; //  Aktivere  physics til platformene
  let ground = platforms.create(0, game.world.height - 64, 'ground');// Opretter jorden
  ground.scale.setTo(2, 1); //  Skallering så jorden passer
  ground.body.immovable = true; // PLatforme falder ingen steder når der hoppes på den
  // #endregion

  // #region Spilleren
  player = game.add.sprite(35, game.world.height - 150, 'Chrisser');
  game.physics.arcade.enable(player);//  Tilføjelse af physics til spilleren
  //  Physics properties - hopper let (bounce)
  player.body.bounce.y = 0.2;
  player.body.gravity.y = 800;
  player.body.collideWorldBounds = true;
  player.scale.setTo(2, 2); //Hjælp til skallering fra https://www.youtube.com/watch?v=Y72m_NQGaCI 
  // #endregion

  // #region Gå animationerne
  player.animations.add('left', [0, 1], 10, true);
  player.animations.add('right', [2, 3], 10, true);
  // #endregion
  nodes = game.add.group(); // Elementer at indsamle
  nodes.enableBody = true; // Aktivere physics til allee oprettede objekter 
  
  // #region Indsamlig elementer
  let node = nodes.create(1, 0, 'node');
    node.body.gravity.y =300;
    node.body.bounce.y = 0.3 + Math.random() * 0.2;
  // #endregion
  scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' }); //  Score tekst
  cursors = game.input.keyboard.createCursorKeys();  //  And bootstrap our controls
}

function update () {
  player.body.velocity.x = 0 // Stopper spiller med at gå
  //  Kollission opsætning 
  // #region
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(nodes, platforms);
  // #endregion

  game.physics.arcade.overlap(player, nodes, collectnode, null, this)  //  Metode kaldes callectionnode() hvis der gåes over et indsamlingselement 

  // #region Spiller bevægelse og kollition
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  } 
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  } 
  else {
    // Spiller står stille når der ikke klikkes på knapper
    player.animations.stop();
  }

  //  Spiller kan hoppe
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -450;
  }
  // #endregion
  
  if (score === 10) { //Tjekker om alle noder indsamlet
    win();
  }
}

function update () {
  player.body.velocity.x = 0 // Stopper spiller med at gå
  //  Kollission opsætning 
  // #region
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.collide(nodes, platforms);
 // #endregion

  game.physics.arcade.overlap(player, nodes, collectnode, null, this)  //  Metode kaldes callectionnode() hvis der gåes over et indsamlingselement 

  // #region Spiller bevægelse og kollition
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  } 
  else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  } 
  else {
    // Spiller står stille når der ikke klikkes på knapper
    player.animations.stop();
  }

  //  Spiller kan hoppe
  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -450;
  }
  // #endregion
 
  if (score === 10) { //Tjekker om alle noder indsamlet
    //alert("Tillykke, du vandt");
    //score = 0;
    win();
  }
}

function collectnode (player, node) {
  node.kill(); // Fjerner element fra skærm
  score += 10;//  Opdatere score i spil
  //scoreText.text = 'Score: ' + score;
}


function win() //Help from https://www.youtube.com/watch?v=AYMPi-3HW3Y 
{ 
  window.location.replace("win.html");
}

function replay()
{
    window.location.replace("index.html");
}