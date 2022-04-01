const db = require('./configDb');

/*Vérifier que l'utilisateur a les droits d'administrateur
pour route changerAdmin*/
exports.isAdmin = (req, res, next) => {
    const userId = req.auth.userId;

    const sql = "SELECT isAdmin FROM USERS WHERE userId=?;";
    const sqlParams = [userId];
    db.query(sql, sqlParams, (error, result, fields) => {
        if (error) {
            res.status(500).json({'error': error.sqlMessage });
        } else {
            if(result[Ø].isAdmin === 1) {
                next();
            } else {
                res.status(403).json({'error': 'Accès refusé !'});
            }
        }
    });
};
/* Vérifier que l'utilisateur a le droit de supprimer le post (pour l'update aussi ?) :
admin ou auteur pour route delete Post*/
exports.deletePost = (req, res, next) => {
    const userIdreq = req.auth.userId;
    const sql = "SELECT isAdmin FROM USERS WHERE userId=?;";
    const sqlParams = [userIdreq];
    db.query(sql, sqlParams, (error, result, fields) => {
        if (error) {
            res.status(500).json({'error': error.sqlMessage });
        } else {
            if(result[Ø].isAdmin === 1) {
                // user is Admin
                next();
            } else {
                //user is not Admin
                const postId = req.params.postId;
                const sql2 = "SELECT userId FROM POSTS WHERE postId=?;";
                const sqlParams2 = [postId];
                db.query(sql2, sqlParams2, (error, result, fields) => {
                    if(error) {
                        res.status(500).json({ 'error': error.sqlMessage });
                    } else if (result.length === 0) {
                        res.status(404).json({'error': "Ce post n'existe pas !"});
                    } else {
                        const postAuthor = result[0].userId;
                        if (postAuthor === userIdreq) {
                            //user is postAuthor
                            next();
                        } else {
                            // user is neither admin nor postAuthor
                            res.status(403).json({ 'error': 'Accès refusé !'});
                        }
                    }
                });
            }
        }
    });
};
/* Vérifier droit de supprimer un commentaire (pour l'update aussi ?) */
