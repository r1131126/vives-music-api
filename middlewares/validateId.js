const mongoose = require('mongoose');

// Middleware to check if the provided ID matches MongoDB format
const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
            message: 'The provided ID does not match a valid MongoDB format' // Traducido
        });
    }

    next();
};

module.exports = validateObjectId;