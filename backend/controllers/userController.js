const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Método para iniciar sesión
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    console.log('User found:', user); // Log del usuario encontrado

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Entered password:', password);
    console.log('Hashed password:', user.password);
    console.log('Password match:', isMatch); // Log de la comparación de contraseñas

    if (!isMatch) {
      console.log('Entered password:', password);
      console.log('Hashed password:', user.password);
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Actualizar la agencia seleccionada por el usuario
exports.updateUserAgency = async (req, res) => {
  const { userId, selectedAgency } = req.body;

  if (!userId || !selectedAgency) {
    return res.status(400).json({ message: 'User ID and selected agency are required' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { selectedAgency }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error updating user agency:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, password, name, email, occupation, photo } = req.body;

  if (!username || !password || !name || !email || !occupation) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    let isAdmin = false;
    
    if (username === 'admin') isAdmin = true;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Agrega este log para verificar el hash

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      occupation,
      photo,
      isAdmin
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(user, req.body);
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



