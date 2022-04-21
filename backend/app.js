const path = require('path');
require('dotenv').config({ path: process.cwd() + './.env' });
// imports
const express = require('express');
const mysql = require('mysql2');
// appel de la BDD
require('./middleware/configDb.js');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
// appel routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
// Propriété de rateLimit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 80, // limite chaque IP à 80 requêtes par 15min
    standardHeaders: true, // retourne l'info dans les headers
    legacyHeaders: false // désactive le 'X-rateLimit-*' headers
});
// appel de la méthode express
const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
// Prévention des erreurs CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
//     next();
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;