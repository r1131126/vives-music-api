const mongoose = require('mongoose');

// Middleware para comprobar si el ID enviado tiene el formato correcto de MongoDB
const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            message: 'El ID proporcionado no tiene un formato valido de MongoDB' 
        });
    }

    next();
};

module.exports = validateObjectId;
