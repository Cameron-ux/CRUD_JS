//declarations 
//express for server and routes
const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const port = 3000

const mongoose = require('mongoose')

const Pokemon = require('./pokemon.js')



//make the app use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}))

//API ROUTES

//show all pokemons from the database using GET request
app.get('/pokemon', (req, res) => {
  //find all pokemons in the database and store them in the "result" variable

  Pokemon.find((err, pokemons) => {
    //in case there is an error with our pokemon model, we we will send it to the user(postman)
    if (err) {
      res.send("Error occured no pokemon retrieved")
      return
    }

    res.send(pokemons)

    console.log(pokemons)
  })
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;

  Pokemon.findById(id, (err, pokemon) => {
    if (err) {
      res.send("pokemon not found")
      return
    }

    res.send(pokemon)
    console.log(pokemon)
  })
})

//insert request using POST to add a pokemon into the database
app.post('/pokemon', (req, res) => {
  console.log("Inserting a pokemon in the database")


  let IsAlive = false;
  if (req.body.IsAlive === 'true') {
    IsAlive = true;
  }
  let pokemon = new Pokemon({
    pokedex: parseInt(req.body.pokedex), //Number
    type: req.body.type, //String
    region: req.body.region || "No region inserted", //String
    IsAlive: IsAlive //Boolean
  });

  pokemon.save(err => {
    if (err) {
      // if error send this message
      res.send(`pokemon not inserted into the database, error is: ${err}`)

      return
    }

    res.send("pokemon inserted into the database")
    console.log("pokemon is in the database")
  })

  return
})

// PUT
app.put('/pokemon/:id', (req, res) => {

  console.log("Trying to edit pokemon")
  console.log(parseInt(req.body.age))


  Pokemon.findByIdAndUpdate(req.params.id, {
    type: req.body.pokedex,
    pokedex: ((parseInt(req.body.pokedex) == NaN) ? 0 : parseInt(req.body.pokedex)),
    region: req.body.region,
    IsAlive: (req.body.IsAlive === 'true')
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err)
      return;
    }
    res.send("It did edit")
  })
})


//DELETE
app.delete('/pokemon/:id', (req, res) => {

  Pokemon.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("pokemon did not delete")
      return
    }
    res.send("pokemon deleted")
    console.log(`pokemon with id ${req.params.id} is now deleted`)

  })
})

//start the server
app.listen(port, () => {

  mongoose.connect('mongodb+srv://Luneck:oui@pokemonapi.byx0m.mongodb.net/PokemonAPI?retryWrites=true&w=majority'). //Link to my DB
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})
