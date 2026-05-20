const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

const musicRoutes = require('./routes/musicRoutes');
const userRoutes = require('./routes/userRoutes'); // Conectamos rutas de usuario

app.use('/api/music', musicRoutes);
app.use('/api/users', userRoutes); // Añadimos el prefijo /api/users

app.get('/', (req, res) => {
    res.send('API de Vives Music funcionando perfectamente');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
