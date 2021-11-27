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

//API ROUTES
//show all dogs from the database using GET request
app.get('/pokemon', (req, res) => {
  res.send("Cameron Lormont")
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  // we use the findById query, details on https://mongoosejs.com/docs/queries.html
  // this query only returns one element
  // you can also use findOneById
  // you can also use findOne({_id:req.paramas.id}) - this query will find depending on other properties,
  //                                    e.g. breed, name
  //                                    will only return first element found
  // to return more then 1 element use find({}) // see previous request
  Pokemon.findById(id, (err, pokemon) => {
    if (err) {
      res.send("Pokemon not found")
      return
    }
    // inside the Database

    //we will send it back to the user/postman
    res.send(pokemon)
    console.log(pokemon)
  })
})

//insert request using POST to add a dog into the database
app.post('/pokemon', (req, res) => {
  console.log("Inserting a pokemon in the database")
  //inser the pokemon into the database

  let isNeutred = false;
  if (req.body.isNeutred === 'true') {
    isNeutred = true;
  }
  let pokemon = new Pokemon({
    pokedex: parseInt(req.body.pokedex), //Number
    type: req.body.type, //String
    region: req.body.region || "No region inserted", //String
    isAlive: isAlive //Boolean
  });
  //inserting a dog and checking to see if any errors occured
  pokemon.save(err => {
    if (err) {
      // if error send a message to let the user know
      res.send(`Pokemon not inserted into the database, error is: ${err}`)
      //return to be used in order to not send to res.send and crash the program
      return
    }
    //send a message to the user with the result
    res.send("Pokemon inserted into the database")
    console.log("Pokemon is in the database")
  })

  //if return runs, code will start from here
  return
})
// -->
// PUT request to update or modify one dog from the database
app.put('/pokemon/:id', (req, res) => {
  // You can use req.params.id to send the _id and req.body for your new variables
  // or you can send all variables, including id, in req.body
  console.log("Trying to edit dog")
  console.log(parseInt(req.body.age))


  Pokemon.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: ((parseInt(req.body.age) == NaN) ? 0 : parseInt(req.body.age)),
    breed: req.body.breed,
    isNeutred: (req.body.isNeutred === 'true')
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err)
      return;
    }
    res.send("It did edit")
  })
})


//delete request using DELETE and a PARAMETER (id)
app.delete('/pokemon/:id', (req, res) => {

  // You can use findOneAndDelete({_id:})
  // or
  // You can use findByIdAndDelete(id)
  //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
  Pokemon.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Pokemon did not delete")
      return
    }
    res.send("Pokemon deleted")
    console.log(`Pokemon with id ${req.params.id} is now deleted`)
    // console.log("Pokemon with id "+req.params.id + "is now deleted")
  })
})

//start the server
app.listen(port, () => {
  //change the link to your database
  mongoose.connect('mongodb+srv://Luneck:Cameron3001@pokemonapi.byx0m.mongodb.net/PokemonAPI?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})