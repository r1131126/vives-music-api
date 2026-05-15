const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => res.send('API Vives Música - Día 1 OK 🚀'));

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
