const db = require('../middleware/configDb');

exports.likePost = (req, res, next) => {
    const userId = req.auth.userId;
    const postId = req.params.postId;

    const sql = "SELECT * FROM LIKES  WHERE postId= ? AND userId= ?;" ;
    const sqlParams = [postId, userId];
    try {
        new Promise((resolve, reject) => { 
            db.query(sql, sqlParams, (error, result, fields) => {
                if (error) {
                    return res.status(400).json({ 'error': error.sqlMessage, code: 1 })
                } 
                resolve(result)
            })
        }).then(result => {
            const length = result.length
            console.log(length)
            if(length === 0) {
                const likeParams = {
                    postId : postId,
                    userId : userId,
                };
                const sql = "INSERT INTO LIKES SET ?;"
                db.query(sql, likeParams, (error, result, fields) => {
                    if(error) {
                        return res.status(400).json({ 'error': error.sqlMessage, code: 2 });
                    }
                    return res.status(200).json({ message : 'Publication likée !'});
                });
            
            } else if(length > 0) {
                const sql = "DELETE FROM LIKES WHERE postId= ? AND userId= ?;";
                db.query(sql, sqlParams, (error, results, fields) => {
                    if(error) {
                        return res.status(400).json({ 'error': error.sqlMessage, code: 3 });
                    }
                    return res.status(200).json({ message : 'Like supprimé !'});
                });
            } else {
                return res.status(200).json({message :'length < 0'})
            }           
        })
    } catch (error) { console.log(error)
        return res.status(408).json(error)
    }
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