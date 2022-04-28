const db = require('../middleware/configDb');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const userId = req.auth.userId;
    console.log("user:",userId);
    const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const title = req.body.title ? req.body.title : null;
    const content = req.body.content ? req.body.content : null;
    const likes = 0;

    const sql = "INSERT INTO POSTS (user_id, attachment, title, content, likes) VALUES (?, ?, ?, ?, ?);";
    const sqlParams = [userId, attachment, title, content, likes];
    db.query(sql, sqlParams, (error, results, fields) => {
        if(error) {
            res.status(500).json({'error': error.sqlMessage});
        } else {
            console.log(results);
            res.status(201).json({message : "Post publié !", post: {postId:results.insertId, userId, attachment, title, content, likes} });
        }
    });

};
exports.listPosts = (req, res, next) => {
    const sql = 
        "SELECT USERS.username, USERS.picture, POSTS.postId, POSTS.title, POSTS.content, POSTS.attachment, POSTS.user_id, POSTS.likes, POSTS.createdAt \
        FROM POSTS \
            LEFT JOIN USERS \
                ON POSTS.user_id = USERS.userId \
        ORDER BY createdAt DESC";
    db.query(sql, (error, results, field) => {
        if(error) {
            console.error(error)
            return res.status(400).json({ 'error': error.sqlMessage });
        }
        res.status(200).json({
            posts : results})
    });
};
// TODO supprimer la photo et le fichier photo
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    console.log(postId);
    const sqlParams = [postId];
    // recherche de l'attachment du post
    const sqlDeleteImg = "SELECT * FROM POSTS WHERE postId= ?;"
    db.query(sqlDeleteImg, sqlParams, (errImg, results, fields) => {
        if(errImg) {
            res.status(500).json({ 'error': errImg.sqlMessage})
            // si l'image existe, suppression
        } else if(results[0].attachment != null) {
            const oldImg = results[0].attachment
            console.log(oldImg)
            const oldFile = oldImg.split('/images/')[1];
            fs.unlink(`images/${oldFile}`, (err => {
                if(err) {
                    console.log(err);
                    return false
                } else {
                    console.log("Image du post supprimée !");
                    return true
                }
            }));  
        }
        const sql = "DELETE FROM POSTS WHERE postId= ?;";
        db.query(sql, sqlParams, (error, result, fields) => {
            if(error) {
                res.status(400).json({ 'error': error.sqlMessage});
            } else {
                res.status(201).json({ message: 'Post supprimé !'});
            }
        });
    })
};
// récupérer tous les commentaires d'un post
exports.getAllComPosts = (req, res, next) => {
    const sql = 
    "SELECT \
        p.title AS post_title, \
        p.attachment AS post_attachment, \
        p.createdAt AS post_createdAt, \
        p.content AS post_content, \
        c.userId AS comment_userId, \
        c.createdAt AS comment_createdAt, \
        c.content AS comment_content, \
        u.picture AS comment_author_picture \
        u.username AS comment_author, \
    FROM POSTS p \
    JOIN COMMENTS c \
        ON p.postId = c.postId \
    JOIN USERS \
        ON u.userId = c.userId;";
    db.query(sql, (error, result, fields) => {
        if (error) {
            res.status(500).json({'error': error.sqlMessage});
        }
        res.status(200).json(result);
    });
};
// récupérer tous les likes d'un post

// récupérer un post avec tous ses likes et commentaires