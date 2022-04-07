require("dotenv").config();
const mysql = require('mysql2');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

if(!DB_USER) {
    throw new Error('DB_USER doit être configuré !');
}
if(!DB_PASS) {
    throw new Error('DB_PASS doit être configuré !');
}
// créer connexion 
const db = mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASS,
    database : DB_NAME,
});

// connecter
db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql est connecté...');
});

module.exports = db;


