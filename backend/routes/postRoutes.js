const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postsCtrl');

/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.listPosts );
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);


module.exports = router;