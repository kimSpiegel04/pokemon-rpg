var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var Pokedex = require('pokedex');
var nerds = require('nerds');
var pokedex = new Pokedex();

var computerChoice = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp', 'attack', 'defense', 'base_experience']).asArray();
var userChoice = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp', 'attack', 'defense', 'base_experience']).asArray();

var port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var pokeballImg = "http://pngimg.com/uploads/pokeball/pokeball_PNG8.png";

////////////////USER POKEMON///////////////////////////////

function Pokemon(name,type,level,HP,attack,defense,base_exp,animatedImage,stillImage){
    this.name = name;
    this.type = type;
    this.level = level;
    this.HP = HP;
    this.attack = attack;
    this.defense = defense;
    this.base_exp = base_exp;
    this.animatedImage = animatedImage;
    this.stillImage = stillImage;
    this.pokeball = pokeballImg;
    this.printStats = function(){
        var pokemonData = [
            'Name: ' + this.name,
            'Type: ' + this.type,
            'Level: ' + this.level,
            'HP: ' + this.HP + ' Base Exp.: ' + this.base_exp,
            'Attack: ' + this.attack + ' Defense: ' + this.defense
        ].join('\n\n');
        console.log(pokemonData);
    }
}

var userPokemon = [];

for(var i=0; i< userChoice.length; i++){

    var newPokemon = new Pokemon (userChoice[i].name, userChoice[i].type, Math.floor(Math.random() * 10) + 1,  userChoice[i].hp, userChoice[i].attack, userChoice[i].defense, userChoice[i].base_experience,     pokedex.pokemon(userChoice[i].name.toLowerCase()).sprites.animated, pokedex.pokemon(userChoice[i].name.toLowerCase()).sprites.normal), pokeballImg;

    userPokemon.push(newPokemon);
}


////////////////COMPUTER POKEMON////////////////////////////

var computerPokemon = [];

for(var i=0; i< computerChoice.length; i++){
    var newPokemon = new Pokemon (computerChoice[i].name, computerChoice[i].type, Math.floor(Math.random() * 10) + 1,  computerChoice[i].hp, computerChoice[i].attack, computerChoice[i].defense, computerChoice[i].base_experience, pokedex.pokemon(computerChoice[i].name.toLowerCase()).sprites.animated, pokedex.pokemon(computerChoice[i].name.toLowerCase()).sprites.normal);

    computerPokemon.push(newPokemon);
}

console.log(userPokemon, computerPokemon);

app.get('/',function(req,res){
    res.render('landing', {user:userPokemon,computer:computerPokemon});
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

app.listen(port, function(){
    console.log('Pika pika!');
});