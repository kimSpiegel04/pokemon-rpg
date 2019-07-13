function Pokemon(name,type,level,HP,attack,defense,exp){
    this.name = name;
    this.type = type;
    this.level = level;
    this.HP = HP;
    this.attack = attack;
    this.defense = defense;
    this.exp = exp;
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

pokemon.bulbasaur = new Pokemon('Bulbasaur', 'Grass, Poison', 1, 45, 49, 49, 0);
pokemon.charmander = new Pokemon('Charmander', 'Fire', 1, 39, 52, 43, 0);
pokemon.squirtle = new Pokemon('Squirtle', 'Water', 1, 44, 48, 65, 0);
pokemon.pikachu = new Pokemon('Pikachu', 'Electric', 1, 35, 55, 40, 0);

console.log(pokemon.bulbasaur.printStats());

while (pokemon.bulbasaur.isConscious() && pokemon.charmander.isConscious()){
    pokemon.bulbasaur.battle(pokemon.charmander);
    pokemon.charmander.battle(pokemon.bulbasaur);
    pokemon.bulbasaur.printStats();
    console.log('------------------');
    pokemon.charmander.printStats();
    console.log('------------------');
};