var express = require('express');
var app = express();
var Pokedex = require('pokedex');
var nerds = require('nerds');
var pokedex = new Pokedex();
var path = require('path');

var computerChoice = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp', 'attack', 'defense', 'special_attack', 'special_defense', 'base_experience']).asArray();
var userChoice = nerds.resolve('Pokemon', 5).include(['name', 'type', 'hp', 'attack', 'defense', 'special_attack','special_defense', 'base_experience']).asArray();

var port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');

var pokeballImg = "http://pngimg.com/uploads/pokeball/pokeball_PNG8.png";

////////////////*USER POKEMON///////////////////////////////

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


////////////////*COMPUTER POKEMON////////////////////////////

var computerPokemon = [];

for(var i=0; i< computerChoice.length; i++){
    var newPokemon = new Pokemon (computerChoice[i].name, computerChoice[i].type, Math.floor(Math.random() * 10) + 1,  computerChoice[i].hp, computerChoice[i].attack, computerChoice[i].defense,computerChoice[i].special_attack, computerChoice[i].special_defense, computerChoice[i].base_experience, pokedex.pokemon(computerChoice[i].name.toLowerCase()).sprites.animated, pokedex.pokemon(computerChoice[i].name.toLowerCase()).sprites.normal);

    computerPokemon.push(newPokemon);
}
console.log(userPokemon, computerPokemon);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'view.html'));
});

app.get('/api/userPokemon',function(req,res){
    return res.json(userPokemon);
});

app.get('/api/computerPokemon',function(req,res){
    return res.json(computerPokemon);
})

app.listen(port, function(){
    console.log('Pika pika!');
});