const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postsCtrl');

/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.listPosts );
router.delete('/:postId', auth, postCtrl.deletePost);
//router.put('/:id', auth, postCtrl.updatePost);



module.exports = router;