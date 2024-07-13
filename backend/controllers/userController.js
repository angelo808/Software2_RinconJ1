const User = require('../models/userModel');

// Método para iniciar sesión
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateUserAgency = async (req, res) => {
    try {
        const { userId, selectedAgency } = req.body;
        const user = await User.findByIdAndUpdate(
            userId,
            { selectedAgency: selectedAgency },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { username, password, name, email, occupation, photo } = req.body;
        const newUser = new User({
            username,
            password,
            name,
            email,
            occupation,
            photo
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Aquí es donde actualizas la contraseña sin bcrypt
        Object.assign(user, req.body);
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateUserEntrevista = async (req, res) => {
  try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(
          userId,
          { entrevista: true }, // Actualiza el campo entrevista a true
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

exports.updateUserPhoto = async (req, res) => {
    const { userId } = req.params;
    const { photo } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { photo }, 
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };