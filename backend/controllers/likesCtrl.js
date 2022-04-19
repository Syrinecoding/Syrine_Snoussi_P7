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
            // const addLike = {
            //     likes : + 1
            // };
            // const addSql = "INSERT INTO POSTS SET ?;"
            // db.query(addSql, addLike, (error, result, fields) => {
            //     if(error) {
            //         res.status(400).json({'error3': error.sqlMessage});
            //     }
            //     res.status(200).json({ message : 'Like ajouté !'})
            // });
        } else {
            const sql = "DELETE FROM LIKES WHERE postId= ? AND userId= ?;";
            db.query(sql, sqlParams, (error, results, fields) => {
                if(error) {
                    res.status(400).json({ 'error3': error.sqlMessage });
                }
                res.status(200).json({ message : 'Like supprimé !'});
            });
            // const dltLike = {
            //     likes : - 1
            // };
            // const deleteSql = "INSERT INTO POSTS SET ?;"
            // db.query(deleteSql, dltLike, (error, result, fields) => {
            //     if(error) {
            //         res.status(400).json ({ 'error4': error.sqlMessage });
            //     }
            //     res.status(200).json({ message : 'Like supprimé !'})
            // });
        }
    });
};
exports.getLikes = (req, res, next) => {
    const postId = req.params.postId;

    const sql = "SELECT userId FROM LIKES WHERE postId= ?;";
    const sqlParams = [postId];
    db.query(sql, sqlParams, (error, results, fields) => {
        if(error) {
            res.status(404).json({ 'error': error.sqlMessage });
        }
        res.status(200).json({
            likes : results});
    });
};