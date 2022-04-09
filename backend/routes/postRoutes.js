const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const adminAuth = require('../middleware/adminAuth');

const postCtrl = require('../controllers/postsCtrl');
const likeCtrl = require('../controllers/likesCtrl');
const commentCtrl = require('../controllers/commentsCtrl');


/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.listPosts );
router.delete('/:postId', auth, adminAuth.authPost, postCtrl.deletePost);
//router.get('/:postId', auth, postCtrl.getOnePost); ?
//router.put('/:id', auth, postCtrl.updatePost);
// Route pour les likes 
router.post('/:postId/like', auth, likeCtrl.likePost );
router.get('/:postId/likes', auth, likeCtrl.getLikes );
// Route pour les commentaires
router.post('/:postId/comment', auth, commentCtrl.createComment);
router.get('/:postId/comments', auth, commentCtrl.getComments);
router.delete('/comment/:commentId', auth, adminAuth.authComment, commentCtrl.deleteComment);


module.exports = router;