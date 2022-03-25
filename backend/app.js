require('dotenv').config();
//console.log(process.env);
// import express
const express = require('express');
// appel de la BDD
require('./middleware/configDb');
// install helmet
const helmet = require('helmet');
// installation Cors
const cors = require('cors');
// limiter les requêtes
const rateLimit = require('express-rate-limit');
// importation de path pour accéder au path du serveur
const path = require('path');
// TODO importer les routeurs

//connexion BDD


// Propriété de rateLimit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 80, // limite chaque IP à 80 requêtes par 15min
    standardHeaders: true, // retourne l'info dans les headers
    legacyHeaders: false // désactive le 'X-rateLimit-*' headers
});

// appel de la méthode express
const app = express();
app.use(helmet());
app.use(cors());
app.use(limiter);

app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).send('<h1>Bonjour sur mon super serveur</h1>');
});
// Routes avec app.use et chemin 


module.exports = app;