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
                // mettre email en sqlParams
                const sqlEmail = `SELECT * FROM USERS WHERE email='${email}'`;
                db.query(sqlEmail, (err, results, rows) => {
                    if(results.length >0) {
                        return res.status(401).json({
                            message : 'Cet email est déjà enregistré !'
                        });
                    
                    } else {
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
                        ),
                        username: result[0].username,
                        picture: result[0].picture,
                        isAdmin: result[0].isAdmin
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
            res.status(200).json({user: results[0]})
        }
    })
};
// TODO supprimer la photo et le fichier photo !
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
    const sql = "SELECT userID, username, picture, position FROM USERS ORDER by username ASC;";
    db.query(sql, (error, results, fields) => {
        if(error) {
            res.status(500).json({'error': error.sqlMessage });
        } else (
            res.status(200).json({
                users : results,
                hostDir : `${req.protocol}://${req.get('host')}`
            })
        )
    });
};

exports.updatePicture = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    const sqlParams1 = [userId]
    // recherche dans la BDD 
    const sqlDeleteImg = "SELECT * FROM USERS WHERE userId= ?";
    db.query(sqlDeleteImg, sqlParams1, (errImg, result, rows) => {
        if(errImg) {
            res.status(500).json({ 'error': errImg.sqlMessage })
        } else if (result[0].picture != null) {
            const oldImg = result[0].picture
            console.log('oldimg :', oldImg)
            const oldFile = oldImg.split('/images/')[1];
            fs.unlink(`images/${oldFile}`, (err => {
                if(err) {
                    console.log(err);
                    return false
                } else {
                    console.log("Ancienne image supprimée ! ")
                    return true
                }
            }));
        }
        const pictureUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        console.log(pictureUrl);
        const sqlUpdate = "UPDATE USERS SET picture=? WHERE userId=?";
        const sqlParams = [pictureUrl, userId];
        db.query(sqlUpdate, sqlParams, (error, result, rows) => {
            if(error) {
                res.status(500).json({ 'error': error.sqlMessage });
            } else {
                console.log('Image modifiée !')
                res.status(201).json({ pictureUrl, userId, message: 'Image de profil modifiée !'});
            }
        });
    })
    
    
};

// TODO  enlever les droits d'admin après transfert si souhaité ?
exports.updateAdmin = (req, res, next) => {
    const isAdmin = req.body.isAdmin;
    const userId = req.params.userId;

    const sql = "UPDATE USERS SET isAdmin= ? WHERE userId= ?;";
    const sqlParams = [isAdmin, userId];
    db.query(sql, sqlParams, (error, result, fields) => {
        if (error) {
            res.status(500).json({ 'error': error.sqlMessage });
        }
        res.status(201).json({ message: "Droits d'administration transférés !"})
    });
};
exports.authentificate = (req, res, next) => {
    res.status(200).json({ message: "token valide !" })
};

