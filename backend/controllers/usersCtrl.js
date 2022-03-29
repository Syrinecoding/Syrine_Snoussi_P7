// IMPORTS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// import de la connexion avec BDD pour infos
const db = require('../middleware/configDb');
//import de file system
const fs = require('fs');

//middleware avec fonction de signup
exports.signup = (req, res, next) => {
    //crypter le mdp avec hash 
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //TODO crypter les données ?
        const username = req.body.username;
        const email = req.body.email;
        const password = hash;
        const position = req.body.position;
        let isAdmin;
        //requête préliminaire : si 0 user, user 1 est admin
        const sqlCountUsers = `SELECT COUNT (*) AS usersNumber FROM USERS;`;
        db.query(sqlCountUsers, (error, resultc, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({'error': error.sqlMessage });
            } else {
                console.log(resultc);
                if (resultc[0].usersNumber === 0) {
                    isAdmin = 1;
                } else {
                    isAdmin = 0;
                }

                const sqlEmail = `SELECT * FROM USERS WHERE email='${email}'`;
                db.query(sqlEmail, (err, results, rows) => {
                    if(results.length >0) {
                        return res.status(401).json({
                            message : 'Cet email est déjà enregistré !'
                        });
                    
                    }
                });
                //PB Cela envoie quand même les données à la BDD...

                // requête principale : create User
                const sqlCreate = ` INSERT INTO USERS (email, username, password, position, isAdmin) VALUES (?, ?, ?, ?, ?)`;
                const sqlParams = [email, username,  password, position, isAdmin];

                db.query(sqlCreate, sqlParams, (error, result,fields) => {
                   
                    if(error) {
                        res.status(500).json({'erreur': error.sqlMessage});                       
                    } else {
                        res.status(201).json({ message : 'Profile utilisateur créé !'})
                    }
                });
            }
        });
    })
    .catch(error => res.status(500).json({ error }));
}