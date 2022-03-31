const db = require('../middleware/configDb');

exports.createComment = (req, res, next) => {
    const content = req.body.content;
    const userId = req.auth.userId;
    const postId = req.params.postId;

    const sql = "INSERT INTO COMMENTS (content, userId, postId) VALUES (?, ?, ?);";
    const sqlParams = [content, userId, postId];
    db.query(sql, sqlParams, (error, result, fields) => {
        if(error) {
            res.status(500).json({'error': error.sqlMessage });
        }
        res.status(201).json({ message : 'Commentaire ajouté !'});
    });
};
exports.getComments = (req, res, next) => {

}