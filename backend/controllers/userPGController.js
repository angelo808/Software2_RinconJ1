const prisma = require("../prismaClient");

// Método para iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar la agencia seleccionada por el usuario
exports.updateUserAgency = async (req, res) => {
  try {
    const { userId, selectedAgency } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { selectedAgency: selectedAgency },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        name,
        email,
        occupation,
        photo,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      occupation,
      photo,
      selectedAgency,
    } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username,
        password,
        name,
        email,
        occupation,
        photo,
        selectedAgency,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
