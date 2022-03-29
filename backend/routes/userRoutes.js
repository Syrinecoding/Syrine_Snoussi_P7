const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// import des controllers
const userCtrl = require('../controllers/usersCtrl');

/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/signup', userCtrl.signup);
router.post('/:id', userCtrl.login);
//router.get('/:id', auth, userCtrl.getUserProfile);
//router.put('/:id', auth, multer, userCtrl.updateUserProfile);

module.exports = router;