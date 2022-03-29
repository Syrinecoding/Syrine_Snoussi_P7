const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// import des controllers
const userCtrl = require('../controllers/usersCtrl');

/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:userId', auth, userCtrl.getOneUser);
router.get('/users/' , auth, userCtrl.getAllUsers);
router.put('/:userId', auth, multer, userCtrl.updatePicture);
router.delete('/:userId', auth, userCtrl.deleteAccount);

module.exports = router;