var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var Pokedex = require('pokedex');
var pokedex = new Pokedex();
var port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

function Pokemon(name,type,level,HP,attack,defense,exp,animatedImage){
    this.name = name;
    this.type = type;
    this.level = level;
    this.HP = HP;
    this.attack = attack;
    this.defense = defense;
    this.exp = exp;
    this.animatedImage = animatedImage;
    this.printStats = function(){
        console.log(name.toUpperCase()+"'S STATS");
        console.log('Pokemon: '+this.name+' Level: '+this.level);
        console.log('Type: '+this.type);
        console.log('HP: '+this.HP);
        console.log('Attack: '+this.attack+' Defense: '+this.defense);
    };
    this.isConscious = function(){
        if(this.HP>0){
            return true;
        } else {
            console.log(this.name+' passed out!');
            return false;
        }
    };
    this.battle = function(pokemon){
        pokemon.HP -= parseInt(((2*this.level*10/250)*(this.attack/this.defense)*this.HP+2)*this.level);
    };
}

var pokemon = {};

pokemon.bulbasaur = new Pokemon('Bulbasaur', 'Grass, Poison', 1, 45, 49, 49, 0, pokedex.pokemon('bulbasaur').sprites.animated);
pokemon.charmander = new Pokemon('Charmander', 'Fire', 1, 39, 52, 43, 0, pokedex.pokemon('charmander').sprites.animated);
pokemon.squirtle = new Pokemon('Squirtle', 'Water', 1, 44, 48, 65, 0, pokedex.pokemon('squirtle').sprites.animated);
pokemon.pikachu = new Pokemon('Pikachu', 'Electric', 1, 35, 55, 40, 0, pokedex.pokemon('pikachu').sprites.animated); 

app.get('/',function(req,res){
    res.render('landing', {pokemon: pokemon});
});



// console.log(pokemon.bulbasaur.printStats());

// while (pokemon.bulbasaur.isConscious() && pokemon.charmander.isConscious()){
//     pokemon.bulbasaur.battle(pokemon.charmander);
//     pokemon.charmander.battle(pokemon.bulbasaur);
//     pokemon.bulbasaur.printStats();
//     console.log('------------------');
//     pokemon.charmander.printStats();
//     console.log('------------------');
// };

app.listen(port, function(){
    console.log('Pika pika!');
});