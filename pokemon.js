//requesting mongooose and Schema so the class can be defined
const mongoose = require('mongoose')
const {Schema} = mongoose;
//setting up the Rules for our class using schema 
const pokemonSchema = new Schema({
  
    type : String,
    region: String,
    pokedex: Number,
    IsAlive: Boolean,
  })
//defining the name of the constructor for our class
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
//export the class, also called a model or a document, to use in different files
module.exports = Pokemon
