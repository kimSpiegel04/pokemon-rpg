var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var Pokedex = require('pokedex');
var nerds = require('nerds');
var pokedex = new Pokedex();

var computerChoice = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp', 'attack', 'defense', 'special_attack', 'special_defense', 'base_experience']).asArray();
var userChoice = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp', 'attack', 'defense', 'special_attack','special_defense', 'base_experience']).asArray();

var port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var pokeballImg = "http://pngimg.com/uploads/pokeball/pokeball_PNG8.png";

////////////////USER POKEMON///////////////////////////////

function Pokemon(name,type,level,HP,attack,defense,special_attack,special_defense,base_experience,animatedImage,stillImage){
    this.name = name;
    this.type = type;
    this.level = level;
    this.HP = HP;
    this.attack = attack;
    this.defense = defense;
    this.special_attack = special_attack;
    this.special_defense = special_defense;
    this.base_experience = base_experience;
    this.animatedImage = animatedImage;
    this.stillImage = stillImage;
    this.pokeball = pokeballImg
}

var userPokemon = [];

for(var i=0; i< userChoice.length; i++){

    var newPokemon = new Pokemon (userChoice[i].name, userChoice[i].type, Math.floor(Math.random() * 10) + 1,  userChoice[i].hp, userChoice[i].attack, userChoice[i].defense,userChoice[i].special_attack,userChoice[i].special_defense, userChoice[i].base_experience,pokedex.pokemon(userChoice[i].name.toLowerCase()).sprites.animated, pokedex.pokemon(userChoice[i].name.toLowerCase()).sprites.normal), pokeballImg;

    userPokemon.push(newPokemon);
}


////////////////COMPUTER POKEMON////////////////////////////

var computerPokemon = [];

for(var i=0; i< computerChoice.length; i++){
    var newPokemon = new Pokemon (computerChoice[i].name, computerChoice[i].type, Math.floor(Math.random() * 10) + 1,  computerChoice[i].hp, computerChoice[i].attack, computerChoice[i].defense,computerChoice[i].special_attack, computerChoice[i].special_defense, computerChoice[i].base_experience, pokedex.pokemon(computerChoice[i].name.toLowerCase()).sprites.animated, pokedex.pokemon(computerChoice[i].name.toLowerCase()).sprites.normal);

    computerPokemon.push(newPokemon);
}

function changeColor() {
    var elem = document.getElementById('scoreboard');
    elem.style.color = 'blue';
}

console.log(userPokemon, computerPokemon);


app.get('/',function(req,res){
    res.render('landing', {user:userPokemon,computer:computerPokemon,clickHandler:changeColor});
});

// app.post('/', function(req,res){
//     res.send('POKEMON CHOSEN');

//     var name = req.body.name;
//     var level = req.body.level;
//     var HP = req.body.HP;
//     var attack = req.body.attack;
//     var defense = req.body.defense;
//     var image = req.body.image;

//     var chosenPokemon = {name: name, level: level, HP: HP, attack: attack, defense: defense, image: image}

//     res.redirect('/', {chosen:chosenPokemon});
// });

// $('.item-container').off("click").on("click",function() {
//     $('.button-container').not($(this).next()).hide(200);
//     $(this).next('.button-container').toggle(400);

//     //used button
//     $('.used-btn').off("click").on("click",function(){
//         var foodItem = $(this).attr('data-name');
//         console.log(foodItem);
//         var valOfBtn = $('.used-btn[data-name='+foodItem+']').val();
//         var num = parseInt(valOfBtn);
//         var newAmount=used+num;
//         database.ref('child/used').set({
//             lbsUsed: newAmount
//         });
//         keyref = $(this).attr("data-key");
//         database.ref('child/food').child(keyref).remove();
//         window.location.reload();
//         return false;
//     });

/////////////////POKEMON TYPES MOVES///////////////////
/*
A blank spot in the chart shows that a move of a particular type is neither effective or ineffective against a Pokemon holding the other type.
A "2" shows that a move of that type will be doubly effective against a Pokemon holding the other type.
A "1/2" shows that a move of that type will have its effectiveness reduced by half against a Pokemon holding the other type.
A "0" shows that a move of that type will produce no damage at all against a Pokemon holding the other type.

ATTACKER : DEFENDER 
(unless otherwise noted, consider blank spot)
IF
Normal : Rock -> 1/2 
Normal : Ghost -> 0
Normal : Steel -> 1/2
-------
Fire : Fire -> 1/2
Fire : Water -> 1/2
Fire : Grass -> 2
Fire : Ice -> 2
Fire : Bug -> 2
Fire : Rock -> 1/2
Fire : Dragon -> 1/2
Fire : Steel -> 2
-------
Water : Fire -> 2
Water : Water -> 1/2
Water : Grass -> 1/2
Water : Ground -> 2
Water : Rock -> 2
Water : Dragon -> 1/2
-------
Grass : Fire -> 1/2
Grass : Water -> 2
Grass : Grass -> 1/2
Grass : Poison -> 1/2
Grass : Ground -> 2
Grass : Flying -> 1/2
Grass : Bug -> 1/2
Grass : Rock -> 2
Grass : Dragon -> 1/2
Grass : Steel -> 1/2
-------
Electric : Water -> 2
Electric : Grass -> 1/2
Electric : Electric -> 1/2
Electric : Ground -> 0
Electric : Flying -> 2
Electric : Dragon -> 1/2
-------
Ice : Fire -> 1/2
Ice : Water -> 1/2
Ice : Grass -> 2
Ice : Ice -> 1/2
Ice : Ground -> 2
Ice : Flying -> 2
Ice : Dragon -> 2
Ice : Steel -> 1/2
-------
Fighting : Normal -> 2
Fighting : Ice -> 2
Fighting : Poison -> 1/2
Fighting : Flying -> 1/2
Fighting : Psychic -> 1/2
Fighting : Bug -> 1/2
Fighting : Rock -> 2
Fighting : Ghost -> 0
Fighting : Dark -> 2
Fighting : Stee; -> 2
-------
Poison : Grass -> 2
Poison : Poison -> 1/2
Poison : Ground -> 1/2
Poison : Rock -> 1/2
Poison : Ghost -> 1/2
Poison : Steel -> 0
-------
Ground : Fire -> 2
Ground : Grass -> 1/2
Ground : Electric-> 2
Ground : Poison -> 2
Ground : Flying -> 0
Ground : Bug -> 1/2
Ground : Rock -> 2
Ground : Steel -> 2
-------
Flying : Grass -> 2
Flying : Electric -> 2
Flying : Fighting -> 2
Flying : Bug -> 2
Flying : Rock -> 2
Flying : Steel -> 2
-------
Psychic : Fighting -> 2
Psychic : Poison -> 2
Psychic : Psychic -> 1/2
Psychic : Dark -> 0
Psychic : Steel -> 1/2
-------
Bug : Fire -> 1/2
Bug : Grass -> 1/2
Bug : Fighting -> 1/2
Bug : Poison -> 1/2
Bug : Flying -> 1/2
Bug : Psychic -> 1/2
Bug : Ghost -> 1/2
Bug : Dark -> 1/2
Bug : Steel -> 1/2
-------
Rock : Fire -> 2
Rock : Ice -> 2
Rock : Fighting -> 2
Rock : Ground -> 1/2
Rock : Flying -> 2
Rock : Bug -> 2
Rock : Steel -> 1/2
-------
Ghost : Normal -> 0
Ghost : Psychic -> 2
Ghost : Ghost -> 2
Ghost : Dark -> 1/2
Ghost : Steel -> 1/2
-------
Dragon : Dragon -> 2
Dragon : Steel -> 1/2
-------
Steel : Fire -> 1/2
Steel : Water -> 1/2
Steel : Ice -> 2
Steel : Rock -> 2
Steel : Steel -> 1/2


*/

app.listen(port, function(){
    console.log('Pika pika!');
});