const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postsCtrl');
const likeCtrl = require('../controllers/likesCtrl');
const commentCtrl = require('../controllers/commentsCtrl');

/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.listPosts );
router.delete('/:postId', auth, postCtrl.deletePost);
//router.put('/:id', auth, postCtrl.updatePost);
// Route pour les likes 
router.post('/:postId/like', auth, likeCtrl.likePost );
router.get('/:postId/like', auth, likeCtrl.getLikes );
// Route pour les commentaires
router.post('/:postId/comment', auth, commentCtrl.createComment);



module.exports = router;