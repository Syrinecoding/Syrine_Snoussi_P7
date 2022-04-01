const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const adminAuth = require('../middleware/adminAuth');

// import des controllers
const userCtrl = require('../controllers/usersCtrl');


/* enregistrer les routes dans le router et 
application des fonctions du controller */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:userId', auth, userCtrl.getOneUser);
//router.get('/profile/:userId/posts', auth, userCtrl.getUserPosts);
router.get('/users/' , auth, userCtrl.getAllUsers);
router.put('/profile/:userId', auth, multer, userCtrl.updatePicture);
router.delete('/:userId', auth, adminAuth.deleteUser ,userCtrl.deleteAccount);
// admin
router.put('/:userId/admin', auth, adminAuth.isAdmin, userCtrl.updateAdmin);

module.exports = router;