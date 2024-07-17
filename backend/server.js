const express = require('express');
const cors = require('cors');
const path = require('path')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postEmpRoutes = require('./routes/postEmpRoutes');
const postEmbajadaRoutes = require('./routes/postEmbajadaRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resortRoutes = require('./routes/resortRoutes');
const connectDB = require('./db');

// Inicializar aplicación
const app = express();
const PORT = process.env.PORT || 5001;



// Conectar a la base de datos
connectDB()

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/assets', express.static('src/assets'));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/postsEmp', postEmpRoutes);
app.use('/api/postsEmbajada', postEmbajadaRoutes);
app.use('/api/resorts', resortRoutes);
app.use('/api/events', eventRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send({ message: 'Algo salió mal!', error: err.message });
});

app.use('/media', express.static(path.join(__dirname, 'media')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});
