const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// Conexion a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexion exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error de conexion:', err));

// IMPORTAR Y USAR RUTAS
const musicRoutes = require('./routes/musicRoutes');
app.use('/api/music', musicRoutes);

app.get('/', (req, res) => res.send('API Vives Musica - Servidor Activo'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
