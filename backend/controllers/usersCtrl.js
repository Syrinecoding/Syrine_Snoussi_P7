// IMPORTS
require('dotenv').config();
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
        //TODO vérifier que cela hash bien .
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
                        res.status(201).json({ message : 'Profil utilisateur créé !'})
                    }
                });
            }
        });
    })
    .catch(error => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
    const email = req.body.email;
    const sql = "SELECT userId, email, password, picture, isAdmin FROM USERS WHERE email= ?";
    const sqlParams = [email];

    db.query(sql, sqlParams, (error, result, fields) => {
        // si erreur
        if(error) {
            res.status(500).json({'error': error.sqlMessage });
        // si utlisateur introuvable
        } else if(result.length == 0){
            res.status(401).json({ 'error' : 'Utilisateur introuvable !'});
        } else {
            bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({'error': 'Mot de passe erroné !'});
                } else (
                    res.status(200).json({
                        userId: result[0].userId,
                        token: jwt.sign(
                            { userId: result[0].userId },
                            process.env.MY_TOKEN_KEY,
                            { expiresIn: '24h'}
                        )
                    })
                )
                
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
};
exports.getOneUser = (req, res, next) => {
    const userIdParam = req.params.userId;
    const sql = "SELECT userId, username, picture, position, isAdmin FROM USERS WHERE userId= ?";
    const sqlParams = [userIdParam];
    db.query(sql, sqlParams, (error, results, fields) => {
        if(error) {
            res.status(500).json({'error': error.sqlMessage});
        // si utilisateur introuvable
        } else if(results.length === 0) {
            res.status(401).json({ 'error': "L'utilisateur n'existe pas !"});
        } else {
            res.status(200).json(results)
        }
    })
};
exports.deleteAccount = (req, res, next) => {
    const userId = req.params.userId;
    const sql = "DELETE FROM USERS WHERE userId=?";
    const sqlParams = [userId];
    db.query(sql, sqlParams, (error, results, fields) => {
        if(error) {
            res.status(500).json({'error': error.sqlMessage});
        } else {
            res.status(201).json({ message : 'Compte supprimé !'});
        }
    });
};
exports.getAllUsers = (req, res, next) => {
    const sql = "SELECT userID, username, picture, position FROM USERS;";
    db.query(sql, (error, results, fields) => {
        if(error) {
            res.status(500).json({'error': error.sqlMessage });
        } else (
            res.status(200).json(results)
        )
    });
};
// TODO cele n'enregistre pas dans le BDD !!! champ trop long ? cf trim ?
exports.updatePicture = (req, res, next) => {
    const pictureUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log(pictureUrl);
    const userId = req.body.userId;
    const sql = "UPDATE USERS SET picture=? WHERE userId=?";
    const sqlParams = [pictureUrl, userId];
    db.query(sql, sqlParams, (error, result, rows) => {
        if(error) {
            res.status(500).json({ 'error': error.sqlMessage });
        } else {
            res.status(201).json({ message: 'Image de profil modifiée !'});
        }
    });
};
