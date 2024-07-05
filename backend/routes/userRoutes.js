const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de autenticación
router.post('/login', userController.loginUser);

// Rutas para usuarios
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Rutas específicas para usuarios
router.put('/update-agency', userController.updateUserAgency);

module.exports = router;




