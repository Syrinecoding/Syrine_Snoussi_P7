const db = require('../middleware/configDb');

exports.likePost = (req, res, next) => {
    const userId = req.auth.userId;
    const postId = req.params.postId;
    

    const sql = "SELECT * FROM LIKES  WHERE postId= ? AND userId= ?;" ;
    const sqlParams = [postId, userId];
    db.query(sql, sqlParams, (error, result, fields) => {
        if (error) {
            res.status(400).json({ 'error1': error.sqlMessage });
        } else if (result.length === 0) {
            const newLike = {
                postId : postId,
                userId : userId
            };
            const sql = "INSERT INTO LIKES SET ?;";
            db.query(sql, newLike, (error, result, fields) => {
                if(error) {
                    res.status(400).json({ 'error2': error.sqlMessage });
                }
                res.status(200).json({ message : 'Publication likée !'});
            });
        } else {
            const sql = "DELETE FROM LIKES WHERE postId= ? AND userId= ?;";
            db.query(sql, sqlParams, (error, results, fields) => {
                if(error) {
                    res.status(400).json({ 'error3': error.sqlMessage });
                }
                res.status(200).json({ message : 'Like supprimé !'});
            });
        }
    });
};
exports.getLikes = (req, res, next) => {
    const postId = req.params.postId;

    const sql = "SELECT userId FROM LIKES WHERE postId= ?;";
    const sqlParams = [postId];
    db.query(sql, sqlParams, (error, result, fields) => {
        if(error) {
            res.status(404).json({ 'error': error.sqlMessage });
        }
        res.status(200).json(result);
    });
};