const db = require('../middleware/configDb');

exports.createPost = (req, res, next) => {
    const userId = req.body.userId;
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
            res.status(201).json({message : "Post publié !"});
        }
    });

};
exports.listPosts = (req, res, next) => {
    const sql = "SELECT * FROM POSTS ORDER BY createdAt DESC";
    db.query(sql, (error, result, field) => {
        if(error) {
            return res.status(400).json({ 'error': error.sqlMessage });
        }
        res.status(200).json(result)
    });
};
exports.deletePost = (req, res, next) => {
    const postId = parseInt(req.params.postId, 10);
    const sql = "DELETE FROM  POSTS WHERE postId= ?;";
    const sqlParams = [postId];
    db.query(sql, sqlParams, (error, result, fields) => {
        if(error) {
            res.status(500).json({ 'error': error.sqlMessage});
        } else {
            res.status(201).json({ message: 'Post supprimé !'});
        }
    });
};
// récupérer tous les commentaires d'un post

// récupéer tous les likes d'un post

// récupérer un post avec tous ses likes et commentaires