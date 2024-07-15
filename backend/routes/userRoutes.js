const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de autenticación
router.post('/login', userController.loginUser);
// Rutas específicas para usuarios
router.put('/update-agency', userController.updateUserAgency);
// Rutas para usuarios
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.post('/:id/document', userController.updateDocument[0],userController.updateDocument[1]);
router.put('/:id/document', userController.updateApproval);
router.put('/:id/password', userController.updatePass);
router.put('/:id/job', userController.updateJob);
router.post('/:id/photo', userController.updatePhoto[0], userController.updatePhoto[1]); //Se guarda el archivo y se actualiza el usuario
router.delete('/:id', userController.deleteUser);
router.put('/update-profile/:id', userController.updateProfile);
router.put('/:id/block', userController.updateBlock);




module.exports = router;




