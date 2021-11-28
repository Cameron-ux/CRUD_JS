const mongoose = require('mongoose')
const {Schema} = mongoose;

const pokemonSchema = new Schema({
  
    pokedex: Number,
    type : String,
    region: String,
    IsAlive: Boolean,
  })

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon
