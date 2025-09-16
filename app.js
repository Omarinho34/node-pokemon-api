// Importer les modules nécessaires
const express = require('express');
const pokemons = require('./mock_pokemon');
const {success, getUniqueId} = require('./helper');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initialiser l'application Express
const app = express();
const PORT = 3000;

// // Middleware pour logger les requêtes
// const logger = (req, res, next) => {
//     console.log(`Requête reçue : ${req.method} ${req.url}`);
//     next();
// };

// app.use(logger);

// Middleware pour logger les requêtes avec morgan
app
    .use(morgan('dev'))
    .use(bodyParser.json());


app.get('/', (req, res) => res.send('Bienvenue sur l\'API Pokémon !'));

// Endpoint pour récupérer un Pokémon par son ID
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon));
});

// Endpoint pour récupérer tous les Pokémons
app.get('/api/pokemons', (req, res) => {
    const nbPokemons = pokemons.length;
    const message = `Il y a ${nbPokemons} pokémons dans la base de données.`
    res.json(success(message, pokemons));
});

// Endpoint pour créer un nouveau Pokémon
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
    pokemons.push(pokemonCreated);
    const message = `Le pokémon ${pokemonCreated.name} a bien été créé.`
    res.json(success(message, pokemonCreated));
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated));
});

// Démarrer le serveur
app.listen(PORT, () => console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`));
