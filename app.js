const express = require('express');
const pokemons = require('./mock_pokemon');
const {success} = require('./helper');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Bienvenue sur l\'API Pokémon !'));

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req, res) => {
    const nbPokemons = pokemons.length;
    const message = `Il y a ${nbPokemons} pokémons dans la base de données.`
    res.json(success(message, pokemons));
});

app.listen(PORT, () => console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`));