//declarations and imports
const express = require('express')
const app = express()
const port = 3000

const {Pokemon, Cat} = require('./back.js')

let pokemon1 = new Pokemon("Elektrik", "Kanto", 25, ['Low Quick', 'Take Down', 'Thundershock', 'Thunder', 'Iron Tail'], ['HP: 3', 'Att: 5', 'Def: 4', 'Att Spe: 5', 'Def Spe: 5', 'Speed: 9']);
console.log(pokemon1);

app.get('/', (req, res) => {
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

app.post('/showdog', (req, res) =>{
    
    console.log('Someone is trying to post something');
    res.send('Congrats, you posted something')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})