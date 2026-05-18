const mongoose = require('mongoose');

// Esquema 4: Usuarios (Coleccion Principal para Autenticacion)
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['guest', 'user', 'admin'], 
        default: 'user' 
    } // Los 3 niveles de acceso exigidos en el documento
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
