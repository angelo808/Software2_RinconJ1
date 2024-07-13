const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./db');

// Inicializar aplicación
const app = express();
const PORT = process.env.PORT || 5001;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/assets', express.static('src/assets'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/events', eventRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send({ message: 'Algo salió mal!', error: err.message });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
