/*Hjælp fra https://www.youtube.com/watch?v=88DS3Z8nOdY */ 
// Instansiere the Phaser Game object og  default game window size
const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update 
  });
    
function preload () { // Loader billeder og spritesheet
    game.load.image('scene', 'asserts/scene.png');
    game.load.spritesheet('Chrisser', 'asserts/Chrisser.png', 32, 32);
    game.load.image('winner','asserts/tillykke.png');
}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE); //  Anvende physics til enable af Arcade Physics system
    game.add.sprite(0, 0, 'winner');  //  Baggrund for spil
}

function update () {
}

function replay(){
    window.location.replace("index.html");
}