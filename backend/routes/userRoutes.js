const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para iniciar sesión
router.post('/login', userController.loginUser);

// Ruta para actualizar la agencia seleccionada por el usuario
router.put('/update-agency', userController.updateUserAgency);

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para obtener todos los usuarios
router.get('/', userController.getUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Ruta para actualizar un usuario por ID
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;


