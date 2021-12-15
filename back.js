//declarations 
//express for server and routes
const express = require('express');
//bodyParser for x-www-urlencoded variables
const bodyParser = require('body-parser');
// defining the actual app to handle the requests
const app = express();
const port = 3000;
// require the driver to connect to the database
const mongoose = require('mongoose');
// require the class constructor from different file
const Pokemon = require('./pokemon.js');
//defining one object using our new constructor

//make the app use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));

let pokemon1 = new Pokemon("Elektrik", "Kanto", 25, ['Low Quick', 'Take Down', 'Thundershock', 'Thunder', 'Iron Tail'], ['HP: 3', 'Att: 5', 'Def: 4', 'Att Spe: 5', 'Def Spe: 5', 'Speed: 9']);
console.log(pokemon1);

app.get('/pokemon', (req, res) => {
  res.send('Cameron Lormont')
})

app.get('/message', (req, res) => {
    res.send('Hi, this is a nice message');
})

app.get('/othermessage', (req, res) => {
    res.send('This is the second message');
})

app.get('/showpokemon', (req, res) =>{
    console.log('Someone is requiring a pokemon;')
    res.send(pokemon1)
})

app.post('/showpokemon', (req, res) =>{
    
    console.log('Someone is trying to post something');
    res.send('Congrats, you posted something')
})


app.listen(port, () => {
    //change the link to your database
    mongoose.connect('mongodb+srv://Luneck:Cameron3001@pokemonapi.byx0m.mongodb.net/PokemonAPI?retryWrites=true&w=majority').
    catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})